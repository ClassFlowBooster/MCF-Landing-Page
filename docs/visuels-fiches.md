# Illustrations des huit fiches

Ces encadrés sont des extraits d'interface reconstitués en HTML/CSS, avec des données fictives. Ils ne chargent ni React, ni Babel, ni le code Flutter. Le site ne permet aucune écriture dans l'app depuis ces illustrations : leur contenu visuel est exclu de l'arbre d'accessibilité, avec une légende et un intitulé de figure accessibles.

## Sources inspectées

État GitHub consulté le 20 octobre 2026 : PR Landing #28, head `87e5defb91b553a3b31073b01504cb8628d2c8e0`, dernier auteur Joseph ; aucun commentaire ni revue sur cette PR au début de l'intervention. Branche de travail `feat/53-visuels-app` créée depuis cette version explicitement demandée.

Design : `ClassFlowBooster/MCF-Design`, `a0df8f96adda9505dc43d1283724f089d70ddeae`. App : `ClassFlowBooster/MCF-App`, `d91a67df8759e30ae138cdaee7a90399841189eb`. Ces deux révisions locales correspondent aux `main` GitHub lus au début de l'intervention. Aucun de ces dépôts n'a été modifié.

| Surface | Sources du prototype | Contrôle dans MCF-App |
| --- | --- | --- |
| Châssis, couleurs, typo | `site/hifi-shell.jsx`, `site/hifi-styles.css` | `app/lib/core/theme/sp_tokens.dart` |
| Préparation | `site/screen-fiches.jsx`, `site/screen-planning.jsx` | `app/lib/desktop/screens/fiches_screen.dart` : dossiers, À trier, aperçu et rattachement |
| Cahier journal | `site/screen-planning.jsx`, `site/mobile/sp-journal.jsx` | `app/lib/mobile/screens/journal/journal_liste.dart`, `seance_screen.dart` : séances datées et contenu pédagogique |
| Emploi du temps | `site/planning-edt.jsx` | `app/lib/desktop/screens/edt_screen.dart` : grille semaine type et volumes |
| Adaptation | `site/screen-supports.jsx`, `site/screen-forms.jsx` pour le volet partagé | `app/lib/desktop/screens/adaptation_screen.dart`, `app/lib/desktop/widgets/pour_qui_ordinateur.dart` : trois parcours, document et critères |
| Fiche élève | `site/pupil-modal.jsx`, `site/screen-pupil.jsx`, `site/mobile/sp-screens-feature.jsx` | `app/lib/mobile/screens/fiche_eleve_screen.dart`, `eleves/criteres_carte.dart` : critères et fil de suivi |
| Import | `site/class-create.jsx` | `app/lib/desktop/widgets/sheets/eleves_import.dart`, `app/lib/mobile/screens/eleves/import/eleves_import_ecran.dart` : prénom/nom modifiables, doublon exclu |
| Tâches | `site/screen-accueil.jsx`, `site/mobile/sp-taches.jsx` | `app/lib/mobile/screens/taches/taches_screen.dart` : À faire/Terminées et échéances |
| Lia | `site/lia.jsx`, `site/mobile/sp-lia.jsx` | `app/lib/desktop/widgets/lia/actions_card.dart` : proposition puis validation explicite |

## Choix de fidélité

Le châssis reprend le rail, le volet secondaire, les fonds papier, les cartes blanches, Fraunces/Inter et les couleurs par matière du prototype. Les extraits sont volontairement plus courts que les écrans réels. À petite largeur, les volets secondaires et l'explorateur de dossiers sont masqués ; il s'agit de la même illustration lisible, pas d'une prétendue capture native du mobile.

Les éléments obsolètes du prototype ne sont pas reproduits : génération automatique de semaine, évaluations, présence, synthèse automatique de l'élève. La fiche élève montre les critères pédagogiques actuels plutôt que des diagnostics. L'import montre quatre lignes dont un doublon, pour trois ajouts, et aucune correction automatique d'un nom incertain. L'adaptation utilise le parcours actuel « Selon mes élèves » ; la reformulation affichée sur la fiche élève est un critère explicite. Lia propose un commentaire à valider, sans écriture automatique.

Les textes éditoriaux et les données structurées des fiches restent identiques. Aucun lien de téléchargement PDF n'est ajouté. Aucun fichier de l'outil d'adaptation en chantier parallèle n'est modifié.

## Vérification

`npm run generer`, puis `npm test` : 80 tests réussis. Le CSS des illustrations est chargé uniquement sur les huit fiches ; tous ses sélecteurs sont limités à `.appv` ou `.fiche`. Les autres pages générées restent identiques.

Les captures sont contrôlées avec Chrome headless à 1440, 390 et 320 pixels, console surveillée et débordements mesurés. Les artefacts locaux de contrôle sont dans `/tmp/mcf-visuels-53/` (24 PNG et `rapport.json`) ; ce chemin n'est pas un hébergement durable.

Résultat des mesures : aucune erreur JavaScript, aucun débordement interne sur les 24 captures. À 390 et 1440 px, aucun débordement de page. À 320 px, le menu général préexistant porte la page à 343 px : son bouton `.nav-burger` dépasse ; ce défaut persiste après retrait du visuel et de sa feuille de style. Il reste hors de cette modification. Les labels de matières sont abrégés en Fr./QLM sous 360 px. Les huit objets éditoriaux, hors champ `illustration`, ont été comparés à `87e5def` : strictement identiques.
