// ── Configuration de l'examen : BACCALAURÉAT ──────────────────────────────────
// Les données brutes restent dans ../data.js (source : Google Sheets RESULTATS BAC LFJP SALY)
import {
  ELEVES_2022, ELEVES_2023, ELEVES_2024, ELEVES_2025, ELEVES_2026,
  OFFICIAL_STATS, getMentionKey, MENTION_CONFIG,
} from "../data.js";

export const bacExam = {
  id: "bac",
  label: "Baccalauréat",
  short: "BAC",
  niveau: "Terminale",
  emoji: "🎓",
  scoreMax: 20,
  years: [2022, 2023, 2024, 2025, 2026],
  yearColors: { 2022:"#9ca3af", 2023:"#6b7280", 2024:"#8b5cf6", 2025:"#3b82f6", 2026:"#2563eb" },

  // Épreuves du tronc commun
  epreuves: [
    { key:"fr_ecrit",   label:"Français écrit", short:"Fr. écrit",  color:"#2563eb" },
    { key:"fr_oral",    label:"Français oral",  short:"Fr. oral",   color:"#10b981" },
    { key:"philo",      label:"Philosophie",    short:"Philo",      color:"#8b5cf6" },
    { key:"grand_oral", label:"Grand oral",     short:"Grand oral", color:"#f59e0b" },
  ],

  // Enseignements de spécialité
  specialites: [
    { key:"hggsp",      label:"HGGSP",           short:"HGGSP",    color:"#7c3aed" },
    { key:"ses",        label:"SES",             short:"SES",      color:"#0891b2" },
    { key:"llce",       label:"LLCE Anglais",    short:"LLCE",     color:"#d97706" },
    { key:"maths",      label:"Maths",           short:"Maths",    color:"#1d4ed8" },
    { key:"phy_chimie", label:"Physique-Chimie", short:"Phy-Chim", color:"#dc2626" },
    { key:"svt",        label:"SVT",             short:"SVT",      color:"#16a34a" },
    { key:"nsi",        label:"NSI",             short:"NSI",      color:"#db2777" },
  ],
  specYears: [2023, 2024, 2025, 2026],

  // Champ optionnel : spécialité de 1ère abandonnée
  optField: { key:"opt", label:"Spé. de 1ère (abandonnée)", short:"Spé. 1ère", classAvg:11.65 },

  // Mentions
  mentions: {
    order: ["felicitations", "tb", "bien", "ab", "admis", "sg", "refuse"],
    config: MENTION_CONFIG,
    classify: getMentionKey,
  },

  // Données et statistiques officielles
  data: {
    2022: ELEVES_2022, 2023: ELEVES_2023, 2024: ELEVES_2024,
    2025: ELEVES_2025, 2026: ELEVES_2026,
  },
  official: OFFICIAL_STATS,
};
