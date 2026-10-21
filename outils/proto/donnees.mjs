// Données éditoriales fictives converties vers les graines du proto MCF-Design.
import { CLASSE_CE1, JOURNAL, MATIERES, TACHES } from '../corps/fiches/visuels-donnees.mjs';

const couleurs = {
  francais: 'var(--s-fr)', mathematiques: 'var(--s-math)', questionner_monde: 'var(--s-quest)',
  sciences_techno: 'var(--s-quest)', arts_pl: 'var(--s-art)', musique: 'var(--s-art)',
  eps: 'var(--s-eps)', lv: 'var(--s-ang)', histoire: 'var(--s-quest)', geographie: 'var(--s-quest)', emc: 'var(--s-quest)',
};
const protoSujet = { francais: 'fr', mathematiques: 'math', questionner_monde: 'quest', sciences_techno: 'quest', arts_pl: 'art', musique: 'art', eps: 'eps', lv: 'ang', histoire: 'quest', geographie: 'quest', emc: 'quest' };
const heures = (heure) => { const [h, m] = heure.split(':').map(Number); return h + m / 60 - 8; };

export const SUBJECTS = Object.fromEntries(Object.entries(MATIERES).map(([code, matiere]) => [protoSujet[code], {
  name: matiere.nom, color: couleurs[code], short: matiere.nom.slice(0, 2).toUpperCase(),
}]).filter(([code], index, entries) => entries.findIndex(([other]) => other === code) === index));

export const PUPILS = [
  { n: 'Camille Moreau', c: 'var(--coral-500)' },
  { n: 'Inès Martin', c: 'var(--s-fr)' },
  { n: 'Maël Renaud', c: 'var(--s-math)' },
  { n: 'Nour Saïdi', c: 'var(--s-quest)' },
];

let id = 1;
export const SEED_SEANCES = JOURNAL.flatMap((jour, d) => jour.map((seance) => ({
  id: id++, d, s: heures(seance.debut), h: heures(seance.fin) - heures(seance.debut),
  t: seance.titre, subj: seance.code ? protoSujet[seance.code] : undefined,
  kind: seance.code ? undefined : (seance.titre === 'Récréation' ? 'rituel' : 'pause'),
  objectifs: seance.objectif ? [seance.objectif] : undefined,
  materiel: seance.materiel ? [`${seance.materiel} matériel${seance.materiel > 1 ? 's' : ''}`] : undefined,
  pieces: seance.pieces ? [`${seance.pieces} document${seance.pieces > 1 ? 's' : ''}`] : undefined,
}))).filter((seance) => seance.d <= 4);

const dates = ['2026-11-03', '2026-11-05', '2026-11-06', '2026-11-12', ''];
export const TASK_SEED = TACHES.map((tache, index) => ({
  id: `task-ce1-${index + 1}`, title: tache.titre, sub: tache.detail, subj: tache.code ? protoSujet[tache.code] : '',
  due: dates[index], pupils: (tache.eleves || []).map((nom) => nom === 'Inès' ? 'Inès Martin' : nom === 'Maël' ? 'Maël Renaud' : nom === 'Nour' ? 'Nour Saïdi' : nom), done: false,
}));

export const CLASSE = CLASSE_CE1;
