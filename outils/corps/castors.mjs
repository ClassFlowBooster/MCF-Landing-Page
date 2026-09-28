// Mascottes castor : une par espace. Fichiers SVG servis en <img> (trop lourds
// pour être intégrés au HTML), purement décoratifs (alt vide).

export const CASTOR_DE = { enseignants: "professeur", ecoles: "direction", "parents-enfants": "eleve" };

/** Balise <img> d'un castor. Les SVG sont carrés : largeur = hauteur. */
export function castor(nom, classe, taille) {
  return `<img class="castor ${classe}" src="/assets/img/castors/${nom}.svg" alt="" width="${taille}" height="${taille}" decoding="async">`;
}
