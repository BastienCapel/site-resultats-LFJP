// ── Configuration de l'examen : DNB (Diplôme National du Brevet) ──────────────
// Barème ramené sur /20 pour homogénéiser l'affichage avec le BAC et les EA.
// Mentions (équivalent /20) : Assez Bien ≥12, Bien ≥14, Très Bien ≥16.
import { getMentionKey, MENTION_CONFIG } from "../data.js";

// Modèle d'un élève DNB :
// { nom, prenom, francais, maths, hg_emc, sciences, oral, controle_continu,
//   score, resultat }

export const ELEVES_DNB_2021 = [
  {
    "nom": "AUQUE",
    "prenom": "Margaux Léane",
    "score": 15.16,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "AUREJAC",
    "prenom": "Nanou Fatou Rachel",
    "score": 13.82,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "BASSENE",
    "prenom": "Maxence",
    "score": 16.65,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "BEN SAID MASS",
    "prenom": "Aicha Corinne",
    "score": 10.22,
    "resultat": "Admis"
  },
  {
    "nom": "CISSE",
    "prenom": "Serigne Abdou Aziz",
    "score": 14.72,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "CLAD",
    "prenom": "Steffen",
    "score": 10,
    "resultat": "Admis"
  },
  {
    "nom": "DEBOES",
    "prenom": "Iman",
    "score": 14.3,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "DERVAL",
    "prenom": "Antoine Julien",
    "score": 14.9,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "DESCHUYTER",
    "prenom": "Alicia",
    "score": 18.05,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "DHENIN",
    "prenom": "Chloé",
    "score": 14.22,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "DIA",
    "prenom": "Gwendoline Aïcha",
    "score": 10.31,
    "resultat": "Admis"
  },
  {
    "nom": "DIA",
    "prenom": "Mamadou",
    "score": 11.5,
    "resultat": "Admis"
  },
  {
    "nom": "DIEYE",
    "prenom": "Alyssa",
    "score": 15.26,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "GARA",
    "prenom": "Aïda",
    "score": 17.2,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "GASSAMA",
    "prenom": "Dieynaba",
    "score": 14.16,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "KANDJI",
    "prenom": "Elhadj Mactar",
    "score": 12.95,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "MBENGUE",
    "prenom": "Ndeye Saly",
    "score": 8.65,
    "resultat": "Refusé"
  },
  {
    "nom": "MECHALLAL",
    "prenom": "Anissa",
    "score": 15.55,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "NDIAYE",
    "prenom": "Mouhamed Bachir",
    "score": 15.94,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "NIOX",
    "prenom": "Amary René",
    "score": 12.09,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "ONCINA",
    "prenom": "Iyan Tidiane Manuel",
    "score": 15.56,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "PAILLARD",
    "prenom": "Thomas René Thierry",
    "score": 9,
    "resultat": "Absent"
  },
  {
    "nom": "RASHID",
    "prenom": "Lina Sonia",
    "score": 15.3,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "SENE",
    "prenom": "Lena",
    "score": 12.31,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "SENE",
    "prenom": "Moussa",
    "score": 12.99,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "SY",
    "prenom": "Seynabou Babacar",
    "score": 16.9,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "TEBER",
    "prenom": "Nihat",
    "score": 12.04,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "TOURE",
    "prenom": "Dahina",
    "score": 12.11,
    "resultat": "Admis Mention Assez Bien"
  }
];

export const ELEVES_DNB_2022 = [
  {
    "nom": "ABOUD",
    "prenom": "Gaelle",
    "score": 14.29,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "AZIZ",
    "prenom": "Kenza",
    "score": 14,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "AZIZ",
    "prenom": "Rita",
    "score": 14,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "BALAGUN",
    "prenom": "Attie Eymerick",
    "score": 12.05,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "BIANQUINCH",
    "prenom": "Tessy Ethiera",
    "score": 14.22,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "BOUNHOURE",
    "prenom": "Raphael",
    "score": 18.25,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "CLEMENT DE GIVRY",
    "prenom": "Christine",
    "score": 14,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "COMTE",
    "prenom": "Chloe",
    "score": 14,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "DIOUF",
    "prenom": "Aminata",
    "score": 14.26,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "EL HAQAOUI",
    "prenom": "Lokmane Abdelhakim",
    "score": 12.05,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "FALL",
    "prenom": "Tom",
    "score": 12.62,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "FORTES",
    "prenom": "Claudia Larissa",
    "score": 14.14,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "GUEYE",
    "prenom": "Mohamed",
    "score": 10,
    "resultat": "Admis"
  },
  {
    "nom": "HACHIM",
    "prenom": "Lina",
    "score": 16.86,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "HOUOT",
    "prenom": "Alaric",
    "score": 5.55,
    "resultat": "Refusé"
  },
  {
    "nom": "JOSSERAND",
    "prenom": "Mayli",
    "score": 14.31,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "KABAZ",
    "prenom": "Lyne",
    "score": 12.99,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "LHUSSIER",
    "prenom": "Paul-Clement",
    "score": 17.32,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "MAGNIER",
    "prenom": "Arthur",
    "score": 12,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "MAROT",
    "prenom": "Rohan Jeff",
    "score": 10.71,
    "resultat": "Admis"
  },
  {
    "nom": "MAUNY",
    "prenom": "Helena",
    "score": 17.25,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "NDIAYE",
    "prenom": "David",
    "score": 11.16,
    "resultat": "Admis"
  },
  {
    "nom": "NOUHANDO ROD",
    "prenom": "Nicolas",
    "score": 11.18,
    "resultat": "Admis"
  },
  {
    "nom": "OZDEMIR",
    "prenom": "Berrak",
    "score": 16.76,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "PERRIERE",
    "prenom": "Esteban Bernard",
    "score": 8.72,
    "resultat": "Refusé"
  },
  {
    "nom": "RAPHAT",
    "prenom": "Erika",
    "score": 10,
    "resultat": "Admis"
  },
  {
    "nom": "SERVATE",
    "prenom": "Leandre",
    "score": 10.26,
    "resultat": "Admis"
  },
  {
    "nom": "SIDHOUM",
    "prenom": "Anas",
    "score": 10,
    "resultat": "Admis"
  },
  {
    "nom": "SOW",
    "prenom": "Diye",
    "score": 13.09,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "THIANE",
    "prenom": "Cheikh Mouhamadou",
    "score": 8.72,
    "resultat": "Refusé"
  }
];

export const ELEVES_DNB_2023 = [
  {
    "nom": "ACETO",
    "prenom": "Adama",
    "francais": 7,
    "maths": 10.4,
    "hg_emc": 8.8,
    "sciences": 11,
    "oral": 9.4,
    "controle_continu": 12.25,
    "score": 10.72,
    "resultat": "Admis"
  },
  {
    "nom": "BRARD",
    "prenom": "Louka",
    "francais": 6,
    "maths": 7.2,
    "hg_emc": 8.4,
    "sciences": 6,
    "oral": 11.5,
    "controle_continu": 15,
    "score": 11.49,
    "resultat": "Admis"
  },
  {
    "nom": "DAVILLER",
    "prenom": "Paul",
    "francais": 6.1,
    "maths": 9.8,
    "hg_emc": 10.4,
    "sciences": 10.6,
    "oral": 11.2,
    "controle_continu": 12.25,
    "score": 10.83,
    "resultat": "Admis"
  },
  {
    "nom": "DIENG",
    "prenom": "Seydina-Omar",
    "francais": 9.6,
    "maths": 5.2,
    "hg_emc": 8.8,
    "sciences": 7.6,
    "oral": 16.8,
    "controle_continu": 12.25,
    "score": 11.1,
    "resultat": "Admis"
  },
  {
    "nom": "MESSINA",
    "prenom": "Tom",
    "francais": 9.4,
    "maths": 7.6,
    "hg_emc": 6.2,
    "sciences": 10,
    "oral": 14,
    "controle_continu": 12.75,
    "score": 11.27,
    "resultat": "Admis"
  },
  {
    "nom": "PORQUET",
    "prenom": "Thomas",
    "francais": 6,
    "maths": 5.8,
    "hg_emc": 8.4,
    "sciences": 7.4,
    "oral": 12.1,
    "controle_continu": 13.5,
    "score": 10.73,
    "resultat": "Admis"
  },
  {
    "nom": "ROWLAND",
    "prenom": "Noah",
    "francais": 5.1,
    "maths": 13,
    "hg_emc": 8,
    "sciences": 9.8,
    "oral": 5.4,
    "controle_continu": 14.5,
    "score": 11.3,
    "resultat": "Admis"
  },
  {
    "nom": "SALL",
    "prenom": "Océane",
    "francais": 4.8,
    "maths": 3.8,
    "hg_emc": 7.6,
    "sciences": 6.4,
    "oral": 10.5,
    "controle_continu": 13.5,
    "score": 10.02,
    "resultat": "Admis"
  },
  {
    "nom": "SAVI",
    "prenom": "Loris Tahirou",
    "francais": 7.9,
    "maths": 10.8,
    "hg_emc": 6,
    "sciences": 4.8,
    "oral": 14.3,
    "controle_continu": 11.5,
    "score": 10.55,
    "resultat": "Admis"
  },
  {
    "nom": "SOW",
    "prenom": "Cheikh",
    "francais": 10.7,
    "maths": 5.6,
    "hg_emc": 8.4,
    "sciences": 6.4,
    "oral": 8.2,
    "controle_continu": 13.5,
    "score": 10.74,
    "resultat": "Admis"
  },
  {
    "nom": "ACETO",
    "prenom": "Awa",
    "francais": 8.5,
    "maths": 11,
    "hg_emc": 9.2,
    "sciences": 15,
    "oral": 10.8,
    "controle_continu": 15.25,
    "score": 12.93,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "APACK",
    "prenom": "Nayla",
    "francais": 8.5,
    "maths": 8.8,
    "hg_emc": 15.2,
    "sciences": 11.2,
    "oral": 11.8,
    "controle_continu": 16.5,
    "score": 13.54,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "BA",
    "prenom": "Khalifa",
    "francais": 5.2,
    "maths": 11,
    "hg_emc": 14.4,
    "sciences": 9.2,
    "oral": 12,
    "controle_continu": 15.5,
    "score": 12.75,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "BRUNIE",
    "prenom": "Sarah",
    "francais": 10.2,
    "maths": 10.2,
    "hg_emc": 11.6,
    "sciences": 9.4,
    "oral": 15,
    "controle_continu": 14.5,
    "score": 12.99,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "CISSE",
    "prenom": "Ibrahim",
    "francais": 6.7,
    "maths": 6.2,
    "hg_emc": 6.2,
    "sciences": 9,
    "oral": 18.5,
    "controle_continu": 14.25,
    "score": 12,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "FALL CLAMENS",
    "prenom": "Omar Louis",
    "francais": 10.1,
    "maths": 7,
    "hg_emc": 8,
    "sciences": 12.4,
    "oral": 17.5,
    "controle_continu": 13.5,
    "score": 12.35,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "FARAH",
    "prenom": "Sami",
    "francais": 7,
    "maths": 11,
    "hg_emc": 7.6,
    "sciences": 16,
    "oral": 18.4,
    "controle_continu": 14.25,
    "score": 13.15,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "GAZI",
    "prenom": "Ethan",
    "francais": 6.6,
    "maths": 7.6,
    "hg_emc": 5,
    "sciences": 8.6,
    "oral": 15,
    "controle_continu": 15,
    "score": 12,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "LANZETTI",
    "prenom": "Luigi",
    "francais": 13.9,
    "maths": 9.2,
    "hg_emc": 11.2,
    "sciences": 13.8,
    "oral": 14.2,
    "controle_continu": 13.75,
    "score": 13.1,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "MINGOU",
    "prenom": "Cécilia Rita",
    "francais": 9.2,
    "maths": 3.6,
    "hg_emc": 9.2,
    "sciences": 11.2,
    "oral": 16,
    "controle_continu": 15,
    "score": 12.38,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "NDOUR",
    "prenom": "Fatou",
    "francais": 5.9,
    "maths": 8.2,
    "hg_emc": 8,
    "sciences": 8.6,
    "oral": 13.6,
    "controle_continu": 15,
    "score": 12,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "SALL",
    "prenom": "Aminata",
    "francais": 10,
    "maths": 7.6,
    "hg_emc": 8.6,
    "sciences": 11.4,
    "oral": 12.8,
    "controle_continu": 14.5,
    "score": 12.3,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "SPINELLI",
    "prenom": "Chiara Juliana",
    "francais": 7.5,
    "maths": 7,
    "hg_emc": 11.2,
    "sciences": 11.2,
    "oral": 20,
    "controle_continu": 13,
    "score": 12.22,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "CARDONE",
    "prenom": "Anthony",
    "francais": 8.1,
    "maths": 9,
    "hg_emc": 9.6,
    "sciences": 8.2,
    "oral": 16,
    "controle_continu": 17.5,
    "score": 14,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "DANCOING",
    "prenom": "Louna",
    "francais": 9.4,
    "maths": 11,
    "hg_emc": 10.8,
    "sciences": 11.6,
    "oral": 12.4,
    "controle_continu": 17,
    "score": 14,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "DJOUKWE",
    "prenom": "David Levi",
    "francais": 9.1,
    "maths": 12.2,
    "hg_emc": 14,
    "sciences": 15.2,
    "oral": 15.7,
    "controle_continu": 16.5,
    "score": 14.7,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "GALAND",
    "prenom": "Aurelien",
    "francais": 8.8,
    "maths": 17.8,
    "hg_emc": 9.8,
    "sciences": 11.4,
    "oral": 14.6,
    "controle_continu": 15.75,
    "score": 14.35,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "GARCIA LECLERC",
    "prenom": "Aiwa",
    "francais": 7.5,
    "maths": 8.4,
    "hg_emc": 13.6,
    "sciences": 11.4,
    "oral": 19.8,
    "controle_continu": 16.25,
    "score": 14.15,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "MALELA",
    "prenom": "Dylan",
    "francais": 14.8,
    "maths": 12.6,
    "hg_emc": 12.8,
    "sciences": 15,
    "oral": 16.4,
    "controle_continu": 16,
    "score": 15.22,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "MERDJANOPOULOS",
    "prenom": "Louka",
    "francais": 10,
    "maths": 11.2,
    "hg_emc": 14.8,
    "sciences": 12.2,
    "oral": 20,
    "controle_continu": 16.5,
    "score": 15.09,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "NGOM",
    "prenom": "Khadija",
    "francais": 10,
    "maths": 7.4,
    "hg_emc": 10.8,
    "sciences": 11.6,
    "oral": 19.2,
    "controle_continu": 17.5,
    "score": 14.73,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "NIANG",
    "prenom": "Coumba",
    "francais": 7,
    "maths": 12.4,
    "hg_emc": 13.6,
    "sciences": 14.8,
    "oral": 19.6,
    "controle_continu": 17.5,
    "score": 15.4,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "RISPAL",
    "prenom": "Charlie",
    "francais": 9.1,
    "maths": 9,
    "hg_emc": 13.8,
    "sciences": 14.4,
    "oral": 20,
    "controle_continu": 17,
    "score": 15.03,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "SOW",
    "prenom": "Aminata",
    "francais": 6.2,
    "maths": 8.1,
    "hg_emc": 15.2,
    "sciences": 11.4,
    "oral": 19.4,
    "controle_continu": 16.25,
    "score": 14,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "THIAM",
    "prenom": "Sahel",
    "francais": 10.2,
    "maths": 13.4,
    "hg_emc": 14.8,
    "sciences": 13.2,
    "oral": 16.4,
    "controle_continu": 16.5,
    "score": 15,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "ARRON",
    "prenom": "Hélène",
    "francais": 13.3,
    "maths": 18.2,
    "hg_emc": 18.8,
    "sciences": 16.4,
    "oral": 19.6,
    "controle_continu": 20,
    "score": 18.59,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "BABO",
    "prenom": "Yanis",
    "francais": 16,
    "maths": 17.8,
    "hg_emc": 14,
    "sciences": 15,
    "oral": 19.5,
    "controle_continu": 20,
    "score": 18.48,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "BASTIDE AHMED",
    "prenom": "Malik",
    "francais": 12.6,
    "maths": 12.6,
    "hg_emc": 14.4,
    "sciences": 15.2,
    "oral": 20,
    "controle_continu": 17,
    "score": 16,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "BELKHAYAT ZOUKKARI",
    "prenom": "Mouna",
    "francais": 18.6,
    "maths": 11,
    "hg_emc": 14.8,
    "sciences": 14,
    "oral": 20,
    "controle_continu": 20,
    "score": 18,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "BUOVOLO",
    "prenom": "Mariam",
    "francais": 17.7,
    "maths": 18.8,
    "hg_emc": 18,
    "sciences": 17.6,
    "oral": 20,
    "controle_continu": 20,
    "score": 19.29,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "CISSE",
    "prenom": "Combé",
    "francais": 9.1,
    "maths": 18,
    "hg_emc": 17.2,
    "sciences": 11.2,
    "oral": 20,
    "controle_continu": 17.5,
    "score": 16.42,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "CISSE",
    "prenom": "Ibrahima",
    "francais": 13.4,
    "maths": 12.2,
    "hg_emc": 12.6,
    "sciences": 16.2,
    "oral": 18,
    "controle_continu": 17.5,
    "score": 16,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "DIOP",
    "prenom": "Astou",
    "francais": 11.6,
    "maths": 14.2,
    "hg_emc": 14.6,
    "sciences": 13.8,
    "oral": 20,
    "controle_continu": 17,
    "score": 16,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "JACOBE",
    "prenom": "Lou",
    "francais": 11.3,
    "maths": 12.9,
    "hg_emc": 13.6,
    "sciences": 16,
    "oral": 19,
    "controle_continu": 17.5,
    "score": 16,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "MBOW",
    "prenom": "Ramatoulaye",
    "francais": 12.9,
    "maths": 13.8,
    "hg_emc": 16.8,
    "sciences": 16.2,
    "oral": 20,
    "controle_continu": 20,
    "score": 17.9,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "MONTMASSON",
    "prenom": "Héléna",
    "francais": 12.3,
    "maths": 13,
    "hg_emc": 17.2,
    "sciences": 16.8,
    "oral": 20,
    "controle_continu": 19,
    "score": 17.29,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "NDIAYE",
    "prenom": "Fatousoa",
    "francais": 15.8,
    "maths": 12.8,
    "hg_emc": 15.2,
    "sciences": 17.4,
    "oral": 20,
    "controle_continu": 18.5,
    "score": 17.37,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "SON",
    "prenom": "Ye Seon",
    "francais": 12.1,
    "maths": 9.8,
    "hg_emc": 12.2,
    "sciences": 12.2,
    "oral": 20,
    "controle_continu": 20,
    "score": 16.77,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "WERLY",
    "prenom": "Tristan",
    "francais": 10.3,
    "maths": 17.4,
    "hg_emc": 14.8,
    "sciences": 16.2,
    "oral": 20,
    "controle_continu": 20,
    "score": 17.9,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "ZARB",
    "prenom": "Frédy",
    "francais": 8.2,
    "maths": 13.6,
    "hg_emc": 15.6,
    "sciences": 16,
    "oral": 16.4,
    "controle_continu": 18.5,
    "score": 16,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "BA",
    "prenom": "Ousseynou",
    "francais": 4.4,
    "maths": 4.4,
    "hg_emc": 5.2,
    "sciences": 4,
    "oral": 13.1,
    "controle_continu": 10.75,
    "score": 8.69,
    "resultat": "Refusé"
  },
  {
    "nom": "BA",
    "prenom": "Assane",
    "francais": 5.5,
    "maths": 4.8,
    "hg_emc": 7.6,
    "sciences": 5.2,
    "oral": 14,
    "controle_continu": 11.25,
    "score": 9.47,
    "resultat": "Refusé"
  },
  {
    "nom": "FLOSSE",
    "prenom": "Théo",
    "francais": null,
    "maths": null,
    "hg_emc": null,
    "sciences": null,
    "oral": 8.4,
    "controle_continu": 11.25,
    "score": 6.68,
    "resultat": "Refusé"
  },
  {
    "nom": "LEROY",
    "prenom": "Alexandre",
    "francais": 6.3,
    "maths": 6,
    "hg_emc": 7.6,
    "sciences": 8.6,
    "oral": 8.6,
    "controle_continu": 10.75,
    "score": 9,
    "resultat": "Refusé"
  },
  {
    "nom": "SARR",
    "prenom": "Mame Diarra Bousso",
    "francais": 6.1,
    "maths": 2.8,
    "hg_emc": 8.8,
    "sciences": 1.4,
    "oral": 14.8,
    "controle_continu": 10.75,
    "score": 8.98,
    "resultat": "Refusé"
  }
];

export const ELEVES_DNB_2024 = [
  {
    "nom": "CISSE",
    "prenom": "Amadou",
    "francais": 7.9,
    "maths": 2.4,
    "hg_emc": 9.2,
    "sciences": 11.6,
    "oral": 8.4,
    "controle_continu": 10,
    "score": 8.64,
    "resultat": "Refusé"
  },
  {
    "nom": "SOW",
    "prenom": "Mariam",
    "francais": 3.3,
    "maths": 1.2,
    "hg_emc": 7.6,
    "sciences": 8,
    "oral": 12.1,
    "controle_continu": 11.5,
    "score": 8.8,
    "resultat": "Refusé"
  },
  {
    "nom": "SAAD",
    "prenom": "Fares",
    "francais": 8.9,
    "maths": 6.4,
    "hg_emc": 5.2,
    "sciences": 10.2,
    "oral": 11.6,
    "controle_continu": 10.25,
    "score": 9.45,
    "resultat": "Refusé"
  },
  {
    "nom": "FAYE",
    "prenom": "Mame Awa",
    "francais": 5,
    "maths": 2.6,
    "hg_emc": 9.2,
    "sciences": 10.4,
    "oral": 16.3,
    "controle_continu": 13,
    "score": 10.72,
    "resultat": "Admis"
  },
  {
    "nom": "SARR",
    "prenom": "Mame Diarra Bousso",
    "francais": 7.5,
    "maths": 6.8,
    "hg_emc": 7.4,
    "sciences": 5.8,
    "oral": 12.8,
    "controle_continu": 13.5,
    "score": 10.97,
    "resultat": "Admis"
  },
  {
    "nom": "SARR",
    "prenom": "Sokhna Faty",
    "francais": 11.7,
    "maths": 6.8,
    "hg_emc": 10,
    "sciences": 12,
    "oral": 9.5,
    "controle_continu": 12.25,
    "score": 11,
    "resultat": "Admis"
  },
  {
    "nom": "DIEDHIOU",
    "prenom": "Aimy",
    "francais": 9.3,
    "maths": 6.2,
    "hg_emc": 12,
    "sciences": 11,
    "oral": 20,
    "controle_continu": 12.25,
    "score": 12,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "FALL",
    "prenom": "Cheikh",
    "francais": 7.6,
    "maths": 7.3,
    "hg_emc": 11.6,
    "sciences": 13.4,
    "oral": 14.6,
    "controle_continu": 13.5,
    "score": 12,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "AMBLARD-LADURANTIE",
    "prenom": "Cassandre",
    "francais": 9.6,
    "maths": 5,
    "hg_emc": 10,
    "sciences": 11.6,
    "oral": 13.3,
    "controle_continu": 14.5,
    "score": 12.09,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "BAILLI",
    "prenom": "Yanis",
    "francais": 8,
    "maths": 11.4,
    "hg_emc": 11.2,
    "sciences": 10,
    "oral": 18.5,
    "controle_continu": 12.25,
    "score": 12.19,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "CROIZAT",
    "prenom": "Liliane",
    "francais": 9.2,
    "maths": 7.6,
    "hg_emc": 6,
    "sciences": 15.2,
    "oral": 15.5,
    "controle_continu": 14.25,
    "score": 12.49,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "BOYER",
    "prenom": "Camille",
    "francais": 8.8,
    "maths": 6,
    "hg_emc": 11.2,
    "sciences": 12.6,
    "oral": 10.5,
    "controle_continu": 15.75,
    "score": 12.53,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "GASSAMA",
    "prenom": "Ngone Chérif",
    "francais": 11.7,
    "maths": 8.2,
    "hg_emc": 11.2,
    "sciences": 13.8,
    "oral": 11.7,
    "controle_continu": 14.25,
    "score": 12.64,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "METZ",
    "prenom": "Celia",
    "francais": 10.4,
    "maths": 8.4,
    "hg_emc": 8.8,
    "sciences": 11.8,
    "oral": 16.1,
    "controle_continu": 14.5,
    "score": 12.9,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "LY",
    "prenom": "Aminata Oumou Kalsoum",
    "francais": 11.6,
    "maths": 12,
    "hg_emc": 7,
    "sciences": 10.2,
    "oral": 7.5,
    "controle_continu": 16.25,
    "score": 13.09,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "DIALLO",
    "prenom": "Marvin Noah Dioulde",
    "francais": 10.5,
    "maths": 9.6,
    "hg_emc": 11.6,
    "sciences": 11.6,
    "oral": 18.2,
    "controle_continu": 13.75,
    "score": 13.12,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "LOZES",
    "prenom": "Gabriel",
    "francais": 8,
    "maths": 8.8,
    "hg_emc": 5.4,
    "sciences": 15.2,
    "oral": 20,
    "controle_continu": 15,
    "score": 13.39,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "BIER",
    "prenom": "Awa",
    "francais": 11.7,
    "maths": 12.2,
    "hg_emc": 11.6,
    "sciences": 12.8,
    "oral": 18.9,
    "controle_continu": 14.25,
    "score": 14,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "ALLIER",
    "prenom": "Faustine Marie-Sara",
    "francais": 10,
    "maths": 7.6,
    "hg_emc": 10.8,
    "sciences": 13.4,
    "oral": 18.9,
    "controle_continu": 16.5,
    "score": 14.33,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "NDOYE",
    "prenom": "Lamp Vincenzo",
    "francais": 13.3,
    "maths": 10.2,
    "hg_emc": 16,
    "sciences": 14.8,
    "oral": 8.5,
    "controle_continu": 17,
    "score": 14.43,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "GAYE",
    "prenom": "Ababacar",
    "francais": 11,
    "maths": 9,
    "hg_emc": 11.2,
    "sciences": 14.8,
    "oral": 14.4,
    "controle_continu": 17,
    "score": 14.43,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "JENOUDET",
    "prenom": "Thiméo Owen Thibault",
    "francais": 13.6,
    "maths": 6.6,
    "hg_emc": 15.8,
    "sciences": 13.6,
    "oral": 11.5,
    "controle_continu": 17.5,
    "score": 14.55,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "DIAKHABY",
    "prenom": "Safia",
    "francais": 9.5,
    "maths": 11.6,
    "hg_emc": 9,
    "sciences": 14.2,
    "oral": 20,
    "controle_continu": 16.25,
    "score": 14.72,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "BOURVEN",
    "prenom": "Margo",
    "francais": 10.2,
    "maths": 10.6,
    "hg_emc": 16.4,
    "sciences": 8.8,
    "oral": 20,
    "controle_continu": 16.25,
    "score": 14.8,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "NGOM",
    "prenom": "Aicha Khoyane",
    "francais": 12.1,
    "maths": 11,
    "hg_emc": 11.2,
    "sciences": 15.4,
    "oral": 20,
    "controle_continu": 15.75,
    "score": 14.93,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "HAFFNER",
    "prenom": "Juliette",
    "francais": 10.8,
    "maths": 11.4,
    "hg_emc": 16,
    "sciences": 12.4,
    "oral": 17.6,
    "controle_continu": 16.5,
    "score": 15,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "WONE",
    "prenom": "Oumar",
    "francais": 10.2,
    "maths": 15.8,
    "hg_emc": 9.2,
    "sciences": 15.6,
    "oral": 14.5,
    "controle_continu": 17,
    "score": 15.12,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "HACHIM",
    "prenom": "Rayan Abdou",
    "francais": 11,
    "maths": 12,
    "hg_emc": 11.4,
    "sciences": 16.6,
    "oral": 16.2,
    "controle_continu": 17.5,
    "score": 15.4,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "BULTHE",
    "prenom": "Ambre",
    "francais": 11.6,
    "maths": 14.2,
    "hg_emc": 11.6,
    "sciences": 14.4,
    "oral": 18,
    "controle_continu": 16.75,
    "score": 15.48,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "NOUHANDO ROD",
    "prenom": "Orient",
    "francais": 14.8,
    "maths": 10.6,
    "hg_emc": 10.8,
    "sciences": 16,
    "oral": 17,
    "controle_continu": 17,
    "score": 15.48,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "D'ALMEIDA",
    "prenom": "Kyran",
    "francais": 12.3,
    "maths": 15.4,
    "hg_emc": 7.6,
    "sciences": 14.6,
    "oral": 20,
    "controle_continu": 17,
    "score": 15.85,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "CALDEIRA",
    "prenom": "Giovanna",
    "francais": 13.6,
    "maths": 13.4,
    "hg_emc": 18,
    "sciences": 14.6,
    "oral": 18.7,
    "controle_continu": 16.5,
    "score": 16,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "DARWICHE",
    "prenom": "Iris",
    "francais": 9.6,
    "maths": 15.2,
    "hg_emc": 15.6,
    "sciences": 15.4,
    "oral": 17.7,
    "controle_continu": 17.5,
    "score": 16,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "GAFFARI",
    "prenom": "Matteo",
    "francais": 9.1,
    "maths": 16.2,
    "hg_emc": 13.4,
    "sciences": 12.8,
    "oral": 17.6,
    "controle_continu": 18,
    "score": 16,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "VISIEDO",
    "prenom": "Manon Emilie Kimberly Priscille",
    "francais": 12.4,
    "maths": 11.6,
    "hg_emc": 10.4,
    "sciences": 17.6,
    "oral": 20,
    "controle_continu": 17.5,
    "score": 16,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "LAMBERT",
    "prenom": "Clara",
    "francais": 12.6,
    "maths": 11.4,
    "hg_emc": 15.2,
    "sciences": 15.8,
    "oral": 19.5,
    "controle_continu": 17.5,
    "score": 16.13,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "MIGNAT",
    "prenom": "Noémie Marie-Ellen",
    "francais": 12,
    "maths": 13.8,
    "hg_emc": 15.6,
    "sciences": 15.6,
    "oral": 18.2,
    "controle_continu": 17.5,
    "score": 16.2,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "GNIANG",
    "prenom": "Sophie Miranda",
    "francais": 14.7,
    "maths": 12,
    "hg_emc": 13.2,
    "sciences": 15.8,
    "oral": 20,
    "controle_continu": 18.5,
    "score": 16.9,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "NDIAYE",
    "prenom": "Felwine",
    "francais": 17.1,
    "maths": 13.6,
    "hg_emc": 18.2,
    "sciences": 17,
    "oral": 20,
    "controle_continu": 17.5,
    "score": 17.29,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "NDIAYE",
    "prenom": "Mactar",
    "francais": 10.4,
    "maths": 18,
    "hg_emc": 10,
    "sciences": 19.8,
    "oral": 20,
    "controle_continu": 19,
    "score": 17.42,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "BENSON",
    "prenom": "Marilyse",
    "francais": 18.2,
    "maths": 13.8,
    "hg_emc": 17.2,
    "sciences": 18,
    "oral": 18.4,
    "controle_continu": 18,
    "score": 17.5,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "MBOUP",
    "prenom": "Amy Margot",
    "francais": 12,
    "maths": 14.4,
    "hg_emc": 16.4,
    "sciences": 17.6,
    "oral": 20,
    "controle_continu": 19.5,
    "score": 17.68,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "LAH",
    "prenom": "Aïssa Fatouma",
    "francais": 16.3,
    "maths": 14.8,
    "hg_emc": 13.2,
    "sciences": 17,
    "oral": 15.6,
    "controle_continu": 20,
    "score": 17.73,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "BRANCKAERT",
    "prenom": "Lenny",
    "francais": 14.4,
    "maths": 17.8,
    "hg_emc": 13.6,
    "sciences": 19.2,
    "oral": 20,
    "controle_continu": 18.5,
    "score": 17.83,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "SAMBA",
    "prenom": "Babacar",
    "francais": 13.8,
    "maths": 16.6,
    "hg_emc": 16.8,
    "sciences": 17.2,
    "oral": 20,
    "controle_continu": 19.5,
    "score": 18.18,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "CISSE-SOHM",
    "prenom": "Elah-Khayta",
    "francais": 15.2,
    "maths": 18.6,
    "hg_emc": 18.4,
    "sciences": 16,
    "oral": 15.5,
    "controle_continu": 20,
    "score": 18.32,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "GNING",
    "prenom": "Maya Aïssatou",
    "francais": 17.1,
    "maths": 14.8,
    "hg_emc": 17.6,
    "sciences": 17.2,
    "oral": 20,
    "controle_continu": 19.5,
    "score": 18.42,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "RUNG",
    "prenom": "Agathe Clémence-Lili",
    "francais": 16.6,
    "maths": 18.4,
    "hg_emc": 18.8,
    "sciences": 18,
    "oral": 20,
    "controle_continu": 20,
    "score": 19.18,
    "resultat": "Admis Mention Très Bien"
  }
];

export const ELEVES_DNB_2025 = [
  {
    "nom": "BADJI",
    "prenom": "Odette Seynabou",
    "francais": 12.9,
    "maths": 13.8,
    "hg_emc": 14.8,
    "sciences": 12.8,
    "oral": 20,
    "controle_continu": 17.5,
    "score": 16.57,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "BIHOREAU",
    "prenom": "Emma Thérèse",
    "francais": 11.8,
    "maths": 15.2,
    "hg_emc": 10,
    "sciences": 10,
    "oral": 18.4,
    "controle_continu": 15.25,
    "score": 14.55,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "BRESSON",
    "prenom": "Lily Rose",
    "francais": 14.3,
    "maths": 15.2,
    "hg_emc": 12.6,
    "sciences": 11.2,
    "oral": 19.4,
    "controle_continu": 19,
    "score": 17.35,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "BUOVOLO",
    "prenom": "Ismael",
    "francais": 16.4,
    "maths": 18.2,
    "hg_emc": 16.8,
    "sciences": 14.4,
    "oral": 18.2,
    "controle_continu": 20,
    "score": 18.55,
    "resultat": "Admis Mention Très Bien avec les félicitations du jury"
  },
  {
    "nom": "COUSTON",
    "prenom": "Gabriel Eyuman",
    "francais": 11.4,
    "maths": 14.2,
    "hg_emc": 11.2,
    "sciences": 13.6,
    "oral": 20,
    "controle_continu": 15.25,
    "score": 14.88,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "DIACK",
    "prenom": "Cheikh Modou Fallou",
    "francais": 11.3,
    "maths": 14.6,
    "hg_emc": 11.2,
    "sciences": 10.8,
    "oral": 12.6,
    "controle_continu": 15,
    "score": 13.69,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "DIALLO",
    "prenom": "Hassimiou Djélani Gérard",
    "francais": 10,
    "maths": 6.8,
    "hg_emc": 9.2,
    "sciences": 12.4,
    "oral": 12.6,
    "controle_continu": 12.25,
    "score": 11.15,
    "resultat": "Admis"
  },
  {
    "nom": "DIFRANCESCHO",
    "prenom": "Hugo",
    "francais": 13.6,
    "maths": 18.6,
    "hg_emc": 13.6,
    "sciences": 15.6,
    "oral": 15.2,
    "controle_continu": 16.5,
    "score": 16,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "DIFRANCESCHO",
    "prenom": "Léo",
    "francais": 12.2,
    "maths": 16.8,
    "hg_emc": 7.8,
    "sciences": 6.8,
    "oral": 16.6,
    "controle_continu": 16.5,
    "score": 14.87,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "DIOUF",
    "prenom": "Yanis",
    "francais": 8.7,
    "maths": 9.4,
    "hg_emc": 8,
    "sciences": 7.6,
    "oral": 11.2,
    "controle_continu": 12.25,
    "score": 10.77,
    "resultat": "Admis"
  },
  {
    "nom": "DJOUKWE",
    "prenom": "Emmanuel",
    "francais": 13,
    "maths": 20,
    "hg_emc": 14,
    "sciences": 14,
    "oral": 19.5,
    "controle_continu": 20,
    "score": 18.32,
    "resultat": "Admis Mention Très Bien avec les félicitations du jury"
  },
  {
    "nom": "FALL",
    "prenom": "Seydina Mohamed",
    "francais": 10.9,
    "maths": 7.8,
    "hg_emc": 6.4,
    "sciences": 6.8,
    "oral": 15.3,
    "controle_continu": 11.5,
    "score": 10.83,
    "resultat": "Admis"
  },
  {
    "nom": "GNAMY",
    "prenom": "Hakim Marcel",
    "francais": 12.8,
    "maths": 16.8,
    "hg_emc": 10,
    "sciences": 10.4,
    "oral": 17.8,
    "controle_continu": 19,
    "score": 16.7,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "GNIANG",
    "prenom": "Aby Lydia",
    "francais": 12.6,
    "maths": 15,
    "hg_emc": 12.4,
    "sciences": 13.6,
    "oral": 20,
    "controle_continu": 18.5,
    "score": 16.83,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "HAIDAR",
    "prenom": "Zein",
    "francais": 10.7,
    "maths": 18.6,
    "hg_emc": 14.4,
    "sciences": 14.4,
    "oral": 20,
    "controle_continu": 18,
    "score": 16.97,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "HOUEDESSOU",
    "prenom": "Hugo",
    "francais": 11.8,
    "maths": 19.6,
    "hg_emc": 18.2,
    "sciences": 16.4,
    "oral": 15,
    "controle_continu": 20,
    "score": 17.97,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "ISSAOUNE",
    "prenom": "Neila Hafsa",
    "francais": 10,
    "maths": 12.4,
    "hg_emc": 16.2,
    "sciences": 12.4,
    "oral": 14.6,
    "controle_continu": 17.5,
    "score": 15.17,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "KEIFENS",
    "prenom": "Harry Laurent N",
    "francais": 13.8,
    "maths": 16.2,
    "hg_emc": 12.8,
    "sciences": 13.6,
    "oral": 20,
    "controle_continu": 19,
    "score": 17.4,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "KIEPE",
    "prenom": "Nelleke Fatou Bintou",
    "francais": 7.5,
    "maths": 17.8,
    "hg_emc": 10.6,
    "sciences": 11.6,
    "oral": 17.6,
    "controle_continu": 18.5,
    "score": 16,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "KOROMA",
    "prenom": "Laurent Pianou Sheku Magba",
    "francais": 9.4,
    "maths": 7.4,
    "hg_emc": 11.2,
    "sciences": 10,
    "oral": 11.4,
    "controle_continu": 11.5,
    "score": 10.85,
    "resultat": "Admis"
  },
  {
    "nom": "LEROY",
    "prenom": "Anouchka Sophie Beatrice Christine",
    "francais": 8,
    "maths": 14.4,
    "hg_emc": 8.2,
    "sciences": 8.4,
    "oral": 15.8,
    "controle_continu": 12.75,
    "score": 12.19,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "MBAYE",
    "prenom": "Amadou Lamine",
    "francais": 10.1,
    "maths": 15.4,
    "hg_emc": 11.6,
    "sciences": 9.6,
    "oral": 15.1,
    "controle_continu": 13.5,
    "score": 13.15,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "MEUNIER",
    "prenom": "Sylvia",
    "francais": 13.4,
    "maths": 14.2,
    "hg_emc": 15,
    "sciences": 13.6,
    "oral": 13,
    "controle_continu": 17.5,
    "score": 15.62,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "MINGOU",
    "prenom": "Abraham Leonce",
    "francais": 12,
    "maths": 15.6,
    "hg_emc": 7,
    "sciences": 10.4,
    "oral": 11,
    "controle_continu": 13,
    "score": 12.42,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "MOUABE",
    "prenom": "Laurence Marie Noelle",
    "francais": 14.5,
    "maths": 15.4,
    "hg_emc": 8.8,
    "sciences": 13.2,
    "oral": 19.9,
    "controle_continu": 17.5,
    "score": 16.6,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "MOURTADA",
    "prenom": "Karma",
    "francais": 17.6,
    "maths": 18.6,
    "hg_emc": 17.4,
    "sciences": 14.4,
    "oral": 20,
    "controle_continu": 19.5,
    "score": 19.27,
    "resultat": "Admis Mention Très Bien avec les félicitations du jury"
  },
  {
    "nom": "N'JAMBONG",
    "prenom": "Kaïmani-Gabriel",
    "francais": 14.2,
    "maths": 15.6,
    "hg_emc": 19.2,
    "sciences": 14.8,
    "oral": 20,
    "controle_continu": 18.5,
    "score": 17.6,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "NIANG",
    "prenom": "Marème",
    "francais": 14,
    "maths": 13.8,
    "hg_emc": 10.2,
    "sciences": 13.2,
    "oral": 20,
    "controle_continu": 17.5,
    "score": 16.19,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "NIANG",
    "prenom": "Yaye Awa",
    "francais": 15.4,
    "maths": 11.6,
    "hg_emc": 8.4,
    "sciences": 11.6,
    "oral": 7.7,
    "controle_continu": 16.25,
    "score": 13.72,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "PHILIBERT",
    "prenom": "Audrey Charlotte Josephine",
    "francais": 11.2,
    "maths": 19.8,
    "hg_emc": 16.4,
    "sciences": 18,
    "oral": 20,
    "controle_continu": 19.5,
    "score": 18.78,
    "resultat": "Admis Mention Très Bien avec les félicitations du jury"
  },
  {
    "nom": "PIVETTA",
    "prenom": "Jade Oluwakemy",
    "francais": 11.2,
    "maths": 13.2,
    "hg_emc": 14.4,
    "sciences": 7.2,
    "oral": 16.8,
    "controle_continu": 12.25,
    "score": 12.63,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "POGGI",
    "prenom": "Elodie Bianca Maria Dib",
    "francais": 13.8,
    "maths": 15.6,
    "hg_emc": 11.8,
    "sciences": 13.2,
    "oral": 14.7,
    "controle_continu": 17,
    "score": 15.58,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "RIQUET",
    "prenom": "Djibril Issa Léo",
    "francais": 16,
    "maths": 18.6,
    "hg_emc": 14,
    "sciences": 12.8,
    "oral": 20,
    "controle_continu": 19,
    "score": 18,
    "resultat": "Admis Mention Très Bien avec les félicitations du jury"
  },
  {
    "nom": "SCHNEIDER",
    "prenom": "Louna Diabou",
    "francais": 4.3,
    "maths": 8.2,
    "hg_emc": 6.8,
    "sciences": 5.8,
    "oral": 10.2,
    "controle_continu": 12.75,
    "score": 10,
    "resultat": "Admis"
  },
  {
    "nom": "SENOL",
    "prenom": "Can",
    "francais": 5.8,
    "maths": 17.2,
    "hg_emc": 8.8,
    "sciences": 14.4,
    "oral": 19.6,
    "controle_continu": 13,
    "score": 13.28,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "SERVATE",
    "prenom": "Cléïs Solange Irène",
    "francais": 14,
    "maths": 10.8,
    "hg_emc": 10.4,
    "sciences": 13.2,
    "oral": 20,
    "controle_continu": 14.5,
    "score": 14.33,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "SIMON",
    "prenom": "Daniel Frederic",
    "francais": 6.6,
    "maths": 12.2,
    "hg_emc": 9.6,
    "sciences": 15.6,
    "oral": 20,
    "controle_continu": 11.5,
    "score": 12.18,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "SNEGE",
    "prenom": "Rafael Richard",
    "francais": 14.3,
    "maths": 19,
    "hg_emc": 20,
    "sciences": 17.2,
    "oral": 14.3,
    "controle_continu": 18,
    "score": 17.28,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "THOMAS RODRIGUEZ",
    "prenom": "Sasha Yzéo",
    "francais": 8.6,
    "maths": 16.8,
    "hg_emc": 11.4,
    "sciences": 13.2,
    "oral": 12.9,
    "controle_continu": 16.5,
    "score": 14.83,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "TINE",
    "prenom": "Marie Gnilane",
    "francais": 16.5,
    "maths": 18.8,
    "hg_emc": 17.4,
    "sciences": 16.4,
    "oral": 20,
    "controle_continu": 19,
    "score": 19.03,
    "resultat": "Admis Mention Très Bien avec les félicitations du jury"
  },
  {
    "nom": "TISGHIRI",
    "prenom": "Mohamed",
    "francais": 9.4,
    "maths": 17,
    "hg_emc": 15.2,
    "sciences": 16.4,
    "oral": 15.1,
    "controle_continu": 16.5,
    "score": 15.42,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "TRIQUENAUX",
    "prenom": "Ninon Sylvie Marie José",
    "francais": 15.4,
    "maths": 13.6,
    "hg_emc": 10.6,
    "sciences": 11.2,
    "oral": 18.1,
    "controle_continu": 17.5,
    "score": 16,
    "resultat": "Admis Mention Très Bien"
  },
  {
    "nom": "TUNA",
    "prenom": "Remi",
    "francais": 5.6,
    "maths": 15.2,
    "hg_emc": 14.6,
    "sciences": 12.4,
    "oral": 19.9,
    "controle_continu": 16.5,
    "score": 15.03,
    "resultat": "Admis Mention Bien"
  },
  {
    "nom": "WIESBAUER",
    "prenom": "Léa",
    "francais": 7.5,
    "maths": 13.2,
    "hg_emc": 9.8,
    "sciences": 14.4,
    "oral": 12.8,
    "controle_continu": 14.5,
    "score": 12.95,
    "resultat": "Admis Mention Assez Bien"
  },
  {
    "nom": "PEREZ NGOLI",
    "prenom": "Micah Bruno Jean-Jacques",
    "francais": 7.7,
    "maths": 12.6,
    "hg_emc": 5.6,
    "sciences": 8,
    "oral": 11.8,
    "controle_continu": 9.25,
    "score": 9.49,
    "resultat": "Refusé"
  },
  {
    "nom": "SOW",
    "prenom": "Mariam Seck",
    "francais": 10,
    "maths": 3.2,
    "hg_emc": 10.4,
    "sciences": 8.4,
    "oral": 7.3,
    "controle_continu": 10.75,
    "score": 9.12,
    "resultat": "Refusé"
  },
  {
    "nom": "SAAD",
    "prenom": "Ramy",
    "francais": 8.5,
    "maths": 8.8,
    "hg_emc": 3.6,
    "sciences": 8,
    "oral": 13.1,
    "controle_continu": 8.5,
    "score": 8.78,
    "resultat": "Refusé"
  },
  {
    "nom": "NAMOYA",
    "prenom": "Fifi Cheredi",
    "francais": 2.8,
    "maths": 3,
    "hg_emc": 4.8,
    "sciences": 0.8,
    "oral": 13.6,
    "controle_continu": 6.25,
    "score": 5.9,
    "resultat": "Refusé"
  }
];

export const ELEVES_DNB_2026 = [
  {
    "nom": "PEREZ NGOLI",
    "prenom": "Micah Bruno Jean-Jacques",
    "francais": 12,
    "maths": 13,
    "hg_emc": 12.25,
    "sciences": 11,
    "oral": 18,
    "controle_continu": 11.3,
    "score": 12.48,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 30,
        "fr_dictee": 7,
        "fr_redac": 20,
        "francais": 12,
        "maths": 13,
        "hg": 12,
        "emc": 13,
        "svt": 5,
        "phys": 6,
        "sciences": 11,
        "oral": 18
      },
      "cc": {
        "maths": 8.6,
        "francais": 7.2,
        "hg": 10.2,
        "emc": 9.1,
        "anglais": 7,
        "espagnol": 10,
        "eps": 19,
        "svt": 7.2,
        "phys": 9.9,
        "techno": 15.1,
        "arts": 15,
        "musique": 17.3
      }
    }
  },
  {
    "nom": "AUBRY",
    "prenom": "Albert Akoi Agamemnon",
    "francais": 7,
    "maths": 14,
    "hg_emc": 16.25,
    "sciences": 9,
    "oral": 20,
    "controle_continu": 12.5,
    "score": 12.97,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 16,
        "fr_dictee": 0,
        "fr_redac": 17,
        "francais": 7,
        "maths": 14,
        "hg": 18,
        "emc": 11,
        "svt": 5,
        "phys": 4,
        "sciences": 9,
        "oral": 20
      },
      "cc": {
        "maths": 10.2,
        "francais": 9.1,
        "hg": 9.3,
        "emc": 9.2,
        "anglais": 16.8,
        "espagnol": 10.5,
        "eps": 17.7,
        "svt": 9.8,
        "phys": 10.6,
        "techno": 15.6,
        "arts": 13.7,
        "musique": 18
      }
    }
  },
  {
    "nom": "BOUYER",
    "prenom": "Louis Marie",
    "francais": 14,
    "maths": 19,
    "hg_emc": 15,
    "sciences": 19,
    "oral": 18,
    "controle_continu": 16.3,
    "score": 16.74,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 43,
        "fr_dictee": 5,
        "fr_redac": 18,
        "francais": 14,
        "maths": 19,
        "hg": 15,
        "emc": 15,
        "svt": 9,
        "phys": 10,
        "sciences": 19,
        "oral": 18
      },
      "cc": {
        "maths": 17.7,
        "francais": 12.9,
        "hg": 15.7,
        "emc": 15.2,
        "anglais": 14.4,
        "espagnol": 15.5,
        "eps": 18.3,
        "svt": 13.8,
        "phys": 19.5,
        "techno": 16,
        "arts": 18.7,
        "musique": 18.3
      }
    }
  },
  {
    "nom": "DE GAIGNERON JOLLIMON DEMAROLLES",
    "prenom": "Pétronille Agnès Louis Marie",
    "francais": 15,
    "maths": 19,
    "hg_emc": 14.5,
    "sciences": 13,
    "oral": 20,
    "controle_continu": 16.2,
    "score": 16.27,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 30,
        "fr_dictee": 3,
        "fr_redac": 39,
        "francais": 15,
        "maths": 19,
        "hg": 15,
        "emc": 13,
        "svt": 6,
        "phys": 7,
        "sciences": 13,
        "oral": 20
      },
      "cc": {
        "maths": 18.2,
        "francais": 13.9,
        "hg": 15.9,
        "emc": 14.8,
        "anglais": 13.6,
        "espagnol": 15.2,
        "eps": 16.7,
        "svt": 13.8,
        "phys": 17.6,
        "techno": 17.3,
        "arts": 19.7,
        "musique": 18
      }
    }
  },
  {
    "nom": "DIENG",
    "prenom": "Aïssatou",
    "francais": 14,
    "maths": 15,
    "hg_emc": 15.5,
    "sciences": 13,
    "oral": 19,
    "controle_continu": 14.1,
    "score": 14.82,
    "resultat": "Admis Mention Bien",
    "details": {
      "ep": {
        "fr_gram": 30,
        "fr_dictee": 2,
        "fr_redac": 34,
        "francais": 14,
        "maths": 15,
        "hg": 18,
        "emc": 8,
        "svt": 7,
        "phys": 6,
        "sciences": 13,
        "oral": 19
      },
      "cc": {
        "maths": 12.5,
        "francais": 11.8,
        "hg": 15.4,
        "emc": 13.2,
        "anglais": 11.8,
        "espagnol": 15.5,
        "eps": 14.7,
        "svt": 9.4,
        "phys": 12.2,
        "techno": 16,
        "arts": 18.3,
        "musique": 18.2
      }
    }
  },
  {
    "nom": "DIEYE",
    "prenom": "Awa Cheikh",
    "francais": 17,
    "maths": 16,
    "hg_emc": 13.75,
    "sciences": 15,
    "oral": 13,
    "controle_continu": 14.1,
    "score": 14.61,
    "resultat": "Admis Mention Bien",
    "details": {
      "ep": {
        "fr_gram": 41,
        "fr_dictee": 7,
        "fr_redac": 36,
        "francais": 17,
        "maths": 16,
        "hg": 13,
        "emc": 16,
        "svt": 7,
        "phys": 8,
        "sciences": 15,
        "oral": 13
      },
      "cc": {
        "maths": 12.5,
        "francais": 11.8,
        "hg": 12.2,
        "emc": 13.3,
        "anglais": 15.1,
        "espagnol": 15,
        "eps": 14.3,
        "svt": 10,
        "phys": 13.5,
        "techno": 15.9,
        "arts": 17.3,
        "musique": 18
      }
    }
  },
  {
    "nom": "DIOP",
    "prenom": "Oumou Soda",
    "francais": 19,
    "maths": 20,
    "hg_emc": 16.75,
    "sciences": 15,
    "oral": 19,
    "controle_continu": 16.1,
    "score": 17.23,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 45,
        "fr_dictee": 9,
        "fr_redac": 38,
        "francais": 19,
        "maths": 20,
        "hg": 18,
        "emc": 13,
        "svt": 8,
        "phys": 7,
        "sciences": 15,
        "oral": 19
      },
      "cc": {
        "maths": 15.9,
        "francais": 17.4,
        "hg": 15.8,
        "emc": 17.1,
        "anglais": 18.5,
        "espagnol": 14.2,
        "eps": 12,
        "svt": 11.4,
        "phys": 15.9,
        "techno": 17.5,
        "arts": 19,
        "musique": 19
      }
    }
  },
  {
    "nom": "DIOUF",
    "prenom": "Moussa",
    "francais": 12,
    "maths": 19,
    "hg_emc": 13.75,
    "sciences": 16,
    "oral": 19,
    "controle_continu": 16.8,
    "score": 16.29,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 40,
        "fr_dictee": 10,
        "fr_redac": 10,
        "francais": 12,
        "maths": 19,
        "hg": 15,
        "emc": 10,
        "svt": 7,
        "phys": 9,
        "sciences": 16,
        "oral": 19
      },
      "cc": {
        "maths": 19.1,
        "francais": 15.5,
        "hg": 16.6,
        "emc": 15.1,
        "anglais": 17.4,
        "espagnol": 16.7,
        "eps": 15.3,
        "svt": 13.7,
        "phys": 17.5,
        "techno": 17,
        "arts": 19,
        "musique": 18.5
      }
    }
  },
  {
    "nom": "FROUART",
    "prenom": "Mia Tiara",
    "francais": 15,
    "maths": 16,
    "hg_emc": 13,
    "sciences": 17,
    "oral": 20,
    "controle_continu": 15.1,
    "score": 15.76,
    "resultat": "Admis Mention Bien",
    "details": {
      "ep": {
        "fr_gram": 31,
        "fr_dictee": 4,
        "fr_redac": 36,
        "francais": 15,
        "maths": 16,
        "hg": 12,
        "emc": 16,
        "svt": 10,
        "phys": 7,
        "sciences": 17,
        "oral": 20
      },
      "cc": {
        "maths": 15.1,
        "francais": 11.6,
        "hg": 15,
        "emc": 11.4,
        "anglais": 15.3,
        "espagnol": 16.3,
        "eps": 15.7,
        "svt": 13.3,
        "phys": 13.4,
        "techno": 16.9,
        "arts": 18.7,
        "musique": 18.3
      }
    }
  },
  {
    "nom": "GALAND",
    "prenom": "Margaux Suzette T",
    "francais": 13,
    "maths": 20,
    "hg_emc": 14,
    "sciences": 12,
    "oral": 17,
    "controle_continu": 15.4,
    "score": 15.28,
    "resultat": "Admis Mention Bien",
    "details": {
      "ep": {
        "fr_gram": 30,
        "fr_dictee": 7,
        "fr_redac": 26,
        "francais": 13,
        "maths": 20,
        "hg": 12,
        "emc": 20,
        "svt": 7,
        "phys": 5,
        "sciences": 12,
        "oral": 17
      },
      "cc": {
        "maths": 18,
        "francais": 13.2,
        "hg": 13.3,
        "emc": 13,
        "anglais": 11.6,
        "espagnol": 13.7,
        "eps": 16.8,
        "svt": 14.5,
        "phys": 14,
        "techno": 17.6,
        "arts": 20,
        "musique": 18.8
      }
    }
  },
  {
    "nom": "GLAUDE",
    "prenom": "Manon",
    "francais": 9,
    "maths": 12,
    "hg_emc": 10,
    "sciences": 10,
    "oral": 15,
    "controle_continu": 12.9,
    "score": 11.9,
    "resultat": "Admis",
    "details": {
      "ep": {
        "fr_gram": 18,
        "fr_dictee": 7,
        "fr_redac": 19,
        "francais": 9,
        "maths": 12,
        "hg": 8,
        "emc": 16,
        "svt": 7,
        "phys": 3,
        "sciences": 10,
        "oral": 15
      },
      "cc": {
        "maths": 9.6,
        "francais": 11,
        "hg": 11.6,
        "emc": 11.8,
        "anglais": 10.6,
        "espagnol": 12.3,
        "eps": 15.3,
        "svt": 8.7,
        "phys": 9.6,
        "techno": 16.2,
        "arts": 20,
        "musique": 18.3
      }
    }
  },
  {
    "nom": "GRASSAGLIATA",
    "prenom": "Milena",
    "francais": 15,
    "maths": 16,
    "hg_emc": 18.75,
    "sciences": 17,
    "oral": 17,
    "controle_continu": 16.2,
    "score": 16.55,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 31,
        "fr_dictee": 7,
        "fr_redac": 33,
        "francais": 15,
        "maths": 16,
        "hg": 19,
        "emc": 18,
        "svt": 8,
        "phys": 9,
        "sciences": 17,
        "oral": 17
      },
      "cc": {
        "maths": 16.1,
        "francais": 13.7,
        "hg": 16.2,
        "emc": 14.3,
        "anglais": 14,
        "espagnol": 16.2,
        "eps": 17,
        "svt": 15.3,
        "phys": 16.9,
        "techno": 17.2,
        "arts": 20,
        "musique": 17.8
      }
    }
  },
  {
    "nom": "GROS-DUBOIS",
    "prenom": "Daniella Fatoumata",
    "francais": 8,
    "maths": 12,
    "hg_emc": 13.75,
    "sciences": 11,
    "oral": 17,
    "controle_continu": 13.2,
    "score": 12.71,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 20,
        "fr_dictee": 0,
        "fr_redac": 17,
        "francais": 8,
        "maths": 12,
        "hg": 14,
        "emc": 13,
        "svt": 6,
        "phys": 5,
        "sciences": 11,
        "oral": 17
      },
      "cc": {
        "maths": 10.3,
        "francais": 8.2,
        "hg": 13.2,
        "emc": 12.8,
        "anglais": 9.4,
        "espagnol": 13.3,
        "eps": 15.5,
        "svt": 10.7,
        "phys": 13.7,
        "techno": 15.8,
        "arts": 17,
        "musique": 19
      }
    }
  },
  {
    "nom": "JABER",
    "prenom": "Ali",
    "francais": 10,
    "maths": 14,
    "hg_emc": 17.5,
    "sciences": 13,
    "oral": 15,
    "controle_continu": 12.8,
    "score": 13.46,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 25,
        "fr_dictee": 1,
        "fr_redac": 24,
        "francais": 10,
        "maths": 14,
        "hg": 18,
        "emc": 16,
        "svt": 6,
        "phys": 7,
        "sciences": 13,
        "oral": 15
      },
      "cc": {
        "maths": 12.2,
        "francais": 7.1,
        "hg": 9.3,
        "emc": 10.9,
        "anglais": 11.1,
        "espagnol": 13.3,
        "eps": 17.3,
        "svt": 7.4,
        "phys": 10.8,
        "techno": 16.5,
        "arts": 19.3,
        "musique": 18
      }
    }
  },
  {
    "nom": "MARCHESE",
    "prenom": "Howard Giovanni Sédar",
    "francais": 5,
    "maths": 14,
    "hg_emc": 11.25,
    "sciences": 9,
    "oral": 14,
    "controle_continu": 12.3,
    "score": 11.3,
    "resultat": "Admis",
    "details": {
      "ep": {
        "fr_gram": 9,
        "fr_dictee": 0,
        "fr_redac": 12,
        "francais": 5,
        "maths": 14,
        "hg": 12,
        "emc": 9,
        "svt": 6,
        "phys": 3,
        "sciences": 9,
        "oral": 14
      },
      "cc": {
        "maths": 9.6,
        "francais": 7.4,
        "hg": 9.3,
        "emc": 10.8,
        "anglais": 9.1,
        "espagnol": 11.3,
        "eps": 16.8,
        "svt": 10.5,
        "phys": 10.2,
        "techno": 16.1,
        "arts": 18,
        "musique": 18
      }
    }
  },
  {
    "nom": "MARTINEZ",
    "prenom": "Gabriel-Omar Régis",
    "francais": 13,
    "maths": 13,
    "hg_emc": 17.5,
    "sciences": 18,
    "oral": 12,
    "controle_continu": 13.8,
    "score": 14.34,
    "resultat": "Admis Mention Bien",
    "details": {
      "ep": {
        "fr_gram": 41,
        "fr_dictee": 7,
        "fr_redac": 16,
        "francais": 13,
        "maths": 13,
        "hg": 18,
        "emc": 16,
        "svt": 9,
        "phys": 9,
        "sciences": 18,
        "oral": 12
      },
      "cc": {
        "maths": 13.9,
        "francais": 10.5,
        "hg": 14.1,
        "emc": 13.6,
        "anglais": 11.7,
        "espagnol": 13.3,
        "eps": 17.2,
        "svt": 7.5,
        "phys": 12.3,
        "techno": 15.4,
        "arts": 18.3,
        "musique": 17.5
      }
    }
  },
  {
    "nom": "MBOUP",
    "prenom": "Adam Fallou",
    "francais": 14,
    "maths": 20,
    "hg_emc": 17.75,
    "sciences": 17,
    "oral": 18,
    "controle_continu": 16.2,
    "score": 16.88,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 37,
        "fr_dictee": 5,
        "fr_redac": 26,
        "francais": 14,
        "maths": 20,
        "hg": 18,
        "emc": 17,
        "svt": 8,
        "phys": 9,
        "sciences": 17,
        "oral": 18
      },
      "cc": {
        "maths": 17.9,
        "francais": 12.7,
        "hg": 14.7,
        "emc": 19.5,
        "anglais": 13.5,
        "espagnol": 15.3,
        "eps": 18.3,
        "svt": 15,
        "phys": 13.9,
        "techno": 16.9,
        "arts": 18,
        "musique": 18.2
      }
    }
  },
  {
    "nom": "MENDY BOSSU",
    "prenom": "Mia Caroline Michele",
    "francais": 15,
    "maths": 19,
    "hg_emc": 16.25,
    "sciences": 14,
    "oral": 17,
    "controle_continu": 15.2,
    "score": 15.83,
    "resultat": "Admis Mention Bien",
    "details": {
      "ep": {
        "fr_gram": 35,
        "fr_dictee": 0,
        "fr_redac": 36,
        "francais": 15,
        "maths": 19,
        "hg": 17,
        "emc": 14,
        "svt": 9,
        "phys": 5,
        "sciences": 14,
        "oral": 17
      },
      "cc": {
        "maths": 15.4,
        "francais": 12.1,
        "hg": 15.8,
        "emc": 15.8,
        "anglais": 12.8,
        "espagnol": 12.3,
        "eps": 17,
        "svt": 13,
        "phys": 14.7,
        "techno": 16.6,
        "arts": 19.3,
        "musique": 17.5
      }
    }
  },
  {
    "nom": "MLIK",
    "prenom": "Omar",
    "francais": 16,
    "maths": 20,
    "hg_emc": 14,
    "sciences": 15,
    "oral": 20,
    "controle_continu": 16.3,
    "score": 16.73,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 39,
        "fr_dictee": 5,
        "fr_redac": 34,
        "francais": 16,
        "maths": 20,
        "hg": 14,
        "emc": 14,
        "svt": 7,
        "phys": 8,
        "sciences": 15,
        "oral": 20
      },
      "cc": {
        "maths": 18.6,
        "francais": 15,
        "hg": 13,
        "emc": 14.1,
        "anglais": 18.6,
        "espagnol": 16.7,
        "eps": 17.3,
        "svt": 12.2,
        "phys": 16.3,
        "techno": 17,
        "arts": 18.3,
        "musique": 18.8
      }
    }
  },
  {
    "nom": "MONTALBANO",
    "prenom": "Nathalie Marie Olga",
    "francais": 13,
    "maths": 12,
    "hg_emc": 11,
    "sciences": 12,
    "oral": 15,
    "controle_continu": 14.2,
    "score": 13.24,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 34,
        "fr_dictee": 0,
        "fr_redac": 30,
        "francais": 13,
        "maths": 12,
        "hg": 12,
        "emc": 8,
        "svt": 8,
        "phys": 4,
        "sciences": 12,
        "oral": 15
      },
      "cc": {
        "maths": 11.7,
        "francais": 10.1,
        "hg": 12.6,
        "emc": 14.8,
        "anglais": 11.2,
        "espagnol": 14.5,
        "eps": 16.7,
        "svt": 11.5,
        "phys": 12.6,
        "techno": 16.3,
        "arts": 19,
        "musique": 19.2
      }
    }
  },
  {
    "nom": "NDIAYE",
    "prenom": "Anna Florence",
    "francais": 15,
    "maths": 15,
    "hg_emc": 19.75,
    "sciences": 16,
    "oral": 18,
    "controle_continu": 15.4,
    "score": 16.23,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 31,
        "fr_dictee": 8,
        "fr_redac": 34,
        "francais": 15,
        "maths": 15,
        "hg": 20,
        "emc": 19,
        "svt": 9,
        "phys": 7,
        "sciences": 16,
        "oral": 18
      },
      "cc": {
        "maths": 16.5,
        "francais": 13.8,
        "hg": 14,
        "emc": 13.2,
        "anglais": 17.2,
        "espagnol": 15.8,
        "eps": 14,
        "svt": 11.3,
        "phys": 16.3,
        "techno": 16.5,
        "arts": 18.7,
        "musique": 17.8
      }
    }
  },
  {
    "nom": "NGOM",
    "prenom": "Khady Meissa",
    "francais": 16,
    "maths": 16,
    "hg_emc": 15.5,
    "sciences": 17,
    "oral": 20,
    "controle_continu": 16.2,
    "score": 16.63,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 34,
        "fr_dictee": 6,
        "fr_redac": 37,
        "francais": 16,
        "maths": 16,
        "hg": 16,
        "emc": 14,
        "svt": 8,
        "phys": 9,
        "sciences": 17,
        "oral": 20
      },
      "cc": {
        "maths": 16.3,
        "francais": 14,
        "hg": 13.7,
        "emc": 17.4,
        "anglais": 19.3,
        "espagnol": 18.3,
        "eps": 13,
        "svt": 13.6,
        "phys": 17.2,
        "techno": 16,
        "arts": 17.7,
        "musique": 18.2
      }
    }
  },
  {
    "nom": "NOUHANDO ROD",
    "prenom": "Ezechiel Gildas",
    "francais": 12,
    "maths": 14,
    "hg_emc": 9.75,
    "sciences": 12,
    "oral": 15,
    "controle_continu": 14.4,
    "score": 13.29,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 36,
        "fr_dictee": 3,
        "fr_redac": 18,
        "francais": 12,
        "maths": 14,
        "hg": 9,
        "emc": 12,
        "svt": 6,
        "phys": 6,
        "sciences": 12,
        "oral": 15
      },
      "cc": {
        "maths": 12.9,
        "francais": 11.4,
        "hg": 12.9,
        "emc": 13.4,
        "anglais": 14.8,
        "espagnol": 16,
        "eps": 17.2,
        "svt": 11.8,
        "phys": 12.2,
        "techno": 16.2,
        "arts": 15.7,
        "musique": 18.2
      }
    }
  },
  {
    "nom": "NUSS",
    "prenom": "Paulette Thiaba",
    "francais": 10,
    "maths": 7,
    "hg_emc": 5.75,
    "sciences": 10,
    "oral": 10,
    "controle_continu": 10.5,
    "score": 9.34,
    "resultat": "Refusé",
    "details": {
      "ep": {
        "fr_gram": 24,
        "fr_dictee": 0,
        "fr_redac": 25,
        "francais": 10,
        "maths": 7,
        "hg": 5,
        "emc": 8,
        "svt": 8,
        "phys": 2,
        "sciences": 10,
        "oral": 10
      },
      "cc": {
        "maths": 4.9,
        "francais": 7.1,
        "hg": 5.9,
        "emc": 8.2,
        "anglais": 8.8,
        "espagnol": 10.5,
        "eps": 13.7,
        "svt": 7,
        "phys": 12.5,
        "techno": 15.6,
        "arts": 14.3,
        "musique": 17.8
      }
    }
  },
  {
    "nom": "PORQUET",
    "prenom": "Yaniss",
    "francais": 6,
    "maths": 12,
    "hg_emc": 9.75,
    "sciences": 11,
    "oral": 14,
    "controle_continu": 13.1,
    "score": 11.57,
    "resultat": "Admis",
    "details": {
      "ep": {
        "fr_gram": 15,
        "fr_dictee": 0,
        "fr_redac": 14,
        "francais": 6,
        "maths": 12,
        "hg": 11,
        "emc": 6,
        "svt": 7,
        "phys": 4,
        "sciences": 11,
        "oral": 14
      },
      "cc": {
        "maths": 11.2,
        "francais": 7.6,
        "hg": 10.8,
        "emc": 11.8,
        "anglais": 12.8,
        "espagnol": 11.7,
        "eps": 18.7,
        "svt": 9.3,
        "phys": 11.6,
        "techno": 15.9,
        "arts": 17,
        "musique": 18.8
      }
    }
  },
  {
    "nom": "SAMB",
    "prenom": "Abdou Aziz",
    "francais": 12,
    "maths": 15,
    "hg_emc": 18.25,
    "sciences": 16,
    "oral": 19,
    "controle_continu": 13.7,
    "score": 15.11,
    "resultat": "Admis Mention Bien",
    "details": {
      "ep": {
        "fr_gram": 30,
        "fr_dictee": 1,
        "fr_redac": 27,
        "francais": 12,
        "maths": 15,
        "hg": 19,
        "emc": 16,
        "svt": 8,
        "phys": 8,
        "sciences": 16,
        "oral": 19
      },
      "cc": {
        "maths": 12.4,
        "francais": 8.8,
        "hg": 12.3,
        "emc": 11.2,
        "anglais": 12.1,
        "espagnol": 14,
        "eps": 17.3,
        "svt": 10.4,
        "phys": 13.3,
        "techno": 16.1,
        "arts": 17.7,
        "musique": 18.5
      }
    }
  },
  {
    "nom": "TEBER",
    "prenom": "Nehir",
    "francais": 11,
    "maths": 15,
    "hg_emc": 11,
    "sciences": 14,
    "oral": 12,
    "controle_continu": 13.3,
    "score": 12.9,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 28,
        "fr_dictee": 0,
        "fr_redac": 26,
        "francais": 11,
        "maths": 15,
        "hg": 11,
        "emc": 11,
        "svt": 8,
        "phys": 6,
        "sciences": 14,
        "oral": 12
      },
      "cc": {
        "maths": 11.5,
        "francais": 8.2,
        "hg": 10.6,
        "emc": 13.1,
        "anglais": 10.3,
        "espagnol": 14,
        "eps": 15,
        "svt": 7.9,
        "phys": 15.5,
        "techno": 16.9,
        "arts": 19,
        "musique": 18.2
      }
    }
  },
  {
    "nom": "YEROCHEWSKI",
    "prenom": "Yelen Sophie Marie",
    "francais": 18,
    "maths": 13,
    "hg_emc": 17,
    "sciences": 12,
    "oral": 16,
    "controle_continu": 14.4,
    "score": 14.9,
    "resultat": "Admis Mention Bien",
    "details": {
      "ep": {
        "fr_gram": 46,
        "fr_dictee": 5,
        "fr_redac": 35,
        "francais": 18,
        "maths": 13,
        "hg": 19,
        "emc": 11,
        "svt": 6,
        "phys": 6,
        "sciences": 12,
        "oral": 16
      },
      "cc": {
        "maths": 12.5,
        "francais": 12.2,
        "hg": 11.6,
        "emc": 12.4,
        "anglais": 12.7,
        "espagnol": 15.3,
        "eps": 17.2,
        "svt": 10.3,
        "phys": 15.3,
        "techno": 16.4,
        "arts": 19,
        "musique": 18.3
      }
    }
  },
  {
    "nom": "SARR",
    "prenom": "Fatou Bintou",
    "francais": 9,
    "maths": 11,
    "hg_emc": 18.5,
    "sciences": 15,
    "oral": 20,
    "controle_continu": 13.5,
    "score": 14.22,
    "resultat": "Admis Mention Bien",
    "details": {
      "ep": {
        "fr_gram": 21,
        "fr_dictee": 0,
        "fr_redac": 20,
        "francais": 9,
        "maths": 11,
        "hg": 19,
        "emc": 17,
        "svt": 6,
        "phys": 9,
        "sciences": 15,
        "oral": 20
      },
      "cc": {
        "maths": 9.2,
        "francais": 8.2,
        "hg": 9.3,
        "emc": 7.6,
        "anglais": 17.8,
        "espagnol": 16.5,
        "eps": 15.8,
        "svt": 8.3,
        "phys": 15.5,
        "techno": 16.3,
        "arts": 19,
        "musique": 18
      }
    }
  },
  {
    "nom": "GILLEN",
    "prenom": "Mathieu Louis Pierre",
    "francais": 10,
    "maths": 16,
    "hg_emc": 17.25,
    "sciences": 15,
    "oral": 14,
    "controle_continu": 12.4,
    "score": 13.64,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 24,
        "fr_dictee": 4,
        "fr_redac": 19,
        "francais": 10,
        "maths": 16,
        "hg": 17,
        "emc": 18,
        "svt": 7,
        "phys": 8,
        "sciences": 15,
        "oral": 14
      },
      "cc": {
        "maths": 11.5,
        "francais": 8.4,
        "hg": 12.1,
        "emc": 9.3,
        "anglais": 9.1,
        "espagnol": 10.8,
        "eps": 16.6,
        "svt": 10.6,
        "phys": 13.5,
        "techno": 14.9,
        "arts": 15,
        "musique": 17.2
      }
    }
  },
  {
    "nom": "BA",
    "prenom": "Abygaëlle Bilel",
    "francais": 14,
    "maths": 11,
    "hg_emc": 15.5,
    "sciences": 12,
    "oral": 16,
    "controle_continu": 13.3,
    "score": 13.53,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 24,
        "fr_dictee": 9,
        "fr_redac": 35,
        "francais": 14,
        "maths": 11,
        "hg": 16,
        "emc": 14,
        "svt": 6,
        "phys": 6,
        "sciences": 12,
        "oral": 16
      },
      "cc": {
        "maths": 6.8,
        "francais": 12.7,
        "hg": 12.4,
        "emc": 12.3,
        "anglais": 17.4,
        "espagnol": 13.3,
        "eps": 14.9,
        "svt": 8.6,
        "phys": 10.3,
        "techno": 16.3,
        "arts": 17,
        "musique": 17
      }
    }
  },
  {
    "nom": "BERGOT",
    "prenom": "Mathieu Yohan",
    "francais": 10,
    "maths": 11,
    "hg_emc": 10.25,
    "sciences": 12,
    "oral": 15,
    "controle_continu": 12.6,
    "score": 12.04,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 22,
        "fr_dictee": 8,
        "fr_redac": 20,
        "francais": 10,
        "maths": 11,
        "hg": 10,
        "emc": 11,
        "svt": 8,
        "phys": 4,
        "sciences": 12,
        "oral": 15
      },
      "cc": {
        "maths": 11.5,
        "francais": 6.7,
        "hg": 9.3,
        "emc": 10.8,
        "anglais": 13.9,
        "espagnol": 10,
        "eps": 16.2,
        "svt": 7.2,
        "phys": 11.8,
        "techno": 17.8,
        "arts": 17.3,
        "musique": 18.8
      }
    }
  },
  {
    "nom": "BODELOT",
    "prenom": "Julien Achille",
    "francais": 13,
    "maths": 20,
    "hg_emc": 18.5,
    "sciences": 16,
    "oral": 17,
    "controle_continu": 17.4,
    "score": 17.1,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 43,
        "fr_dictee": 6,
        "fr_redac": 15,
        "francais": 13,
        "maths": 20,
        "hg": 19,
        "emc": 17,
        "svt": 7,
        "phys": 9,
        "sciences": 16,
        "oral": 17
      },
      "cc": {
        "maths": 18.3,
        "francais": 15.9,
        "hg": 17,
        "emc": 15.7,
        "anglais": 17.8,
        "espagnol": 16.8,
        "eps": 17.5,
        "svt": 16.3,
        "phys": 19.6,
        "techno": 16.9,
        "arts": 18.7,
        "musique": 18.3
      }
    }
  },
  {
    "nom": "CHARAT",
    "prenom": "Joséphine Awa Michele",
    "francais": 10,
    "maths": 18,
    "hg_emc": 12.25,
    "sciences": 14,
    "oral": 15,
    "controle_continu": 14.5,
    "score": 14.11,
    "resultat": "Admis Mention Bien",
    "details": {
      "ep": {
        "fr_gram": 24,
        "fr_dictee": 0,
        "fr_redac": 22,
        "francais": 10,
        "maths": 18,
        "hg": 12,
        "emc": 13,
        "svt": 5,
        "phys": 9,
        "sciences": 14,
        "oral": 15
      },
      "cc": {
        "maths": 16.5,
        "francais": 9.1,
        "hg": 12.3,
        "emc": 13,
        "anglais": 11.2,
        "espagnol": 14.7,
        "eps": 14,
        "svt": 13.7,
        "phys": 16.2,
        "techno": 16.1,
        "arts": 19,
        "musique": 17.8
      }
    }
  },
  {
    "nom": "DEMANGE",
    "prenom": "Laura Sokhna",
    "francais": 10,
    "maths": 9,
    "hg_emc": 9,
    "sciences": 13,
    "oral": 18,
    "controle_continu": 10.4,
    "score": 11.25,
    "resultat": "Admis",
    "details": {
      "ep": {
        "fr_gram": 20,
        "fr_dictee": 0,
        "fr_redac": 30,
        "francais": 10,
        "maths": 9,
        "hg": 8,
        "emc": 12,
        "svt": 8,
        "phys": 5,
        "sciences": 13,
        "oral": 18
      },
      "cc": {
        "maths": 5.7,
        "francais": 7.5,
        "hg": 4.8,
        "emc": 9.6,
        "anglais": 9.5,
        "espagnol": 10,
        "eps": 15.6,
        "svt": 6.4,
        "phys": 7.5,
        "techno": 16.3,
        "arts": 14,
        "musique": 18
      }
    }
  },
  {
    "nom": "DIAGNE",
    "prenom": "Ndeye Awa",
    "francais": 10,
    "maths": 16,
    "hg_emc": 11.75,
    "sciences": 8,
    "oral": 13,
    "controle_continu": 13.1,
    "score": 12.29,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 24,
        "fr_dictee": 1,
        "fr_redac": 22,
        "francais": 10,
        "maths": 16,
        "hg": 12,
        "emc": 11,
        "svt": 5,
        "phys": 3,
        "sciences": 8,
        "oral": 13
      },
      "cc": {
        "maths": 12.4,
        "francais": 7.5,
        "hg": 13.2,
        "emc": 13.4,
        "anglais": 10.9,
        "espagnol": 9.3,
        "eps": 16,
        "svt": 9,
        "phys": 11.4,
        "techno": 17.2,
        "arts": 19,
        "musique": 17.5
      }
    }
  },
  {
    "nom": "DIALLO",
    "prenom": "Djibril",
    "francais": 8,
    "maths": 14,
    "hg_emc": 14,
    "sciences": 14,
    "oral": 10,
    "controle_continu": 13.3,
    "score": 12.52,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 26,
        "fr_dictee": 1,
        "fr_redac": 10,
        "francais": 8,
        "maths": 14,
        "hg": 15,
        "emc": 11,
        "svt": 7,
        "phys": 7,
        "sciences": 14,
        "oral": 10
      },
      "cc": {
        "maths": 13.6,
        "francais": 8.7,
        "hg": 10.1,
        "emc": 12.6,
        "anglais": 14.3,
        "espagnol": 13.5,
        "eps": 13.7,
        "svt": 9.6,
        "phys": 14.6,
        "techno": 16.3,
        "arts": 15.7,
        "musique": 16.7
      }
    }
  },
  {
    "nom": "DIALLO",
    "prenom": "Ibrahima Sory",
    "francais": 5,
    "maths": 4,
    "hg_emc": 7.25,
    "sciences": 9,
    "oral": 8,
    "controle_continu": 11,
    "score": 8.39,
    "resultat": "Refusé",
    "details": {
      "ep": {
        "fr_gram": 12,
        "fr_dictee": 0,
        "fr_redac": 10,
        "francais": 5,
        "maths": 4,
        "hg": 8,
        "emc": 5,
        "svt": 5,
        "phys": 4,
        "sciences": 9,
        "oral": 8
      },
      "cc": {
        "maths": 5.9,
        "francais": 8,
        "hg": 9.4,
        "emc": 7.5,
        "anglais": 11.7,
        "espagnol": 12,
        "eps": 15.3,
        "svt": 8.3,
        "phys": 6,
        "techno": 15.4,
        "arts": 15.7,
        "musique": 16.8
      }
    }
  },
  {
    "nom": "FALL",
    "prenom": "Adji Magatte",
    "francais": 18,
    "maths": 19,
    "hg_emc": 16,
    "sciences": 18,
    "oral": 20,
    "controle_continu": 15.2,
    "score": 17.02,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 41,
        "fr_dictee": 10,
        "fr_redac": 35,
        "francais": 18,
        "maths": 19,
        "hg": 17,
        "emc": 13,
        "svt": 9,
        "phys": 9,
        "sciences": 18,
        "oral": 20
      },
      "cc": {
        "maths": 16.2,
        "francais": 13.5,
        "hg": 13.1,
        "emc": 13.8,
        "anglais": 15.6,
        "espagnol": 16,
        "eps": 15.5,
        "svt": 9.8,
        "phys": 15.7,
        "techno": 17.3,
        "arts": 18.3,
        "musique": 17.8
      }
    }
  },
  {
    "nom": "GAFFARI",
    "prenom": "Sofia",
    "francais": 12,
    "maths": 11,
    "hg_emc": 15,
    "sciences": 12,
    "oral": 18,
    "controle_continu": 13.9,
    "score": 13.72,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 30,
        "fr_dictee": 6,
        "fr_redac": 20,
        "francais": 12,
        "maths": 11,
        "hg": 15,
        "emc": 15,
        "svt": 6,
        "phys": 6,
        "sciences": 12,
        "oral": 18
      },
      "cc": {
        "maths": 10.7,
        "francais": 11.6,
        "hg": 11.6,
        "emc": 10.6,
        "anglais": 16.7,
        "espagnol": 16.8,
        "eps": 13.9,
        "svt": 8.9,
        "phys": 12.5,
        "techno": 16,
        "arts": 19.3,
        "musique": 17.8
      }
    }
  },
  {
    "nom": "HOUGNON",
    "prenom": "Alexandre Georges",
    "francais": 8,
    "maths": 15,
    "hg_emc": 18.25,
    "sciences": 11,
    "oral": 20,
    "controle_continu": 12.9,
    "score": 13.85,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 17,
        "fr_dictee": 2,
        "fr_redac": 20,
        "francais": 8,
        "maths": 15,
        "hg": 18,
        "emc": 19,
        "svt": 8,
        "phys": 3,
        "sciences": 11,
        "oral": 20
      },
      "cc": {
        "maths": 11.6,
        "francais": 6.7,
        "hg": 11.7,
        "emc": 10.8,
        "anglais": 14,
        "espagnol": 11.3,
        "eps": 17.3,
        "svt": 8.7,
        "phys": 11.5,
        "techno": 15.4,
        "arts": 18.3,
        "musique": 17.7
      }
    }
  },
  {
    "nom": "KANE",
    "prenom": "Souleymane",
    "francais": 11,
    "maths": 19,
    "hg_emc": 11,
    "sciences": 14,
    "oral": 14,
    "controle_continu": 13.5,
    "score": 13.7,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 34,
        "fr_dictee": 0,
        "fr_redac": 18,
        "francais": 11,
        "maths": 19,
        "hg": 11,
        "emc": 11,
        "svt": 10,
        "phys": 4,
        "sciences": 14,
        "oral": 14
      },
      "cc": {
        "maths": 12.9,
        "francais": 8.6,
        "hg": 11.1,
        "emc": 11.6,
        "anglais": 11.2,
        "espagnol": 13.2,
        "eps": 16.8,
        "svt": 12.8,
        "phys": 13,
        "techno": 16.6,
        "arts": 17,
        "musique": 17.5
      }
    }
  },
  {
    "nom": "KOUROUMA",
    "prenom": "Marguerite",
    "francais": 6,
    "maths": 15,
    "hg_emc": 13.25,
    "sciences": 9,
    "oral": 11,
    "controle_continu": 13.8,
    "score": 12.05,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 14,
        "fr_dictee": 0,
        "fr_redac": 14,
        "francais": 6,
        "maths": 15,
        "hg": 12,
        "emc": 17,
        "svt": 4,
        "phys": 5,
        "sciences": 9,
        "oral": 11
      },
      "cc": {
        "maths": 14.1,
        "francais": 9.2,
        "hg": 12.1,
        "emc": 10.4,
        "anglais": 12.1,
        "espagnol": 12.5,
        "eps": 14.5,
        "svt": 12.1,
        "phys": 15.3,
        "techno": 16.6,
        "arts": 18.3,
        "musique": 18.7
      }
    }
  },
  {
    "nom": "LE COM",
    "prenom": "Solen",
    "francais": 11,
    "maths": 12,
    "hg_emc": 6.75,
    "sciences": 15,
    "oral": 10,
    "controle_continu": 12.2,
    "score": 11.45,
    "resultat": "Admis",
    "details": {
      "ep": {
        "fr_gram": 30,
        "fr_dictee": 7,
        "fr_redac": 16,
        "francais": 11,
        "maths": 12,
        "hg": 3,
        "emc": 18,
        "svt": 10,
        "phys": 5,
        "sciences": 15,
        "oral": 10
      },
      "cc": {
        "maths": 9.4,
        "francais": 10.8,
        "hg": 7.7,
        "emc": 13.4,
        "anglais": 14.1,
        "espagnol": 13.5,
        "eps": 11.2,
        "svt": 9.7,
        "phys": 10.2,
        "techno": 16.1,
        "arts": 13.3,
        "musique": 16.7
      }
    }
  },
  {
    "nom": "LESAINT",
    "prenom": "Samy Amet",
    "francais": 10,
    "maths": 15,
    "hg_emc": 15.5,
    "sciences": 11,
    "oral": 14,
    "controle_continu": 13.1,
    "score": 13.1,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 18,
        "fr_dictee": 0,
        "fr_redac": 28,
        "francais": 10,
        "maths": 15,
        "hg": 16,
        "emc": 14,
        "svt": 6,
        "phys": 5,
        "sciences": 11,
        "oral": 14
      },
      "cc": {
        "maths": 8.8,
        "francais": 9.6,
        "hg": 11.5,
        "emc": 11.8,
        "anglais": 10.9,
        "espagnol": 12.2,
        "eps": 17.5,
        "svt": 9.5,
        "phys": 12.7,
        "techno": 15.6,
        "arts": 18.7,
        "musique": 18.2
      }
    }
  },
  {
    "nom": "LOZES",
    "prenom": "Raphaël André Dominique",
    "francais": 8,
    "maths": 17,
    "hg_emc": 11.5,
    "sciences": 12,
    "oral": 17,
    "controle_continu": 12.7,
    "score": 12.92,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 20,
        "fr_dictee": 0,
        "fr_redac": 20,
        "francais": 8,
        "maths": 17,
        "hg": 12,
        "emc": 10,
        "svt": 6,
        "phys": 6,
        "sciences": 12,
        "oral": 17
      },
      "cc": {
        "maths": 12.5,
        "francais": 5.7,
        "hg": 13.5,
        "emc": 11.9,
        "anglais": 6.7,
        "espagnol": 11.8,
        "eps": 17,
        "svt": 10.1,
        "phys": 13.5,
        "techno": 17.4,
        "arts": 14.7,
        "musique": 17
      }
    }
  },
  {
    "nom": "MBOW",
    "prenom": "Aïssatou",
    "francais": 16,
    "maths": 19,
    "hg_emc": 20,
    "sciences": 17,
    "oral": 18,
    "controle_continu": 17.1,
    "score": 17.64,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 41,
        "fr_dictee": 6,
        "fr_redac": 32,
        "francais": 16,
        "maths": 19,
        "hg": 20,
        "emc": 20,
        "svt": 7,
        "phys": 10,
        "sciences": 17,
        "oral": 18
      },
      "cc": {
        "maths": 16.8,
        "francais": 16,
        "hg": 16.2,
        "emc": 15.3,
        "anglais": 17.1,
        "espagnol": 18,
        "eps": 16.1,
        "svt": 17.1,
        "phys": 18.2,
        "techno": 17.2,
        "arts": 19.3,
        "musique": 17.7
      }
    }
  },
  {
    "nom": "MENCIERE",
    "prenom": "Théophane Sedar",
    "francais": 9,
    "maths": 15,
    "hg_emc": 15.5,
    "sciences": 15,
    "oral": 13,
    "controle_continu": 13.3,
    "score": 13.41,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 27,
        "fr_dictee": 0,
        "fr_redac": 16,
        "francais": 9,
        "maths": 15,
        "hg": 16,
        "emc": 14,
        "svt": 8,
        "phys": 7,
        "sciences": 15,
        "oral": 13
      },
      "cc": {
        "maths": 10.8,
        "francais": 9.8,
        "hg": 12,
        "emc": 11.6,
        "anglais": 12.4,
        "espagnol": 12.3,
        "eps": 17.1,
        "svt": 11.4,
        "phys": 11.8,
        "techno": 16.1,
        "arts": 15.3,
        "musique": 18.5
      }
    }
  },
  {
    "nom": "MOCNIK",
    "prenom": "Léa Absa",
    "francais": 12,
    "maths": 19,
    "hg_emc": 14.5,
    "sciences": 18,
    "oral": 20,
    "controle_continu": 15.9,
    "score": 16.38,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 31,
        "fr_dictee": 4,
        "fr_redac": 24,
        "francais": 12,
        "maths": 19,
        "hg": 15,
        "emc": 13,
        "svt": 9,
        "phys": 9,
        "sciences": 18,
        "oral": 20
      },
      "cc": {
        "maths": 15.5,
        "francais": 13.6,
        "hg": 13.5,
        "emc": 12.9,
        "anglais": 17.8,
        "espagnol": 16.2,
        "eps": 18.4,
        "svt": 12.1,
        "phys": 17,
        "techno": 16.2,
        "arts": 19.7,
        "musique": 17.8
      }
    }
  },
  {
    "nom": "NDIAYE",
    "prenom": "Soukaïna Dibor",
    "francais": 15,
    "maths": 18,
    "hg_emc": 13,
    "sciences": 16,
    "oral": 18,
    "controle_continu": 16.3,
    "score": 16.13,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 40,
        "fr_dictee": 3,
        "fr_redac": 30,
        "francais": 15,
        "maths": 18,
        "hg": 12,
        "emc": 16,
        "svt": 9,
        "phys": 7,
        "sciences": 16,
        "oral": 18
      },
      "cc": {
        "maths": 16.4,
        "francais": 12.9,
        "hg": 16.1,
        "emc": 14.2,
        "anglais": 13.7,
        "espagnol": 16.3,
        "eps": 18,
        "svt": 15.4,
        "phys": 18.1,
        "techno": 17.5,
        "arts": 19.3,
        "musique": 18
      }
    }
  },
  {
    "nom": "PHILIPPE",
    "prenom": "Paloma Clémence",
    "francais": 17,
    "maths": 19,
    "hg_emc": 18,
    "sciences": 15,
    "oral": 11,
    "controle_continu": 16.2,
    "score": 16.07,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 41,
        "fr_dictee": 9,
        "fr_redac": 34,
        "francais": 17,
        "maths": 19,
        "hg": 19,
        "emc": 15,
        "svt": 8,
        "phys": 7,
        "sciences": 15,
        "oral": 11
      },
      "cc": {
        "maths": 15.3,
        "francais": 13.9,
        "hg": 14.8,
        "emc": 16.7,
        "anglais": 17.7,
        "espagnol": 15.2,
        "eps": 15.9,
        "svt": 15.2,
        "phys": 15.7,
        "techno": 17,
        "arts": 18.7,
        "musique": 17.8
      }
    }
  },
  {
    "nom": "REZGANI",
    "prenom": "Yasmine",
    "francais": 9,
    "maths": 16,
    "hg_emc": 13.75,
    "sciences": 12,
    "oral": 14,
    "controle_continu": 13,
    "score": 12.97,
    "resultat": "Admis Mention Assez Bien",
    "details": {
      "ep": {
        "fr_gram": 21,
        "fr_dictee": 1,
        "fr_redac": 19,
        "francais": 9,
        "maths": 16,
        "hg": 15,
        "emc": 10,
        "svt": 6,
        "phys": 6,
        "sciences": 12,
        "oral": 14
      },
      "cc": {
        "maths": 12.5,
        "francais": 7.5,
        "hg": 10.6,
        "emc": 10.2,
        "anglais": 17,
        "espagnol": 11.8,
        "eps": 11.3,
        "svt": 9.7,
        "phys": 15.2,
        "techno": 16.7,
        "arts": 16.3,
        "musique": 16.8
      }
    }
  },
  {
    "nom": "SALL",
    "prenom": "Arona Ababacar Alpha",
    "francais": 17,
    "maths": 12,
    "hg_emc": 15.5,
    "sciences": 15,
    "oral": 18,
    "controle_continu": 14,
    "score": 14.9,
    "resultat": "Admis Mention Bien",
    "details": {
      "ep": {
        "fr_gram": 41,
        "fr_dictee": 6,
        "fr_redac": 36,
        "francais": 17,
        "maths": 12,
        "hg": 16,
        "emc": 14,
        "svt": 6,
        "phys": 9,
        "sciences": 15,
        "oral": 18
      },
      "cc": {
        "maths": 9.9,
        "francais": 12.1,
        "hg": 11.5,
        "emc": 12.3,
        "anglais": 17,
        "espagnol": 16,
        "eps": 15.2,
        "svt": 8.6,
        "phys": 14.4,
        "techno": 16.2,
        "arts": 17.3,
        "musique": 17.2
      }
    }
  },
  {
    "nom": "TUNA",
    "prenom": "Melisa",
    "francais": 13,
    "maths": 19,
    "hg_emc": 16.5,
    "sciences": 14,
    "oral": 20,
    "controle_continu": 17.5,
    "score": 16.9,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 34,
        "fr_dictee": 9,
        "fr_redac": 22,
        "francais": 13,
        "maths": 19,
        "hg": 18,
        "emc": 12,
        "svt": 6,
        "phys": 8,
        "sciences": 14,
        "oral": 20
      },
      "cc": {
        "maths": 17.6,
        "francais": 16.3,
        "hg": 16.4,
        "emc": 16.4,
        "anglais": 17.8,
        "espagnol": 17.8,
        "eps": 18.5,
        "svt": 15.6,
        "phys": 18.2,
        "techno": 17.5,
        "arts": 19.3,
        "musique": 18.3
      }
    }
  },
  {
    "nom": "VILLAIN",
    "prenom": "Candice Noa",
    "francais": 14,
    "maths": 20,
    "hg_emc": 17,
    "sciences": 18,
    "oral": 20,
    "controle_continu": 17.4,
    "score": 17.65,
    "resultat": "Admis Mention Très Bien",
    "details": {
      "ep": {
        "fr_gram": 30,
        "fr_dictee": 0,
        "fr_redac": 38,
        "francais": 14,
        "maths": 20,
        "hg": 18,
        "emc": 14,
        "svt": 9,
        "phys": 9,
        "sciences": 18,
        "oral": 20
      },
      "cc": {
        "maths": 17.2,
        "francais": 15,
        "hg": 17.9,
        "emc": 17.8,
        "anglais": 16,
        "espagnol": 17,
        "eps": 18.7,
        "svt": 15.8,
        "phys": 18.3,
        "techno": 18.2,
        "arts": 19.3,
        "musique": 18
      }
    }
  },
  {
    "nom": "WONE",
    "prenom": "Aissatou Rahmatoulahi",
    "francais": 16,
    "maths": 18,
    "hg_emc": 13,
    "sciences": 15,
    "oral": 20,
    "controle_continu": 14.8,
    "score": 15.75,
    "resultat": "Admis Mention Bien",
    "details": {
      "ep": {
        "fr_gram": 42,
        "fr_dictee": 6,
        "fr_redac": 28,
        "francais": 16,
        "maths": 18,
        "hg": 11,
        "emc": 19,
        "svt": 6,
        "phys": 9,
        "sciences": 15,
        "oral": 20
      },
      "cc": {
        "maths": 13,
        "francais": 13.2,
        "hg": 11.8,
        "emc": 13,
        "anglais": 17.1,
        "espagnol": 16.8,
        "eps": 12.7,
        "svt": 12.7,
        "phys": 14.5,
        "techno": 16.7,
        "arts": 17.3,
        "musique": 18.3
      }
    }
  },
  {
    "nom": "D'ALMEIDA",
    "prenom": "Asha Tehillah Adefoumilayo",
    "francais": 18,
    "maths": 17,
    "hg_emc": 20,
    "sciences": 19,
    "oral": 20,
    "controle_continu": 18.4,
    "score": 18.65,
    "resultat": "Admis Mention Très Bien avec les félicitations du jury",
    "details": {
      "ep": {
        "fr_gram": 43,
        "fr_dictee": 9,
        "fr_redac": 35,
        "francais": 18,
        "maths": 17,
        "hg": 20,
        "emc": 20,
        "svt": 9,
        "phys": 10,
        "sciences": 19,
        "oral": 20
      },
      "cc": {
        "maths": 18.1,
        "francais": 17.2,
        "hg": 17,
        "emc": 18.5,
        "anglais": 19.5,
        "espagnol": 19.5,
        "eps": 16.5,
        "svt": 18.9,
        "phys": 19.5,
        "techno": 17.8,
        "arts": 20,
        "musique": 18.2
      }
    }
  }
];

export const dnbExam = {
  id: "dnb",
  label: "Brevet (DNB)",
  short: "DNB",
  niveau: "3ème",
  emoji: "📘",
  scoreMax: 20,
  years: [2021, 2022, 2023, 2024, 2025, 2026],
  yearColors: { 2021:"#cbd5e1", 2022:"#a5b4fc", 2023:"#818cf8", 2024:"#a78bfa", 2025:"#0ea5e9", 2026:"#0284c7" },

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
    2021: ELEVES_DNB_2021,
    2022: ELEVES_DNB_2022,
    2023: ELEVES_DNB_2023,
    2024: ELEVES_DNB_2024,
    2025: ELEVES_DNB_2025,
    2026: ELEVES_DNB_2026,
  },
  official: {}, // dérivé automatiquement des données saisies
};
