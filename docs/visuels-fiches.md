# Visuels des fiches

Les huit illustrations sont des fragments HTML statiques extraits du prototype
MCF-Design `a0df8f9` par `outils/proto/extraire.mjs`. Leur contenu est aligné
sur MCF-App `d91a67df`. Les fragments sont lus à chaque génération depuis
`outils/corps/fiches/visuels-proto/` : ils ne sont donc plus recopiés dans le
générateur de fiches.

Chaque fragment est inclus dans une figure avec une légende explicite et est
`aria-hidden`, car le texte de la fiche porte l’information accessible. Un filtre
défensif retire scripts, contrôles et attributs événementiels à l’export.

## Mise à l’échelle

`assets/css/visuels-fiches.css` utilise un conteneur de requête et une mise à
l’échelle `transform: scale(calc(100cqw / largeur))` d’un canevas fixe de 1440 px
ou 390 px. `transform` est retenu plutôt que `zoom` : il est stable dans Chrome,
Safari et Firefox récents. Le viewport conserve la hauteur grâce à son
`aspect-ratio`, coupe proprement avec `overflow: hidden` et des coins arrondis.
Le journal reste une vue bureau complète à cinq jours ; les vues téléphone
conservent leur tabbar dans le canevas de 390 px.

La feuille extraite `assets/css/visuels-proto.css` reste limitée au scope
`.appv-proto` et n’est chargée que par les huit fiches. Fraunces, Inter et
JetBrains Mono sont déjà demandées dans le gabarit avec `display=swap`.

## Écarts volontaires avec le prototype

- Les adaptations présentent des critères pédagogiques plutôt que des troubles.
- La fiche élève n’affiche pas de dispositifs, diagnostics ou évaluations.
- Les actions visibles sont des éléments inertes : aucun contrôle ne suggère une
  action disponible sur le site.
- Les données de classe, journal, tâches, import et conversation sont fictives.
- L’emploi du temps et le journal gardent les exemples éditoriaux de la fiche,
  sans prétendre être une session de l’application.

## Vérification

`npm run generer` génère les huit pages. `npm test` vérifie que chaque vue porte
son fragment, que les exports sont inertes et que la feuille du proto reste
scopée. `node tests/visuels-navigateur.mjs` est le contrôle manuel complémentaire
à 1440, 390 et 320 px : il capture les huit fiches et refuse un débordement
horizontal de page.
