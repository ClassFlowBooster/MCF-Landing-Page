# Fidélité des huit illustrations

## Révisions et périmètre

La PR [#32](https://github.com/ClassFlowBooster/MCF-Landing-Page/pull/32) complète la PR [#28](https://github.com/ClassFlowBooster/MCF-Landing-Page/pull/28), head de base `87e5defb91b553a3b31073b01504cb8628d2c8e0`. Reprise du premier essai `0e6ea0e` après demande de semaines remplies et de fidélité aux sources. GitHub revérifié le 20 octobre 2026 : mêmes heads, aucun commentaire ni revue ; dernier auteur Joseph.

Sources fonctionnelles : `ClassFlowBooster/MCF-App` à `d91a67df8759e30ae138cdaee7a90399841189eb`. Sources graphiques : `ClassFlowBooster/MCF-Design` à `a0df8f96adda9505dc43d1283724f089d70ddeae`. Les révisions locales correspondent aux `main` GitHub lus pendant cette reprise. Aucun fichier de ces deux dépôts n'a été modifié ; aucun Flutter n'a été lancé.

Les illustrations sont des extraits reconstitués, pas des captures de sessions utilisateur ni des fonctionnalités du site. Données fictives exclusivement. HTML/CSS sans React, Babel, API, police d'icônes supplémentaire ou écriture dans l'app. Les textes éditoriaux, questions, offres et métadonnées SEO des huit objets de fiche ont été comparés à `87e5def` : strictement identiques hors champ `illustration`. Aucun téléchargement PDF ajouté au site. Aucun fichier du comparateur parallèle modifié.

Le [comparatif avant/après](apercu-visuels.html) contient les huit surfaces figées, avec leurs captures. L'aperçu courant reste servi par le serveur local existant sur `http://127.0.0.1:8789/`.

## Provenance exacte des valeurs

Les variables `--av-*` d'`assets/css/visuels-app.css` sont limitées à `.appv`. Les autres sélecteurs sont limités aux figures ou aux fiches. La feuille n'est chargée que sur les huit fiches concernées.

| Valeur | Jeton App / valeur CSS reprise | Source |
| --- | --- | --- |
| Accent principal | `coral500` `#F0552B` | `app/lib/core/theme/sp_tokens.dart` |
| Contour accent / texte accent | `coral600` `#D43F18`, `coral700` `#A82E0F` | même fichier |
| Fonds accent | `coral50` `#FFF5F0`, `coral100` `#FFE4D6`, `coral200` `#FFC7AA`, `coral300` `#FFA17A` | même fichier |
| Papier / fond secondaire | `paper` `#FBF8F3`, `paper2` `#F4EFE6`, `paper3` `#E9E2D3` | même fichier |
| Texte principal / secondaire / discret | `ink` `#1F1A14`, `ink2` `#4A4238`, `ink3` `#8A8278` | même fichier |
| Traits / traits forts | `line` `#E6DFCF`, `line2` `#D6CCB6` | même fichier |
| Français | `subjFr` `#6366F1` | même fichier + `planning_data.dart::couleurMatiere` |
| Mathématiques | `subjMath` `#06B6D4` | mêmes sources |
| Questionner le monde / sciences et technologie | `subjQuest` `#10B981` | mêmes sources |
| Arts plastiques / éducation musicale | `subjArt` `#EC4899` | mêmes sources |
| EPS | `subjEps` `#F59E0B` | mêmes sources |
| Langues vivantes | `subjAng` `#8B5CF6` | mêmes sources |
| Histoire / géographie / EMC | `subjOther` `#8A8278` : ces matières utilisent le cas par défaut, pas une couleur inventée | mêmes sources |
| Avertissement OCR | `amber100` `#FCEAC4`, `amber300` `#F4C77A`, `amber700` `#A8650F` | `sp_tokens.dart`, `eleves_import_ecran.dart` |
| Catégories de commentaire | Progression `#10B981`, Académique `#8B5CF6` | `app/lib/models/commentaire.dart::categorieColors` |
| Rayons communs | `rSm=6`, `rMd=10`, `rLg=14`, `rXl=20` px | `sp_tokens.dart` |
| Ombre douce | `0 1px 2px rgba(31,26,20,.04), 0 4px 12px rgba(31,26,20,.04)` | `shSoft`, miroir `site/hifi-styles.css` |
| Ombre carte | `0 1px 3px rgba(31,26,20,.06), 0 8px 24px rgba(31,26,20,.05)` | `shCard`, même miroir |
| Jour courant | ombre carte avec halo `rgba(212,63,24,.14)` et bord `coral300` 1,5 px | `planning_screen.dart::_ColonneJour`, `shCardToday` |
| Titres / texte / horaires | Fraunces / Inter / JetBrains Mono | `SPTokens.serif/sans/mono`, `site/hifi-styles.css` |
| En-tête ordinateur | titre Fraunces 28/600, espacement `-.015em`, sous-titre Inter 14, ariane 12 ; inset 28 horizontal / 22 haut | `desktop/widgets/screen_header.dart` |
| Rail / volet | 56 / 240 px | `desktop/shell.dart::kRailCollapsedWidth`, volet secondaire |
| Icônes | tracés SVG exacts de `ICON_PATHS`, viewBox 24, trait 1,6, bouts et jonctions arrondis | `MCF-Design/site/hifi-shell.jsx::HIcon` ; sous-ensemble statique dans `visuels-icones.mjs` |

Le HTML utilise les codes réels `francais`, `mathematiques`, `questionner_monde`, `sciences_techno`, `arts_pl`, `musique`, `eps`, `lv`, `histoire`, `geographie`, `emc`. Leur association aux jetons suit `MCF-App/app/lib/desktop/planning_data.dart::couleurMatiere`, et non les anciennes clés raccourcies du prototype. Aucun code couleur n'est injecté dans les appels de construction des séances.

## Fidélité par fiche et différences avec le premier essai

| Fiche | Avant `0e6ea0e` | Après cette passe | Sources contrôlées |
| --- | --- | --- | --- |
| Préparation | ancien partage explorateur/aperçu ; deux phases seulement | fenêtre actuelle : liseré 3 px, en-tête de fiche, document centré de 720 px maximum, objectifs/référentiel/matériel, cinq phases totalisant 40 minutes et aides ; actions en pied dont rattachement. Pas de navigation expérimentale | `desktop/screens/fiches_screen.dart::_header/_footer/_body`, `site/screen-fiches.jsx::FichePane`, `screen-planning.jsx::SeanceApercu` |
| Cahier journal | vue Jour, quatre séances | vraie vue Semaine à cinq cartes-jours, 32 séances et neuf pauses ; horaires/durées, matières, titres, objectifs et compteurs de matériel/pièces. Le mardi reprend la journée CE1 de la fiche, dont la mesure 09:45–10:25. Le mercredi est limité au matin | `desktop/screens/planning_screen.dart::_VueSemaine/_WeekBlock`, `site/screen-planning.jsx::WeekGrid/WeekBlock`, `site/mobile/sp-journal.jsx` |
| Emploi du temps | grille indicative CE1 et volumes sans lien avec les cellules | CM2, semaine type sur quatre jours et demi conforme au texte : 22 cours, neuf récréations, mercredi 08:30–10:30, autres jours 08:30–11:45 et 13:30–15:45. Axe réel, 56 px/heure, gouttière 60 px, filet matière 3 px, fond matière à 12 % sur blanc, contour à 40 %. Totaux calculés depuis ces créneaux : 21 h 45 | `desktop/screens/edt_screen.dart::_EdtGrid/_SlotBlock/_VolumeBar`, `site/planning-edt.jsx` |
| Adaptation | trois zones réduites et deux critères | document de mesure fictif visible, quatre segments et consigne du segment de 7 cm ; classe, support, parcours « Selon mes élèves » et trois critères d'Inès. Le titre et les sections actuels remplacent les diagnostics du vieux prototype | `desktop/screens/adaptation_screen.dart`, `desktop/widgets/pour_qui_ordinateur.dart`, `site/screen-supports.jsx` ; `screen-forms.jsx` lu pour le volet partagé, aucune de ses fonctions ajoutée |
| Fiche élève | identité répétée, deux notes très brèves, tâche générique | identité unique, avatar 52 px / Fraunces22 ; critères cochés groupés en Lisibilité et Consignes avec bouton Modifier, commentaires factuels datés et catégorisés, tâche d'adaptation de la même mesure. Cartes de rayon18 et padding16 | `mobile/screens/fiche_eleve_screen.dart::_Header/_Card/_NoteLine`, `mobile/screens/eleves/criteres_carte.dart`, `models/commentaire.dart` ; `site/screen-pupil.jsx` et `site/mobile/sp-eleves.jsx` lus mais leurs présences/évaluations/diagnostics obsolètes exclus |
| Import photo | liste desktop de quatre lignes, dont un doublon | vraie structure de relecture mobile : huit lignes de l'exemple éditorial, champs Prénom/Nom, cases, Inès déjà dans la classe, second Lucas en double, R?naud à vérifier. Six élèves à ajouter ; aucune correction automatique du nom incertain. Actions Recommencer/Ajouter en pied | `mobile/screens/eleves/import/eleves_import_ecran.dart::_verification/_row/_pied`, `site/mobile/sp-import-ocr.jsx` |
| Tâches | trois lignes et une tâche terminée | les cinq tâches éditoriales, leurs détails, échéances sans heure, matière et élèves liés ; sans échéance en dernier ; une terminée. Cases22, titres Inter14/600, détails12, cartes rLg14 et ombre douce | `mobile/screens/taches/taches_screen.dart::_ListeTaches`, `tache_ligne.dart`, `site/mobile/sp-taches.jsx` |
| Lia | une bulle et un bouton générique | historique, en-tête corail, bulles de questions/réponses concrètes sur les trois tâches de la semaine puis proposition de commentaire pour la même Inès. Carte actuelle « Propositions de Lia », commentaire coché, Modifier, Tout décocher et Valider(1). Aucun enregistrement affirmé | `desktop/widgets/lia/lia_chat_overlay.dart::_Header/_HistorySidebar`, `lia_bubble.dart`, `actions_card.dart`, `site/lia.jsx` et `site/mobile/sp-lia.jsx` |

### Cohérence pédagogique

Le journal, la préparation, le support de mesure, la fiche d'Inès Martin, la tâche de photocopie et Lia parlent du même exemple de CE1 : mesurer quatre segments et en tracer un de 7 cm. Les trois critères sont toujours « Agrandir le texte », « Augmenter l'interligne », « Consignes courtes et directes ». Maël et Nour sont les deux élèves liés aux autorisations. La liste OCR est celle de la fiche éditoriale : huit lignes, six ajouts possibles. L'emploi du temps constitue volontairement un autre exemple, le CM2 demandé par sa propre fiche, et n'est pas présenté comme la trame du CE1.

Les volumes CM2 sont calculés, pas recopiés au hasard : français 435 min, mathématiques 270, EPS 165, histoire/géographie/EMC 150, sciences 105, arts 105, langues 75. Total 1305 min, neuf pauses total 135 min ; temps scolaire 1440 min. Le test vérifie aussi les horaires de fin de chaque jour et l'absence de chevauchement.

## Comparaison aux écrans du prototype

Huit captures de référence ont été réellement rendues et ouvertes dans Chrome, à partir des fichiers JSX actuels, sans modifier les fichiers source : journal, EDT, préparation, supports, Lia, tâches mobile, fiche élève mobile et relecture OCR mobile. Pour le journal et l'EDT, les jeux fictifs ont été injectés uniquement dans les stores en mémoire du navigateur pour comparer la géométrie avec les mêmes horaires. Les autres références utilisent les données de démonstration du prototype, sauf la liste de tâches alimentée en mémoire.

Cette comparaison a conduit à corriger le premier rendu de préparation vers la fenêtre actuelle et l'en-tête de Lia vers le corail. Elle a aussi confirmé que le prototype est parfois en retard sur Flutter : le prototype ignore les codes histoire/géographie/EMC et affiche alors 19 h 15 pour le jeu CM2 injecté ; la vraie app les compte par défaut en gris, donc l'illustration et les tests gardent 21 h 45. Les anciennes évaluations, la génération de semaine, les diagnostics de la fiche élève et les promesses de lecture des critères par Lia ne sont pas portés. Les captures de référence montrent ces écarts ; elles ne constituent pas une validation fonctionnelle Flutter.

## Format, accessibilité et limites

Une semaine complète n'est pas comprimée dans une vignette : le cadre peut occuper 1320 px sur grand écran. Sur téléphone, journal et EDT conservent leurs cinq colonnes et leurs tailles ; leur conteneur défile horizontalement, avec un indice visible et une région nommée, accessible au clavier. Le rail et le volet sont hors du cadrage mobile pour rendre les séances immédiatement visibles. Le contrôle navigateur atteint le vendredi à 390 et 320 px. Ce sont des vues semaine d'ordinateur cadrées pour la lecture, pas de fausses captures natives Jour.

Les fiches élève, tâches et import sont explicitement présentées comme des vues téléphone. Préparation, support et Lia réagencent leur contenu pour rester lisibles. Les actions illustrées sont des spans : aucune commande active ni contrôle trompeur dans le parcours clavier. Le contenu dessiné est exclu de l'arbre d'accessibilité, avec figure et légende explicites.

Seuls les éléments utiles sont cadrés : pas de voile global de modale sur le site, pas de bandeau promotionnel daté, pas de navigation « Base commune » ou « Éditeur ». Les documents de séance sont des exemples HTML, pas des PDF à télécharger. Les longueurs des segments du support ne sont pas une impression à l'échelle.

Limite préexistante du site : à 320 px, le menu général `.nav-burger` porte la largeur de la page à 343 px. Ce défaut a été vérifié même après retrait du visuel et de sa feuille CSS. À 390 et 1440 px, aucun débordement de page. Ce chantier n'élargit pas le correctif à la navigation générale.

## Vérifications reproductibles

- `npm run generer` : huit pages régénérées ; autres pages inchangées.
- `npm test` : 85 tests, dont cinq nouveaux contrôles métier (semaines, volumes, cohérence et absence de fonctions/navigation indésirables).
- `node tests/visuels-navigateur.mjs` : 24 captures des huit fiches à 1440/390/320 px, plus quatre captures du vendredi atteint par défilement. Rapport JSON : erreurs JS, débordements non intentionnels, couleurs, fontes de titres, cinq colonnes et navigation masquée.
- Comparaison de chaque objet éditorial, hors `illustration`, à 87e5def : identité stricte.
- `git diff --check`.

Artefacts de contrôle : `/tmp/mcf-visuels-53-avant/`, `/tmp/mcf-visuels-53-apres/`, `/tmp/mcf-visuels-53-references/`. Une sélection avant/après est conservée dans `docs/captures-visuels/` pour la revue. Le serveur 8789 existant sert le worktree actualisé. Aucune fusion ni mise en production.
