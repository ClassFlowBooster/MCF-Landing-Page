# Relevé « les IA citent-elles MyClassFlow ? »

`outils/suivi-ia/releve.mjs` pose chaque semaine dix questions usuelles à Claude et ChatGPT, avec leur recherche Web, puis relève si MyClassFlow est cité. Les réponses brutes sont conservées dans un JSON de vérification manuelle ; le CSV ne contient que leur analyse. Par défaut, les fichiers vont dans `../MCF-Pilotage/docs/suivi-ia/`, dossier frère de ce dépôt. Le script ne fait jamais de commit ni de push des résultats.

Le CSV, encodé en UTF-8 avec BOM et séparé par des points-virgules, contient : `date`, `ia`, `modele`, `n`, `question`, `cite`, `rang`, `concurrents`, `lien`, `sources` et `erreur`. Le rang est celui de MyClassFlow parmi les outils reconnus dans l'ordre de leur première apparition. Le résumé Markdown compte les citations, le meilleur rang, les liens, les concurrents et les erreurs.

Les clés sont lues uniquement dans le trousseau macOS. Ces commandes demandent la clé de manière interactive : ne la mettez jamais dans la ligne de commande.

```sh
security add-generic-password -a "$USER" -s mcf-suivi-ia-anthropic -w
security add-generic-password -a "$USER" -s mcf-suivi-ia-openai -w
```

Pour tester le circuit sans clé ni accès réseau :

```sh
node outils/suivi-ia/releve.mjs --essai --sortie /tmp/x
```

Le relevé normal représente environ 20 requêtes par semaine (10 questions pour chacune des deux IA) ; son coût dépend des tarifs et du volume de réponses des fournisseurs.

## Planification macOS

À faire seulement sur go de Joseph : copiez `outils/suivi-ia/fr.myclassflow.suivi-ia.plist` dans `~/Library/LaunchAgents/`, remplacez `__DEPOT__` par le chemin absolu de ce dépôt et `__HOME__` par votre dossier personnel, puis chargez-le :

```sh
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/fr.myclassflow.suivi-ia.plist
```

Le modèle lance le relevé chaque lundi à 8 h et écrit son journal dans `~/Library/Logs/mcf-suivi-ia.log`. Il ne contient aucune clé.
