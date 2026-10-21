# Comparateur d’adaptations — MCF-Pilotage #53

La page `/enseignants/outils/comparer-adaptations/` est accessible depuis les fonctionnalités Enseignants et la fiche Adaptation des supports. Elle affiche trois exercices originaux fictifs et les adaptations réelles de trois groupes MyClassFlow. Les sélections sont locales ; aucune adaptation n’est appelée par le visiteur.

## Sources et provenance

Les originaux HTML sont dans `assets/exemples/adaptation/originaux/` :

- `lecture-jardin.html` : CE1, récit original en deux colonnes et questions de lecture ;
- `mesures-rubans.html` : CE2, tableau de longueurs et additions ;
- `sciences-germination.html` : CM1, deux cartes d’observation et dessins SVG originaux. Les observations sont explicitement fictives et ne prétendent pas constituer une expérience concluante.

Les rendus sont des images JPEG dans `assets/exemples/adaptation/rendus/<document>/<groupe>-<n>.jpg`. Aucun téléchargement PDF n’est proposé sur le site.

Source des groupes et critères : MCF-App `d91a67df8759e30ae138cdaee7a90399841189eb`, `app/lib/models/critere_pedagogique.dart` et `app/lib/services/criteres_pedagogiques_depot.dart`. La mémoire historique `reference_adaptations_lia.md` décrit un ancien catalogue par troubles : elle n’est pas utilisée comme catalogue actuel.

Les trois groupes réellement produits sont :

- **Lecture accompagnée** : interligne 1,5, espacement moyen des lettres, syllabes en couleurs, lettres muettes en gris et une ligne sur deux surlignée ;
- **Consignes simplifiées** : consignes directes, vocabulaire courant, action/lieu/nombre précisés, sous-exercices, exemple résolu et pictogramme ;
- **Attention courte** : fond sous les consignes, paragraphes courts, progression, repère de départ, case de vérification et moins d’items.

`manifeste.json` donne les codes et réglages cochés pour chaque groupe. Il s’agit de groupes de critères, pas de profils d’élèves. Seul le groupe Consignes simplifiées fait reformuler les consignes par l’IA ; les autres changent la mise en forme.

## Circuit réel et état des rendus

Le client de référence est `app/lib/desktop/services/adaptation_fiche_client.dart` : POST multipart à `/functions/v1/adaptation-fiche`, JWT d’utilisateur authentifié, pages JPEG, `regles` JSON et `niveau`. Le serveur renvoie le HTML. La présence du code ne prouve pas un accès authentifié opérationnel.

Les neuf couples document/groupe ont été produits dans l’app « Pour des groupes » le **21 octobre 2026**. Chaque entrée du manifeste porte la provenance `adaptation-fiche`, cette date et la liste ordonnée de ses pages JPEG : deux pages par résultat, sauf le document `lecture-jardin` pour le groupe Attention courte, qui en compte trois. Ce ne sont donc plus des familles fictives, des résultats vides, ni des rendus HTML attendus dans une iframe. Aucun jeton, identifiant de compte, secret ou nom d’élève n’est enregistré dans le dépôt.

## Vérifications

- `npm test` vérifie les trois groupes, les neuf résultats, la présence de chaque JPEG, l’absence de nom d’élève et l’absence de lien PDF.
- `npm run generer` régénère la page, les liens et le plan du site.
- Les sélecteurs sont natifs et étiquetés ; le changement est annoncé par un état accessible. L’original HTML reste dans une iframe avec bac à sable ; les pages JPEG adaptées sont empilées à droite, puis sous l’original sur téléphone.

## Contrôle de ressemblance éditoriale

Contrôle initial du 20 octobre 2026 : recherche exacte des trois titres et formulations distinctives ; aucun exercice identique retrouvé. Comparaison aux pages [accueil Iniprof](https://iniprof.fr/), [différenciation](https://iniprof.fr/differenciation) et [aide](https://iniprof.fr/aide) : recoupements fonctionnels génériques (adapter un support, relire, critères de lisibilité), sans reprise de leurs textes ni de leurs exemples. Les trois contenus pédagogiques, leurs nombres, leur récit et leurs schémas ont été créés ici. Ce contrôle borné ne prouve pas l’absence de toute ressemblance sur le web.
