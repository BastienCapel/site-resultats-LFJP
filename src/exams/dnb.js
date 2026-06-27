// ── Configuration de l'examen : DNB (Diplôme National du Brevet) ──────────────
// Barème ramené sur /20 pour homogénéiser l'affichage avec le BAC et les EA.
// Mentions (équivalent /20) : Assez Bien ≥12, Bien ≥14, Très Bien ≥16.
import { getMentionKey, MENTION_CONFIG } from "../data.js";

// Modèle d'un élève DNB (à remplir) :
// { nom, prenom, francais, maths, hg_emc, sciences, oral, controle_continu,
//   score, resultat:"Admis Mention Bien" }

export const ELEVES_DNB_2024 = [];
export const ELEVES_DNB_2025 = [];
export const ELEVES_DNB_2026 = [
  { nom: "AUQUE", prenom: "Margaux Léane", score: 15.16, resultat: "Admis Mention Bien" },
  { nom: "AUREJAC", prenom: "Nanou Fatou Rachel", score: 13.82, resultat: "Admis Mention Assez Bien" },
  { nom: "BASSENE", prenom: "Maxence", score: 16.65, resultat: "Admis Mention Très Bien" },
  { nom: "BEN SAID MASS", prenom: "Aicha Corinne", score: 10.22, resultat: "Admis" },
  { nom: "CISSE", prenom: "Serigne Abdou Aziz", score: 14.72, resultat: "Admis Mention Bien" },
  { nom: "CLAD", prenom: "Steffen", score: 10, resultat: "Admis" },
  { nom: "DEBOES", prenom: "Iman", score: 14.3, resultat: "Admis Mention Bien" },
  { nom: "DERVAL", prenom: "Antoine Julien", score: 14.9, resultat: "Admis Mention Bien" },
  { nom: "DESCHUYTER", prenom: "Alicia", score: 18.05, resultat: "Admis Mention Très Bien" },
  { nom: "DHENIN", prenom: "Chloé", score: 14.22, resultat: "Admis Mention Bien" },
  { nom: "DIA", prenom: "Gwendoline Aïcha", score: 10.31, resultat: "Admis" },
  { nom: "DIA", prenom: "Mamadou", score: 11.5, resultat: "Admis" },
  { nom: "DIEYE", prenom: "Alyssa", score: 15.26, resultat: "Admis Mention Bien" },
  { nom: "GARA", prenom: "Aïda", score: 17.2, resultat: "Admis Mention Très Bien" },
  { nom: "GASSAMA", prenom: "Dieynaba", score: 14.16, resultat: "Admis Mention Bien" },
  { nom: "KANDJI", prenom: "Elhadj Mactar", score: 12.95, resultat: "Admis Mention Assez Bien" },
  { nom: "MBENGUE", prenom: "Ndeye Saly", score: 8.65, resultat: "Refusé" },
  { nom: "MECHALLAL", prenom: "Anissa", score: 15.55, resultat: "Admis Mention Bien" },
  { nom: "NDIAYE", prenom: "Mouhamed Bachir", score: 15.94, resultat: "Admis Mention Bien" },
  { nom: "NIOX", prenom: "Amary René", score: 12.09, resultat: "Admis Mention Assez Bien" },
  { nom: "ONCINA", prenom: "Iyan Tidiane Manuel", score: 15.56, resultat: "Admis Mention Bien" },
  { nom: "PAILLARD", prenom: "Thomas René Thierry", score: 9, resultat: "Absent" },
  { nom: "RASHID", prenom: "Lina Sonia", score: 15.3, resultat: "Admis Mention Bien" },
  { nom: "SENE", prenom: "Lena", score: 12.31, resultat: "Admis Mention Assez Bien" },
  { nom: "SENE", prenom: "Moussa", score: 12.99, resultat: "Admis Mention Assez Bien" },
  { nom: "SY", prenom: "Seynabou Babacar", score: 16.9, resultat: "Admis Mention Très Bien" },
  { nom: "TEBER", prenom: "Nihat", score: 12.04, resultat: "Admis Mention Assez Bien" },
  { nom: "TOURE", prenom: "Dahina", score: 12.11, resultat: "Admis Mention Assez Bien" }
];

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
