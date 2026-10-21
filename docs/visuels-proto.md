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
| `fiche-de-preparation` | ouvre « Mesurer des longueurs » | `.app` | détail `.fiche-doc` |
| `adaptation-des-supports` | état initial | `.app` | support choisi ; critères pédagogiques à confirmer dans le proto |
| `fiches-eleves` | état initial | `.app` | Inès Martin ; pas de diagnostics ni d’évaluations |
| `lia` | hash `lia=expanded&conv=1` | `.app` | Lia ne propose que commentaire ou tâche |
| `import-eleves-photo` | événement `sp:import-ocr`, attente 1,65 s | `.sp` | étape `.ocr-correction`, huit lignes |

Les patchs par vue restent déclaratifs dans `vues.mjs` : journal (graines, identité, horloge et retrait des évaluations), tâches (graines et correctif de gabarit), EDT (créneaux CM2), fiche (graines puis ouverture), supports (support choisi et retrait visuel des anciens profils), fiche élève (identité), Lia (conversation) et OCR (lignes et événement). Le point incertain est limité aux supports : le proto bureau ne propose pas de composant pour présenter `CRITERES_INES` comme critères pédagogiques. Les critères sont bien portés par `donnees.mjs`, mais l’ancienne ligne de troubles est masquée jusqu’à ce que ce composant existe.
