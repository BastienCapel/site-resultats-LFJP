// ── Configuration de l'examen : DNB (Diplôme National du Brevet) ──────────────
// Barème ramené sur /20 pour homogénéiser l'affichage avec le BAC et les EA.
// Mentions (équivalent /20) : Assez Bien ≥12, Bien ≥14, Très Bien ≥16.
import { getMentionKey, MENTION_CONFIG } from "../data.js";

// Modèle d'un élève DNB (à remplir) :
// { nom, prenom, francais, maths, hg_emc, sciences, oral, controle_continu,
//   score, resultat:"Admis Mention Bien" }

export const ELEVES_DNB_2024 = [];
export const ELEVES_DNB_2025 = [];
export const ELEVES_DNB_2026 = [];

export const dnbExam = {
  id: "dnb",
  label: "Brevet (DNB)",
  short: "DNB",
  niveau: "3ème",
  emoji: "📘",
  scoreMax: 20,
  years: [2024, 2025, 2026],
  yearColors: { 2024:"#94a3b8", 2025:"#0ea5e9", 2026:"#0284c7" },

  // Épreuves finales + contrôle continu (socle commun), exprimés sur /20
  epreuves: [
    { key:"francais",         label:"Français",            short:"Français", color:"#2563eb" },
    { key:"maths",            label:"Mathématiques",       short:"Maths",    color:"#1d4ed8" },
    { key:"hg_emc",           label:"Histoire-Géo · EMC",  short:"HG-EMC",   color:"#8b5cf6" },
    { key:"sciences",         label:"Sciences",            short:"Sciences", color:"#16a34a" },
    { key:"oral",             label:"Oral (soutenance)",   short:"Oral",     color:"#f59e0b" },
    { key:"controle_continu", label:"Contrôle continu",    short:"C. continu", color:"#0891b2" },
  ],

  // Pas d'enseignements de spécialité au collège
  specialites: [],
  specYears: [],
  optField: null,

  // Mentions DNB (réutilise le style commun, sans félicitations ni 2nd groupe)
  mentions: {
    order: ["tb", "bien", "ab", "admis", "refuse"],
    config: MENTION_CONFIG,
    classify: getMentionKey,
  },

  data: {
    2024: ELEVES_DNB_2024,
    2025: ELEVES_DNB_2025,
    2026: ELEVES_DNB_2026,
  },
  official: {}, // dérivé automatiquement des données saisies
};
