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

export const ELEVES_DNB_2026 = [];

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
