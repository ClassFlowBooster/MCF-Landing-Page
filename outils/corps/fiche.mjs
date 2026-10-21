// Gabarit commun des fiches explicatives (/enseignants/fonctionnalites/<fiche>/).
// Chaque fiche est une donnée de outils/corps/fiches/ : le gabarit fixe l'ordre
// des parties, les questions affichées sont aussi celles des données structurées.
import { THEMES, libelleBadge, lienFiche } from "./catalogue.mjs";

const RUBRIQUE = "/enseignants/fonctionnalites/";

export const adresseFiche = (f) => `${RUBRIQUE}${f.slug}/`;

/** Fil d'Ariane affiché : [libellé, adresse], le dernier sans adresse. */
export const arianeFiche = (f) => [["Enseignants", "/enseignants/"], ["Fonctionnalités", RUBRIQUE], [f.ariane, null]];

const ariane = (f) => `<nav class="ariane" aria-label="Fil d'Ariane"><ol>${arianeFiche(f)
  .map(([texte, href]) => (href ? `<li><a href="${href}">${texte}</a></li>` : `<li aria-current="page">${texte}</li>`)).join("")}</ol></nav>`;

const question = ([q, r]) => `<details><summary>${q}</summary><p>${r}</p></details>`;

// Outils voisins : leur fiche si elle existe, la page Fonctionnalités sinon.
const soeur = (nom) => {
  const o = THEMES.flatMap((t) => t.outils).find((x) => x.nom === nom);
  return `<a class="soeur" href="${lienFiche(o) ?? RUBRIQUE}"><span class="ico" aria-hidden="true">${o.ico}</span><span><b>${o.nom}</b> <span class="tg ${o.k}">${libelleBadge(o)}</span><span class="t">${o.court}</span></span></a>`;
};

export function fiche(f) {
  return `<article class="page fiche">
  ${ariane(f)}
  <header class="fiche-tete">
    <span class="tg ${f.k}">${f.k === "free" ? "Gratuit" : "Abonnement"}</span>
    <h1 class="t">${f.h1}</h1>
    <p class="fiche-intro">${f.intro}</p>
  </header>

  <section class="fiche-partie">
    <h2>${f.titreBenefices}</h2>
    <div class="benefices">
      ${f.benefices.map(([titre, texte]) => `<div class="benefice"><b>${titre}</b><p>${texte}</p></div>`).join("\n      ")}
    </div>
  </section>

  <section class="fiche-partie">
    <h2>Comment ça marche dans MyClassFlow</h2>
    <div class="fiche-comment${f.illustration ? "" : " fiche-comment--seul"}">
      <ol class="fiche-etapes">
        ${f.etapes.map(([titre, texte]) => `<li><b>${titre}</b><p>${texte}</p></li>`).join("\n        ")}
      </ol>
      ${f.illustration || ""}
    </div>
  </section>

  ${f.blocs.map((b) => `<section class="fiche-partie">
    <h2>${b.titre}</h2>
    ${b.html}
  </section>`).join("\n\n  ")}

  <div class="ribbon fiche-offre">
    <div><span class="tg ${f.k}">${f.k === "free" ? "Gratuit" : "Abonnement"}</span><b>${f.offre.titre}</b><p>${f.offre.texte}</p></div>
    <div class="fiche-offre-actions"><a class="btn" href="${f.offre.href}">${f.offre.bouton}</a><a class="fiche-tarifs" href="/enseignants/tarifs/">Voir les tarifs</a></div>
  </div>

  <section class="fiche-partie">
    <h2>Questions fréquentes</h2>
    <div class="faq">
      ${f.questions.map(question).join("\n      ")}
    </div>
  </section>

  <section class="fiche-partie">
    <h2>Les outils qui vont avec</h2>
    <div class="soeurs">
      ${f.soeurs.map(soeur).join("\n      ")}
    </div>
  </section>
</article>`;
}
