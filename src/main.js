import { YEARS_DATA, OFFICIAL_STATS, getMentionKey, MENTION_CONFIG, computeStats, countMentions } from "./data.js";

const MENTION_ORDER = ["felicitations","tb","bien","ab","admis","sg","refuse"];
const YEARS = [2022, 2023, 2024, 2025, 2026];
const EP_KEYS   = ["fr_ecrit","fr_oral","philo","grand_oral"];
const EP_LABELS = ["Français écrit","Français oral","Philosophie","Grand oral"];
const EP_COLORS = ["#2563eb","#10b981","#8b5cf6","#f59e0b"];
const YEAR_COLORS = { 2022:"#9ca3af", 2023:"#6b7280", 2024:"#8b5cf6", 2025:"#3b82f6", 2026:"#2563eb" };

let activeTab    = "overview";
let analysisYear = 2026;
let eleveYear    = 2026;
let sortKey      = "score";
let sortAsc      = false;

// ── Pre-compute per-year stats ────────────────────────────────────────────────
const YEAR_STATS = {};
YEARS.forEach(y => {
  const d = YEARS_DATA[y];
  YEAR_STATS[y] = {
    mentions: countMentions(d.eleves),
    stats:    computeStats(d.eleves),
    epStats:  computeEpStats(d.eleves),
    official: OFFICIAL_STATS[y],
  };
});

function computeEpStats(eleves) {
  const out = {};
  EP_KEYS.forEach(k => {
    const vals = eleves.map(e => e[k]).filter(v => v != null);
    out[k] = { avg: vals.reduce((a,b)=>a+b,0)/vals.length, min: Math.min(...vals), max: Math.max(...vals) };
  });
  return out;
}

// ── Root render ───────────────────────────────────────────────────────────────
function render() {
  document.getElementById("app").innerHTML = `
    <header class="site-header">
      <div class="logo">
        <div class="logo-icon">BAC</div>
        <div><h1>Résultats Baccalauréat — LFJP Saly</h1><p>Lycée Français Jacques Prévert · Analyse pluriannuelle 2022–2026</p></div>
      </div>
      <span class="header-badge">2022 → 2026</span>
    </header>
    <nav class="tabs-bar">
      ${[["overview","Vue d'ensemble"],["analysis","Analyse par année"],["evolution","Évolution & Comparaison"],["eleves","Élèves"]].map(([id,label]) =>
        `<button class="tab-btn ${activeTab===id?"active":""}" onclick="window._tab('${id}')">${label}</button>`
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
  else if (activeTab === "eleves")    el.innerHTML = renderElevesList();
  if (activeTab === "eleves")  bindTable();
  if (activeTab === "analysis") bindAnalysis();
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 1 — VUE D'ENSEMBLE
// ═══════════════════════════════════════════════════════════════════════════════
function renderOverview() {
  const s26   = YEAR_STATS[2026];
  const s25   = YEAR_STATS[2025];
  const off26 = OFFICIAL_STATS[2026];
  const off25 = OFFICIAL_STATS[2025];
  const deltaAvg  = (s26.stats.avg - s25.stats.avg).toFixed(2);
  const deltaTaux = (off26.taux - off25.taux).toFixed(1);

  return `<div class="container">
    <div class="kpi-grid">
      ${kpi(off26.total, "Candidats 2026", "#2563eb")}
      ${kpi(off26.admis, "Admis 2026", "#10b981")}
      ${kpi(off26.taux.toFixed(1)+"%", "Taux de réussite", "#10b981", deltaSign(deltaTaux)+" vs 2025")}
      ${kpi(s26.stats.avg.toFixed(2), "Moyenne générale", "#f59e0b", deltaSign(deltaAvg)+" vs 2025")}
      ${kpi(s26.stats.max, "Meilleure note", "#8b5cf6")}
    </div>

    <div class="card-title" style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;margin-bottom:12px">Résultats par année</div>
    <div class="year-cards mb16">${YEARS.map(y => renderYearCard(y)).join("")}</div>

    <div class="grid-2">
      <div class="card">
        <div class="card-title">Répartition des mentions — 2026</div>
        ${renderMentionBars(YEARS_DATA[2026].eleves, off26.total)}
      </div>
      <div class="card">
        <div class="card-title">Distribution des moyennes — 2026</div>
        ${renderHistogram(YEARS_DATA[2026].eleves)}
      </div>
    </div>

    <div class="card mb16">
      <div class="card-title">Épreuves terminales 2026</div>
      <div class="ep-grid">${renderEpreuves(YEARS_DATA[2026].eleves)}</div>
    </div>

    <div class="card">
      <div class="card-title">Top 5 — Promotion 2026</div>
      <div class="top-list">${renderTop5()}</div>
    </div>
  </div>`;
}

function kpi(val, lbl, color, delta=null) {
  const cls = delta ? (delta.startsWith("+") ? "delta-up" : "delta-down") : "";
  return `<div class="kpi-card">
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
    <div class="yc-taux" style="color:${tColor}">${off.taux.toFixed(1)}% de réussite</div>
    <div class="yc-avg">Moy. <strong>${ys.stats.avg.toFixed(2)}/20</strong></div>
    <div class="mention-mini">${segs}</div>
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
  const top = [...YEARS_DATA[2026].eleves].sort((a,b) => b.score-a.score).slice(0,5);
  const medals = ["🥇","🥈","🥉","4","5"];
  return top.map((e,i) => {
    const mk = getMentionKey(e.resultat);
    const mc = MENTION_CONFIG[mk];
    return `<div class="top-item">
      <div class="top-rank">${medals[i]}</div>
      <div class="top-info">
        <div class="top-name">${e.prenom} ${e.nom}</div>
        <div class="top-mention"><span class="badge" style="background:${mc.bg};color:${mc.text}">${mc.short}</span></div>
      </div>
      <div class="top-score" style="color:${scoreColor(e.score)}">${e.score}<span style="font-size:12px;color:var(--muted)">/20</span></div>
    </div>`;
  }).join("");
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 2 — ANALYSE PAR ANNÉE (avec sélecteur)
// ═══════════════════════════════════════════════════════════════════════════════
function renderAnalysis() {
  const y      = analysisYear;
  const eleves = YEARS_DATA[y].eleves.filter(e => e.score != null);
  const st     = YEAR_STATS[y].stats;
  const off    = OFFICIAL_STATS[y];

  return `<div class="container">
    <div class="year-selector">
      ${YEARS.map(yr => `<button class="year-btn ${yr===y?"active":""}" onclick="window._analysisYear(${yr})">${yr}</button>`).join("")}
    </div>

    <div class="grid-2 mb16">
      <div class="card">
        <div class="card-title">Statistiques descriptives — Promotion ${y}</div>
        <div class="stat-grid">
          ${statBox(st.avg.toFixed(2), "Moyenne /20", "#2563eb")}
          ${statBox(st.median.toFixed(2), "Médiane /20", "#10b981")}
          ${statBox(st.std.toFixed(2), "Écart-type", "#8b5cf6")}
          ${statBox(st.min, "Note minimale", "#ef4444")}
          ${statBox(st.q1.toFixed(2), "1er quartile Q1", "#6b7280")}
          ${statBox(st.q3.toFixed(2), "3e quartile Q3", "#f59e0b")}
          ${statBox(st.max, "Note maximale", "#f59e0b")}
          ${statBox((st.q3-st.q1).toFixed(2), "Étendue inter-Q", "#6b7280")}
          ${statBox(off.total, "Candidats total", "#2563eb")}
        </div>
        <div class="card-title" style="margin-top:16px">Boîte à moustaches</div>
        ${renderBoxPlot(st, 0, 20)}
      </div>

      <div class="card">
        <div class="card-title">Distribution des notes — ${y}</div>
        ${renderHistogram(eleves)}
        <div class="card-note">Répartition des ${eleves.length} candidats par tranche de note</div>
        <div class="card-title" style="margin-top:16px">Répartition des mentions</div>
        ${renderMentionBars(eleves, off.total)}
      </div>
    </div>

    <div class="card mb16">
      <div class="card-title">Analyse détaillée des épreuves terminales — ${y}</div>
      <div class="ep-grid">${renderEpreuvesDetailed(eleves)}</div>
    </div>

    <div class="card mb16">
      <div class="card-title">Corrélations avec la moyenne générale — ${y}</div>
      ${renderCorrelations(eleves)}
    </div>

    <div class="card">
      <div class="card-title">Analyse des tranches de performance — ${y}</div>
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

function statBox(val, lbl, color) {
  return `<div class="stat-box">
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

function renderEpreuvesDetailed(eleves) {
  return EP_KEYS.map((k, i) => {
    const vals = eleves.map(e=>e[k]).filter(v=>v!=null).sort((a,b)=>a-b);
    if (!vals.length) return "";
    const n   = vals.length;
    const avg = vals.reduce((a,b)=>a+b,0)/n;
    const med = n%2===0?(vals[n/2-1]+vals[n/2])/2:vals[Math.floor(n/2)];
    const ge10 = vals.filter(v=>v>=10).length;
    return `<div class="ep-card">
      <div class="ep-name">${EP_LABELS[i]}</div>
      <div class="ep-score" style="color:${EP_COLORS[i]}">${avg.toFixed(2)}<span>/20</span></div>
      <div class="ep-sub">Médiane: ${med.toFixed(1)} · Min: ${vals[0]} · Max: ${vals[n-1]}</div>
      <div class="ep-sub">≥10/20 : ${ge10}/${n} (${(ge10/n*100).toFixed(0)}%)</div>
      <div class="ep-bar-bg"><div class="ep-bar-fill" style="width:${avg/20*100}%;background:${EP_COLORS[i]}"></div></div>
    </div>`;
  }).join("");
}

function renderCorrelations(eleves) {
  return `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">` +
    EP_KEYS.map((k, i) => {
      const pairs = eleves.filter(e=>e[k]!=null && e.score!=null).map(e=>({x:e[k],y:e.score}));
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
  const tranches = [
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
      return `<div style="display:flex;align-items:center;gap:12px;font-size:13px">
        <div style="width:185px;color:${t.color};font-weight:600">${t.l}</div>
        <div style="flex:1;height:10px;background:var(--bg);border-radius:5px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:${t.color};border-radius:5px"></div>
        </div>
        <div style="width:30px;font-weight:700">${n}</div>
        <div style="width:40px;color:var(--muted);font-size:11px">${pct}%</div>
      </div>`;
    }).join("") + `</div>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 3 — ÉVOLUTION PLURIANNUELLE
// ═══════════════════════════════════════════════════════════════════════════════
function renderEvolution() {
  return `<div class="container">
    <div class="card mb16">
      <div class="card-title">Évolution du taux de réussite — 2022–2026</div>
      ${renderTauxChart()}
    </div>

    <div class="card mb16">
      <div class="card-title">Répartition des mentions par année</div>
      ${renderMentionsComparison()}
    </div>

    <div class="card mb16">
      <div class="card-title">Évolution de la moyenne générale — 2022–2026</div>
      ${renderAvgEvolution()}
    </div>

    <div class="card mb16">
      <div class="card-title">Comparaison des épreuves terminales — toutes promotions</div>
      ${renderEpreuvesComparison()}
    </div>

    <div class="card">
      <div class="card-title">Distributions comparées — boîtes à moustaches</div>
      ${renderBoxplotsComparison()}
    </div>
  </div>`;
}

function renderTauxChart() {
  const data = YEARS.map(y => ({ y, taux: OFFICIAL_STATS[y].taux, admis: OFFICIAL_STATS[y].admis, total: OFFICIAL_STATS[y].total }));
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
  const active = MENTION_ORDER.filter(k => YEARS.some(y => YEAR_STATS[y].mentions[k] > 0));
  return `<div style="display:flex;flex-direction:column;gap:12px;margin-top:8px">` +
    YEARS.map(y => {
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
  const cols = ["#9ca3af","#6b7280","#8b5cf6","#3b82f6","#2563eb"];
  return `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:8px">` +
    YEARS.map((y,i) => {
      const st = YEAR_STATS[y].stats;
      return `<div style="text-align:center;padding:16px;background:var(--bg);border-radius:10px">
        <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.5px">${y}</div>
        <div style="font-size:28px;font-weight:800;margin:8px 0;color:${cols[i]}">${st.avg.toFixed(2)}</div>
        <div style="font-size:10px;color:var(--muted)">σ = ${st.std.toFixed(2)}</div>
        <div style="font-size:10px;color:var(--muted)">Mé = ${st.median.toFixed(2)}</div>
      </div>`;
    }).join("") + `</div>`;
}

function renderEpreuvesComparison() {
  const n = YEARS.map(y => YEARS_DATA[y].eleves.length);
  return `<div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-size:12px">
      <thead>
        <tr>
          <th style="padding:8px 12px;text-align:left;font-weight:700;color:var(--muted);text-transform:uppercase;font-size:10px;border-bottom:2px solid var(--border)">Épreuve</th>
          ${YEARS.map((y,i) => `<th style="padding:8px 12px;text-align:center;font-weight:700;color:${YEAR_COLORS[y]};border-bottom:2px solid var(--border)">${y}<br><span style="font-size:9px;font-weight:400">n=${n[i]}</span></th>`).join("")}
          <th style="padding:8px 12px;text-align:center;font-weight:700;color:#10b981;border-bottom:2px solid var(--border)">Δ 22→26</th>
        </tr>
      </thead>
      <tbody>
        ${EP_KEYS.map((k,i) => {
          const avgs  = YEARS.map(y => YEAR_STATS[y].epStats[k].avg);
          const delta = (avgs[4]-avgs[0]).toFixed(2);
          const dColor = parseFloat(delta)>=0?"#10b981":"#ef4444";
          return `<tr>
            <td style="padding:9px 12px;font-weight:600;border-bottom:1px solid var(--border)">${EP_LABELS[i]}</td>
            ${avgs.map((a,j) => {
              const col = YEAR_COLORS[YEARS[j]];
              return `<td style="padding:9px 12px;text-align:center;font-weight:700;color:${col};border-bottom:1px solid var(--border)">${a.toFixed(2)}</td>`;
            }).join("")}
            <td style="padding:9px 12px;text-align:center;font-weight:700;color:${dColor};border-bottom:1px solid var(--border)">${parseFloat(delta)>=0?"+":""}${delta}</td>
          </tr>`;
        }).join("")}
        <tr style="background:var(--bg)">
          <td style="padding:9px 12px;font-weight:700">Moyenne générale</td>
          ${YEARS.map((y,j) => {
            const col = YEAR_COLORS[y];
            return `<td style="padding:9px 12px;text-align:center;font-weight:700;color:${col}">${YEAR_STATS[y].stats.avg.toFixed(2)}</td>`;
          }).join("")}
          <td style="padding:9px 12px;text-align:center;font-weight:700;color:${(YEAR_STATS[2026].stats.avg-YEAR_STATS[2022].stats.avg)>=0?"#10b981":"#ef4444"}">
            ${(YEAR_STATS[2026].stats.avg-YEAR_STATS[2022].stats.avg)>=0?"+":""}${(YEAR_STATS[2026].stats.avg-YEAR_STATS[2022].stats.avg).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>`;
}

function renderBoxplotsComparison() {
  return `<div style="display:flex;flex-direction:column;gap:20px;margin-top:8px">` +
    YEARS.map(y => {
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
  return `<div class="container">
    <div class="year-selector">
      ${YEARS.map(y => `<button class="year-btn ${y===eleveYear?"active":""}" onclick="window._eleveYear(${y})">${y}</button>`).join("")}
    </div>
    <div class="card">
      <div class="card-title">Liste complète — Promotion ${eleveYear} (${eleves.length} candidats)</div>
      <div class="table-controls">
        <input type="text" id="search" placeholder="Rechercher un élève…" oninput="window._renderTable()" />
        <select id="filterMention" onchange="window._renderTable()">
          <option value="">Toutes les mentions</option>
          ${MENTION_ORDER.map(k => `<option value="${k}">${MENTION_CONFIG[k].label}</option>`).join("")}
        </select>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr>
            <th onclick="window._sort('score')">Moy ${sortKey==="score"?(sortAsc?"↑":"↓"):""}</th>
            <th onclick="window._sort('nom')">Nom ${sortKey==="nom"?(sortAsc?"↑":"↓"):""}</th>
            <th>Prénom</th>
            <th>Résultat</th>
            <th>Fr. écrit</th>
            <th>Fr. oral</th>
            <th>Philo</th>
            <th>Grand oral</th>
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
  const eleves = YEARS_DATA[eleveYear].eleves;
  const q  = (document.getElementById("search")?.value||"").toLowerCase();
  const mf = document.getElementById("filterMention")?.value||"";
  const data = eleves.filter(e => {
    const match   = (e.nom+" "+e.prenom).toLowerCase().includes(q);
    const mention = !mf || getMentionKey(e.resultat)===mf;
    return match && mention;
  }).sort((a,b) => {
    let va=a[sortKey], vb=b[sortKey];
    if (typeof va==="string"){ va=va.toLowerCase(); vb=vb.toLowerCase(); }
    return sortAsc ? (va>vb?1:-1) : (va<vb?1:-1);
  });

  const hl = str => q
    ? String(str).replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`, "gi"), "<mark>$1</mark>")
    : str;

  document.getElementById("tbody").innerHTML = data.map(e => {
    const mk  = getMentionKey(e.resultat);
    const mc  = MENTION_CONFIG[mk];
    const col = scoreColor(e.score);
    return `<tr>
      <td><div class="score-wrap">
        <div class="score-mini-bar" style="width:${(e.score/20*100*0.5).toFixed(0)}px;background:${col}"></div>
        <strong style="color:${col}">${e.score}</strong><span style="font-size:10px;color:var(--muted)">/20</span>
      </div></td>
      <td><strong>${hl(e.nom)}</strong></td>
      <td>${hl(e.prenom)}</td>
      <td><span class="badge" style="background:${mc.bg};color:${mc.text}">${mc.short}</span></td>
      <td style="text-align:center">${e.fr_ecrit ?? "—"}</td>
      <td style="text-align:center">${e.fr_oral ?? "—"}</td>
      <td style="text-align:center">${e.philo ?? "—"}</td>
      <td style="text-align:center">${e.grand_oral ?? "—"}</td>
    </tr>`;
  }).join("");
}

function scoreColor(s) {
  return s>=16?"#f59e0b":s>=14?"#10b981":s>=12?"#3b82f6":s>=10?"#8b5cf6":"#ef4444";
}

// ── Boot ──────────────────────────────────────────────────────────────────────
render();
