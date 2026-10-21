// Métadonnées des captures rendues par l'outil d'extraction. Les fragments HTML
// restent dans visuels-proto/ pour cet outil, mais les pages servent des images.
export const VISUELS = [
  { slug: "fiche-de-preparation", alt: "Écran Fiches de prep de MyClassFlow : fiches rangées par matière, dont « Mesurer des longueurs » en mathématiques (CE1)", largeur: 828, hauteur: 518 },
  { slug: "cahier-journal", alt: "Écran du cahier journal de MyClassFlow : semaine 45 d'une classe de CE1, séances par jour avec horaires et objectifs", largeur: 828, hauteur: 518 },
  { slug: "emploi-du-temps", alt: "Écran de l'emploi du temps de MyClassFlow : semaine type d'une classe de CM2, 22 cours et 21 h 45 d'enseignement", largeur: 828, hauteur: 518 },
  { slug: "adaptation-des-supports", alt: "Écran Adapter un support de MyClassFlow : classe CE1, choix Selon mes élèves, support Mesurer des segments", largeur: 680, hauteur: 524 },
  { slug: "fiches-eleves", alt: "Fiche élève dans MyClassFlow : Inès Martin (CE1), ses critères pédagogiques, sa tâche et son fil de suivi", largeur: 680, hauteur: 530 },
  { slug: "lia", alt: "Conversation avec Lia dans MyClassFlow : tâches de la semaine, commentaire à valider sur Inès et conseil pour mesurer", largeur: 680, hauteur: 517 },
];

function figure({ slug, alt, largeur, hauteur }) {
  const image = `/assets/img/visuels/${slug}`;
  return `<figure id="visuel" class="maquette-fiche appv-figure" style="--appv-max:${largeur}px"><img src="${image}-1x.webp" srcset="${image}-1x.webp 1x, ${image}-2x.webp 2x" width="${largeur}" height="${hauteur}" alt="${alt}" loading="lazy" decoding="async"><figcaption>Écran de MyClassFlow, données fictives.</figcaption></figure>`;
}

export const illustrations = Object.fromEntries(VISUELS.map((visuel) => [visuel.slug, figure(visuel)]));
