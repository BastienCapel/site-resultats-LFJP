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
- **Accès :** connexion **Google restreinte au domaine `@lfjpsaly.org`**
  (personnel uniquement). Aucun mot de passe à diffuser ; accès traçable par compte.
  Le contrôle est fait côté serveur par `middleware.js` (flux OAuth Google,
  vérifie le claim `hd` = `lfjpsaly.org` + l'email). Bouton « Se déconnecter »
  dans l'en-tête.
- **Variables d'environnement Vercel requises** (Settings → Environment Variables) :
  - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — identifiant OAuth créé dans
    Google Cloud Console (type « Application Web », URI de redirection autorisée :
    `https://resultats-lfjp-prive.vercel.app/__auth/callback`).
  - `SESSION_SECRET` — clé aléatoire signant le cookie de session (déjà définie).
  - Sans ces variables, l'accès est refusé par défaut (« fail closed »).
- **Mise à jour des données :** depuis ce dossier, `vercel deploy --prod`
  (construit automatiquement la version complète via `vercel.json` →
  `npm run build:full`).

## Comment ça marche techniquement

- `npm run build` → build **public** (données nominatives supprimées).
- `npm run build:full` → build **complet** (tout conservé). Réservé à Vercel.
- `middleware.js` → contrôle d'accès **côté serveur** sur Vercel. Refuse tout
  tant que `SITE_PASSWORD` n'est pas défini (« fail closed », aucune fuite
  possible). Le mot de passe n'est **jamais** écrit dans le code.
