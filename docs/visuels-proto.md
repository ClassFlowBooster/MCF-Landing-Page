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

La commande écrit `outils/corps/fiches/visuels-proto/cahier-journal.html`, `outils/corps/fiches/visuels-proto/taches.html` et `assets/css/visuels-proto.css`. Elle attend Google Chrome à `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` et les dépendances CDN déjà accessibles au proto. Aucun JavaScript n'est conservé dans les exports.

Les correctifs de données, d'état et de retrait du lancement sont déclarés dans `outils/proto/vues.mjs`; les données sont fictives dans `outils/proto/donnees.mjs`.
