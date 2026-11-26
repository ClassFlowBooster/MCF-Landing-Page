// Feuille du proto réduite à une page : assets/css/visuels-proto.css (extraite du proto,
// ~320 Ko, bloquante) ne garde que les règles dont les classes figurent dans la page.
// Écrite par outils/generer.mjs dans assets/css/visuels-proto/<fiche>.css.

/** Classes présentes dans les attributs class="…" du HTML. */
export const classesDe = (html) => {
  const classes = new Set();
  for (const [, valeur] of html.matchAll(/\bclass="([^"]*)"/g)) for (const c of valeur.split(/\s+/)) if (c) classes.add(c);
  return classes;
};

// Retire le contenu des pseudo-classes fonctionnelles (:not(.x), :is(…), :where(…), :has(…)) :
// une classe absente n'y rend pas le sélecteur inutile. Gardé large par prudence.
const sansPseudoFonctions = (selecteur) => {
  let s = selecteur, avant;
  do { avant = s; s = s.replace(/:(?:not|is|where|has)\((?:[^()]|\([^()]*\))*\)/g, ""); } while (s !== avant);
  return s;
};

// Un sélecteur sert si l'une de ses variantes n'emploie que des classes de la page.
const sert = (selecteur, classes) => selecteur.replace(/\/\*[\s\S]*?\*\//g, "").split(",")
  .some((s) => [...sansPseudoFonctions(s).matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].every(([, c]) => classes.has(c)));

const GROUPES = /^@(media|supports|container|layer)\b/;

function filtrer(css, classes) {
  let sortie = "", i = 0;
  while (i < css.length) {
    const ouverture = css.indexOf("{", i);
    if (ouverture < 0) break;
    const tete = css.slice(i, ouverture).trim();
    let profondeur = 1, j = ouverture + 1;
    while (profondeur && j < css.length) { if (css[j] === "{") profondeur++; else if (css[j] === "}") profondeur--; j++; }
    const corps = css.slice(ouverture + 1, j - 1);
    const teteSansCommentaire = tete.replace(/\/\*[\s\S]*?\*\//g, "").trim();
    if (GROUPES.test(teteSansCommentaire)) {
      const interieur = filtrer(corps, classes);
      if (interieur) sortie += `${teteSansCommentaire}{${interieur}}\n`;
    } else if (teteSansCommentaire.startsWith("@") || sert(teteSansCommentaire, classes)) {
      sortie += `${teteSansCommentaire}{${corps}}\n`;
    }
    i = j;
  }
  return sortie;
}

/** CSS du proto réduit aux règles utiles au HTML donné. */
export const cssPourPage = (css, html) =>
  `/* Généré par outils/generer.mjs depuis visuels-proto.css — ne pas éditer à la main. */\n${filtrer(css, classesDe(html))}`;

/** Adresse de la feuille réduite d'une fiche, d'après son chemin. */
export const adresseCssProto = (chemin) => `/assets/css/visuels-proto/${chemin.split("/").filter(Boolean).pop()}.css`;
