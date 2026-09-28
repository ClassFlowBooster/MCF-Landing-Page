// Liste de toutes les pages du site : `npm run generer` écrit chacune dans
// <chemin>/index.html.
import tarifsEnseignants from "./corps/tarifs-enseignants.mjs";
import tarifsEcoles from "./corps/tarifs-ecoles.mjs";
import tarifsParents from "./corps/tarifs-parents.mjs";

export const PAGES = [
  { chemin: "/enseignants/tarifs/", espace: "enseignants", rubrique: "tarifs", scripts: ["tarifs-ui.js"],
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
];
