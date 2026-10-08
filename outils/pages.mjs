// Liste de toutes les pages du site : `npm run generer` écrit chacune dans
// <chemin>/index.html.
import tarifsEnseignants from "./corps/tarifs-enseignants.mjs";
import tarifsEcoles from "./corps/tarifs-ecoles.mjs";
import tarifsParents from "./corps/tarifs-parents.mjs";
import { fonctionnalites } from "./corps/fonctionnalites.mjs";
import { telecharger } from "./corps/telecharger.mjs";
import entree from "./corps/entree.mjs";
import accueilEnseignants from "./corps/accueil-enseignants.mjs";
import accueilEcoles from "./corps/accueil-ecoles.mjs";
import accueilParents from "./corps/accueil-parents.mjs";

export const PAGES = [
  { chemin: "/", espace: "enseignants", rubrique: "", scripts: ["comparateur.js", "entree.js", "formulaire.js"],
    titre: "MyClassFlow — Adaptez chaque support aux besoins de chaque élève",
    description: "MyClassFlow adapte vos supports aux élèves DYS, TDAH, TSA et EANA en quelques secondes. Pour les enseignants, les écoles et les familles.",
    surcouche: entree, corps: accueilEnseignants },
  { chemin: "/enseignants/", espace: "enseignants", rubrique: "", scripts: ["comparateur.js", "formulaire.js"],
    titre: "MyClassFlow pour les enseignants — adaptez vos supports en quelques secondes",
    description: "MyClassFlow adapte vos exercices et vos leçons aux élèves DYS, TDAH, TSA et EANA grâce à l'IA. Gestion de classe gratuite, 3 adaptations offertes.",
    corps: accueilEnseignants },
  { chemin: "/ecoles/", espace: "ecoles", rubrique: "", scripts: ["comparateur.js", "formulaire.js"],
    titre: "MyClassFlow pour les écoles — l'école inclusive pour toute l'équipe",
    description: "Une même démarche d'adaptation dans chaque classe et une seule facture pour l'établissement. Le prix par enseignant baisse dès 5 enseignants.",
    corps: accueilEcoles },
  { chemin: "/parents-enfants/", espace: "parents-enfants", rubrique: "", scripts: ["comparateur.js", "formulaire.js"],
    titre: "MyClassFlow Famille — les devoirs de votre enfant adaptés en une photo",
    description: "Photographiez la leçon ou l'exercice : MyClassFlow Famille l'adapte aux besoins de votre enfant (DYS, TDAH, TSA). Essai gratuit, sans carte bancaire.",
    corps: accueilParents },
  { chemin: "/enseignants/tarifs/", espace: "enseignants", rubrique: "tarifs", scripts: ["tarifs-ui.js", "formulaire.js"],
    titre: "Tarifs MyClassFlow pour les enseignants — gratuit ou 9,99 €/mois",
    description: "La gestion de classe est gratuite avec 3 adaptations offertes. L’abonnement enseignant adapte tous vos supports à partir de 9,99 € par mois.",
    corps: tarifsEnseignants },
  { chemin: "/ecoles/tarifs/", espace: "ecoles", rubrique: "tarifs", scripts: ["tarifs-ui.js", "formulaire.js"],
    titre: "Tarifs MyClassFlow pour les écoles — calculez votre devis",
    description: "Équipez toute votre équipe : le prix par enseignant baisse dès 5 enseignants, jusqu’à 9,99 € TTC. Calcul en direct et devis sous 48 h.",
    corps: tarifsEcoles },
  { chemin: "/parents-enfants/tarifs/", espace: "parents-enfants", rubrique: "tarifs", scripts: ["tarifs-ui.js", "formulaire.js"],
    titre: "Tarifs MyClassFlow Famille — essai gratuit, sans carte bancaire",
    description: "Adaptez les devoirs de votre enfant en une photo. Essai gratuit de 3 adaptations, puis dès 2,49 € par mois pour tous les enfants du foyer.",
    corps: tarifsParents },
  { chemin: "/enseignants/fonctionnalites/", espace: "enseignants", rubrique: "fonctionnalites",
    titre: "Fonctionnalités de MyClassFlow pour les enseignants",
    description: "Adaptation des supports, Lia, PPRE et PAI dans l'abonnement ; cahier journal, emploi du temps, fiches élèves et évaluations gratuits.",
    corps: fonctionnalites("enseignants") },
  { chemin: "/ecoles/fonctionnalites/", espace: "ecoles", rubrique: "fonctionnalites",
    titre: "Fonctionnalités de MyClassFlow pour les écoles",
    description: "Tout ce qu'il faut pour votre équipe : adaptation des supports par l'IA, dispositifs PPRE et PAI, gestion de classe et suivi des élèves.",
    corps: fonctionnalites("ecoles") },
  { chemin: "/parents-enfants/fonctionnalites/", espace: "parents-enfants", rubrique: "fonctionnalites",
    titre: "Fonctionnalités de MyClassFlow Famille",
    description: "Une photo de la leçon, les besoins de votre enfant, une version adaptée à imprimer ou à lire à l'écran, pour tous les enfants du foyer.",
    corps: fonctionnalites("parents-enfants") },
  { chemin: "/enseignants/telecharger/", espace: "enseignants", rubrique: "telecharger", scripts: ["telecharger.js"],
    titre: "Télécharger MyClassFlow — Mac, Windows, Android, iPhone",
    description: "Installez MyClassFlow en quelques secondes sur Mac, Windows, Android, iPhone ou iPad : l'app s'ouvre depuis votre écran d'accueil ou votre Dock.",
    corps: telecharger("enseignants") },
  { chemin: "/ecoles/telecharger/", espace: "ecoles", rubrique: "telecharger", scripts: ["telecharger.js"],
    titre: "Télécharger MyClassFlow — Mac, Windows, Android, iPhone",
    description: "Installez MyClassFlow sur les ordinateurs, tablettes et téléphones de l'équipe : Mac, Windows, Android, iPhone ou iPad, en quelques secondes.",
    corps: telecharger("ecoles") },
  { chemin: "/parents-enfants/telecharger/", espace: "parents-enfants", rubrique: "telecharger", scripts: ["telecharger.js"],
    titre: "Télécharger MyClassFlow Famille — Mac, Windows, Android, iPhone",
    description: "Installez MyClassFlow Famille sur votre téléphone, votre tablette ou votre ordinateur : Mac, Windows, Android, iPhone ou iPad, en quelques secondes.",
    corps: telecharger("parents-enfants") },
];
