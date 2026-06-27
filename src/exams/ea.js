// ── Configuration de l'examen : EA (Épreuves Anticipées de Français — 1ère) ───
// Épreuves passées en classe de Première. Données réelles 2021→2025 (le classeur
// 2021 ne contient que les noms de famille, sans prénom). 2026 en attente :
// nouvelle épreuve anticipée de mathématiques, différenciée spé / hors-spé maths.
// Le « score » = moyenne (Français écrit + Français oral) /20. Le champ « resultat »
// classe l'élève par tranche de performance sur /20 (pas de mention officielle aux EA).
import { MENTION_CONFIG } from "../data.js";

// Tranches de performance EA → réutilise les couleurs des mentions communes,
// avec des libellés adaptés (pas de mention officielle aux EA, ce sont des paliers /20).
export const EA_MENTION_CONFIG = {
  ...MENTION_CONFIG,
  tb:     { ...MENTION_CONFIG.tb,     label:"Très Bien (≥16)",    short:"≥16" },
  bien:   { ...MENTION_CONFIG.bien,   label:"Bien (≥14)",         short:"≥14" },
  ab:     { ...MENTION_CONFIG.ab,     label:"Assez Bien (≥12)",   short:"≥12" },
  admis:  { ...MENTION_CONFIG.admis,  label:"Satisfaisant (≥10)", short:"≥10" },
  refuse: { ...MENTION_CONFIG.refuse, label:"Fragile (<10)",      short:"<10" },
};

// Classement par tranche à partir du libellé stocké dans « resultat ».
export function eaClassify(resultat) {
  switch (resultat) {
    case "Très Bien":   return "tb";
    case "Bien":        return "bien";
    case "Assez Bien":  return "ab";
    case "Fragile":     return "refuse";
    case "Absent":      return "refuse";
    default:            return "admis"; // « Satisfaisant »
  }
}

export const ELEVES_EA_2021 = [
  { nom:"ABIDI", prenom:"", fr_ecrit:6, fr_oral:13, score:9.5, resultat:"Fragile" },
  { nom:"BARIC", prenom:"", fr_ecrit:12, fr_oral:12, score:12, resultat:"Assez Bien" },
  { nom:"CISSE", prenom:"", fr_ecrit:11, fr_oral:17, score:14, resultat:"Bien" },
  { nom:"CONSOL", prenom:"", fr_ecrit:11, fr_oral:14, score:12.5, resultat:"Assez Bien" },
  { nom:"COSTA E SOUZA", prenom:"", fr_ecrit:8, fr_oral:8, score:8, resultat:"Fragile" },
  { nom:"DIALLO", prenom:"", fr_ecrit:15, fr_oral:16, score:15.5, resultat:"Bien" },
  { nom:"DIOUF", prenom:"", fr_ecrit:11, fr_oral:11, score:11, resultat:"Satisfaisant" },
  { nom:"HUSSEIN", prenom:"", fr_ecrit:9, fr_oral:12, score:10.5, resultat:"Satisfaisant" },
  { nom:"LANZETTI MARINA", prenom:"", fr_ecrit:9, fr_oral:17, score:13, resultat:"Assez Bien" },
  { nom:"LANZETTI MARTINA", prenom:"", fr_ecrit:10, fr_oral:15, score:12.5, resultat:"Assez Bien" },
  { nom:"LEMOINE", prenom:"", fr_ecrit:7, fr_oral:19, score:13, resultat:"Assez Bien" },
  { nom:"MBOW", prenom:"", fr_ecrit:12, fr_oral:17, score:14.5, resultat:"Bien" },
  { nom:"NDIAYE", prenom:"", fr_ecrit:11, fr_oral:15, score:13, resultat:"Assez Bien" },
  { nom:"NDIONE", prenom:"", fr_ecrit:8, fr_oral:9, score:8.5, resultat:"Fragile" },
  { nom:"NDOYE", prenom:"", fr_ecrit:5, fr_oral:9, score:7, resultat:"Fragile" },
  { nom:"SARR", prenom:"", fr_ecrit:9, fr_oral:9, score:9, resultat:"Fragile" },
  { nom:"TALL", prenom:"", fr_ecrit:10, fr_oral:13, score:11.5, resultat:"Satisfaisant" },
  { nom:"DIONE", prenom:"", fr_ecrit:11, fr_oral:13, score:12, resultat:"Assez Bien" },
  { nom:"FALL NDEYE", prenom:"", fr_ecrit:8, fr_oral:8, score:8, resultat:"Fragile" },
  { nom:"FALL PAPE", prenom:"", fr_ecrit:10, fr_oral:11, score:10.5, resultat:"Satisfaisant" },
  { nom:"KOUADIO KOUADIO", prenom:"", fr_ecrit:10, fr_oral:11, score:10.5, resultat:"Satisfaisant" },
  { nom:"LE MOAL", prenom:"", fr_ecrit:8, fr_oral:17, score:12.5, resultat:"Assez Bien" },
  { nom:"MAR", prenom:"", fr_ecrit:9, fr_oral:13, score:11, resultat:"Satisfaisant" },
  { nom:"MBAYE BELKACI", prenom:"", fr_ecrit:6, fr_oral:14, score:10, resultat:"Satisfaisant" },
  { nom:"NDIAYE", prenom:"", fr_ecrit:12, fr_oral:12, score:12, resultat:"Assez Bien" },
  { nom:"TINE", prenom:"", fr_ecrit:6, fr_oral:13, score:9.5, resultat:"Fragile" },
  { nom:"WADE", prenom:"", fr_ecrit:11, fr_oral:13, score:12, resultat:"Assez Bien" },
];

export const ELEVES_EA_2022 = [
  { nom:"BA", prenom:"Dior Salla Beegay", fr_ecrit:6, fr_oral:8, score:7, resultat:"Fragile" },
  { nom:"BOUNHOURE", prenom:"Louise", fr_ecrit:17, fr_oral:20, score:18.5, resultat:"Très Bien" },
  { nom:"CALISKAN", prenom:"Omer-Nhung", fr_ecrit:13, fr_oral:15, score:14, resultat:"Bien" },
  { nom:"CHOLLIER", prenom:"Enzo Ousmane", fr_ecrit:6, fr_oral:14, score:10, resultat:"Satisfaisant" },
  { nom:"DELANDRE--CAILLE", prenom:"Tom Christian Patrice", fr_ecrit:9, fr_oral:11, score:10, resultat:"Satisfaisant" },
  { nom:"DIALLO", prenom:"Idrissa", fr_ecrit:5, fr_oral:12, score:8.5, resultat:"Fragile" },
  { nom:"DIOP", prenom:"Mansour Kisimba", fr_ecrit:14, fr_oral:17, score:15.5, resultat:"Bien" },
  { nom:"GAYE", prenom:"Mohamed Khaly", fr_ecrit:8, fr_oral:15, score:11.5, resultat:"Satisfaisant" },
  { nom:"GIRARDI", prenom:"Ogue", fr_ecrit:6, fr_oral:12, score:9, resultat:"Fragile" },
  { nom:"LE MOAL", prenom:"Cedric Aziz", fr_ecrit:7, fr_oral:12, score:9.5, resultat:"Fragile" },
  { nom:"MARIAT", prenom:"Daniel", fr_ecrit:4, fr_oral:7, score:5.5, resultat:"Fragile" },
  { nom:"MARTY", prenom:"Aymeric", fr_ecrit:6, fr_oral:12, score:9, resultat:"Fragile" },
  { nom:"MBAYE", prenom:"Bedou-Babaly", fr_ecrit:13, fr_oral:17, score:15, resultat:"Bien" },
  { nom:"MBENGUE", prenom:"El Hadj Saara Cheikh Oumar", fr_ecrit:12, fr_oral:10, score:11, resultat:"Satisfaisant" },
  { nom:"VERSIGLIONI", prenom:"Tom Ergiro Tony", fr_ecrit:4, fr_oral:16, score:10, resultat:"Satisfaisant" },
];

export const ELEVES_EA_2023 = [
  { nom:"SENE", prenom:"Lena", fr_ecrit:10, fr_oral:14, score:12, resultat:"Assez Bien" },
  { nom:"NDIAYE", prenom:"Mouhamed Bachir", fr_ecrit:12, fr_oral:16, score:14, resultat:"Bien" },
  { nom:"DHENIN", prenom:"Chloé", fr_ecrit:12, fr_oral:16, score:14, resultat:"Bien" },
  { nom:"GASSAMA", prenom:"Dieynaba", fr_ecrit:14, fr_oral:16, score:15, resultat:"Bien" },
  { nom:"DESCHUYTER", prenom:"Alicia", fr_ecrit:17, fr_oral:20, score:18.5, resultat:"Très Bien" },
  { nom:"AUQUE", prenom:"Margaux", fr_ecrit:13, fr_oral:18, score:15.5, resultat:"Bien" },
  { nom:"AUREJAC", prenom:"Nanou", fr_ecrit:13, fr_oral:16, score:14.5, resultat:"Bien" },
  { nom:"BA", prenom:"Mohamed Madiama", fr_ecrit:12, fr_oral:16, score:14, resultat:"Bien" },
  { nom:"CISSE", prenom:"Serigne", fr_ecrit:9, fr_oral:12, score:10.5, resultat:"Satisfaisant" },
  { nom:"DERVAL", prenom:"Antoine", fr_ecrit:15, fr_oral:12, score:13.5, resultat:"Assez Bien" },
  { nom:"DIALLO", prenom:"Babacar", fr_ecrit:8, fr_oral:10, score:9, resultat:"Fragile" },
  { nom:"DIEYE", prenom:"Alyssa", fr_ecrit:12, fr_oral:18, score:15, resultat:"Bien" },
  { nom:"DURIN", prenom:"Louise", fr_ecrit:17, fr_oral:15, score:16, resultat:"Très Bien" },
  { nom:"GALAND", prenom:"Noemie", fr_ecrit:15, fr_oral:14, score:14.5, resultat:"Bien" },
  { nom:"HUCHARD", prenom:"Nicolas", fr_ecrit:17, fr_oral:12, score:14.5, resultat:"Bien" },
  { nom:"LAH", prenom:"Anaya", fr_ecrit:12, fr_oral:16, score:14, resultat:"Bien" },
  { nom:"ONCINA", prenom:"Iyan", fr_ecrit:16, fr_oral:15, score:15.5, resultat:"Bien" },
  { nom:"SOW", prenom:"Daly", fr_ecrit:13, fr_oral:16, score:14.5, resultat:"Bien" },
];

export const ELEVES_EA_2024 = [
  { nom:"SIDHOUM", prenom:"Anas", fr_ecrit:7, fr_oral:9, score:8, resultat:"Fragile" },
  { nom:"DIACK", prenom:"Babacar Sadikh", fr_ecrit:8, fr_oral:10, score:9, resultat:"Fragile" },
  { nom:"EL HAQAOUI", prenom:"Lokmane Abdelhakim", fr_ecrit:7, fr_oral:11, score:9, resultat:"Fragile" },
  { nom:"FORTES", prenom:"Claudia", fr_ecrit:8, fr_oral:10, score:9, resultat:"Fragile" },
  { nom:"SOW", prenom:"Diyé", fr_ecrit:8, fr_oral:11, score:9.5, resultat:"Fragile" },
  { nom:"CLEMENT DE GIVRY", prenom:"Christine", fr_ecrit:10, fr_oral:10, score:10, resultat:"Satisfaisant" },
  { nom:"GUEYE", prenom:"Annie Aby", fr_ecrit:8, fr_oral:12, score:10, resultat:"Satisfaisant" },
  { nom:"NDOYE", prenom:"Estanislas Ndoffene", fr_ecrit:8, fr_oral:12, score:10, resultat:"Satisfaisant" },
  { nom:"BALAGUN", prenom:"Attie Eymerick Chahid Hamid", fr_ecrit:12, fr_oral:9, score:10.5, resultat:"Satisfaisant" },
  { nom:"FALL", prenom:"Tom Terence Yves", fr_ecrit:10, fr_oral:11, score:10.5, resultat:"Satisfaisant" },
  { nom:"NDIAYE", prenom:"David Thioucouly", fr_ecrit:13, fr_oral:9, score:11, resultat:"Satisfaisant" },
  { nom:"BONNIER TRAN", prenom:"Hugo", fr_ecrit:9, fr_oral:14, score:11.5, resultat:"Satisfaisant" },
  { nom:"TABOURE", prenom:"Cherif Hassane", fr_ecrit:8, fr_oral:15, score:11.5, resultat:"Satisfaisant" },
  { nom:"KA", prenom:"Ardo Hampate", fr_ecrit:8, fr_oral:16, score:12, resultat:"Assez Bien" },
  { nom:"JOSSERAND", prenom:"Mayli", fr_ecrit:11, fr_oral:14, score:12.5, resultat:"Assez Bien" },
  { nom:"AZIZ", prenom:"Kenza", fr_ecrit:14, fr_oral:12, score:13, resultat:"Assez Bien" },
  { nom:"BOURVEN", prenom:"Leonie", fr_ecrit:16, fr_oral:12, score:14, resultat:"Bien" },
  { nom:"ABOUD", prenom:"Gaelle Marie", fr_ecrit:13, fr_oral:16, score:14.5, resultat:"Bien" },
  { nom:"AZIZ", prenom:"Rita", fr_ecrit:16, fr_oral:13, score:14.5, resultat:"Bien" },
  { nom:"BOUNHOURE", prenom:"Raphaël", fr_ecrit:11, fr_oral:18, score:14.5, resultat:"Bien" },
  { nom:"NOUHANDO ROD", prenom:"Nicolas", fr_ecrit:12, fr_oral:17, score:14.5, resultat:"Bien" },
  { nom:"MBAYE", prenom:"Aissatou", fr_ecrit:14, fr_oral:16, score:15, resultat:"Bien" },
  { nom:"OZDEMIR", prenom:"Berrak", fr_ecrit:17, fr_oral:14, score:15.5, resultat:"Bien" },
  { nom:"BIANQUINCH", prenom:"Tessy", fr_ecrit:15, fr_oral:19, score:17, resultat:"Très Bien" },
  { nom:"LHUSSIER", prenom:"Paul-Clement", fr_ecrit:16, fr_oral:20, score:18, resultat:"Très Bien" },
  { nom:"MAUNY", prenom:"Hélèna", fr_ecrit:18, fr_oral:18, score:18, resultat:"Très Bien" },
  { nom:"MARTINEZ", prenom:"Marina", fr_ecrit:18, fr_oral:19, score:18.5, resultat:"Très Bien" },
  { nom:"HACHIM", prenom:"Lina", fr_ecrit:18, fr_oral:20, score:19, resultat:"Très Bien" },
];

export const ELEVES_EA_2025 = [
  { nom:"BA", prenom:"Khalifa Ababacar", fr_ecrit:11, fr_oral:18, score:14.5, resultat:"Bien" },
  { nom:"BABO", prenom:"Yanis Christopher Gnezebo", fr_ecrit:18, fr_oral:16, score:17, resultat:"Très Bien" },
  { nom:"BRUNIE", prenom:"Sarah Amandine", fr_ecrit:9, fr_oral:13, score:11, resultat:"Satisfaisant" },
  { nom:"BUOVOLO", prenom:"Mariam", fr_ecrit:19, fr_oral:18, score:18.5, resultat:"Très Bien" },
  { nom:"CERNEJESKI", prenom:"Hugo", fr_ecrit:9, fr_oral:10, score:9.5, resultat:"Fragile" },
  { nom:"CISSE", prenom:"Combe", fr_ecrit:9, fr_oral:14, score:11.5, resultat:"Satisfaisant" },
  { nom:"CISSE", prenom:"Ibrahima", fr_ecrit:9, fr_oral:18, score:13.5, resultat:"Assez Bien" },
  { nom:"DIOP", prenom:"Astou", fr_ecrit:11, fr_oral:18, score:14.5, resultat:"Bien" },
  { nom:"DJOUKWE", prenom:"David Levi", fr_ecrit:9, fr_oral:13, score:11, resultat:"Satisfaisant" },
  { nom:"FALL", prenom:"Djellya Yacine", fr_ecrit:17, fr_oral:16, score:16.5, resultat:"Très Bien" },
  { nom:"GAZI", prenom:"Ethan Charles", fr_ecrit:8, fr_oral:11, score:9.5, resultat:"Fragile" },
  { nom:"JACOBE", prenom:"Lou", fr_ecrit:13, fr_oral:16, score:14.5, resultat:"Bien" },
  { nom:"LANZETTI", prenom:"Luigi", fr_ecrit:12, fr_oral:15, score:13.5, resultat:"Assez Bien" },
  { nom:"LY-NELCY", prenom:"Inaïssa", fr_ecrit:18, fr_oral:18, score:18, resultat:"Très Bien" },
  { nom:"MBOUP", prenom:"Mame Diarra", fr_ecrit:17, fr_oral:17, score:17, resultat:"Très Bien" },
  { nom:"MBOW", prenom:"Ramatoulaye", fr_ecrit:17, fr_oral:15, score:16, resultat:"Très Bien" },
  { nom:"MESSINA--EMIEUX", prenom:"Tom", fr_ecrit:8, fr_oral:14, score:11, resultat:"Satisfaisant" },
  { nom:"MONTMASSON", prenom:"Helena Amy", fr_ecrit:18, fr_oral:17, score:17.5, resultat:"Très Bien" },
  { nom:"NDOUR", prenom:"Fatou", fr_ecrit:8, fr_oral:14, score:11, resultat:"Satisfaisant" },
  { nom:"RISPAL", prenom:"Charlie Lou Jane", fr_ecrit:11, fr_oral:17, score:14, resultat:"Bien" },
  { nom:"SIDHOUM", prenom:"Anas", fr_ecrit:9, fr_oral:9, score:9, resultat:"Fragile" },
  { nom:"SOBLOG", prenom:"Oscar Jephte Joseph", fr_ecrit:11, fr_oral:16, score:13.5, resultat:"Assez Bien" },
  { nom:"SOW", prenom:"Aminata Soraya", fr_ecrit:13, fr_oral:13, score:13, resultat:"Assez Bien" },
  { nom:"SOW", prenom:"Diye", fr_ecrit:11, fr_oral:11, score:11, resultat:"Satisfaisant" },
  { nom:"WONE", prenom:"Fatimata", fr_ecrit:16, fr_oral:10, score:13, resultat:"Assez Bien" },
  { nom:"ABOUDOU AMOUSSA", prenom:"Inès Naïmatou Olayémi", fr_ecrit:11, fr_oral:13, score:12, resultat:"Assez Bien" },
  { nom:"APACK", prenom:"Nayla Marie", fr_ecrit:16, fr_oral:14, score:15, resultat:"Bien" },
  { nom:"ARRON", prenom:"Hélène", fr_ecrit:20, fr_oral:18, score:19, resultat:"Très Bien" },
  { nom:"BA", prenom:"Sarah Nadine", fr_ecrit:null, fr_oral:9, score:9, resultat:"Fragile" },
  { nom:"BARIC", prenom:"Yerim Cyprien", fr_ecrit:14, fr_oral:15, score:14.5, resultat:"Bien" },
  { nom:"BASTIDE AHMED", prenom:"Malik", fr_ecrit:10, fr_oral:16, score:13, resultat:"Assez Bien" },
  { nom:"BELKHAYAT ZOUKKARI", prenom:"Mouna", fr_ecrit:15, fr_oral:18, score:16.5, resultat:"Très Bien" },
  { nom:"BRARD", prenom:"Louka", fr_ecrit:12, fr_oral:14, score:13, resultat:"Assez Bien" },
  { nom:"DANCOING", prenom:"Louna Amina", fr_ecrit:18, fr_oral:14, score:16, resultat:"Très Bien" },
  { nom:"DE GAIGNERON JOLLIMON DE MAROLLES", prenom:"Philippine Sabine Marie", fr_ecrit:15, fr_oral:19, score:17, resultat:"Très Bien" },
  { nom:"FALL CLAMENS", prenom:"Omar Louis", fr_ecrit:7, fr_oral:12, score:9.5, resultat:"Fragile" },
  { nom:"GALAND", prenom:"Aurélien", fr_ecrit:10, fr_oral:15, score:12.5, resultat:"Assez Bien" },
  { nom:"KOUROUMA", prenom:"Bakary", fr_ecrit:10, fr_oral:14, score:12, resultat:"Assez Bien" },
  { nom:"MALELA", prenom:"Dylan", fr_ecrit:12, fr_oral:16, score:14, resultat:"Bien" },
  { nom:"MERDJANOPOULOS", prenom:"Louka Jeff Gérard", fr_ecrit:12, fr_oral:14, score:13, resultat:"Assez Bien" },
  { nom:"MINGOU", prenom:"Cécilia Rita", fr_ecrit:11, fr_oral:12, score:11.5, resultat:"Satisfaisant" },
  { nom:"MOUABE", prenom:"Aaron Stephane", fr_ecrit:10, fr_oral:18, score:14, resultat:"Bien" },
  { nom:"N'JAMBONG", prenom:"Asaja-Samba", fr_ecrit:13, fr_oral:20, score:16.5, resultat:"Très Bien" },
  { nom:"NDAW", prenom:"Mary Louise Yacine", fr_ecrit:13, fr_oral:20, score:16.5, resultat:"Très Bien" },
  { nom:"NGOM", prenom:"Khadija", fr_ecrit:12, fr_oral:18, score:15, resultat:"Bien" },
  { nom:"NIANG", prenom:"Papa Ibrahima Cheikh", fr_ecrit:10, fr_oral:14, score:12, resultat:"Assez Bien" },
  { nom:"PERINER", prenom:"Angie Michelle Ruby", fr_ecrit:15, fr_oral:18, score:16.5, resultat:"Très Bien" },
  { nom:"RAGUIN", prenom:"Kesya Marème Thérèse", fr_ecrit:18, fr_oral:16, score:17, resultat:"Très Bien" },
  { nom:"ROWLAND", prenom:"Noah Dilhane", fr_ecrit:9, fr_oral:11, score:10, resultat:"Satisfaisant" },
  { nom:"SON", prenom:"Ye Seon", fr_ecrit:19, fr_oral:19, score:19, resultat:"Très Bien" },
  { nom:"WERLY", prenom:"Tristan", fr_ecrit:14, fr_oral:17, score:15.5, resultat:"Bien" },
  { nom:"ZARB", prenom:"Frédy", fr_ecrit:12, fr_oral:14, score:13, resultat:"Assez Bien" },
];

// 2026 — en attente des résultats. Nouvelle épreuve anticipée de mathématiques :
// modèle d'un élève 2026 (deux épreuves de maths distinctes selon le profil) :
//   { nom, prenom, fr_ecrit, fr_oral,
//     maths_spe:true|false,           // l'élève suit-il la spécialité maths ?
//     maths_spe_note:<note|null>,     // note si profil « spé maths »
//     maths_tc_note:<note|null>,      // note si profil « tronc commun »
//     score, resultat }
// Les épreuves maths_spe_note / maths_tc_note n'apparaissent qu'une fois saisies
// (elles restent masquées tant qu'aucune donnée 2026 n'existe).
export const ELEVES_EA_2026 = [];

export const eaExam = {
  id: "ea",
  label: "Épreuves Anticipées",
  short: "EA",
  niveau: "1ère",
  emoji: "✍️",
  scoreMax: 20,
  years: [2021, 2022, 2023, 2024, 2025, 2026],
  yearColors: { 2021:"#cbd5e1", 2022:"#a5b4fc", 2023:"#818cf8", 2024:"#a78bfa", 2025:"#8b5cf6", 2026:"#7c3aed" },

  // Épreuves communes à toutes les promotions. Les deux épreuves de maths 2026
  // ne portent que sur l'année 2026 (champ « years »), elles restent invisibles
  // tant qu'aucune note n'est saisie.
  epreuves: [
    { key:"fr_ecrit",       label:"Français écrit",          short:"Fr. écrit",  color:"#2563eb" },
    { key:"fr_oral",        label:"Français oral",           short:"Fr. oral",   color:"#10b981" },
    { key:"maths_spe_note", label:"Maths (spé)",             short:"Maths spé",  color:"#f59e0b", years:[2026] },
    { key:"maths_tc_note",  label:"Maths (tronc commun)",    short:"Maths TC",   color:"#ef4444", years:[2026] },
  ],

  specialites: [],
  specYears: [],
  optField: null,

  // Différenciation spé maths / hors-spé pour 2026 : champ booléen + comparaison
  // de groupes (activée automatiquement dès que des données 2026 existent).
  groupField: {
    key: "maths_spe",
    label: "Spé maths",
    years: [2026],
    groups: [
      { value: true,  label: "Spé maths",     note: "maths_spe_note", color:"#f59e0b" },
      { value: false, label: "Tronc commun",  note: "maths_tc_note",  color:"#ef4444" },
    ],
  },

  mentions: {
    order: ["tb", "bien", "ab", "admis", "refuse"],
    config: EA_MENTION_CONFIG,
    classify: eaClassify,
  },

  data: {
    2021: ELEVES_EA_2021,
    2022: ELEVES_EA_2022,
    2023: ELEVES_EA_2023,
    2024: ELEVES_EA_2024,
    2025: ELEVES_EA_2025,
    2026: ELEVES_EA_2026,
  },
  official: {}, // dérivé automatiquement des données saisies
};
