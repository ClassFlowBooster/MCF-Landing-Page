# Comparateur d’adaptations — MCF-Pilotage #53

La page `/enseignants/outils/comparer-adaptations/` est accessible depuis les fonctionnalités Enseignants et la fiche Adaptation des supports. Elle affiche trois exercices originaux fictifs et les cinq familles du catalogue de MyClassFlow. Les sélections sont locales ; aucune adaptation n’est appelée par le visiteur.

## Sources et provenance

Les originaux HTML sont dans `assets/exemples/adaptation/originaux/` :

- `lecture-jardin.html` : CE1, récit original en deux colonnes et questions de lecture ;
- `mesures-rubans.html` : CE2, tableau de longueurs et additions ;
- `sciences-germination.html` : CM1, deux cartes d’observation et dessins SVG originaux. Les observations sont explicitement fictives et ne prétendent pas constituer une expérience concluante.

Chaque original a été converti en PDF A4 d’une page avec Chrome 155, puis rasterisé en JPEG à 135 dpi avec `pdftoppm`. Ces intermédiaires sont conservés hors du dépôt : aucun téléchargement PDF n’est proposé sur le site.

Source des familles et critères : MCF-App `d91a67df8759e30ae138cdaee7a90399841189eb`, `app/lib/models/critere_pedagogique.dart` et `app/lib/services/criteres_pedagogiques_depot.dart`. La mémoire historique `reference_adaptations_lia.md` décrit un ancien catalogue par troubles : elle n’est pas utilisée comme catalogue actuel.

`manifeste.json` donne les codes et réglages exacts appliqués pour chaque famille. Il s’agit d’une sélection de critères dans chaque famille existante, pas de nouveaux profils d’élèves. Seule la famille Consignes demande une reformulation, par `con.phrases_directes`. Les autres choix ne demandent aucun changement du texte des consignes.

## Circuit réel et état des rendus

Le client de référence est `app/lib/desktop/services/adaptation_fiche_client.dart` : POST multipart à `/functions/v1/adaptation-fiche`, JWT d’utilisateur authentifié, pages JPEG, `regles` JSON et `niveau`. Le serveur renvoie le HTML. La présence du code ne prouve pas un accès authentifié opérationnel.

À ce stade, le manifeste ne contient aucun rendu. La page annonce explicitement qu’un résultat réel est en attente et ne simule aucune sortie de l’app. Chaque résultat ajouté devra porter la provenance `adaptation-fiche`, sa date et le chemin de son HTML réel conservé dans `assets/exemples/adaptation/rendus/`. Aucun jeton, identifiant de compte ou secret ne doit être enregistré dans le dépôt. Une capture devra être relue après intégration des résultats.

## Vérifications

- `npm test` : 82 tests réussis.
- `npm run generer` : page, liens et plan du site générés ; génération reproductible.
- Chrome / Playwright : les 15 combinaisons document-famille vérifiées à 1440 et 390 px ; zéro erreur JavaScript, aucun débordement horizontal de la page.
- Les iframes de documents utilisent un bac à sable sans scripts ; les sélecteurs sont natifs et étiquetés, le changement est annoncé par un état accessible.
- Captures locales ordinateur et téléphone. Résultats réels et revue indépendante restent à compléter avant validation finale.

## Contrôle de ressemblance éditoriale

Contrôle initial du 20 octobre 2026 : recherche exacte des trois titres et formulations distinctives ; aucun exercice identique retrouvé. Comparaison aux pages [accueil Iniprof](https://iniprof.fr/), [différenciation](https://iniprof.fr/differenciation) et [aide](https://iniprof.fr/aide) : recoupements fonctionnels génériques (adapter un support, relire, critères de lisibilité), sans reprise de leurs textes ni de leurs exemples. Les trois contenus pédagogiques, leurs nombres, leur récit et leurs schémas ont été créés ici. Ce contrôle borné ne prouve pas l’absence de toute ressemblance sur le web.
