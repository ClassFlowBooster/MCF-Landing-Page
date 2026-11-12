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
    affiche: {
      fichier: "forum-avenirs-2026.jpg",
      alt: "Affiche du Forum Avenirs Handicap : samedi 14 novembre 2026, de 9 h à 14 h, Institut Montalembert, 28 boulevard Gambetta, Nogent-sur-Marne.",
      credit: "Affiche : Enseignement catholique de l’Est-Francilien, diocèse de Créteil.",
    },
    accroche: "L’équipe MyClassFlow présente comment adapter les supports pédagogiques pour les élèves à besoins particuliers, aux enseignants comme aux parents.",
  },
];

const carte = (evenement) => `<article class="card evenement-carte${evenement.affiche ? " avec-affiche" : ""}">
  ${evenement.affiche ? `<a class="evenement-vignette" href="/evenements/${evenement.slug}/" tabindex="-1" aria-hidden="true"><img src="/assets/img/evenements/${evenement.affiche.fichier}" alt="" width="724" height="1024" loading="lazy" decoding="async"></a>` : ""}
  <div class="evenement-texte">
  <span class="badge">${evenement.statut === "a-venir" ? "À venir" : "Passé"}</span>
  <p class="d"><time datetime="${evenement.date}">${evenement.dateLisible}</time></p>
  <h2>${evenement.nom}</h2>
  <p class="d">${evenement.lieu}<br>${evenement.adresse}</p>
  <p class="fine grow">${evenement.accroche}</p>
  <a class="btn" href="/evenements/${evenement.slug}/">Lire l’article</a>
  </div>
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
  <h1 class="t">MyClassFlow au Forum Avenirs</h1>
  <p class="lead"><time datetime="${evenement.date}T09:00:00+01:00">${evenement.dateLisible}</time></p>
  ${evenement.affiche ? `<figure class="evenement-affiche"><img src="/assets/img/evenements/${evenement.affiche.fichier}" alt="${evenement.affiche.alt}" width="724" height="1024" decoding="async"><figcaption>${evenement.affiche.credit}</figcaption></figure>` : ""}

  <section>
    <h2>Venez nous rencontrer</h2>
    <p>L’équipe MyClassFlow y présente comment adapter les supports pédagogiques pour les élèves à besoins particuliers, aux enseignants comme aux parents. Venez nous rencontrer et voir l’application en démonstration.</p>
  </section>

  <section>
    <h2>Lieu</h2>
    <p>${evenement.lieu}<br><a href="https://www.openstreetmap.org/search?query=28%20boulevard%20Gambetta%2094130%20Nogent-sur-Marne">${evenement.adresse}</a></p>
  </section>

  <section>
    <h2>Le Forum Avenirs</h2>
    <p>Organisé par l’Enseignement catholique du Val-de-Marne, le Forum Avenirs réunit associations et professionnels qui proposent des solutions pour les enfants en situation de handicap ou à besoins éducatifs particuliers, de la maternelle à l’après-bac. Il s’adresse aux parents comme aux équipes éducatives.</p>
    <p>Programme et informations pratiques : <a href="https://catholiques-val-de-marne.cef.fr/diocese/accueil/329937-forum-avenirs-handicap/" rel="noopener">la page officielle du Forum Avenirs</a>, sur le site du diocèse de Créteil.</p>
    <p>En savoir plus : le site de l’<a href="https://www.institut-montalembert.org/" rel="noopener">Institut Montalembert</a>, qui accueille le forum, et le <a href="https://enseignement-catholique.fr/des-perspectives-d-avenir-s/" rel="noopener">retour de l’Enseignement catholique sur la première édition</a>.</p>
  </section>

  <p>Une offre spéciale est réservée aux visiteurs sur place.</p>
  <p class="evenement-actions"><a class="btn" href="/enseignants/">Découvrir MyClassFlow pour les enseignants</a><a class="btn ghost" href="/parents-enfants/">Découvrir MyClassFlow pour les parents</a></p>
</article>`;
};
