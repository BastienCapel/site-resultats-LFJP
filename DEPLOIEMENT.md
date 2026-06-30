# Déploiement — deux sites distincts

Ce projet produit **deux sites** à partir du même code, pour respecter le RGPD.

## 1. Site PUBLIC (anonymisé) — GitHub Pages

- **URL :** https://bastiencapel.github.io/site-resultats-LFJP/
- **Contenu :** statistiques globales uniquement. Aucun nom, aucune note
  individuelle. Les données nominatives sont **physiquement retirées du code**
  au moment du build (plugin dans `vite.config.js`).
- **Mise à jour :** `git push` sur la branche `main`. GitHub Actions reconstruit
  et publie automatiquement la version sûre (`npm run build`).

> ⚠️ C'est cette URL qui doit être intégrée (iframe) dans la page Google Sites
> publique. Ne jamais y mettre le site privé.

## 2. Site PRIVÉ (complet) — Vercel, protégé par mot de passe

- **URL :** https://resultats-lfjp-prive.vercel.app
- **Contenu :** noms entiers + notes détaillées + onglet « Élèves ».
- **Accès :** mot de passe partagé, demandé par le navigateur.
  - Identifiant : n'importe lequel (non vérifié).
  - Mot de passe : la valeur de la variable Vercel `SITE_PASSWORD`.
- **Changer le mot de passe :** Tableau de bord Vercel → projet
  `resultats-lfjp-prive` → Settings → Environment Variables → `SITE_PASSWORD`
  → modifier la valeur → **redéployer** (`vercel deploy --prod`) pour l'appliquer.
- **Mise à jour des données :** depuis ce dossier, `vercel deploy --prod`
  (construit automatiquement la version complète via `vercel.json` →
  `npm run build:full`).

## Comment ça marche techniquement

- `npm run build` → build **public** (données nominatives supprimées).
- `npm run build:full` → build **complet** (tout conservé). Réservé à Vercel.
- `middleware.js` → contrôle d'accès **côté serveur** sur Vercel. Refuse tout
  tant que `SITE_PASSWORD` n'est pas défini (« fail closed », aucune fuite
  possible). Le mot de passe n'est **jamais** écrit dans le code.
