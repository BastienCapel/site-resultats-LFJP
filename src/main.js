import { EXAMS, EXAM_ORDER } from "./exams/index.js";
import { computeStats } from "./data.js";

// ── État de l'examen actif ────────────────────────────────────────────────────
let activeExam = localStorage.getItem("lfjp_active_exam");
if (!activeExam || !EXAMS[activeExam]) activeExam = "bac";

// Constantes dérivées de l'examen actif — réassignées par loadExam()
let EXAM, YEARS, YEAR_COLORS, DATA_YEARS;
let EP_KEYS, EP_LABELS, EP_COLORS, EP_SHORT, EP_YEARS;
let SPEC_KEYS, SPEC_LABELS, SPEC_SHORT, SPEC_COLORS, SPEC_YEARS;
let MENTION_ORDER, MENTION_CONFIG, getMentionKey;
let YEARS_DATA, OFFICIAL_STATS, YEAR_STATS;

let activeTab    = "overview";
let analysisYear, eleveYear;
let sortKey      = "score";
let sortAsc      = false;

// ── Mode de diffusion ─────────────────────────────────────────────────────────
// FULL = build complet (espace réservé, protégé par mot de passe serveur sur Vercel) :
//   noms entiers + notes détaillées par matière, onglet « Élèves » et bulletins.
// !FULL = build public (GitHub Pages) : AUCUNE donnée nominative — les noms et les
//   notes individuelles sont retirés du code lui-même au moment du build (plugin Vite).
//   Seules les statistiques globales et anonymisées sont diffusées.
const FULL = import.meta.env.VITE_FULL === "1";

// URL de l'espace réservé (site complet, protégé par mot de passe). Affiché comme
// lien dans l'en-tête du site public.
const PRIVATE_SITE_URL = "https://resultats-lfjp-prive.vercel.app";

// Dans le build complet, les données nominatives sont toujours visibles (le contrôle
// d'accès est assuré côté serveur, pas par un login factice côté navigateur).
const isAdmin = FULL;

// ── Chargement d'un examen : (ré)initialise toutes les constantes dérivées ─────
function loadExam(id) {
  activeExam = id;
  localStorage.setItem("lfjp_active_exam", id);
  EXAM = EXAMS[id];

  YEARS       = EXAM.years;
  YEAR_COLORS = EXAM.yearColors;

  EP_KEYS   = EXAM.epreuves.map(e => e.key);
  EP_LABELS = EXAM.epreuves.map(e => e.label);
  EP_SHORT  = EXAM.epreuves.map(e => e.short || e.label);
  EP_COLORS = EXAM.epreuves.map(e => e.color);
  EP_YEARS  = EXAM.epreuves.map(e => e.years || null); // null = épreuve commune à toutes les années

  SPEC_KEYS   = EXAM.specialites.map(s => s.key);
  SPEC_LABELS = EXAM.specialites.map(s => s.label);
  SPEC_SHORT  = EXAM.specialites.map(s => s.short || s.label);
  SPEC_COLORS = EXAM.specialites.map(s => s.color);
  SPEC_YEARS  = EXAM.specYears || [];

  MENTION_ORDER = EXAM.mentions.order;
  MENTION_CONFIG = EXAM.mentions.config;
  getMentionKey  = EXAM.mentions.classify;

  YEARS_DATA = {};
  YEARS.forEach(y => { YEARS_DATA[y] = { eleves: EXAM.data[y] || [] }; });

  // Années réellement renseignées (les graphiques pluriannuels les utilisent pour
  // éviter qu'une promotion encore vide — ex. l'année en cours — ne casse le rendu).
  DATA_YEARS = YEARS.filter(y => (YEARS_DATA[y].eleves || []).length > 0);

  OFFICIAL_STATS = {};
  buildYearStats();

  // On ouvre Analyse / Élèves sur la dernière promotion renseignée (et non sur
  // une année à venir encore vide).
  const latest = DATA_YEARS.length ? DATA_YEARS[DATA_YEARS.length - 1] : YEARS[YEARS.length - 1];
  analysisYear = latest;
  eleveYear    = latest;
  sortKey = "score";
  sortAsc = false;
}

// Bascule vers un autre examen (depuis le sélecteur global)
window._exam = (id) => {
  if (id === activeExam || !EXAMS[id]) return;
  activeTab = "overview";
  loadExam(id);
  render();
};

// ── Helpers liés à l'examen actif ─────────────────────────────────────────────
function latestYear() { return YEARS[YEARS.length - 1]; }
function latestDataYear() { return DATA_YEARS.length ? DATA_YEARS[DATA_YEARS.length - 1] : YEARS[YEARS.length - 1]; }
function prevDataYear(y) { const i = DATA_YEARS.indexOf(y); return i > 0 ? DATA_YEARS[i - 1] : null; }
function yearRange()  { return DATA_YEARS.length ? `${DATA_YEARS[0]}–${DATA_YEARS[DATA_YEARS.length - 1]}` : "—"; }
function examHasData() { return DATA_YEARS.length > 0; }
function yearHasData(y) { return (YEARS_DATA[y]?.eleves || []).length > 0; }

// Une épreuve peut n'exister que certaines années (ex. les maths EA en 2026).
function epActiveYear(i, y) { return !EP_YEARS[i] || EP_YEARS[i].includes(y); }
function epIdxsForYear(y) { return EP_KEYS.map((_, i) => i).filter(i => epActiveYear(i, y)); }
function epHasData(i) { return DATA_YEARS.some(y => epActiveYear(i, y) && (YEAR_STATS[y]?.epStats[EP_KEYS[i]]?.n || 0) > 0); }
function epIdxsWithData() { return EP_KEYS.map((_, i) => i).filter(epHasData); }

function countMentions(eleves) {
  return Object.fromEntries(MENTION_ORDER.map(k => [k, eleves.filter(e => getMentionKey(e.resultat) === k).length]));
}

function deriveOfficial(eleves, stats) {
  const total = eleves.length;
  const admis = eleves.filter(e => {
    const k = getMentionKey(e.resultat);
    return k !== "refuse" && k !== "sg";
  }).length;
  return { total, admis, taux: total ? admis / total * 100 : 0, avg: stats ? stats.avg : 0 };
}

function computeSubAverages(eleves) {
  const epKeys = ["fr_gram", "fr_dictee", "fr_redac", "francais", "maths", "hg", "emc", "svt", "phys", "sciences", "oral"];
  const ccKeys = ["maths", "francais", "hg", "emc", "anglais", "espagnol", "eps", "svt", "phys", "techno", "arts", "musique"];
  const ep = {};
  const cc = {};
  epKeys.forEach(k => {
    const vals = eleves.map(e => e.details?.ep?.[k]).filter(v => v != null);
    ep[k] = vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : 0;
  });
  ccKeys.forEach(k => {
    const vals = eleves.map(e => e.details?.cc?.[k]).filter(v => v != null);
    cc[k] = vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : 0;
  });
  return { ep, cc };
}

function buildYearStats() {
  YEAR_STATS = {};
  YEARS.forEach(y => {
    const eleves = YEARS_DATA[y].eleves;
    const stats  = computeStats(eleves);
    OFFICIAL_STATS[y] = EXAM.official?.[y] || deriveOfficial(eleves, stats);
    YEAR_STATS[y] = {
      mentions:  countMentions(eleves),
      stats,
      epStats:   computeEpStats(eleves),
      specStats: computeSpecStats(eleves),
      official:  OFFICIAL_STATS[y],
      subAverages: computeSubAverages(eleves),
    };
  });
}


function emptyState(title) {
  return `<div class="container"><div class="card" style="text-align:center;padding:48px 24px">
    <div style="font-size:40px;margin-bottom:12px">📊</div>
    <div style="font-size:16px;font-weight:700;color:var(--text);margin-bottom:6px">${title}</div>
    <div style="font-size:13px;color:var(--muted);line-height:1.6">Aucune donnée n'est encore disponible pour l'examen «&nbsp;${EXAM.label}&nbsp;».<br>Les résultats seront ajoutés prochainement.</div>
  </div></div>`;
}

function getStudentDisplayName(e) {
  const prenom = (e.prenom || "").trim();
  if (isAdmin) {
    return { nom: e.nom, prenom };
  }
  // Promotions sans prénom au classeur (ex. EA 2021) : on affiche le nom seul.
  if (!prenom) return { nom: e.nom, prenom: "" };
  const firstPrenom = prenom.split(" ")[0];
  const lastInitial = e.nom.trim().charAt(0).toUpperCase();
  return { nom: lastInitial + ".", prenom: firstPrenom };
}

function computeSubjectStats(eleves, key) {
  const vals = eleves.map(e => e[key]).filter(v => v != null).sort((a,b) => a-b);
  if (!vals.length) return null;
  const n = vals.length;
  const avg = vals.reduce((s,v)=>s+v,0)/n;
  const median = n%2===0 ? (vals[n/2-1]+vals[n/2])/2 : vals[Math.floor(n/2)];
  const q1 = vals[Math.floor(n/4)];
  const q3 = vals[Math.floor(n*3/4)];
  const std = Math.sqrt(vals.reduce((s,v)=>s+(v-avg)**2,0)/n);
  return { n, avg, median, q1, q3, std, min: vals[0], max: vals[n-1], ge10: vals.filter(v=>v>=10).length };
}

function computeEpStats(eleves) {
  const out = {};
  EP_KEYS.forEach(k => {
    const s = computeSubjectStats(eleves, k);
    out[k] = s ?? { avg:0, min:0, max:0, median:0, q1:0, q3:0, std:0, n:0, ge10:0 };
  });
  return out;
}

function computeSpecStats(eleves) {
  const out = {};
  SPEC_KEYS.forEach(k => {
    const s = computeSubjectStats(eleves, k);
    if (s && s.n > 0) out[k] = s;
  });
  return out;
}

// ── Root render ───────────────────────────────────────────────────────────────
function render() {
  document.getElementById("app").innerHTML = `
    <header class="site-header">
      <div class="logo">
        <div class="logo-icon">${EXAM.short}</div>
        <div><h1>Résultats ${EXAM.label} — LFJP Saly</h1><p>Lycée Français Jacques Prévert · ${EXAM.niveau} · Analyse pluriannuelle ${yearRange()}</p></div>
      </div>
      <div style="display:flex; align-items:center; gap:12px">
        <span class="header-badge">${YEARS.length ? `${YEARS[0]} → ${YEARS[YEARS.length-1]}` : ""}</span>
        ${FULL
          ? `<a class="admin-btn logout" href="/__auth/logout" title="Fermer la session"><span class="admin-btn-icon">🔓</span> <span class="admin-btn-text">Se déconnecter</span></a>`
          : `<a class="admin-btn login" href="${PRIVATE_SITE_URL}" target="_blank" rel="noopener" title="Réservé au personnel — connexion Google @lfjpsaly.org"><span class="admin-btn-icon">🔒</span> <span class="admin-btn-text">Espace réservé</span></a>`
        }
      </div>
    </header>
    <nav class="exam-bar">
      ${EXAM_ORDER.map(id => {
        const ex = EXAMS[id];
        return `<button class="exam-btn ${activeExam===id?"active":""}" onclick="window._exam('${id}')">
          <span class="exam-btn-icon">${ex.emoji||""}</span>
          <span class="exam-btn-text"><span class="exam-btn-short">${ex.short}</span><span class="exam-btn-sub">${ex.label}</span></span>
        </button>`;
      }).join("")}
    </nav>
    ${FULL ? `
      <div class="admin-banner">
        🔒 Espace réservé — données nominatives. Ne pas rediffuser.
      </div>
    ` : ""}
    <nav class="tabs-bar">
      ${[["overview","Vue d'ensemble","Vue"],["analysis","Analyse par année","Analyse"],["evolution","Évolution & Comparaison","Évolution"],...(FULL ? [["eleves","Élèves","Élèves"]] : [])].map(([id,label,short]) =>
        `<button class="tab-btn ${activeTab===id?"active":""}" onclick="window._tab('${id}')"><span class="tab-full">${label}</span><span class="tab-short">${short}</span></button>`
      ).join("")}
    </nav>
    <div id="tab-content"></div>
  `;
  renderTab();
}

window._tab = (id) => { activeTab = id; render(); };

function renderTab() {
  const el = document.getElementById("tab-content");
  if      (activeTab === "overview")  el.innerHTML = renderOverview();
  else if (activeTab === "analysis")  el.innerHTML = renderAnalysis();
  else if (activeTab === "evolution") el.innerHTML = renderEvolution();
  else if (activeTab === "eleves" && FULL) el.innerHTML = renderElevesList();
  if (activeTab === "eleves" && FULL)  bindTable();
  if (activeTab === "analysis") bindAnalysis();
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 1 — VUE D'ENSEMBLE
// ═══════════════════════════════════════════════════════════════════════════════
function renderOverview() {
  if (!examHasData()) return emptyState("Vue d'ensemble — " + EXAM.label);

  const ly  = latestDataYear();
  const py  = prevDataYear(ly);
  const s26   = YEAR_STATS[ly];
  const off26 = OFFICIAL_STATS[ly];
  const s25   = py ? YEAR_STATS[py] : null;
  const off25 = py ? OFFICIAL_STATS[py] : null;
  const deltaAvg  = s25 && s25.stats ? (s26.stats.avg - s25.stats.avg).toFixed(2) : null;
  const deltaTaux = off25 ? (off26.taux - off25.taux).toFixed(1) : null;
  const hasSpec   = SPEC_KEYS.length > 0;

  return `<div class="container">
    <div class="kpi-grid">
      ${kpi(off26.total, "Candidats " + ly, "#2563eb", null, "candidats")}
      ${kpi(off26.admis, activeExam === "ea" ? "Moyennes ≥ 10/20 " + ly : "Admis " + ly, "#10b981", null, "admis")}
      ${kpi(off26.taux.toFixed(1)+"%", activeExam === "ea" ? "Taux ≥ 10/20" : "Taux de réussite", "#10b981", deltaTaux!=null ? deltaSign(deltaTaux)+" vs "+py : null, "taux")}
      ${kpi(s26.stats.avg.toFixed(2), "Moyenne générale", "#f59e0b", deltaAvg!=null ? deltaSign(deltaAvg)+" vs "+py : null, "avg")}
      ${kpi(s26.stats.max, "Meilleure note", "#8b5cf6", null, "minmax")}
    </div>

    <div class="card-title" style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;margin-bottom:12px">Résultats par année <span class="info-btn" onclick="window._showHelpModal('yc_overview')">?</span></div>
    <div class="year-cards mb16">${DATA_YEARS.map(y => renderYearCard(y)).join("")}</div>

    ${activeExam === "ea" ? `
      <div class="card mb16">
        <div class="card-title">Distribution des moyennes — ${ly} <span class="info-btn" onclick="window._showHelpModal('histo')">?</span></div>
        ${renderHistogram(YEARS_DATA[ly].eleves)}
      </div>
    ` : `
      <div class="grid-2">
        <div class="card">
          <div class="card-title">Répartition des mentions — ${ly} <span class="info-btn" onclick="window._showHelpModal('mentions')">?</span></div>
          ${renderMentionBars(YEARS_DATA[ly].eleves, off26.total)}
        </div>
        <div class="card">
          <div class="card-title">Distribution des moyennes — ${ly} <span class="info-btn" onclick="window._showHelpModal('histo')">?</span></div>
          ${renderHistogram(YEARS_DATA[ly].eleves)}
        </div>
      </div>
    `}

    <div class="card mb16">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:8px">
        <div class="card-title" style="margin-bottom:0">Épreuves ${ly} <span class="info-btn" onclick="window._showHelpModal('epreuves')">?</span></div>
        ${hasSpec ? `<div class="toggle-container" style="display:flex; background:var(--bg); padding:2px; border-radius:8px">
          <button class="toggle-btn active" id="btn-tronc" onclick="window._toggleOverviewEpreuves('tronc')" style="border:none; padding:4px 10px; font-size:11px; font-weight:600; border-radius:6px; cursor:pointer; background:var(--surface); color:var(--text); box-shadow:var(--shadow)">Tronc commun</button>
          <button class="toggle-btn" id="btn-spe" onclick="window._toggleOverviewEpreuves('spe')" style="border:none; padding:4px 10px; font-size:11px; font-weight:600; border-radius:6px; cursor:pointer; background:transparent; color:var(--muted)">Spécialités</button>
        </div>` : ""}
      </div>
      <div id="overview-epreuves-container" class="ep-grid">
        ${renderEpreuves(YEARS_DATA[ly].eleves)}
      </div>
    </div>

    <div class="card">
      <div class="card-title">Top 5 — Promotion ${ly}</div>
      <div class="top-list">${renderTop5()}</div>
    </div>
  </div>`;
}

function kpi(val, lbl, color, delta=null, helpId=null) {
  const cls = delta ? (delta.startsWith("+") ? "delta-up" : "delta-down") : "";
  return `<div class="kpi-card" style="position:relative">
    ${helpId ? `<span class="info-btn" onclick="window._showHelpModal('${helpId}')" style="position:absolute;top:10px;right:10px;margin:0">?</span>` : ""}
    <div class="kpi-val" style="color:${color}">${val}</div>
    <div class="kpi-lbl">${lbl}</div>
    ${delta ? `<div class="kpi-delta ${cls}">${delta}</div>` : ""}
  </div>`;
}

function deltaSign(v) {
  const n = parseFloat(v);
  return (n >= 0 ? "+" : "") + v;
}

function renderYearCard(y) {
  const d   = YEARS_DATA[y];
  const ys  = YEAR_STATS[y];
  const off = OFFICIAL_STATS[y];
  const m   = ys.mentions;
  const tColor = off.taux >= 95 ? "#10b981" : off.taux >= 85 ? "#f59e0b" : "#ef4444";
  const segs = MENTION_ORDER.filter(k => m[k]>0).map(k =>
    `<div class="mention-mini-seg" style="flex:${m[k]};background:${MENTION_CONFIG[k]?.color||'#ccc'}" title="${MENTION_CONFIG[k]?.label}: ${m[k]}"></div>`
  ).join("");
  return `<div class="year-card">
    <div class="yc-year">${y}</div>
    <div class="yc-total">${off.total}<span style="font-size:13px;color:var(--muted);font-weight:400"> candidats</span></div>
    <div class="yc-taux" style="color:${tColor}">${off.taux.toFixed(1)}% ${activeExam === "ea" ? "≥ 10/20" : "de réussite"}</div>
    <div class="yc-avg">Moy. <strong>${ys.stats.avg.toFixed(2)}/20</strong></div>
    ${activeExam !== "ea" ? `<div class="mention-mini">${segs}</div>` : ""}
  </div>`;
}

function renderMentionBars(eleves, total) {
  const m   = countMentions(eleves);
  const max = Math.max(...MENTION_ORDER.map(k => m[k]||0));
  return MENTION_ORDER.filter(k => (m[k]||0) > 0).map(k => {
    const c = MENTION_CONFIG[k];
    return `<div class="mention-row">
      <div class="mention-dot" style="background:${c.color}"></div>
      <span class="mention-name">${c.label}</span>
      <div class="mention-bar-wrap"><div class="mention-bar" style="width:${(m[k]/max*100).toFixed(0)}%;background:${c.color}"></div></div>
      <span class="mention-count">${m[k]}</span>
      <span class="mention-pct">${(m[k]/total*100).toFixed(0)}%</span>
    </div>`;
  }).join("");
}

function renderHistogram(eleves) {
  const bins = [
    {l:"<10", mn:0,mn2:10},{l:"10–11",mn:10,mn2:11},{l:"11–12",mn:11,mn2:12},
    {l:"12–13",mn:12,mn2:13},{l:"13–14",mn:13,mn2:14},{l:"14–15",mn:14,mn2:15},
    {l:"15–16",mn:15,mn2:16},{l:"16–17",mn:16,mn2:17},{l:"17–18",mn:17,mn2:18},{l:"≥18",mn:18,mn2:99},
  ];
  const cols = ["#ef4444","#9ca3af","#9ca3af","#8b5cf6","#8b5cf6","#3b82f6","#3b82f6","#10b981","#10b981","#f59e0b"];
  const counts = bins.map(b => eleves.filter(e => e.score >= b.mn && e.score < b.mn2).length);
  const maxC = Math.max(...counts);
  return `<div class="histo">${bins.map((b,i) => `
    <div class="histo-col">
      <div class="histo-val" style="color:${cols[i]}">${counts[i]||""}</div>
      <div class="histo-bar" style="height:${Math.max(4,counts[i]/maxC*80)}px;background:${cols[i]}"></div>
      <div class="histo-lbl">${b.l}</div>
    </div>`).join("")}</div>`;
}

function renderEpreuves(eleves) {
  return EP_KEYS.map((k, i) => {
    const vals = eleves.map(e => e[k]).filter(v=>v!=null);
    if (!vals.length) return "";
    const a = (vals.reduce((s,v)=>s+v,0)/vals.length).toFixed(2);
    return `<div class="ep-card">
      <div class="ep-name">${EP_LABELS[i]}</div>
      <div class="ep-score" style="color:${EP_COLORS[i]}">${a}<span>/20</span></div>
      <div class="ep-sub">Min ${Math.min(...vals)} · Max ${Math.max(...vals)}</div>
      <div class="ep-bar-bg"><div class="ep-bar-fill" style="width:${a/20*100}%;background:${EP_COLORS[i]}"></div></div>
    </div>`;
  }).join("");
}

function renderTop5() {
  const top = [...YEARS_DATA[latestDataYear()].eleves].sort((a,b) => b.score-a.score).slice(0,5);
  const medals = ["🥇","🥈","🥉","4","5"];
  return top.map((e,i) => {
    const mk = getMentionKey(e.resultat);
    const mc = MENTION_CONFIG[mk];
    // Site public : pas de nom — on affiche un rang anonyme. Build complet : nom réel.
    const name = FULL ? (() => { const d = getStudentDisplayName(e); return `${d.prenom} ${d.nom}`; })()
                      : (i === 0 ? "1ʳᵉ moyenne" : `${i + 1}ᵉ moyenne`);
    return `<div class="top-item">
      <div class="top-rank">${medals[i]}</div>
      <div class="top-info">
        <div class="top-name">${name}</div>
        ${activeExam !== "ea" ? `<div class="top-mention"><span class="badge" style="background:${mc.bg};color:${mc.text}">${mc.short}</span></div>` : ""}
      </div>
      <div class="top-score" style="color:${scoreColor(e.score)}">${e.score}<span style="font-size:12px;color:var(--muted)">/20</span></div>
    </div>`;
  }).join("");
}

function renderCcVsEpComparison(year) {
  if (year !== 2026) return "";
  const stats = YEAR_STATS[year];
  if (!stats || !stats.subAverages) return "";

  const data = [
    {
      label: "Français",
      cc: stats.subAverages.cc.francais,
      ep: stats.subAverages.ep.francais,
      color: "#2563eb"
    },
    {
      label: "Mathématiques",
      cc: stats.subAverages.cc.maths,
      ep: stats.subAverages.ep.maths,
      color: "#1d4ed8"
    },
    {
      label: "Histoire-Géo · EMC",
      cc: (stats.subAverages.cc.hg + stats.subAverages.cc.emc) / 2.0,
      ep: stats.epStats.hg_emc.avg,
      color: "#8b5cf6"
    },
    {
      label: "Sciences",
      cc: (stats.subAverages.cc.svt + stats.subAverages.cc.phys + stats.subAverages.cc.techno) / 3.0,
      ep: stats.subAverages.ep.sciences,
      color: "#16a34a"
    }
  ];

  return `
    <div class="card mb16">
      <div class="card-title">Comparatif Contrôle Continu vs Épreuves Ponctuelles — ${year} <span class="info-btn" onclick="window._showHelpModal('cc_vs_ep')">?</span></div>
      <div style="display:flex; flex-direction:column; gap:20px; margin-top:12px">
        ${data.map(d => {
          const diff = d.ep - d.cc;
          const diffSign = diff >= 0 ? "+" : "";
          const diffColor = diff >= 0 ? "var(--green)" : "var(--red)";
          const ccPct = (d.cc / 20 * 100).toFixed(1);
          const epPct = (d.ep / 20 * 100).toFixed(1);
          return `
            <div style="border-bottom:1px solid var(--border); padding-bottom:12px">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px">
                <span style="font-size:13px; font-weight:700; color:var(--text)">${d.label}</span>
                <span style="font-size:11px; font-weight:700; color:${diffColor}; background:rgba(0,0,0,0.05); padding:2px 6px; border-radius:4px">
                  Différence: ${diffSign}${diff.toFixed(2)} pts
                </span>
              </div>
              <div style="display:flex; flex-direction:column; gap:8px">
                <div style="display:grid; grid-template-columns: 120px 1fr 50px; align-items:center; gap:12px">
                  <span style="font-size:11px; color:var(--muted)">Contrôle Continu</span>
                  <div style="height:10px; background:var(--bg); border-radius:5px; overflow:hidden">
                    <div style="height:100%; width:${ccPct}%; background:#0891b2; border-radius:5px; opacity:0.8"></div>
                  </div>
                  <span style="font-size:11px; font-weight:700; text-align:right; color:#0891b2">${d.cc.toFixed(2)}</span>
                </div>
                <div style="display:grid; grid-template-columns: 120px 1fr 50px; align-items:center; gap:12px">
                  <span style="font-size:11px; color:var(--muted)">Épreuve Écrite/EP</span>
                  <div style="height:10px; background:var(--bg); border-radius:5px; overflow:hidden">
                    <div style="height:100%; width:${epPct}%; background:${d.color}; border-radius:5px; opacity:0.8"></div>
                  </div>
                  <span style="font-size:11px; font-weight:700; text-align:right; color:${d.color}">${d.ep.toFixed(2)}</span>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 2 — ANALYSE PAR ANNÉE (avec sélecteur)
// ═══════════════════════════════════════════════════════════════════════════════
function renderAnalysis() {
  const y      = analysisYear;
  const yearSelector = `<div class="year-selector">
      ${YEARS.map(yr => `<button class="year-btn ${yr===y?"active":""}" onclick="window._analysisYear(${yr})">${yr}</button>`).join("")}
    </div>`;

  if (!yearHasData(y)) {
    return `<div class="container">${yearSelector}<div class="card" style="text-align:center;padding:40px 24px">
      <div style="font-size:36px;margin-bottom:10px">📊</div>
      <div style="font-size:15px;font-weight:700;margin-bottom:6px">Aucune donnée pour ${y}</div>
      <div style="font-size:13px;color:var(--muted)">Les résultats de l'examen «&nbsp;${EXAM.label}&nbsp;» pour cette promotion seront ajoutés prochainement.</div>
    </div></div>`;
  }

  const eleves = YEARS_DATA[y].eleves.filter(e => e.score != null);
  const st     = YEAR_STATS[y].stats;
  const off    = OFFICIAL_STATS[y];

  return `<div class="container">
    ${yearSelector}

    <div class="grid-2 mb16">
      <div class="card">
        <div class="card-title">Statistiques descriptives — Promotion ${y}</div>
        <div class="stat-grid">
          ${statBox(st.avg.toFixed(2), "Moyenne /20", "#2563eb", "avg")}
          ${statBox(st.median.toFixed(2), "Médiane /20", "#10b981", "median")}
          ${statBox(st.std.toFixed(2), "Écart-type", "#8b5cf6", "std")}
          ${statBox(st.min, "Note minimale", "#ef4444", "minmax")}
          ${statBox(st.q1.toFixed(2), "1er quartile Q1", "#6b7280", "quartiles")}
          ${statBox(st.q3.toFixed(2), "3e quartile Q3", "#f59e0b", "quartiles")}
          ${statBox(st.max, "Note maximale", "#f59e0b", "minmax")}
          ${statBox((st.q3-st.q1).toFixed(2), "Étendue inter-Q", "#6b7280", "iqr")}
          ${statBox(off.total, "Candidats total", "#2563eb", "candidats")}
        </div>
        <div class="card-title" style="margin-top:16px">Boîte à moustaches <span class="info-btn" onclick="window._showHelpModal('boxplot')">?</span></div>
        ${renderBoxPlot(st, 0, 20)}
      </div>

      <div class="card">
        <div class="card-title">Distribution des notes — ${y} <span class="info-btn" onclick="window._showHelpModal('histo')">?</span></div>
        ${renderHistogram(eleves)}
        <div class="card-note">Répartition des ${eleves.length} candidats par tranche de note</div>
        ${activeExam !== "ea" ? `
          <div class="card-title" style="margin-top:16px">Répartition des mentions <span class="info-btn" onclick="window._showHelpModal('mentions')">?</span></div>
          ${renderMentionBars(eleves, off.total)}
        ` : ""}
      </div>
    </div>

    <div class="card mb16">
      <div class="card-title">Statistiques détaillées par épreuve — ${y} <span class="info-btn" onclick="window._showHelpModal('stats_details')">?</span></div>
      <div style="display:flex;flex-direction:column;gap:12px">${renderEpreuvesFullStats(eleves)}</div>
    </div>

    ${renderCcVsEpComparison(y)}

    ${SPEC_YEARS.includes(y) ? `<div class="card mb16">
      <div class="card-title">Enseignements de spécialité — ${y} <span class="info-btn" onclick="window._showHelpModal('spec_compare')">?</span></div>
      ${renderSpecStats(y)}
    </div>` : ''}

    <div class="card mb16">
      <div class="card-title">Corrélations avec la moyenne générale — ${y} <span class="info-btn" onclick="window._showHelpModal('correlation')">?</span></div>
      ${renderCorrelations(eleves)}
    </div>

    <div class="card">
      <div class="card-title">Analyse des tranches de performance — ${y} <span class="info-btn" onclick="window._showHelpModal('tranches')">?</span></div>
      ${renderTranches(eleves)}
    </div>
  </div>`;
}

function bindAnalysis() {
  window._analysisYear = (y) => {
    analysisYear = y;
    document.getElementById("tab-content").innerHTML = renderAnalysis();
    bindAnalysis();
  };
}

function statBox(val, lbl, color, helpId=null) {
  return `<div class="stat-box" style="position:relative">
    ${helpId ? `<span class="info-btn" onclick="window._showHelpModal('${helpId}')" style="position:absolute;top:6px;right:6px;margin:0;width:12px;height:12px;font-size:8px">?</span>` : ""}
    <div class="stat-val" style="color:${color}">${val}</div>
    <div class="stat-lbl">${lbl}</div>
  </div>`;
}

function renderBoxPlot(st, domMin, domMax) {
  const range = domMax - domMin;
  const pct = v => ((v - domMin) / range * 100).toFixed(1);
  const labels = [domMin, 5, 10, 15, 20];
  return `<div class="boxplot-wrap">
    <div style="position:relative;height:50px;margin:0 8px">
      <div style="position:absolute;top:22px;left:${pct(st.min)}%;right:${100-pct(st.max)}%;height:2px;background:#d1d5db"></div>
      <div style="position:absolute;top:12px;left:${pct(st.q1)}%;width:${pct(st.q3)-pct(st.q1)}%;height:22px;background:#dbeafe;border:2px solid #2563eb;border-radius:3px"></div>
      <div style="position:absolute;top:12px;left:${pct(st.median)}%;width:2px;height:22px;background:#ef4444"></div>
      <div style="position:absolute;top:16px;left:${pct(st.min)}%;width:2px;height:14px;background:#9ca3af"></div>
      <div style="position:absolute;top:16px;left:${pct(st.max)}%;width:2px;height:14px;background:#9ca3af"></div>
      <div style="position:absolute;top:36px;left:${pct(st.min)}%;transform:translateX(-50%);font-size:9px;color:#6b7280">${st.min}</div>
      <div style="position:absolute;top:36px;left:${pct(st.q1)}%;transform:translateX(-50%);font-size:9px;color:#2563eb">${st.q1.toFixed(1)}</div>
      <div style="position:absolute;top:2px;left:${pct(st.median)}%;transform:translateX(-50%);font-size:9px;color:#ef4444;font-weight:700">med ${st.median.toFixed(1)}</div>
      <div style="position:absolute;top:36px;left:${pct(st.q3)}%;transform:translateX(-50%);font-size:9px;color:#2563eb">${st.q3.toFixed(1)}</div>
      <div style="position:absolute;top:36px;left:${pct(st.max)}%;transform:translateX(-50%);font-size:9px;color:#6b7280">${st.max}</div>
    </div>
    <div class="boxplot-axis">${labels.map(l=>`<span>${l}</span>`).join("")}</div>
  </div>`;
}

function miniStat(lbl, val, color) {
  return `<div style="text-align:center;background:var(--surface);border-radius:6px;padding:8px 4px">
    <div style="font-size:14px;font-weight:700;color:${color}">${val}</div>
    <div style="font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:.3px;margin-top:2px">${lbl}</div>
  </div>`;
}

function renderEpreuvesFullStats(eleves) {
  return EP_KEYS.map((k, i) => {
    const s = computeSubjectStats(eleves, k);
    if (!s) return "";
    return `<div style="background:var(--bg);border-radius:10px;padding:16px 18px">
      <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:14px">
        <div style="font-size:10px;font-weight:700;color:${EP_COLORS[i]};text-transform:uppercase;letter-spacing:.5px;flex:1">${EP_LABELS[i]}</div>
        <div style="font-size:22px;font-weight:800;color:${EP_COLORS[i]}">${s.avg.toFixed(2)}<span style="font-size:12px;font-weight:400;color:var(--muted)">/20</span></div>
      </div>
      <div class="ep-mini-grid">
        ${miniStat('Médiane', s.median.toFixed(2), EP_COLORS[i])}
        ${miniStat('Éc.-type', s.std.toFixed(2), '#6b7280')}
        ${miniStat('Q1', s.q1.toFixed(1), '#3b82f6')}
        ${miniStat('Q3', s.q3.toFixed(1), '#3b82f6')}
        ${miniStat('Min', s.min, '#ef4444')}
        ${miniStat('Max', s.max, '#10b981')}
        ${miniStat('≥10/20', `${s.ge10}/${s.n}`, EP_COLORS[i])}
        ${miniStat('Taux', `${(s.ge10/s.n*100).toFixed(0)}%`, s.ge10/s.n>=.8?'#10b981':'#f59e0b')}
      </div>
      ${renderBoxPlot(s, 0, 20)}
    </div>`;
  }).join("");
}

function renderSpecStats(year) {
  const ss = YEAR_STATS[year].specStats;
  const keys = SPEC_KEYS.filter(k => ss[k]);
  if (!keys.length) return `<p style="color:var(--muted);font-size:12px">Aucune donnée de spécialité disponible.</p>`;
  return renderSpecAveragesChart(year) + `<div style="display:flex;flex-direction:column;gap:12px">` +
    keys.map(k => {
      const i = SPEC_KEYS.indexOf(k);
      const s = ss[k];
      return `<div style="background:var(--bg);border-radius:10px;padding:16px 18px">
        <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:14px">
          <div style="font-size:10px;font-weight:700;color:${SPEC_COLORS[i]};text-transform:uppercase;letter-spacing:.5px;flex:1">${SPEC_LABELS[i]}</div>
          <div style="font-size:11px;color:var(--muted)">${s.n} élève${s.n>1?'s':''}</div>
          <div style="font-size:22px;font-weight:800;color:${SPEC_COLORS[i]}">${s.avg.toFixed(2)}<span style="font-size:12px;font-weight:400;color:var(--muted)">/20</span></div>
        </div>
        <div class="ep-mini-grid">
          ${miniStat('Médiane', s.median.toFixed(1), SPEC_COLORS[i])}
          ${miniStat('Éc.-type', s.std.toFixed(2), '#6b7280')}
          ${miniStat('Q1', s.q1.toFixed(1), '#3b82f6')}
          ${miniStat('Q3', s.q3.toFixed(1), '#3b82f6')}
          ${miniStat('Min', s.min, '#ef4444')}
          ${miniStat('Max', s.max, '#10b981')}
          ${miniStat('≥10/20', `${s.ge10}/${s.n}`, SPEC_COLORS[i])}
          ${miniStat('Taux', `${(s.ge10/s.n*100).toFixed(0)}%`, s.ge10/s.n>=.8?'#10b981':'#f59e0b')}
        </div>
        ${renderBoxPlot(s, 0, 20)}
      </div>`;
    }).join('') + '</div>';
}

function renderSpecComparison() {
  const keys = SPEC_KEYS.filter(k => SPEC_YEARS.some(y => YEAR_STATS[y].specStats[k]));
  if (!keys.length) return '';
  return `<div class="ep-year-grid">` +
    keys.map(k => {
      const i = SPEC_KEYS.indexOf(k);
      const data = SPEC_YEARS.map(y => ({ y, s: YEAR_STATS[y].specStats[k] })).filter(d => d.s);
      const maxAvg = Math.max(...data.map(d => d.s.avg));
      return `<div class="card" style="margin-bottom:0">
        <div class="card-title" style="color:${SPEC_COLORS[i]}">${SPEC_LABELS[i]}</div>
        <div style="display:flex;align-items:flex-end;gap:6px;height:70px;margin-bottom:4px">
          ${data.map((d, j) => {
            const h = Math.max(8, Math.round(d.s.avg/maxAvg*58));
            return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:2px;height:100%">
              <div style="font-size:9px;font-weight:700;color:${SPEC_COLORS[i]}">${d.s.avg.toFixed(1)}</div>
              <div style="width:80%;height:${h}px;background:${SPEC_COLORS[i]};border-radius:3px 3px 0 0;opacity:${data.length > 1 ? (0.4 + j * (0.6 / (data.length - 1))).toFixed(2) : 1.0}"></div>
            </div>`;
          }).join('')}
        </div>
        <div style="display:flex;gap:6px;margin-bottom:12px">
          ${data.map(d => `<div style="flex:1;text-align:center;font-size:9px;color:var(--muted);font-weight:600">${d.y}</div>`).join('')}
        </div>
        <table style="width:100%;font-size:11px;border-collapse:collapse">
          <thead><tr>
            <th style="text-align:left;padding:4px 6px;color:var(--muted);font-size:10px;border-bottom:1px solid var(--border)">Année</th>
            <th style="text-align:center;padding:4px 6px;color:var(--muted);font-size:10px;border-bottom:1px solid var(--border)">n</th>
            <th style="text-align:center;padding:4px 6px;color:var(--muted);font-size:10px;border-bottom:1px solid var(--border)">Moy.</th>
            <th style="text-align:center;padding:4px 6px;color:var(--muted);font-size:10px;border-bottom:1px solid var(--border)">σ</th>
            <th style="text-align:center;padding:4px 6px;color:var(--muted);font-size:10px;border-bottom:1px solid var(--border)">≥10%</th>
          </tr></thead>
          <tbody>
            ${data.map(d => `<tr>
              <td style="padding:4px 6px;font-weight:700;color:${YEAR_COLORS[d.y]};border-bottom:1px solid var(--border)">${d.y}</td>
              <td style="padding:4px 6px;text-align:center;color:var(--muted);border-bottom:1px solid var(--border)">${d.s.n}</td>
              <td style="padding:4px 6px;text-align:center;font-weight:700;color:${SPEC_COLORS[i]};border-bottom:1px solid var(--border)">${d.s.avg.toFixed(2)}</td>
              <td style="padding:4px 6px;text-align:center;color:var(--muted);border-bottom:1px solid var(--border)">${d.s.std.toFixed(2)}</td>
              <td style="padding:4px 6px;text-align:center;border-bottom:1px solid var(--border);color:${d.s.ge10/d.s.n>=.8?'#10b981':'#f59e0b'}">${(d.s.ge10/d.s.n*100).toFixed(0)}%</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
    }).join('') + '</div>';
}

function renderCorrelations(eleves) {
  return `<div class="corr-grid">` +
    EP_KEYS.map((k, i) => {
      const pairs = eleves.filter(e=>e[k]!=null && e.score!=null).map(e=>({x:e[k],y:e.score}));
      if (pairs.length < 2) return ""; // épreuve sans données pour cette promotion
      const xAvg  = pairs.reduce((a,b)=>a+b.x,0)/pairs.length;
      const yAvg  = pairs.reduce((a,b)=>a+b.y,0)/pairs.length;
      const num   = pairs.reduce((a,b)=>a+(b.x-xAvg)*(b.y-yAvg),0);
      const dx    = Math.sqrt(pairs.reduce((a,b)=>a+(b.x-xAvg)**2,0));
      const dy    = Math.sqrt(pairs.reduce((a,b)=>a+(b.y-yAvg)**2,0));
      const rNum  = dx && dy ? num/(dx*dy) : 0;
      const r     = rNum.toFixed(3);
      const rColor = rNum >= .7 ? "#10b981" : rNum >= .4 ? "#f59e0b" : "#ef4444";
      const strength = rNum >= .7 ? "Forte corrélation" : rNum >= .4 ? "Corrélation modérée" : "Corrélation faible";
      return `<div class="ep-card">
        <div class="ep-name">${EP_LABELS[i]}</div>
        <div class="ep-score" style="color:${rColor}">r = ${r}</div>
        <div class="ep-sub">${strength}</div>
        <div class="ep-bar-bg"><div class="ep-bar-fill" style="width:${Math.abs(rNum)*100}%;background:${rColor}"></div></div>
      </div>`;
    }).join("") +
    `</div>
    <p class="card-note">r = coefficient de corrélation de Pearson entre la note à l'épreuve et la moyenne générale du candidat</p>`;
}

function renderTranches(eleves) {
  const tranches = activeExam === "ea" ? [
    {l:"Excellence (≥16)",  min:16, max:99, color:"#f59e0b"},
    {l:"Très bien (14–16)", min:14, max:16, color:"#10b981"},
    {l:"Bien (12–14)",      min:12, max:14, color:"#3b82f6"},
    {l:"Satisfaisant (10–12)",  min:10, max:12, color:"#8b5cf6"},
    {l:"Fragile (<10)",       min:0,  max:10, color:"#ef4444"},
  ] : [
    {l:"Excellence (≥16)",  min:16, max:99, color:"#f59e0b"},
    {l:"Très bien (14–16)", min:14, max:16, color:"#10b981"},
    {l:"Bien (12–14)",      min:12, max:14, color:"#3b82f6"},
    {l:"Passable (10–12)",  min:10, max:12, color:"#8b5cf6"},
    {l:"Échec (<10)",       min:0,  max:10, color:"#ef4444"},
  ];
  const total = eleves.length;
  return `<div style="display:flex;flex-direction:column;gap:8px">` +
    tranches.map(t => {
      const n = eleves.filter(e => {
        if (e.score==null) return false;
        return t.max===99 ? e.score>=t.min : e.score>=t.min && e.score<t.max;
      }).length;
      const pct = (n/total*100).toFixed(1);
      return `<div class="tranche-row">
        <div class="tranche-label" style="color:${t.color}">${t.l}</div>
        <div style="flex:1;height:10px;background:var(--bg);border-radius:5px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:${t.color};border-radius:5px"></div>
        </div>
        <div style="width:30px;font-weight:700">${n}</div>
        <div style="width:40px;color:var(--muted);font-size:11px">${pct}%</div>
      </div>`;
    }).join("") + `</div>`;
}

function renderEpreuvesParAnnee() {
  return `<div class="ep-year-grid">` +
    epIdxsWithData().map((i) => {
      const k = EP_KEYS[i];
      const yrs = DATA_YEARS.filter(y => epActiveYear(i, y) && YEAR_STATS[y].epStats[k].n > 0);
      const avgs = yrs.map(y => YEAR_STATS[y].epStats[k].avg);
      const maxAvg = Math.max(...avgs);
      return `<div class="card" style="margin-bottom:0">
        <div class="card-title" style="color:${EP_COLORS[i]}">${EP_LABELS[i]}</div>
        <div style="display:flex;align-items:flex-end;gap:4px;height:70px;margin-bottom:4px">
          ${yrs.map((y, j) => {
            const h = Math.max(8, Math.round(avgs[j]/maxAvg*58));
            return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:2px;height:100%">
              <div style="font-size:9px;font-weight:700;color:${EP_COLORS[i]}">${avgs[j].toFixed(1)}</div>
              <div style="width:80%;height:${h}px;background:${EP_COLORS[i]};border-radius:3px 3px 0 0;opacity:${(0.45+j*0.14).toFixed(2)}"></div>
            </div>`;
          }).join('')}
        </div>
        <div style="display:flex;gap:4px;margin-bottom:12px">
          ${yrs.map(y => `<div style="flex:1;text-align:center;font-size:9px;color:var(--muted);font-weight:600">${y}</div>`).join('')}
        </div>
        <table style="width:100%;font-size:11px;border-collapse:collapse">
          <thead><tr>
            <th style="text-align:left;padding:5px 6px;color:var(--muted);font-size:10px;border-bottom:1px solid var(--border)">Année</th>
            <th style="text-align:center;padding:5px 6px;color:var(--muted);font-size:10px;border-bottom:1px solid var(--border)">Moy.</th>
            <th style="text-align:center;padding:5px 6px;color:var(--muted);font-size:10px;border-bottom:1px solid var(--border)">σ</th>
            <th style="text-align:center;padding:5px 6px;color:var(--muted);font-size:10px;border-bottom:1px solid var(--border)">Méd.</th>
            <th style="text-align:center;padding:5px 6px;color:var(--muted);font-size:10px;border-bottom:1px solid var(--border)">≥10%</th>
          </tr></thead>
          <tbody>
            ${yrs.map(y => {
              const s = YEAR_STATS[y].epStats[k];
              return `<tr>
                <td style="padding:5px 6px;font-weight:700;color:${YEAR_COLORS[y]};border-bottom:1px solid var(--border)">${y}</td>
                <td style="padding:5px 6px;text-align:center;font-weight:700;color:${EP_COLORS[i]};border-bottom:1px solid var(--border)">${s.avg.toFixed(2)}</td>
                <td style="padding:5px 6px;text-align:center;color:var(--muted);border-bottom:1px solid var(--border)">${s.std.toFixed(2)}</td>
                <td style="padding:5px 6px;text-align:center;color:var(--muted);border-bottom:1px solid var(--border)">${s.median.toFixed(1)}</td>
                <td style="padding:5px 6px;text-align:center;border-bottom:1px solid var(--border);color:${s.ge10/s.n>=.8?'#10b981':'#f59e0b'}">${(s.ge10/s.n*100).toFixed(0)}%</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
    }).join('') + '</div>';
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 3 — ÉVOLUTION PLURIANNUELLE
// ═══════════════════════════════════════════════════════════════════════════════
function renderEvolution() {
  if (!examHasData()) return emptyState("Évolution & comparaison — " + EXAM.label);
  return `<div class="container">
    <div class="card mb16">
      <div class="card-title">${activeExam === "ea" ? "Évolution du taux ≥ 10/20" : "Évolution du taux de réussite"} — ${yearRange()} <span class="info-btn" onclick="window._showHelpModal('taux')">?</span></div>
      ${renderTauxChart()}
    </div>

    ${activeExam !== "ea" ? `
    <div class="card mb16">
      <div class="card-title">Répartition des mentions par année <span class="info-btn" onclick="window._showHelpModal('mentions')">?</span></div>
      ${renderMentionsComparison()}
    </div>
    ` : ""}

    <div class="card mb16">
      <div class="card-title">Évolution de la moyenne générale — ${yearRange()} <span class="info-btn" onclick="window._showHelpModal('avg')">?</span></div>
      ${renderAvgEvolution()}
    </div>

    <div class="card mb16">
      <div class="card-title">Comparaison des épreuves terminales — toutes promotions <span class="info-btn" onclick="window._showHelpModal('epreuves_compare')">?</span></div>
      ${renderEpreuvesComparison()}
    </div>

    <div class="card mb16">
      <div class="card-title">Évolution par matière — statistiques ${yearRange()} <span class="info-btn" onclick="window._showHelpModal('stats_details')">?</span></div>
      ${renderEpreuvesParAnnee()}
    </div>

    ${SPEC_KEYS.length > 0 ? `
    <div class="card mb16">
      <div class="card-title">Spécialités — comparaison des promotions <span class="info-btn" onclick="window._showHelpModal('spec_compare')">?</span></div>
      ${renderSpecComparison()}
    </div>
    ` : ""}

    <div class="card">
      <div class="card-title">Distributions comparées — boîtes à moustaches <span class="info-btn" onclick="window._showHelpModal('boxplot')">?</span></div>
      ${renderBoxplotsComparison()}
    </div>
  </div>`;
}

function renderTauxChart() {
  const data = DATA_YEARS.map(y => ({ y, taux: OFFICIAL_STATS[y].taux, admis: OFFICIAL_STATS[y].admis, total: OFFICIAL_STATS[y].total }));
  return `<div style="display:flex;align-items:flex-end;gap:24px;height:160px;padding:0 24px;margin-top:8px">` +
    data.map(d => {
      const h   = Math.max(4, d.taux/100*120);
      const col = d.taux>=95?"#10b981":d.taux>=85?"#f59e0b":"#ef4444";
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex:1">
        <div style="font-size:13px;font-weight:700;color:${col}">${d.taux.toFixed(1)}%</div>
        <div style="width:100%;max-width:52px;height:${h}px;background:${col};border-radius:6px 6px 0 0"></div>
        <div style="font-size:12px;font-weight:700;color:var(--muted)">${d.y}</div>
        <div style="font-size:10px;color:var(--muted)">${d.admis}/${d.total}</div>
      </div>`;
    }).join("") + `</div>`;
}

function renderMentionsComparison() {
  const active = MENTION_ORDER.filter(k => DATA_YEARS.some(y => YEAR_STATS[y].mentions[k] > 0));
  return `<div style="display:flex;flex-direction:column;gap:12px;margin-top:8px">` +
    DATA_YEARS.map(y => {
      const m     = YEAR_STATS[y].mentions;
      const total = OFFICIAL_STATS[y].total;
      const segs  = active.map(k => {
        const n = m[k]||0;
        const c = MENTION_CONFIG[k];
        return n > 0
          ? `<div title="${c.label}: ${n} (${(n/total*100).toFixed(0)}%)" style="flex:${n};background:${c.color};height:100%;min-width:2px"></div>`
          : "";
      }).join("");
      return `<div style="display:flex;align-items:center;gap:12px">
        <div style="width:38px;font-size:12px;font-weight:700;color:var(--muted)">${y}</div>
        <div style="flex:1;height:28px;background:var(--bg);border-radius:6px;overflow:hidden;display:flex">${segs}</div>
        <div style="font-size:11px;color:var(--muted);width:70px">${total} candidats</div>
      </div>`;
    }).join("") +
    `</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:14px">` +
    active.map(k => {
      const c = MENTION_CONFIG[k];
      return `<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--muted)">
        <div style="width:10px;height:10px;border-radius:3px;background:${c.color}"></div>${c.label}
      </div>`;
    }).join("") + `</div>`;
}

function renderAvgEvolution() {
  const cols = ["#9ca3af","#6b7280","#8b5cf6","#3b82f6","#2563eb","#1d4ed8"];
  return `<div class="avg-grid">` +
    DATA_YEARS.map((y,i) => {
      const st = YEAR_STATS[y].stats;
      return `<div style="text-align:center;padding:16px;background:var(--bg);border-radius:10px">
        <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.5px">${y}</div>
        <div style="font-size:28px;font-weight:800;margin:8px 0;color:${cols[i] || "#2563eb"}">${st.avg.toFixed(2)}</div>
        <div style="font-size:10px;color:var(--muted)">σ = ${st.std.toFixed(2)}</div>
        <div style="font-size:10px;color:var(--muted)">Mé = ${st.median.toFixed(2)}</div>
      </div>`;
    }).join("") + `</div>`;
}

function renderEpreuvesComparison() {
  const yrs = DATA_YEARS;
  const n = yrs.map(y => YEARS_DATA[y].eleves.length);
  const first = yrs[0], last = yrs[yrs.length - 1];
  const last2 = String(first).slice(2) + "→" + String(last).slice(2);
  const genFirst = YEAR_STATS[first].stats ? YEAR_STATS[first].stats.avg : 0;
  const genLast  = YEAR_STATS[last].stats  ? YEAR_STATS[last].stats.avg  : 0;
  return `<div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-size:12px">
      <thead>
        <tr>
          <th style="padding:8px 12px;text-align:left;font-weight:700;color:var(--muted);text-transform:uppercase;font-size:10px;border-bottom:2px solid var(--border)">Épreuve</th>
          ${yrs.map((y,i) => `<th style="padding:8px 12px;text-align:center;font-weight:700;color:${YEAR_COLORS[y]};border-bottom:2px solid var(--border)">${y}<br><span style="font-size:9px;font-weight:400">n=${n[i]}</span></th>`).join("")}
          <th style="padding:8px 12px;text-align:center;font-weight:700;color:#10b981;border-bottom:2px solid var(--border)">Δ ${last2}</th>
        </tr>
      </thead>
      <tbody>
        ${epIdxsWithData().map((i) => {
          const k = EP_KEYS[i];
          const active = yrs.filter(y => epActiveYear(i, y) && YEAR_STATS[y].epStats[k].n > 0);
          const aFirst = active[0], aLast = active[active.length - 1];
          const delta = (YEAR_STATS[aLast].epStats[k].avg - YEAR_STATS[aFirst].epStats[k].avg).toFixed(2);
          const dColor = parseFloat(delta)>=0?"#10b981":"#ef4444";
          return `<tr>
            <td style="padding:9px 12px;font-weight:600;border-bottom:1px solid var(--border)">${EP_LABELS[i]}</td>
            ${yrs.map((y) => {
              const col = YEAR_COLORS[y];
              const s = YEAR_STATS[y].epStats[k];
              const cell = (epActiveYear(i, y) && s.n > 0) ? s.avg.toFixed(2) : "—";
              return `<td style="padding:9px 12px;text-align:center;font-weight:700;color:${col};border-bottom:1px solid var(--border)">${cell}</td>`;
            }).join("")}
            <td style="padding:9px 12px;text-align:center;font-weight:700;color:${dColor};border-bottom:1px solid var(--border)">${active.length>1?(parseFloat(delta)>=0?"+":"")+delta:"—"}</td>
          </tr>`;
        }).join("")}
        <tr style="background:var(--bg)">
          <td style="padding:9px 12px;font-weight:700">Moyenne générale</td>
          ${yrs.map((y) => {
            const col = YEAR_COLORS[y];
            const av = YEAR_STATS[y].stats ? YEAR_STATS[y].stats.avg : 0;
            return `<td style="padding:9px 12px;text-align:center;font-weight:700;color:${col}">${av.toFixed(2)}</td>`;
          }).join("")}
          <td style="padding:9px 12px;text-align:center;font-weight:700;color:${(genLast-genFirst)>=0?"#10b981":"#ef4444"}">
            ${(genLast-genFirst)>=0?"+":""}${(genLast-genFirst).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>`;
}

function renderBoxplotsComparison() {
  return `<div style="display:flex;flex-direction:column;gap:20px;margin-top:8px">` +
    DATA_YEARS.map(y => {
      const st = YEAR_STATS[y].stats;
      return `<div style="display:flex;align-items:center;gap:16px">
        <div style="width:38px;font-size:12px;font-weight:700;color:${YEAR_COLORS[y]}">${y}</div>
        <div style="flex:1">${renderBoxPlot(st, 0, 20)}</div>
        <div style="width:80px;font-size:11px;color:var(--muted);text-align:right">n=${st.n}<br>σ=${st.std.toFixed(2)}</div>
      </div>`;
    }).join("") +
    `</div>
    <div style="display:flex;gap:16px;margin-top:14px;font-size:11px;color:var(--muted)">
      <span style="display:flex;align-items:center;gap:4px"><span style="display:inline-block;width:12px;height:12px;background:#dbeafe;border:2px solid #2563eb;border-radius:2px"></span>Zone Q1–Q3</span>
      <span style="display:flex;align-items:center;gap:4px"><span style="display:inline-block;width:2px;height:12px;background:#ef4444"></span>Médiane</span>
      <span style="display:flex;align-items:center;gap:4px"><span style="display:inline-block;width:12px;height:2px;background:#9ca3af"></span>Min/Max</span>
    </div>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 4 — LISTE DES ÉLÈVES (toutes années)
// ═══════════════════════════════════════════════════════════════════════════════
function renderElevesList() {
  const eleves = YEARS_DATA[eleveYear].eleves;
  const showSpec = SPEC_KEYS.length > 0 && SPEC_YEARS.includes(eleveYear);
  const showOpt  = EXAM.optField && SPEC_YEARS.includes(eleveYear);
  const yearSelector = `<div class="year-selector">
      ${YEARS.map(y => `<button class="year-btn ${y===eleveYear?"active":""}" onclick="window._eleveYear(${y})">${y}</button>`).join("")}
    </div>`;

  if (!eleves.length) {
    return `<div class="container">${yearSelector}<div class="card" style="text-align:center;padding:40px 24px">
      <div style="font-size:36px;margin-bottom:10px">📋</div>
      <div style="font-size:15px;font-weight:700;margin-bottom:6px">Aucun candidat enregistré pour ${eleveYear}</div>
      <div style="font-size:13px;color:var(--muted)">Les résultats de l'examen «&nbsp;${EXAM.label}&nbsp;» seront ajoutés prochainement.</div>
    </div></div>`;
  }

  return `<div class="container">
    ${yearSelector}
    <div class="card">
      <div class="card-title">Liste complète — Promotion ${eleveYear} (${eleves.length} candidats) <span class="info-btn" onclick="window._showHelpModal('eleves_list')">?</span></div>
      <div class="table-controls">
        <input type="text" id="search" placeholder="Rechercher un élève…" oninput="window._renderTable()" />
        <select id="filterMention" onchange="window._renderTable()">
          <option value="">${activeExam === "ea" ? "Tous les paliers" : "Toutes les mentions"}</option>
          ${MENTION_ORDER.map(k => `<option value="${k}">${MENTION_CONFIG[k].label}</option>`).join("")}
        </select>
        ${showSpec ? `
        <select id="filterSpecialty" onchange="window._renderTable()">
          <option value="">Toutes les spécialités</option>
          ${SPEC_KEYS.map((k, i) => `<option value="${k}">${SPEC_LABELS[i]}</option>`).join("")}
        </select>
        ` : ''}
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr>
            <th onclick="window._sort('score')">Moy ${sortKey==="score"?(sortAsc?"↑":"↓"):""}</th>
            <th onclick="window._sort('nom')">Nom ${sortKey==="nom"?(sortAsc?"↑":"↓"):""}</th>
            <th>Prénom</th>
            <th>${activeExam === "ea" ? "Palier" : "Résultat"}</th>
            ${epIdxsForYear(eleveYear).map(i => `<th>${EP_SHORT[i]}</th>`).join("")}
            ${showSpec ? '<th>Spécialités</th>' : ''}
            ${showOpt ? `<th>${EXAM.optField.short}</th>` : ''}
          </tr></thead>
          <tbody id="tbody"></tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function bindTable() {
  window._sort = (key) => {
    if (sortKey === key) { sortAsc = !sortAsc; } else { sortKey = key; sortAsc = key !== "score"; }
    renderTable();
  };
  window._renderTable = renderTable;
  window._eleveYear = (y) => {
    eleveYear = y;
    document.getElementById("tab-content").innerHTML = renderElevesList();
    bindTable();
  };
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById("tbody");
  if (!tbody) return; // pas de tableau (état vide)
  const eleves = YEARS_DATA[eleveYear].eleves;
  const q  = (document.getElementById("search")?.value||"").toLowerCase();
  const mf = document.getElementById("filterMention")?.value||"";
  const sf = document.getElementById("filterSpecialty")?.value||"";
  const data = eleves.filter(e => {
    const display = getStudentDisplayName(e);
    const match   = (display.nom+" "+display.prenom).toLowerCase().includes(q) ||
                    (display.prenom+" "+display.nom).toLowerCase().includes(q);
    const mention = !mf || getMentionKey(e.resultat)===mf;
    const spec    = !sf || e[sf] != null;
    return match && mention && spec;
  }).sort((a,b) => {
    let va=a[sortKey], vb=b[sortKey];
    if (typeof va==="string"){ va=va.toLowerCase(); vb=vb.toLowerCase(); }
    return sortAsc ? (va>vb?1:-1) : (va<vb?1:-1);
  });

  const hl = str => q
    ? String(str).replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`, "gi"), "<mark>$1</mark>")
    : str;

  const showSpec = SPEC_KEYS.length > 0 && SPEC_YEARS.includes(eleveYear);
  const showOpt  = EXAM.optField && SPEC_YEARS.includes(eleveYear);

  tbody.innerHTML = data.map(e => {
    const mk  = getMentionKey(e.resultat);
    const mc  = MENTION_CONFIG[mk];
    const col = scoreColor(e.score);
    const display = getStudentDisplayName(e);
    return `<tr onclick="window._showStudentModal('${e.nom.replace(/'/g, "\\'")}', '${e.prenom.replace(/'/g, "\\'")}')" style="cursor:pointer" title="Cliquer pour voir le bulletin individuel">
      <td data-label="Moyenne"><div class="score-wrap">
        <div class="score-mini-bar" style="width:${(e.score/20*100*0.5).toFixed(0)}px;background:${col}"></div>
        <strong style="color:${col}">${e.score}</strong><span style="font-size:10px;color:var(--muted)">/20</span>
      </div></td>
      <td data-label="Nom"><strong>${hl(display.nom)}</strong></td>
      <td data-label="Prénom">${hl(display.prenom)}</td>
      <td data-label="${activeExam === "ea" ? "Palier" : "Résultat"}"><span class="badge" style="background:${mc.bg};color:${mc.text}">${mc.short}</span></td>
      ${epIdxsForYear(eleveYear).map(i => `<td data-label="${EP_SHORT[i]}" style="text-align:center">${e[EP_KEYS[i]] ?? "—"}</td>`).join("")}
      ${showSpec ? (() => {
        const specs = SPEC_KEYS.map((k,i) => e[k] != null ? `<span style="color:${SPEC_COLORS[i]};font-weight:600;white-space:nowrap">${SPEC_SHORT[i]} <strong>${e[k]}</strong></span>` : null).filter(Boolean);
        return `<td data-label="Spécialités" style="font-size:11px">${specs.join(' · ') || '—'}</td>`;
      })() : ''}
      ${showOpt ? `<td data-label="${EXAM.optField.short}" style="text-align:center;font-size:11px">${e[EXAM.optField.key] != null ? e[EXAM.optField.key] : '—'}</td>` : ''}
    </tr>`;
  }).join("");
}

function scoreColor(s) {
  return s>=16?"#f59e0b":s>=14?"#10b981":s>=12?"#3b82f6":s>=10?"#8b5cf6":"#ef4444";
}

// ── Boot ──────────────────────────────────────────────────────────────────────
loadExam(activeExam);
render();

// ── Helper functions for specialties and student modals ───────────────────────

function renderOverviewSpecialties(eleves) {
  return SPEC_KEYS.map((k, i) => {
    const vals = eleves.map(e => e[k]).filter(v => v != null);
    if (!vals.length) return "";
    const a = (vals.reduce((s,v)=>s+v,0)/vals.length).toFixed(2);
    return `<div class="ep-card">
      <div class="ep-name" style="color:${SPEC_COLORS[i]};font-weight:700">${SPEC_LABELS[i]}</div>
      <div class="ep-score" style="color:${SPEC_COLORS[i]}">${a}<span>/20</span></div>
      <div class="ep-sub">Min ${Math.min(...vals)} · Max ${Math.max(...vals)} · ${vals.length} élève${vals.length>1?'s':''}</div>
      <div class="ep-bar-bg"><div class="ep-bar-fill" style="width:${a/20*100}%;background:${SPEC_COLORS[i]}"></div></div>
    </div>`;
  }).join("");
}

window._toggleOverviewEpreuves = (type) => {
  const container = document.getElementById("overview-epreuves-container");
  const btnTronc = document.getElementById("btn-tronc");
  const btnSpe = document.getElementById("btn-spe");
  if (!container || !btnTronc || !btnSpe) return;
  if (type === 'tronc') {
    container.innerHTML = renderEpreuves(YEARS_DATA[latestDataYear()].eleves);
    btnTronc.className = "toggle-btn active";
    btnSpe.className = "toggle-btn";
    btnTronc.style.background = "var(--surface)";
    btnTronc.style.color = "var(--accent)";
    btnTronc.style.boxShadow = "var(--shadow)";
    btnSpe.style.background = "transparent";
    btnSpe.style.color = "var(--muted)";
    btnSpe.style.boxShadow = "none";
  } else {
    container.innerHTML = renderOverviewSpecialties(YEARS_DATA[latestDataYear()].eleves);
    btnSpe.className = "toggle-btn active";
    btnTronc.className = "toggle-btn";
    btnSpe.style.background = "var(--surface)";
    btnSpe.style.color = "var(--accent)";
    btnSpe.style.boxShadow = "var(--shadow)";
    btnTronc.style.background = "transparent";
    btnTronc.style.color = "var(--muted)";
    btnTronc.style.boxShadow = "none";
  }
};

function renderSpecAveragesChart(year) {
  const ss = YEAR_STATS[year].specStats;
  const keys = SPEC_KEYS.filter(k => ss[k]);
  if (!keys.length) return "";
  
  const avgs = keys.map(k => ss[k].avg);
  const maxAvg = Math.max(...avgs, 1);
  
  return `<div class="card-title" style="margin-top:8px; margin-bottom:12px; font-size:10px; color:var(--muted)">Moyennes des enseignements de spécialité</div>
  <div style="display:flex; flex-direction:column; gap:10px; background:var(--bg); border-radius:10px; padding:16px; margin-bottom:16px">
    ${keys.map(k => {
      const idx = SPEC_KEYS.indexOf(k);
      const s = ss[k];
      const pct = (s.avg / 20 * 100).toFixed(1);
      return `
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:110px; font-size:12px; font-weight:700; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${SPEC_LABELS[idx]}</div>
          <div style="flex:1; height:12px; background:var(--border); border-radius:6px; overflow:hidden; position:relative">
            <div style="height:100%; width:${pct}%; background:${SPEC_COLORS[idx]}; border-radius:6px; transition: width .4s"></div>
          </div>
          <div style="width:60px; text-align:right; font-size:13px; font-weight:800; color:${SPEC_COLORS[idx]}">${s.avg.toFixed(2)}<span style="font-size:9px; font-weight:400; color:var(--muted)">/20</span></div>
        </div>
      `;
    }).join("")}
  </div>`;
}

function renderSubRow(label, note, maxVal, classAvg) {
  if (note == null) return "";
  const studentPct = (note / maxVal * 100).toFixed(1);
  const avgPct = (classAvg / maxVal * 100).toFixed(1);
  return `
    <div class="bulletin-sub-row" style="display:grid; grid-template-columns: 140px 1fr 50px; align-items:center; gap:12px; padding:6px 14px 6px 28px; background:rgba(0,0,0,0.02); border-left: 2px solid var(--border); margin-top:-4px; margin-bottom: 2px">
      <div style="font-size:11px; color:var(--muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${label}</div>
      <div style="height:8px; background:var(--bg); border-radius:4px; position:relative; overflow:visible">
        <div style="position:absolute; top:0; left:0; height:100%; width:${studentPct}%; background:var(--muted); border-radius:4px; opacity:0.5"></div>
        <div style="position:absolute; top:-2px; left:${avgPct}%; width:2px; height:12px; background:#ef4444; border-radius:1px; z-index:2" title="Moyenne de classe: ${classAvg.toFixed(2)}"></div>
      </div>
      <div style="text-align:right; font-size:11px; font-weight:600; color:var(--muted)">
        ${note}<span style="font-size:8px; font-weight:400; color:var(--muted)">/${maxVal}</span>
      </div>
    </div>
  `;
}

function renderBulletinRow(label, note, classAvg, color, detail = null) {
  const studentPct = (note / 20 * 100).toFixed(1);
  const avgPct = (classAvg / 20 * 100).toFixed(1);
  return `
    <div class="bulletin-row" style="display:grid; grid-template-columns: 140px 1fr 50px; align-items:center; gap:12px; background:var(--surface); padding:10px 14px; border-radius:8px; border:1px solid var(--border)">
      <div>
        <div style="font-size:12px; font-weight:600; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${label}</div>
        ${detail ? `<div style="font-size:8.5px; color:var(--muted); margin-top:2px; font-style:italic">${detail}</div>` : ""}
      </div>
      <div style="height:14px; background:var(--bg); border-radius:7px; position:relative; overflow:visible">
        <div style="position:absolute; top:0; left:0; height:100%; width:${studentPct}%; background:${color}; border-radius:7px; opacity:0.85"></div>
        <div style="position:absolute; top:-2px; left:${avgPct}%; width:3px; height:18px; background:#ef4444; border-radius:2px; z-index:2" title="Moyenne de classe: ${classAvg.toFixed(2)}"></div>
      </div>
      <div style="text-align:right; font-size:12px; font-weight:800; color:${color}">
        ${note} <span style="font-size:9px; font-weight:400; color:var(--muted)">/20</span>
      </div>
    </div>
  `;
}

window._showStudentModal = (nom, prenom) => {
  const eleves = YEARS_DATA[eleveYear].eleves;
  const student = eleves.find(e => e.nom === nom && e.prenom === prenom);
  if (!student) return;
  
  const stats = YEAR_STATS[eleveYear];
  const scoreCol = scoreColor(student.score);
  const mk = getMentionKey(student.resultat);
  const mc = MENTION_CONFIG[mk];
  
  const rankedList = [...eleves].sort((a,b) => b.score - a.score);
  const rank = rankedList.findIndex(e => e.nom === nom && e.prenom === prenom) + 1;
  
  const display = getStudentDisplayName(student);
  
  let modalHtml = `
    <div id="student-modal" class="modal-overlay" onclick="window._closeStudentModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <header class="modal-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid var(--border); padding-bottom:14px">
          <div style="display:flex; align-items:center; gap:12px">
            <div class="modal-avatar" style="background:${mc.color}; color:#fff; width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:18px">
              ${display.prenom.charAt(0)}${display.nom.charAt(0)}
            </div>
            <div>
              <h2 style="font-size:18px; font-weight:800; color:var(--text); margin-bottom:2px">${display.prenom} ${display.nom}</h2>
              <p style="font-size:12px; color:var(--muted)">Promotion ${eleveYear} · Rang: <strong>${rank}</strong>/${eleves.length}</p>
            </div>
          </div>
          <button class="close-modal-btn" onclick="window._closeStudentModal()" style="border:none; background:none; font-size:28px; color:var(--muted); cursor:pointer; padding:4px; line-height:1">&times;</button>
        </header>
        
        <div class="modal-body" style="max-height:420px; overflow-y:auto; padding-right:4px">
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg); border-radius:10px; padding:14px 16px; margin-bottom:20px; border:1px solid var(--border)">
            <div>
              <span class="badge" style="background:${mc.bg}; color:${mc.text}; font-size:11px; padding:4px 10px">${mc.label}</span>
            </div>
            <div style="text-align:right">
              <div style="font-size:24px; font-weight:800; color:${scoreCol}">${student.score}<span style="font-size:12px; font-weight:400; color:var(--muted)">/20</span></div>
              <div style="font-size:9px; color:var(--muted); text-transform:uppercase; letter-spacing:.4px; margin-top:2px">Moyenne générale</div>
            </div>
          </div>
          
          <div class="modal-section-title" style="font-size:10px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:.6px; margin-bottom:12px">Détail des notes</div>
          
          <style>
            .cc-details summary::-webkit-details-marker { display: none; }
            .cc-details summary { list-style: none; }
            .cc-details[open] .chevron { transform: rotate(180deg); }
          </style>

          <div class="bulletin-list" style="display:flex; flex-direction:column; gap:10px">
            ${student.details && student.details.ep ? `
              <!-- Français -->
              ${renderBulletinRow("Français", student.details.ep.francais, stats.subAverages.ep.francais, "#2563eb")}
              ${renderSubRow("Grammaire / Compréhension", student.details.ep.fr_gram, 50, stats.subAverages.ep.fr_gram)}
              ${renderSubRow("Dictée", student.details.ep.fr_dictee, 10, stats.subAverages.ep.fr_dictee)}
              ${renderSubRow("Rédaction", student.details.ep.fr_redac, 40, stats.subAverages.ep.fr_redac)}
              
              <!-- Mathématiques -->
              ${renderBulletinRow("Mathématiques", student.details.ep.maths, stats.subAverages.ep.maths, "#1d4ed8")}
              
              <!-- Histoire-Géo · EMC -->
              ${renderBulletinRow("Histoire-Géo · EMC", student.hg_emc, stats.epStats.hg_emc.avg, "#8b5cf6")}
              ${renderSubRow("Histoire-Géographie", student.details.ep.hg, 20, stats.subAverages.ep.hg)}
              ${renderSubRow("EMC", student.details.ep.emc, 20, stats.subAverages.ep.emc)}
              
              <!-- Sciences -->
              ${renderBulletinRow("Sciences", student.details.ep.sciences, stats.subAverages.ep.sciences, "#16a34a")}
              ${renderSubRow("SVT", student.details.ep.svt, 10, stats.subAverages.ep.svt)}
              ${renderSubRow("Physique-Chimie", student.details.ep.phys, 10, stats.subAverages.ep.phys)}
              
              <!-- Oral -->
              ${renderBulletinRow("Oral (soutenance)", student.details.ep.oral, stats.subAverages.ep.oral, "#f59e0b")}
              
              <!-- Contrôle continu -->
              ${renderBulletinRow("Contrôle continu", student.controle_continu, stats.epStats.controle_continu.avg, "#0891b2")}
              
              <details class="cc-details" style="margin-top: 2px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface);">
                <summary style="padding: 10px 14px; font-size: 11px; font-weight: 700; cursor: pointer; display: flex; justify-content: space-between; align-items: center; user-select: none; color: var(--text);">
                  <span>📋 Détail du contrôle continu (12 matières)</span>
                  <span class="chevron" style="font-size: 8px; color: var(--muted); transition: transform 0.2s;">▼</span>
                </summary>
                <div style="padding: 10px 0; display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--border); max-height: 250px; overflow-y: auto;">
                  ${renderSubRow("Mathématiques", student.details.cc.maths, 20, stats.subAverages.cc.maths)}
                  ${renderSubRow("Français", student.details.cc.francais, 20, stats.subAverages.cc.francais)}
                  ${renderSubRow("Histoire-Géographie", student.details.cc.hg, 20, stats.subAverages.cc.hg)}
                  ${renderSubRow("EMC", student.details.cc.emc, 20, stats.subAverages.cc.emc)}
                  ${renderSubRow("LV1 Anglais", student.details.cc.anglais, 20, stats.subAverages.cc.anglais)}
                  ${renderSubRow("LV2 Espagnol", student.details.cc.espagnol, 20, stats.subAverages.cc.espagnol)}
                  ${renderSubRow("EPS", student.details.cc.eps, 20, stats.subAverages.cc.eps)}
                  ${renderSubRow("SVT", student.details.cc.svt, 20, stats.subAverages.cc.svt)}
                  ${renderSubRow("Physique-Chimie", student.details.cc.phys, 20, stats.subAverages.cc.phys)}
                  ${renderSubRow("Technologie", student.details.cc.techno, 20, stats.subAverages.cc.techno)}
                  ${renderSubRow("Arts plastiques", student.details.cc.arts, 20, stats.subAverages.cc.arts)}
                  ${renderSubRow("Éducation musicale", student.details.cc.musique, 20, stats.subAverages.cc.musique)}
                </div>
              </details>
            ` : `
              ${EP_KEYS.map((k, idx) => {
                const note = student[k];
                if (note == null) return "";
                const classAvg = stats.epStats[k].avg;
                const detail = (student.details && student.details[k]) || null;
                return renderBulletinRow(EP_LABELS[idx], note, classAvg, EP_COLORS[idx], detail);
              }).join("")}
              
              ${SPEC_KEYS.map((k, idx) => {
                if (student[k] == null) return "";
                const note = student[k];
                const classAvg = stats.specStats[k] ? stats.specStats[k].avg : 10;
                const detail = (student.details && student.details[k]) || null;
                return renderBulletinRow(SPEC_LABELS[idx], note, classAvg, SPEC_COLORS[idx], detail);
              }).join("")}
              
              ${EXAM.optField && student[EXAM.optField.key] != null ? renderBulletinRow(EXAM.optField.label, student[EXAM.optField.key], EXAM.optField.classAvg ?? 11, "#6b7280") : ""}
            `}
          </div>
          
          <div style="display:flex; gap:16px; margin-top:20px; font-size:11px; color:var(--muted); justify-content:center">
            <span style="display:flex; align-items:center; gap:5px"><span style="display:inline-block; width:12px; height:8px; border-radius:2px; background:var(--accent)"></span>Note de l'élève</span>
            <span style="display:flex; align-items:center; gap:5px"><span style="display:inline-block; width:2px; height:8px; background:#ef4444"></span>Moyenne de classe</span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const div = document.createElement("div");
  div.id = "modal-container";
  div.innerHTML = modalHtml;
  document.body.appendChild(div);
  document.body.style.overflow = "hidden";
  
  window._modalEscHandler = (e) => {
    if (e.key === "Escape") window._closeStudentModal();
  };
  window.addEventListener("keydown", window._modalEscHandler);
};

window._closeStudentModal = (e) => {
  if (e && e.stopPropagation) e.stopPropagation();
  const container = document.getElementById("modal-container");
  if (container) {
    container.remove();
  }
  document.body.style.overflow = "";
  window.removeEventListener("keydown", window._modalEscHandler);
};

/* Le contrôle d'accès aux données nominatives est désormais assuré côté serveur
   (mot de passe sur l'hébergement privé), et non plus par un login côté navigateur.
   L'ancien modal de connexion « admin » a été supprimé. */

const HELP_DATA = {
  candidats: {
    title: "Effectif des candidats",
    body: `
      <p><strong>Utilité :</strong> Représente le nombre total d'élèves inscrits aux épreuves de la promotion sélectionnée.</p>
      <p style="margin-top:10px"><strong>Comment le lire :</strong> C'est la taille globale de l'échantillon d'élèves pour les statistiques.</p>
      <p style="margin-top:10px"><strong>Calcul :</strong> Somme totale des élèves figurant dans la base de données pour l'année correspondante.</p>
    `
  },
  admis: {
    title: "Candidats Admis",
    body: `
      <p><strong>Utilité :</strong> Indique le nombre de candidats ayant obtenu leur diplôme du baccalauréat (moyenne générale &ge; 10/20 ou admis après le second groupe).</p>
      <p style="margin-top:10px"><strong>Comment le lire :</strong> Permet d'évaluer la réussite quantitative brute.</p>
      <p style="margin-top:10px"><strong>Calcul :</strong> Comptage des élèves dont le statut de résultat est égal à "Admis" ou ayant obtenu une moyenne finale &ge; 10.</p>
    `
  },
  taux: {
    title: "Taux de réussite",
    body: `
      <p><strong>Utilité :</strong> Proportion d'élèves ayant obtenu leur diplôme parmi l'ensemble des candidats présentés.</p>
      <p style="margin-top:10px"><strong>Comment le lire :</strong> C'est l'indicateur clé de performance globale de l'établissement. Plus il est proche de 100%, meilleure est la réussite globale.</p>
      <p style="margin-top:10px"><strong>Calcul :</strong>
        <div style="background:var(--bg); padding:10px; border-radius:6px; font-family:monospace; margin-top:8px">
          Taux (%) = (Nombre d'Admis / Nombre total de Candidats) &times; 100
        </div>
      </p>
    `
  },
  avg: {
    title: "Moyenne générale",
    body: `
      <p><strong>Utilité :</strong> Représente la performance moyenne d'un élève ou d'une promotion.</p>
      <p style="margin-top:10px"><strong>Comment la lire :</strong> Une moyenne supérieure à 12/20 indique un bon niveau d'ensemble (équivalent d'une mention Assez Bien). Plus elle est élevée, plus le niveau académique global est fort.</p>
      <p style="margin-top:10px"><strong>Calcul :</strong>
        <div style="background:var(--bg); padding:10px; border-radius:6px; font-family:monospace; margin-top:8px">
          Moyenne = &Sigma;(Notes) / n
        </div>
        Où &Sigma;(Notes) est la somme de toutes les moyennes/notes et n est l'effectif.
      </p>
    `
  },
  minmax: {
    title: "Note minimale & maximale",
    body: `
      <p><strong>Utilité :</strong> Indique les bornes extrêmes obtenues par la promotion (la moins bonne note et la meilleure note).</p>
      <p style="margin-top:10px"><strong>Comment les lire :</strong> La note maximale reflète les sommets d'excellence atteints (têtes de classe). La note minimale permet de repérer le seuil de difficulté le plus bas.</p>
      <p style="margin-top:10px"><strong>Calcul :</strong>
        <div style="background:var(--bg); padding:10px; border-radius:6px; font-family:monospace; margin-top:8px">
          Min = Valeur la plus basse de la série<br>
          Max = Valeur la plus haute de la série
        </div>
      </p>
    `
  },
  median: {
    title: "Médiane",
    body: `
      <p><strong>Utilité :</strong> La médiane sépare les élèves en deux groupes de taille égale : 50% des élèves ont obtenu une note inférieure ou égale à la médiane, et 50% ont une note supérieure ou égale.</p>
      <p style="margin-top:10px"><strong>Comment la lire :</strong> Contrairement à la moyenne, la médiane n'est pas influencée par les notes extrêmes. Si la moyenne et la médiane sont très proches, la distribution est symétrique. Si la médiane est plus élevée que la moyenne, cela signifie qu'une majorité d'élèves performe bien, malgré quelques notes très basses qui tirent la moyenne vers le bas.</p>
      <p style="margin-top:10px"><strong>Calcul :</strong> Classer toutes les notes par ordre croissant. Si l'effectif n est impair, la médiane est la valeur centrale. S'il est pair, c'est la moyenne des deux valeurs du milieu.</p>
    `
  },
  std: {
    title: "Écart-type (&sigma;)",
    body: `
      <p><strong>Utilité :</strong> Mesure la dispersion des notes autour de la moyenne. C'est l'indicateur d'hétérogénéité de la promotion.</p>
      <p style="margin-top:10px"><strong>Comment le lire :</strong>
        <ul style="margin-left:20px; margin-top:6px">
          <li><strong>Écart-type faible (&lt; 1,5) :</strong> Les notes sont serrées autour de la moyenne. Le groupe est homogène.</li>
          <li><strong>Écart-type élevé (&gt; 2,5) :</strong> Les notes sont très étalées. Le groupe est hétérogène (grand écart entre les élèves en difficulté et les excellents).</li>
        </ul>
      </p>
      <p style="margin-top:10px"><strong>Calcul :</strong> Racine carrée de la moyenne des carrés des écarts à la moyenne :
        <div style="background:var(--bg); padding:10px; border-radius:6px; font-family:monospace; margin-top:8px">
          &sigma; = &radic;[ &Sigma;(x - Moyenne)&sup2; / n ]
        </div>
      </p>
    `
  },
  quartiles: {
    title: "Quartiles (Q1 &amp; Q3)",
    body: `
      <p><strong>Utilité :</strong> Les quartiles divisent l'ensemble des élèves en quatre groupes de taille égale (contenant chacun 25% des élèves) après les avoir classés par ordre croissant de notes.</p>
      <p style="margin-top:10px"><strong>Comment les lire :</strong>
        <ul style="margin-left:20px; margin-top:6px">
          <li style="margin-bottom:6px"><strong>1er Quartile (Q1) :</strong> C'est le seuil des 25% des élèves ayant obtenu les moins bonnes notes. <strong>25% de la classe a eu une note inférieure ou égale à Q1</strong>, et 75% a eu plus. Il permet d'évaluer le niveau des élèves les plus fragiles.</li>
          <li><strong>3e Quartile (Q3) :</strong> C'est le seuil à partir duquel on entre dans les 25% des élèves ayant obtenu les meilleures notes. <strong>75% de la classe a eu une note inférieure ou égale à Q3</strong> (et donc 25% a obtenu une note supérieure ou égale à Q3). Il permet d'évaluer le niveau d'excellence (tête de classe).</li>
        </ul>
      </p>
      <p style="margin-top:10px"><strong>💡 L'analogie de la file d'élèves :</strong><br>
        Imaginez que vous alignez tous les élèves dans la cour, du moins bon au meilleur, et que vous coupez cette file en 4 morceaux égaux :
        <ul style="margin-left:20px; margin-top:6px">
          <li>La note au premier quart (25%) correspond à <strong>Q1</strong>.</li>
          <li>La note au milieu (50%) correspond à la <strong>Médiane</strong>.</li>
          <li>La note aux trois quarts (75%) correspond à <strong>Q3</strong>.</li>
        </ul>
        La zone entre Q1 et Q3 (le rectangle de la boîte à moustaches) contient ainsi exactement les <strong>50% d'élèves du milieu</strong>.
      </p>
      <p style="margin-top:10px"><strong>Calcul :</strong> Classer les notes par ordre croissant. Q1 correspond à la valeur à l'index (0.25 &times; n) et Q3 à la valeur à l'index (0.75 &times; n) dans la liste ordonnée.</p>
    `
  },
  iqr: {
    title: "Étendue Interquartile (Inter-Q)",
    body: `
      <p><strong>Utilité :</strong> Représente l'écart entre le 3e quartile et le 1er quartile. Il englobe les 50% d'élèves du milieu de la classe.</p>
      <p style="margin-top:10px"><strong>Comment la lire :</strong> C'est une mesure de dispersion robuste. Plus l'étendue est faible, plus le "cœur de classe" a un niveau resserré et homogène.</p>
      <p style="margin-top:10px"><strong>Calcul :</strong>
        <div style="background:var(--bg); padding:10px; border-radius:6px; font-family:monospace; margin-top:8px">
          Étendue Inter-Q = Q3 - Q1
        </div>
      </p>
    `
  },
  boxplot: {
    title: "Boîte à moustaches (Box Plot)",
    body: `
      <p><strong>Utilité :</strong> Graphique qui résume visuellement la répartition d'un ensemble de notes.</p>
      <p style="margin-top:10px"><strong>Comment la lire :</strong>
        <ul style="margin-left:20px; margin-top:6px">
          <li>Le <strong>trait vertical rouge</strong> central représente la <strong>médiane</strong>.</li>
          <li>Le <strong>bloc bleu</strong> représente la boîte interquartile (contenant les 50% des élèves du milieu, allant de <strong>Q1</strong> à <strong>Q3</strong>).</li>
          <li>Les <strong>moustaches grises</strong> s'étirent à gauche jusqu'à la note <strong>minimale</strong>, et à droite jusqu'à la note <strong>maximale</strong>.</li>
        </ul>
        Ce graphique permet de comparer instantanément la dispersion et la symétrie des notes entre les années ou les matières.
      </p>
    `
  },
  histo: {
    title: "Distribution des notes",
    body: `
      <p><strong>Utilité :</strong> Affiche graphiquement la répartition des candidats par tranche de notes (ex: moins de 10, de 10 à 11, etc.).</p>
      <p style="margin-top:10px"><strong>Comment la lire :</strong> Permet d'observer la forme générale des notes : y a-t-il une courbe en cloche centrée, ou deux groupes distincts (bimodalité), ou une forte concentration vers le haut ?</p>
      <p style="margin-top:10px"><strong>Calcul :</strong> Répartition des élèves dans 10 tranches de notes de taille égale et comptage de l'effectif dans chacune.</p>
    `
  },
  mentions: {
    title: "Répartition des mentions",
    body: `
      <p><strong>Utilité :</strong> Indique le pourcentage d'élèves obtenant chaque type de mention au baccalauréat.</p>
      <p style="margin-top:10px"><strong>Comment la lire :</strong> Plus la part de mentions élevées (Très Bien avec Félicitations, Très Bien, Bien) est grande, plus l'excellence académique de l'établissement est marquée.</p>
      <p style="margin-top:10px"><strong>Calcul :</strong>
        <div style="background:var(--bg); padding:10px; border-radius:6px; font-family:monospace; margin-top:8px">
          % Mention = (Nombre d'élèves avec cette mention / Nombre total) &times; 100
        </div>
      </p>
    `
  },
  epreuves: {
    title: "Épreuves terminales",
    body: `
      <p><strong>Utilité :</strong> Affiche les moyennes obtenues aux matières du tronc commun (Français, Philosophie, Grand Oral) ou de spécialité lors des examens finaux du baccalauréat.</p>
      <p style="margin-top:10px"><strong>Comment les lire :</strong> Permet de suivre la réussite spécifique matière par matière pour identifier les points forts ou les matières posant le plus de difficultés.</p>
      <p style="margin-top:10px"><strong>Calcul :</strong> Moyenne arithmétique simple des notes obtenues par les élèves à l'examen de cette matière.</p>
    `
  },
  correlation: {
    title: "Coefficient de corrélation de Pearson (r)",
    body: `
      <p><strong>Utilité :</strong> Mesure le lien statistique linéaire entre la note d'une épreuve et la moyenne générale de l'élève. Il indique si une épreuve est représentative du niveau global de l'élève.</p>
      <p style="margin-top:10px"><strong>Comment le lire :</strong> Sa valeur est comprise entre -1 et 1 :
        <ul style="margin-left:20px; margin-top:6px">
          <li><strong>r proche de 1 (ex: &ge; 0,6) :</strong> Corrélation forte. L'élève qui réussit globalement a généralement une excellente note à cette épreuve. Elle est très prédictive.</li>
          <li><strong>r moyen (ex: 0,4 à 0,6) :</strong> Corrélation modérée. Lien significatif mais avec des variations individuelles.</li>
          <li><strong>r faible (ex: &lt; 0,4) :</strong> Corrélation faible ou nulle. La note à l'épreuve n'a aucun lien linéaire avec le niveau général de l'élève (ex: notation très aléatoire, ou compétences très spécifiques non mesurées ailleurs).</li>
        </ul>
      </p>
      <p style="margin-top:10px"><strong>Calcul :</strong>
        <div style="background:var(--bg); padding:10px; border-radius:6px; font-family:monospace; margin-top:8px; font-size:11px">
          r = Cov(X, Y) / ( &sigma;_X &times; &sigma;_Y )
        </div>
        Où X est la note à l'épreuve, Y la moyenne générale, Cov la covariance, et &sigma; les écarts-types.
      </p>
    `
  },
  tranches: {
    title: "Tranches de performance",
    body: `
      <p><strong>Utilité :</strong> Regroupe les candidats par grandes catégories de réussite scolaire.</p>
      <p style="margin-top:10px"><strong>Comment la lire :</strong>
        <ul style="margin-left:20px; margin-top:6px">
          <li><strong>Excellence :</strong> Moyenne générale &ge; 16/20 (profils de mentions Très Bien ou Félicitations).</li>
          <li><strong>Très bien / Bien / Passable :</strong> Tranches de notes intermédiaires.</li>
          <li><strong>Échec :</strong> Élèves sous la barre de 10/20 (refusés ou devant passer le rattrapage).</li>
        </ul>
      </p>
      <p style="margin-top:10px"><strong>Calcul :</strong> Comptage du nombre et du pourcentage d'élèves entrant dans chaque intervalle de moyenne générale.</p>
    `
  },
  stats_details: {
    title: "Statistiques détaillées par épreuve",
    body: `
      <p><strong>Utilité :</strong> Ce tableau compile pour chaque matière les indicateurs clés de performance et de répartition des notes.</p>
      <p style="margin-top:12px"><strong>Comment lire les indicateurs :</strong></p>
      <ul style="margin-left:20px; margin-top:6px; display:flex; flex-direction:column; gap:6px">
        <li><strong>Moyenne :</strong> Niveau moyen obtenu à l'épreuve par l'ensemble des candidats.</li>
        <li><strong>Médiane :</strong> La note du milieu. 50% des élèves ont obtenu moins, et 50% ont obtenu plus.</li>
        <li><strong>Écart-type (&sigma;) :</strong> Mesure de l'hétérogénéité. Plus il est élevé, plus le grand écart entre les notes est important.</li>
        <li><strong>1er Quartile (Q1) :</strong> 25% des élèves ont obtenu cette note ou moins. Mesure le niveau des élèves plus fragiles.</li>
        <li><strong>3e Quartile (Q3) :</strong> 75% des élèves ont obtenu cette note ou moins (donc 25% ont eu plus). Mesure la tête de classe.</li>
        <li><strong>Min / Max :</strong> Les notes extrêmes (la plus basse et la plus haute) obtenues dans la matière.</li>
        <li><strong>≥10/20 &amp; Taux :</strong> Proportion et pourcentage d'élèves ayant obtenu la moyenne (&ge; 10/20) à cette épreuve.</li>
      </ul>
      <p style="margin-top:12px"><strong>💡 L'analogie de la file d'élèves pour comprendre Q1, Médiane et Q3 :</strong><br>
        Imaginez que vous alignez tous les élèves du moins bon au meilleur :
        <ul style="margin-left:20px; margin-top:6px">
          <li>La note du premier quart de la file (25%) est <strong>Q1</strong>.</li>
          <li>La note de l'élève pile au milieu (50%) est la <strong>Médiane</strong>.</li>
          <li>La note aux trois quarts de la file (75%) est <strong>Q3</strong>.</li>
        </ul>
        La "boîte" bleue du graphique correspond à l'intervalle entre Q1 et Q3 et contient les <strong>50% d'élèves du milieu</strong> de la classe.
      </p>
    `
  },
  spec_compare: {
    title: "Spécialités — Comparaison des promotions",
    body: `
      <p><strong>Utilité :</strong> Compare les effectifs (n), les moyennes générales, les écarts-types et le taux d'élèves obtenant plus de 10/20 dans chaque spécialité sur l'ensemble des promotions.</p>
      <p style="margin-top:10px"><strong>Comment la lire :</strong> Permet de repérer les spécialités historiquement fortes, celles qui connaissent des variations d'effectifs, ou des notations variables selon les années.</p>
    `
  },
  epreuves_compare: {
    title: "Comparaison des épreuves terminales",
    body: `
      <p><strong>Utilité :</strong> Permet de confronter les moyennes des matières du tronc commun sur toutes les promotions de 2022 à 2026, avec le calcul de la progression (Δ 22&rarr;26).</p>
      <p style="margin-top:10px"><strong>Comment la lire :</strong> Un Δ positif indique que les notes dans cette matière se sont améliorées sur 5 ans. Un Δ négatif signale une baisse de niveau ou un durcissement des examens.</p>
    `
  },
  yc_overview: {
    title: "Résultats annuels",
    body: `
      <p><strong>Utilité :</strong> Fiches synthétiques résumant l'effectif, le taux de réussite final, la moyenne de la promotion et la répartition miniature des mentions pour chaque année de 2022 à 2026.</p>
      <p style="margin-top:10px"><strong>Comment les lire :</strong> Permet de voir instantanément la tendance globale sur plusieurs années sans entrer dans les détails de chaque matière.</p>
    `
  },
  eleves_list: {
    title: "Liste des élèves",
    body: `
      <p><strong>Utilité :</strong> Tableau exhaustif répertoriant tous les candidats d'une promotion avec leurs notes détaillées à chaque épreuve et spécialité.</p>
      <p style="margin-top:10px"><strong>Comment l'utiliser :</strong>
        <ul style="margin-left:20px; margin-top:6px">
          <li><strong>Recherche :</strong> Saisissez un nom ou prénom pour trouver un élève.</li>
          <li><strong>Tri :</strong> Cliquez sur les entêtes de colonnes (Nom, Moyenne) pour trier.</li>
          <li><strong>Filtres :</strong> Filtrez par mention obtenue ou spécialité suivie.</li>
          <li><strong>Détail individuel :</strong> Cliquez sur la ligne d'un élève pour ouvrir son bulletin détaillé avec ses performances par rapport à la moyenne de classe.</li>
        </ul>
      </p>
    `
  }
};

window._showHelpModal = (id) => {
  let data = HELP_DATA[id] ? { ...HELP_DATA[id] } : null;
  if (!data) return;

  if (activeExam === "ea") {
    if (id === "admis") {
      data.title = "Candidats avec moyenne ≥ 10/20";
      data.body = `
        <p><strong>Utilité :</strong> Indique le nombre de candidats ayant obtenu une moyenne générale supérieure ou égale à 10/20 aux épreuves anticipées.</p>
        <p style="margin-top:10px"><strong>Calcul :</strong> Comptage des élèves dont la moyenne finale (score) est supérieure ou égale à 10.</p>
      `;
    } else if (id === "taux") {
      data.title = "Taux avec moyenne ≥ 10/20";
      data.body = `
        <p><strong>Utilité :</strong> Proportion d'élèves ayant obtenu une moyenne générale supérieure ou égale à 10/20 parmi l'ensemble des candidats présentés aux épreuves anticipées.</p>
        <p style="margin-top:10px"><strong>Calcul :</strong>
          <div style="background:var(--bg); padding:10px; border-radius:6px; font-family:monospace; margin-top:8px">
            Taux (%) = (Nombre d'élèves ≥ 10/20 / Nombre total de Candidats) &times; 100
          </div>
        </p>
      `;
    }
  }

  const modalHtml = `
    <div id="help-modal" class="modal-overlay" onclick="window._closeHelpModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <header class="modal-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid var(--border); padding-bottom:14px">
          <div style="display:flex; align-items:center; gap:12px">
            <div style="background:var(--accent); color:#fff; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold">
              ?
            </div>
            <div>
              <h2 style="font-size:15px; font-weight:800; color:var(--text); line-height:1.2">${data.title}</h2>
              <p style="font-size:11px; color:var(--muted)">Aide &amp; Méthodologie</p>
            </div>
          </div>
          <button class="close-modal-btn" onclick="window._closeHelpModal()" style="border:none; background:none; font-size:28px; color:var(--muted); cursor:pointer; padding:4px; line-height:1">&times;</button>
        </header>
        <div class="modal-body" style="max-height:420px; overflow-y:auto; padding-right:4px; font-size:13px; line-height:1.5; color:var(--text)">
          ${data.body}
        </div>
      </div>
    </div>
  `;

  const div = document.createElement("div");
  div.id = "help-modal-container";
  div.innerHTML = modalHtml;
  document.body.appendChild(div);
  document.body.style.overflow = "hidden";

  window._helpModalEscHandler = (e) => {
    if (e.key === "Escape") window._closeHelpModal();
  };
  window.addEventListener("keydown", window._helpModalEscHandler);
};

window._closeHelpModal = (e) => {
  if (e && e.stopPropagation) e.stopPropagation();
  const container = document.getElementById("help-modal-container");
  if (container) {
    container.remove();
  }
  document.body.style.overflow = "";
  window.removeEventListener("keydown", window._helpModalEscHandler);
};

