// Mascottes castor : une par espace. Fichiers SVG servis en <img> (trop lourds
// pour être intégrés au HTML), purement décoratifs (alt vide).

export const CASTOR_DE = { enseignants: "professeur", ecoles: "direction", "parents-enfants": "eleve" };

/**
 * Balise <img> d'un castor. Les SVG sont carrés : largeur = hauteur.
 * differe : chargement à l'affichage (castor d'un menu fermé).
 */
export function castor(nom, classe, taille, { differe = false } = {}) {
  return `<img class="castor ${classe}" src="/assets/img/castors/${nom}.svg" alt="" width="${taille}" height="${taille}"${differe ? ' loading="lazy"' : ""} decoding="async">`;
}

/** Castor d'un espace (enseignants, ecoles, parents-enfants). */
export const castorDe = (espace, classe, taille, options) => castor(CASTOR_DE[espace], classe, taille, options);
