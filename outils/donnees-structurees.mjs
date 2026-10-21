// Données structurées (JSON-LD, schema.org) lues par les moteurs de recherche.
// Les prix viennent de assets/js/tarifs.js : seulement ceux affichés sur la page.
import { offreEnseignant, offreAdapter, PLANCHER_ECOLE } from "../assets/js/tarifs.js";
import { QUESTIONS_PARENTS } from "./corps/accueil-parents.mjs";
import { FICHES } from "./corps/fiches/index.mjs";
import { adresseFiche, arianeFiche, ARIANE_FONCTIONNALITES } from "./corps/fiche.mjs";

export const SITE = "https://myclassflow.fr";

const ORGANISATION = {
  "@type": "Organization",
  "@id": `${SITE}/#organisation`,
  name: "MyClassFlow",
  url: `${SITE}/`,
  logo: `${SITE}/assets/img/apple-touch-icon.png`,
};

const SITE_WEB = { "@type": "WebSite", name: "MyClassFlow", url: `${SITE}/`, publisher: { "@id": ORGANISATION["@id"] } };

const prix = (v) => v.toFixed(2);
const offre = (name, price, description) => ({ "@type": "Offer", name, price: prix(price), priceCurrency: "EUR", ...(description ? { description } : {}) });

const application = (name, url, offers) => ({
  "@type": "SoftwareApplication",
  name,
  url,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web, Windows, macOS, Android, iOS",
  inLanguage: "fr",
  publisher: { "@id": ORGANISATION["@id"] },
  ...(offers.length ? { offers } : {}),
});

const OFFRES_ENSEIGNANT = [
  offre("Gratuit", 0, "Gestion de classe et 3 adaptations offertes."),
  offre("Abonnement enseignant", offreEnseignant(false).prix, "Par mois, TTC, sans engagement."),
  offre("Abonnement enseignant avec engagement d'un an", offreEnseignant(true).prix, offreEnseignant(true).renvoi),
];

// Seul le prix plancher (« dès 9,99 € ») est affiché en toutes lettres sur les pages
// Écoles : le plein tarif n'apparaît que dans le calculateur.
const OFFRE_ECOLE = {
  "@type": "AggregateOffer",
  name: "Abonnement établissement",
  lowPrice: prix(PLANCHER_ECOLE),
  priceCurrency: "EUR",
  description: "Par enseignant et par mois, TTC : le prix baisse dès 5 enseignants.",
};

const OFFRES_FAMILLE = [
  offre("Essai gratuit", 0, "3 adaptations, sans carte bancaire."),
  ...["essentiel", "illimite"].flatMap((f) => {
    const nom = f === "essentiel" ? "Essentiel" : "Illimité";
    return [
      offre(nom, offreAdapter(f, false).prix, "Par mois, TTC, sans engagement, pour tous les enfants du foyer."),
      offre(`${nom} avec engagement de 6 mois`, offreAdapter(f, true).prix, offreAdapter(f, true).renvoi),
    ];
  }),
];

const APP = (offers) => application("MyClassFlow", "https://app.myclassflow.fr", offers);
// Fiche d'un outil gratuit : seule l'offre gratuite y est affichée. Une fiche
// d'outil de l'abonnement ne montre aucun prix (lien vers les tarifs) : pas d'offre.
const appFiche = (f) => APP(f.k === "free" ? [OFFRES_ENSEIGNANT[0]] : []);
const FAMILLE = application("MyClassFlow Famille", "https://adapter.myclassflow.fr", OFFRES_FAMILLE);

// Texte brut d'une réponse : sans balises ni entités.
const brut = (html) => html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

const faq = (questions) => ({
  "@type": "FAQPage",
  mainEntity: questions.map(([q, r]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: brut(r) } })),
});

// Fil d'Ariane : le dernier élément est la page même (sans lien à l'écran).
const ariane = (elements, chemin) => ({
  "@type": "BreadcrumbList",
  itemListElement: elements.map(([name, href], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITE}${href ?? chemin}` })),
});

const PAR_PAGE = {
  "/": [ORGANISATION, SITE_WEB, APP(OFFRES_ENSEIGNANT)],
  "/enseignants/": [APP(OFFRES_ENSEIGNANT)],
  "/enseignants/tarifs/": [APP(OFFRES_ENSEIGNANT)],
  "/ecoles/": [APP([OFFRE_ECOLE])],
  "/ecoles/tarifs/": [APP([OFFRE_ECOLE])],
  "/parents-enfants/": [FAMILLE, faq(QUESTIONS_PARENTS)],
  "/parents-enfants/tarifs/": [FAMILLE],
  "/enseignants/fonctionnalites/": [ariane(ARIANE_FONCTIONNALITES, "/enseignants/fonctionnalites/")],
  ...Object.fromEntries(FICHES.map((f) => [adresseFiche(f), [ariane(arianeFiche(f), adresseFiche(f)), appFiche(f), faq(f.questions)]])),
};

/** Balise <script type="application/ld+json"> de la page, ou "" si elle n'en a pas. */
export function donneesStructurees(chemin) {
  const objets = PAR_PAGE[chemin];
  if (!objets) return "";
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": objets }).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>\n`;
}
