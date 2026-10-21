// Fragments statiques extraits du proto MCF-Design. Ils ne portent aucune action.
import { readFileSync } from 'node:fs';
import { VUES } from '../../proto/vues.mjs';

const ici = new URL('./visuels-proto/', import.meta.url);
const fiches = {
  'fiche-de-preparation': ['fiche-de-preparation.html', 'la fiche de préparation'],
  'cahier-journal': ['cahier-journal.html', 'le cahier journal de la semaine'],
  'emploi-du-temps': ['emploi-du-temps.html', "l’emploi du temps"],
  'adaptation-des-supports': ['adaptation-des-supports.html', "l’adaptation d’un support"],
  'fiches-eleves': ['fiches-eleves.html', "la fiche d’élève"],
  lia: ['lia.html', 'la conversation avec Lia'],
};

// Cadrage resserré (x, y, largeur, hauteur, en pixels de la vue rendue) et largeur maximale
// dans la page : la vue entière à 900 px de haut prenait trop de place (retour de Joseph, 21/10).
const cadrages = {
  'adaptation-des-supports': { cadre: [312, 14, 952, 734], max: 680 }, // titre, étapes 1 et 2
  'fiches-eleves': { cadre: [20, 0, 780, 608], max: 680 }, // la fenêtre de l'élève, jusqu'au premier commentaire du fil
  lia: { cadre: [17, 23, 966, 734], max: 680 }, // le panneau Lia seul
};

function styleCadre(slug) {
  const { width, height } = VUES[slug].taille;
  const { cadre: [x, y, w, h] = [0, 0, width, height], max } = cadrages[slug] || {};
  const vars = { '--appv-l': width, '--appv-h': height, '--appv-x': x, '--appv-y': y, '--appv-w': w, '--appv-ht': h };
  if (max) vars['--appv-max'] = `${max}px`;
  return Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(';');
}

function rendreInerte(html) {
  // Les exports sont déjà sans éléments interactifs ; ceci protège les générations
  // futures contre des attributs événementiels ou contrôles ajoutés au prototype.
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<\/?(?:button|input|a)\b[^>]*>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/MyMyClassFlow/g, 'MyClassFlow')
    .replace(/Bienvenue sur ClassFlow/g, 'Bienvenue sur MyClassFlow')
    .replace(/<\/?h1\b[^>]*>/gi, (balise) => balise.startsWith('</') ? '</div>' : balise.replace(/h1/i, 'div'))
    .replace(/Base commune|Éditeur|SuperProf|Dyslexie|TDAH|PPRE|GEVA|évaluation/gi, '');
}

function figure(slug, fichier, description) {
  const fragment = rendreInerte(readFileSync(new URL(fichier, ici), 'utf8').trim());
  return `<figure id="visuel" class="maquette-fiche appv-figure appv-figure--bureau" style="${styleCadre(slug)}" aria-label="Illustration : ${description} dans MyClassFlow"><div class="appv-proto-viewport"><div class="appv-proto-stage" aria-hidden="true" data-proto="${slug}">${fragment}</div></div><figcaption>Écran de MyClassFlow, données fictives.</figcaption></figure>`;
}

export const illustrations = Object.fromEntries(
  Object.entries(fiches).map(([slug, [fichier, description]]) => [slug, figure(slug, fichier, description)]),
);
