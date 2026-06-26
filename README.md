# Résultats BAC 2026 — LFJP Saly

Ce projet est une application web statique interactive présentant les résultats du baccalauréat pour le **Lycée Français Jacques Prévert de Saly (LFJP)** sur une période pluriannuelle de 2022 à 2026.

## Fonctionnalités

- **Vue d'ensemble** : KPI clés (taux de réussite, moyenne, meilleure note), répartition des mentions 2026, distribution des moyennes 2026, résultats par épreuve terminale, et top 5 de la promotion 2026.
- **Analyse par année** : Statistiques descriptives détaillées (moyenne, médiane, écart-type, quartiles), boîte à moustaches interactive, répartition des mentions et des notes, moyenne par épreuve terminale, corrélations avec la moyenne générale, et analyse par tranche de performance.
- **Évolution & Comparaison** : Graphiques d'évolution pluriannuelle (taux de réussite, moyenne générale) et comparaison de la distribution des mentions.
- **Élèves** : Liste complète et triable des élèves avec leurs notes aux épreuves terminales (Français écrit/oral, Philosophie, Grand oral) et leur résultat global.

## Technologies utilisées

- **Vite** : Outil de build et serveur de développement rapide.
- **HTML5 / CSS3 / JavaScript (ES6+)** : Vanilla JS sans framework pour un rendu ultra-rapide et léger.

## Installation et démarrage local

Pour installer les dépendances et lancer le serveur de développement :

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev
```

L'application sera accessible par défaut sur `http://localhost:3000`.

## Build de production

Pour générer les fichiers statiques optimisés pour la production (dans le dossier `dist/`) :

```bash
npm run build
```
