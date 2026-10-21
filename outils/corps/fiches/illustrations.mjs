// Fragments statiques extraits du proto MCF-Design. Ils ne portent aucune action.
import { readFileSync } from 'node:fs';

const ici = new URL('./visuels-proto/', import.meta.url);
const fiches = {
  'fiche-de-preparation': ['fiche-de-preparation.html', 'la fiche de préparation'],
  'cahier-journal': ['cahier-journal.html', 'le cahier journal de la semaine'],
  'emploi-du-temps': ['emploi-du-temps.html', "l’emploi du temps"],
  'adaptation-des-supports': ['adaptation-des-supports.html', "l’adaptation d’un support"],
  'fiches-eleves': ['fiches-eleves.html', "la fiche d’élève"],
  'import-eleves-photo': ['import-eleves-photo.html', "l’import d’élèves depuis une photo"],
  taches: ['taches.html', 'la liste des tâches'],
  lia: ['lia.html', 'la conversation avec Lia'],
};

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
  return `<figure class="maquette-fiche appv-figure appv-figure--bureau" aria-label="Illustration : ${description} dans MyClassFlow"><div class="appv-proto-viewport"><div class="appv-proto-stage" aria-hidden="true" data-proto="${slug}">${fragment}</div></div><figcaption>Écran de MyClassFlow, données fictives.</figcaption></figure>`;
}

export const illustrations = Object.fromEntries(
  Object.entries(fiches).map(([slug, [fichier, description]]) => [slug, figure(slug, fichier, description)]),
);
