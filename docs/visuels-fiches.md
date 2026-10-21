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
l’échelle `zoom: min(1, tan(atan2(100cqw, 1440px)))` d’un canevas bureau fixe de
1440 px. Le viewport coupe proprement avec `overflow: hidden` et des coins
arrondis. Les huit extraits sont désormais des vues ordinateur ; il n’y a plus
de canevas, de barre d’onglets ni de classe CSS téléphone.

La feuille extraite `assets/css/visuels-proto.css` reste limitée au scope
`.appv-proto` et n’est chargée que par les huit fiches. Fraunces, Inter et
JetBrains Mono sont déjà demandées dans le gabarit avec `display=swap`.

## Écarts volontaires avec le prototype

- L’adaptation montre un support nommé et ajouté, puis le résultat « Selon mes
  élèves » pour Inès Martin et ses critères pédagogiques.
- La fiche élève reprend la fenêtre desktop de l’app, ses critères cochés, une
  tâche liée et le fil de suivi ; elle n’affiche ni dispositifs ni diagnostics.
- L’import est la fenêtre desktop « Ajouter des élèves », après l’analyse
  simulée de la liste de huit élèves.
- Les actions visibles sont des éléments inertes : aucun contrôle ne suggère une
  action disponible sur le site.
- Les données de classe, journal, tâches, import et conversation sont fictives.
- L’emploi du temps et le journal gardent les exemples éditoriaux de la fiche,
  sans prétendre être une session de l’application.

## Vérification

`npm run generer` génère les huit pages. `npm test` vérifie que chaque vue porte
son fragment bureau, que les exports sont inertes et que la feuille du proto
reste scopée. `node tests/visuels-navigateur.mjs` est le contrôle manuel
complémentaire à 1440 px : il capture les huit fiches, vérifie l’absence de vue
téléphone et refuse un débordement horizontal de page.
