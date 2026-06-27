// ── Registre des examens ──────────────────────────────────────────────────────
// Pour ajouter un nouvel examen : créer un fichier de config (cf. bac.js) puis
// l'enregistrer ici. Le reste du site s'adapte automatiquement.
import { bacExam } from "./bac.js";
import { dnbExam } from "./dnb.js";
import { eaExam } from "./ea.js";

export const EXAMS = {
  bac: bacExam,
  dnb: dnbExam,
  ea:  eaExam,
};

// Ordre d'affichage dans le sélecteur global
export const EXAM_ORDER = ["bac", "dnb", "ea"];
