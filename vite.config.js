import { defineConfig } from 'vite';

// ── Mode de build ──────────────────────────────────────────────────────────────
// VITE_FULL=1  → build COMPLET (espace réservé, déployé sur Vercel derrière mot de
//                passe) : noms entiers + notes détaillées conservés.
// (non défini)  → build PUBLIC (GitHub Pages) : les données nominatives (nom, prénom,
//                détails de jury) sont PHYSIQUEMENT retirées du code livré au navigateur
//                par le plugin ci-dessous. Conformité RGPD : rien à exfiltrer côté client.
const FULL = process.env.VITE_FULL === '1';

// ── Plugin : suppression des identités au build public ─────────────────────────
// Retire les propriétés « nom », « prenom » et « details » de chaque objet élève,
// directement dans le source des fichiers de données, AVANT le bundling. On parse
// le code en AST (acorn, fourni par Rollup via this.parse) plutôt qu'avec des regex,
// pour ne jamais corrompre le fichier.
function stripStudentIdentity() {
  const TARGET_KEYS = new Set(['nom', 'prenom', 'details']);
  const DATA_FILES = ['/src/data.js', '/src/exams/ea.js', '/src/exams/dnb.js'];

  return {
    name: 'strip-student-identity',
    enforce: 'pre',
    transform(code, id) {
      const path = id.split('?')[0].replace(/\\/g, '/');
      if (!DATA_FILES.some(f => path.endsWith(f))) return null;

      let ast;
      try {
        ast = this.parse(code);
      } catch (e) {
        this.error(`strip-student-identity : échec du parsing de ${path} : ${e.message}`);
      }

      // Collecte des plages [start, end] des propriétés à supprimer.
      const ranges = [];
      const visit = (node) => {
        if (!node || typeof node !== 'object') return;
        if (Array.isArray(node)) { node.forEach(visit); return; }
        if (node.type === 'Property' && node.key) {
          const name = node.key.name ?? node.key.value;
          if (TARGET_KEYS.has(name)) {
            ranges.push([node.start, node.end]);
            return; // ne pas descendre dans une propriété déjà supprimée
          }
        }
        for (const key in node) {
          if (key === 'start' || key === 'end' || key === 'type' || key === 'loc' || key === 'range') continue;
          const val = node[key];
          if (val && typeof val === 'object') visit(val);
        }
      };
      visit(ast);

      if (!ranges.length) return null;

      // Suppression de la fin vers le début pour préserver les offsets. On absorbe
      // la virgule (et les espaces) qui suit la propriété retirée.
      ranges.sort((a, b) => b[0] - a[0]);
      let out = code;
      for (const [start, end] of ranges) {
        let e = end;
        while (e < out.length && /\s/.test(out[e])) e++;
        if (out[e] === ',') e++;
        out = out.slice(0, start) + out.slice(e);
      }
      return { code: out, map: null };
    },
  };
}

export default defineConfig({
  base: './', // chemins relatifs : déployable sur n'importe quel sous-chemin (GitHub Pages, Vercel)
  define: {
    // Exposé à l'application via import.meta.env.VITE_FULL
    'import.meta.env.VITE_FULL': JSON.stringify(FULL ? '1' : ''),
  },
  plugins: [
    // Le plugin n'est actif que pour le build public ; le build complet conserve tout.
    ...(FULL ? [] : [stripStudentIdentity()]),
  ],
  server: {
    port: 3000,
  },
});
