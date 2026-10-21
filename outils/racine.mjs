// Fichiers de la racine du site : sitemap.xml, robots.txt et llms.txt.
// Écrits par outils/generer.mjs, vérifiés par tests/generation.test.mjs.
import { SITE } from "./donnees-structurees.mjs";
import { FICHES } from "./corps/fiches/index.mjs";
import { adresseFiche } from "./corps/fiche.mjs";
import { offreEnseignant, offreAdapter, PLANCHER_ECOLE, euros } from "../assets/js/tarifs.js";

export { aujourdhui, dateModification } from "./dates.mjs";

/** pages : [{ chemin, lastmod }]. */
export const sitemap = (pages) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE}${p.chemin}</loc><lastmod>${p.lastmod}</lastmod></url>`).join("\n")}
</urlset>
`;

// Robots des moteurs de réponse par IA, autorisés nommément : le site est public
// et doit pouvoir être cité quand on demande à une IA « quelle appli pour… ».
export const ROBOTS_IA = ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

export const robots = () => `User-agent: *
Allow: /

${ROBOTS_IA.map((r) => `User-agent: ${r}\nAllow: /`).join("\n\n")}

Sitemap: ${SITE}/sitemap.xml
`;

const prix = (v) => euros(v).replace(",00 €", " €");

// Présentation du site pour les assistants IA (format llmstxt.org) : rien que ce
// que les pages disent déjà, avec les prix de assets/js/tarifs.js.
export const llms = (pages) => {
  const lien = (chemin, texte) => {
    const p = pages.find((x) => x.chemin === chemin);
    return `- [${texte}](${SITE}${chemin}): ${p.description}`;
  };
  return `# MyClassFlow

> MyClassFlow est une application pour les enseignants, les écoles et les familles. Elle adapte les exercices et les leçons selon les critères pédagogiques cochés (texte agrandi, mise en page aérée, consignes en étapes) et regroupe la gestion de classe de l'enseignant : fiches de préparation, cahier journal, emploi du temps, fiches élèves et évaluations.

Trois espaces : les enseignants, les écoles (abonnement établissement pour toute l'équipe) et les familles (MyClassFlow Famille, qui adapte les devoirs à partir d'une photo). L'application s'installe sur Mac, Windows, Android, iPhone et iPad.

## Enseignants

${lien("/enseignants/", "Accueil Enseignants")}
${lien("/enseignants/fonctionnalites/", "Fonctionnalités")}
${FICHES.map((f) => lien(adresseFiche(f), f.ariane)).join("\n")}

## Offres et abonnements

- Enseignant : gestion de classe gratuite avec 3 adaptations offertes ; abonnement à ${prix(offreEnseignant(false).prix)} TTC par mois sans engagement, ou ${prix(offreEnseignant(true).prix)} par mois ${offreEnseignant(true).renvoi.replace(/^P/, "p")}
- École : à partir de ${prix(PLANCHER_ECOLE)} TTC par enseignant et par mois, le prix par enseignant baisse dès 5 enseignants ; devis sur la page Tarifs Écoles.
- Famille : essai gratuit de 3 adaptations sans carte bancaire, puis un abonnement pour tous les enfants du foyer ; formule Essentiel à ${prix(offreAdapter("essentiel", false).prix)} TTC par mois sans engagement, ou ${prix(offreAdapter("essentiel", true).prix)} par mois ${offreAdapter("essentiel", true).renvoi.replace(/^P/, "p")}

${lien("/enseignants/tarifs/", "Tarifs Enseignants")}
${lien("/ecoles/tarifs/", "Tarifs Écoles")}
${lien("/parents-enfants/tarifs/", "Tarifs Famille")}

## Questions fréquentes

${FICHES.map((f) => `- [Questions sur la ${f.ariane.toLowerCase()}](${SITE}${adresseFiche(f)}): ${f.questions.map(([q]) => q).join(" ")}`).join("\n")}
- [Questions des familles](${SITE}/parents-enfants/): réponses sur les critères pédagogiques, les appareils, le nombre d'enfants et la résiliation.

## Écoles et familles

${lien("/ecoles/", "Espace Écoles")}
${lien("/parents-enfants/", "Espace Parents / Enfants")}

## Optional

${lien("/enseignants/telecharger/", "Installer l'application")}
`;
};
