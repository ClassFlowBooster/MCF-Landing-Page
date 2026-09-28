// Liste de toutes les pages du site : `npm run generer` écrit chacune dans
// <chemin>/index.html.
import tarifsEnseignants from "./corps/tarifs-enseignants.mjs";
import tarifsEcoles from "./corps/tarifs-ecoles.mjs";
import tarifsParents from "./corps/tarifs-parents.mjs";
import { fonctionnalites } from "./corps/fonctionnalites.mjs";
import entree from "./corps/entree.mjs";
import accueilEnseignants from "./corps/accueil-enseignants.mjs";

export const PAGES = [
  { chemin: "/", espace: "enseignants", rubrique: "", scripts: ["entree.js", "formulaire.js"],
    titre: "ClassFlow — Adaptez chaque support aux besoins de chaque élève",
    description: "ClassFlow adapte vos supports aux élèves DYS, TDAH, TSA et EANA en quelques secondes. Pour les enseignants, les écoles et les familles.",
    surcouche: entree, corps: accueilEnseignants },
  { chemin: "/enseignants/tarifs/", espace: "enseignants", rubrique: "tarifs", scripts: ["tarifs-ui.js", "formulaire.js"],
    titre: "Tarifs ClassFlow pour les enseignants — gratuit ou 9,99 €/mois",
    description: "La gestion de classe est gratuite avec 3 adaptations offertes. L’abonnement enseignant adapte tous vos supports à partir de 9,99 € par mois.",
    corps: tarifsEnseignants },
  { chemin: "/ecoles/tarifs/", espace: "ecoles", rubrique: "tarifs", scripts: ["tarifs-ui.js", "formulaire.js"],
    titre: "Tarifs ClassFlow pour les écoles — calculez votre devis",
    description: "Équipez toute votre équipe : le prix par enseignant baisse dès 5 enseignants, jusqu’à 9,99 € HT. Calcul en direct et devis sous 48 h.",
    corps: tarifsEcoles },
  { chemin: "/parents-enfants/tarifs/", espace: "parents-enfants", rubrique: "tarifs", scripts: ["tarifs-ui.js", "formulaire.js"],
    titre: "Tarifs ClassFlow Adapter — essai gratuit, sans carte bancaire",
    description: "Adaptez les devoirs de votre enfant en une photo. Essai gratuit de 3 adaptations, puis dès 2,49 € par mois pour tous les enfants du foyer.",
    corps: tarifsParents },
  { chemin: "/enseignants/fonctionnalites/", espace: "enseignants", rubrique: "fonctionnalites",
    titre: "Fonctionnalités de ClassFlow pour les enseignants",
    description: "Adaptation des supports, Lia, PPRE et PAI dans l'abonnement ; cahier journal, emploi du temps, fiches élèves et évaluations gratuits.",
    corps: fonctionnalites("enseignants") },
  { chemin: "/ecoles/fonctionnalites/", espace: "ecoles", rubrique: "fonctionnalites",
    titre: "Fonctionnalités de ClassFlow pour les écoles",
    description: "Tout ce qu'il faut pour votre équipe : adaptation des supports par l'IA, dispositifs PPRE et PAI, gestion de classe et suivi des élèves.",
    corps: fonctionnalites("ecoles") },
  { chemin: "/parents-enfants/fonctionnalites/", espace: "parents-enfants", rubrique: "fonctionnalites",
    titre: "Fonctionnalités de ClassFlow Adapter",
    description: "Une photo de la leçon, les besoins de votre enfant, une version adaptée à imprimer ou à lire à l'écran, pour tous les enfants du foyer.",
    corps: fonctionnalites("parents-enfants") },
];
