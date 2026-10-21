// Fichiers de la racine du site : sitemap.xml, robots.txt et llms.txt.
// Écrits par outils/generer.mjs, vérifiés par tests/generation.test.mjs.
import { SITE } from "./donnees-structurees.mjs";
import { FICHES } from "./corps/fiches/index.mjs";
import { adresseFiche } from "./corps/fiche.mjs";
import { offreEnseignant, offreAdapter, PLANCHER_ECOLE, euros } from "../assets/js/tarifs.js";
import { CRITERES_APP } from "./corps/criteres-app.mjs";

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

> MyClassFlow est une application pour les enseignants, les écoles et les familles. Elle adapte les exercices et les leçons selon les critères pédagogiques cochés (interligne, lettres espacées, consignes en étapes…) et regroupe la gestion de classe de l'enseignant : fiches de préparation, cahier journal, emploi du temps, fiches élèves et tâches.

Trois espaces : les enseignants, les écoles (abonnement établissement pour toute l'équipe) et les familles (MyClassFlow Famille, qui adapte les devoirs à partir d'une photo). L'application s'installe sur Mac, Windows, Android, iPhone et iPad.

Guide complet en un seul fichier (présentation, critères pédagogiques de l'app, pas à pas de chaque fonctionnalité) : [llms-full.txt](${SITE}/llms-full.txt).

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

${FICHES.map((f) => `- [Questions : ${f.ariane}](${SITE}${adresseFiche(f)}): ${f.questions.map(([q]) => q).join(" ")}`).join("\n")}
- [Questions des familles](${SITE}/parents-enfants/): réponses sur les critères pédagogiques, les appareils, le nombre d'enfants et la résiliation.

## Écoles et familles

${lien("/ecoles/", "Espace Écoles")}
${lien("/parents-enfants/", "Espace Parents / Enfants")}

## Optional

${lien("/enseignants/telecharger/", "Installer l'application")}
`;
};

// Texte d'une fiche en Markdown : liens internes absolus, balises et entités retirées.
const enMarkdown = (html) => html
  .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, texte) => `[${texte}](${href.startsWith("/") ? SITE + href : href})`)
  .replace(/<[^>]+>/g, "")
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;|&rsquo;/g, "’")
  .replace(/\s+/g, " ").trim();

const critere = ([libelle, effet, reglages]) => `- **${libelle}** : ${effet}${reglages ? ` Réglages : ${reglages.join(", ")}.` : ""}`;

// Guide complet pour les assistants IA (llms-full.txt) : présentation, critères de l'app
// (catalogue de MCF-App, voir criteres-app.mjs) et pas à pas repris des fiches, déjà vérifiés
// dans l'app. Rien d'autre : pas d'adresse technique, pas de recette générique.
export const llmsFull = (pages) => `# MyClassFlow : guide complet

> MyClassFlow est une application pour les enseignants, les écoles et les familles. Elle adapte les exercices et les leçons selon les critères pédagogiques cochés pour chaque élève, et réunit la gestion de classe de l'enseignant : fiches de préparation, cahier journal, emploi du temps, fiches élèves, tâches et Lia, l'assistante.

Ce guide reprend le contenu des pages de ${SITE}. Version courte et liens : [llms.txt](${SITE}/llms.txt).

## Présentation

- Trois espaces : les enseignants ([accueil](${SITE}/enseignants/)), les écoles, avec un abonnement établissement pour toute l'équipe ([accueil](${SITE}/ecoles/)), et les familles, avec MyClassFlow Famille, qui adapte les devoirs à partir d'une photo ([accueil](${SITE}/parents-enfants/)).
- L'application s'installe sur Mac, Windows, Android, iPhone et iPad, et fonctionne sur ordinateur comme sur téléphone.
- Enseignant : la gestion de classe est gratuite, avec 3 adaptations offertes ; l'abonnement Enseignant rend les adaptations illimitées et ajoute Lia, à ${prix(offreEnseignant(false).prix)} TTC par mois sans engagement, ou ${prix(offreEnseignant(true).prix)} par mois ${offreEnseignant(true).renvoi.replace(/^P/, "p")}
- École : à partir de ${prix(PLANCHER_ECOLE)} TTC par enseignant et par mois ; le prix par enseignant baisse dès 5 enseignants.
- Famille : essai gratuit de 3 adaptations sans carte bancaire, puis un abonnement pour tous les enfants du foyer ; formule Essentiel à ${prix(offreAdapter("essentiel", false).prix)} TTC par mois sans engagement, ou ${prix(offreAdapter("essentiel", true).prix)} par mois ${offreAdapter("essentiel", true).renvoi.replace(/^P/, "p")}

## Pédagogie : les critères de l'app

Pour chaque élève, l'enseignant coche sur sa fiche les critères pédagogiques qui l'aident. Quand il adapte un support, MyClassFlow en tire une version qui applique ces critères, à relire avant d'imprimer. L'app parle de critères pédagogiques, jamais d'une catégorie d'élèves, et ne demande ni diagnostic ni justification. Voici les critères proposés, famille par famille, avec leurs libellés exacts.

${CRITERES_APP.map(([famille, liste]) => `### ${famille}\n\n${liste.map(critere).join("\n")}`).join("\n\n")}

## Comment faire

### Créer une classe et ajouter des élèves

1. **Créer la classe** : « Créer une classe », puis renseigner « Niveau » et « Nom de la classe », et valider avec « Créer la classe ». Une classe peut être créée vide.
2. **Ajouter les élèves** : depuis la classe, « Ajouter un élève » (ou « Ajouter des élèves » quand la classe est vide), ou importer la liste par photo (voir plus bas).

${FICHES.map((f) => `### ${f.ariane}

${enMarkdown(f.intro)}

#### ${f.titreEtapes}

${f.etapes.map(([titre, texte], i) => `${i + 1}. **${enMarkdown(titre)}** : ${enMarkdown(texte)}`).join("\n")}

#### À retenir

${f.retenir.map((r) => `- ${enMarkdown(r)}`).join("\n")}

#### Questions fréquentes

${f.questions.map(([q, r]) => `- **${enMarkdown(q)}** ${enMarkdown(r)}`).join("\n")}

Page complète : [${f.ariane}](${SITE}${adresseFiche(f)}).`).join("\n\n")}
`;
