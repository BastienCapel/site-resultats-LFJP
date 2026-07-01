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
  - `ALLOWED_PERSONAL_EMAILS` — (Optionnel) Liste d'adresses emails personnelles (ex: Gmail, Yahoo)
    autorisées à se connecter via Google, séparées par des virgules.
  - Sans les identifiants Google, l'accès est refusé par défaut (« fail closed »).
- **Mise à jour des données et du code :** depuis ce dossier, `vercel deploy --prod`
  (construit automatiquement la version complète via `vercel.json` →
  `npm run build:full` et déploie le middleware).

## Comment ça marche techniquement

- `npm run build` → build **public** (données nominatives supprimées).
- `npm run build:full` → build **complet** (tout conservé). Réservé à Vercel.
- `middleware.js` → contrôle d'accès **côté serveur** (Edge Function) sur Vercel. Refuse tout
  accès tant qu'une session valide (cookie signé contenant un email `@lfjpsaly.org` ou autorisé)
  n'est pas établie.

## Guide pas à pas : Configurer la connexion Google OAuth

### Étape 1 : Créer les identifiants sur Google Cloud
1. Rendez-vous sur la [Google Cloud Console](https://console.cloud.google.com/).
2. Créez un nouveau projet (ex: `Resultats LFJP`).
3. Allez dans **API et services** > **Écran de consentement OAuth** :
   * Choisissez le type **Interne** (si vous souhaitez le restreindre uniquement à `@lfjpsaly.org`) ou **Externe** (nécessaire si vous voulez aussi autoriser des adresses `@gmail.com` personnelles).
   * Remplissez les informations obligatoires (Nom de l'application, email de support).
   * Ajoutez le champ d'application (Scope) : `openid` et `email`.
4. Allez dans **API et services** > **Identifiants** :
   * Cliquez sur **Créer des identifiants** > **ID client OAuth**.
   * Type d'application : **Application Web**.
   * Nom : `Site Résultats BAC Privé`.
   * **Origines JavaScript autorisées :** Ajoutez `https://resultats-lfjp-prive.vercel.app`.
   * **URI de redirection autorisés :** Ajoutez `https://resultats-lfjp-prive.vercel.app/__auth/callback`.
   * Cliquez sur **Créer** et copiez l'**ID client** et le **Code secret du client**.

### Étape 2 : Configurer les variables d'environnement sur Vercel
1. Allez sur votre dashboard Vercel, sélectionnez le projet `resultats-lfjp-prive`.
2. Allez dans **Settings** > **Environment Variables**.
3. Ajoutez les variables suivantes pour l'environnement **Production** :
   * `GOOGLE_CLIENT_ID` = `[Votre ID client Google]`
   * `GOOGLE_CLIENT_SECRET` = `[Votre Code secret du client Google]`
   * `ALLOWED_PERSONAL_EMAILS` = `prof1@gmail.com, prof2@yahoo.fr` (optionnel, séparez par des virgules).
4. Cliquez sur **Save**.

### Étape 3 : Déployer la mise à jour
Dans votre terminal local, exécutez :
```bash
vercel deploy --prod
```
Cette commande va compiler et pousser la version complète contenant le middleware d'authentification Google Edge et le lier à vos variables d'environnement.
