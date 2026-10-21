# Visuels issus du proto

Les extraits ne sont pas des imitations : le script rend le proto MCF-Design dans une copie temporaire, puis exporte son DOM nettoyé et son CSS calculable par le navigateur.

Depuis la racine du dépôt :

```sh
node outils/proto/extraire.mjs /chemin/vers/mcf-design/site
```

Pour ne produire qu'une vue :

```sh
node outils/proto/extraire.mjs /chemin/vers/mcf-design/site cahier-journal
```

La commande écrit un fragment par vue (`cahier-journal`, `taches`, `emploi-du-temps`, `fiche-de-preparation`, `adaptation-des-supports`, `fiches-eleves`, `lia`, `import-eleves-photo`) dans `outils/corps/fiches/visuels-proto/`, ainsi que `assets/css/visuels-proto.css`. Elle attend Google Chrome à `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` et les dépendances CDN déjà accessibles au proto. Aucun JavaScript n'est conservé dans les exports.

Les correctifs de données, d'état et de retrait du lancement sont déclarés dans `outils/proto/vues.mjs`; les données sont fictives dans `outils/proto/donnees.mjs`. Le pilote sait aussi déclencher un événement de proto (l’import OCR), appliquer des remplacements strictement ciblés et ajouter un correctif CSS limité à une vue. Ces patchs sont appliqués uniquement dans la copie temporaire du proto.

## États extraits

| Vue | Séquence | Racine | Point à contrôler au rendu |
| --- | --- | --- | --- |
| `cahier-journal` | état initial | `.app` | semaine du 2 au 6 novembre 2026, sans évaluations |
| `taches` | « Voir toutes les tâches » | `.sp` | largeur 390 px et tabbar dans le flux |
| `emploi-du-temps` | état initial | `.app` | CM2, 4 jours et demi, 21 h 45 |
| `fiche-de-preparation` | ouvre « Mesurer des longueurs » | `.app` | objectif et référentiel de mesure ; sans partage dans la base |
| `adaptation-des-supports` | état initial | `.app` | support unique et cibles selon les critères pédagogiques |
| `fiches-eleves` | état initial | `.app` | Inès Martin ; critères, fil de suivi et tâches liées |
| `lia` | hash `lia=expanded&conv=1` | `.app` | Lia ne propose que commentaire ou tâche |
| `import-eleves-photo` | événement `sp:import-ocr`, attente 1,65 s | `.sp` | étape `.ocr-correction`, huit lignes |

Les patchs par vue restent déclaratifs dans `vues.mjs` : journal (graines, identité, horloge et retrait des évaluations), tâches (graines et correctif de gabarit), EDT (créneaux CM2), fiche (graines de mesure puis ouverture), supports (support unique et cibles par critères), fiche élève (identité et suivi), Lia (conversation et contexte) et OCR (lignes et événement). Le post-traitement de `extraire.mjs` ne modifie que le DOM exporté : il enlève les éléments de prototype non présents dans l’app et convertit les contrôles interactifs en rendu statique.
