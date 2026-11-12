// Les statuts sont explicites : la répartition ne dépend pas de la date de
// génération. Ajouter un prochain événement consiste à compléter ce tableau.
export const EVENEMENTS = [
  {
    slug: "forum-avenirs-2026",
    statut: "a-venir",
    nom: "Forum Avenirs",
    date: "2026-11-14",
    dateLisible: "Samedi 14 novembre 2026, de 9 h à 14 h",
    lieu: "Institut Montalembert",
    adresse: "28 boulevard Gambetta, 94130 Nogent-sur-Marne",
    accroche: "L’équipe MyClassFlow présente comment adapter les supports pédagogiques pour les élèves à besoins particuliers, aux enseignants comme aux parents.",
  },
];

const carte = (evenement) => `<article class="card evenement-carte">
  <span class="badge">${evenement.statut === "a-venir" ? "À venir" : "Passé"}</span>
  <p class="d"><time datetime="${evenement.date}">${evenement.dateLisible}</time></p>
  <h2>${evenement.nom}</h2>
  <p class="d">${evenement.lieu}<br>${evenement.adresse}</p>
  <p class="fine grow">${evenement.accroche}</p>
  <a class="btn" href="/evenements/${evenement.slug}/">Lire l’article</a>
</article>`;

const partie = (titre, evenements, vide) => `<section class="evenements-partie">
  <h2>${titre}</h2>
  ${evenements.length ? `<div class="cards evenements-cartes">${evenements.map(carte).join("\n")}</div>` : `<p class="fine">${vide}</p>`}
</section>`;

export const listeEvenements = (evenements = EVENEMENTS) => {
  const aVenir = evenements.filter((evenement) => evenement.statut === "a-venir");
  const passes = evenements.filter((evenement) => evenement.statut === "passe");
  return `<section class="page evenements">
  <h1 class="t">Événements</h1>
  ${partie("À venir", aVenir, "Aucun événement à venir pour le moment.")}
  ${partie("Passés", passes, "Les comptes rendus de nos événements apparaîtront ici.")}
</section>`;
};

export const articleEvenement = (slug, evenements = EVENEMENTS) => {
  const evenement = evenements.find((item) => item.slug === slug);
  if (!evenement) throw new Error(`Événement introuvable : ${slug}`);
  return `<article class="page evenement-article">
  <p class="fine"><a href="/evenements/">Événements</a></p>
  <h1 class="t">MyClassFlow au Forum Avenirs, samedi 14 novembre 2026</h1>
  <p class="lead"><time datetime="${evenement.date}T09:00:00+01:00">${evenement.dateLisible}</time></p>

  <section>
    <h2>Venez nous rencontrer</h2>
    <p>L’équipe MyClassFlow y présente comment adapter les supports pédagogiques pour les élèves à besoins particuliers, aux enseignants comme aux parents. Venez nous rencontrer et voir l’application en démonstration.</p>
  </section>

  <section>
    <h2>Lieu</h2>
    <p>${evenement.lieu}<br><a href="https://www.openstreetmap.org/search?query=28%20boulevard%20Gambetta%2094130%20Nogent-sur-Marne">${evenement.adresse}</a></p>
  </section>

  <p>Une offre spéciale est réservée aux visiteurs sur place.</p>
  <p class="evenement-actions"><a class="btn" href="/enseignants/">Découvrir MyClassFlow pour les enseignants</a><a class="btn ghost" href="/parents-enfants/">Découvrir MyClassFlow pour les parents</a></p>
</article>`;
};
