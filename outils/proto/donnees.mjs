// Données éditoriales fictives converties vers les graines du proto MCF-Design.
import { CLASSE_CE1, CRITERES_INES, EDT, IMPORT, JOURNAL, MATIERES, PHASES_MESURE, TACHES } from '../corps/fiches/visuels-donnees.mjs';

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

// Format du TodoStore bureau : la sixième entrée permet de rendre aussi le
// groupe « terminées » de TodoCard. Les identifiants correspondent au roster
// CE1 injecté dans les vues bureau.
export const DESKTOP_TASK_SEED = TASK_SEED.map((task, index) => ({
  id: task.id, classId: 'c1', title: task.title, detail: task.sub,
  due: task.due, subj: task.subj || null,
  pupilId: task.pupils[0] === 'Inès Martin' ? 'e2' : task.pupils[0] === 'Maël Renaud' ? 'e3' : task.pupils[0] === 'Nour Saïdi' ? 'e4' : null,
  done: false,
})).concat([{
  id: 'task-ce1-done', classId: 'c1', title: 'Préparer les règles graduées',
  detail: 'Matériel rangé pour la séance de mesure.', due: '2026-11-02', subj: 'math', pupilId: null, done: true,
}]);

export const CLASSE = CLASSE_CE1;

// Données spécifiques aux autres écrans du proto. Elles restent dans ce module afin que
// vues.mjs ne contienne que les routes, interactions et patchs de rendu.
export const PROF = { prenom: 'Camille', nom: 'Moreau', displayName: 'Camille Moreau', initiales: 'C', etablissement: 'Les Tilleuls' };
export const CLASSES = [{ id: 'c1', niveau: 'CE1', ecole: 'Les Tilleuls', nbEleves: 4, deco: false }];
export const MOBILE_CLASSES = [{ id: 'c-ce1', niveau: 'CE1', nom: 'CE1', ecole: 'Les Tilleuls', n: 4 }];

export const EDT_SLOTS_OFFSETS = EDT.flatMap((jour, d) => jour.map((slot) => ({
  d, s: heures(slot.debut), h: heures(slot.fin) - heures(slot.debut),
  kind: slot.code ? 'cours' : 'pause', subj: slot.code ? protoSujet[slot.code] : undefined,
  t: slot.titre,
})));

export const FICHES_PREP = [{
  id: 'mesure-ce1', title: 'Mesurer des longueurs', subj: 'math', duree: '40 min',
  phases: PHASES_MESURE.map(([t, min, organisation, desc]) => ({ t, d: `${min} min`, organisation, desc })),
  objectifs: ['Mesurer un segment au centimètre près en partant du zéro.'],
  domaines: ['Grandeurs et mesures'],
  competences: ['Mesurer des grandeurs'],
  materiel: ['Règles graduées', 'Bandes de papier', 'Fiche d’exercices'],
  seq: 'Les longueurs · séance 2',
}];

export const OCR_ROWS = IMPORT.map(([first, last, note]) => ({
  first,
  // L'OCR incertain est corrigé dans l'export, mais conserve son état « À vérifier ».
  last: last === 'R?naud' ? 'Renaud' : last,
  verify: note === 'À vérifier',
  checked: note !== 'Déjà dans la classe',
}));

export const IMPORT_ROWS = IMPORT.map(([first, last]) => [first, last === 'R?naud' ? 'Renaud' : last]);

// Même conversation que l'exemple de la fiche Lia ; Lia tutoie, comme dans l'app (invite de lia-chat).
export const LIA_CONVERSATIONS = [{
  id: 1, title: 'Point de la semaine', date: "Aujourd’hui",
  preview: 'Une tâche, un commentaire, un conseil.',
  messages: [
    { role: 'user', text: 'Qu’est-ce qui me reste à faire cette semaine ?' },
    { role: 'lia', text: 'Trois tâches : rendre les cahiers de lecture demain, photocopier la fiche de mesure pour jeudi, récupérer les autorisations de sortie de Maël et Nour pour vendredi.' },
    { role: 'user', text: 'Note qu’Inès a mesuré correctement ses quatre segments aujourd’hui.' },
    { role: 'lia', text: 'Je te propose d’ajouter ce commentaire au fil de suivi d’Inès. Rien n’est enregistré tant que tu ne l’as pas validé.' },
    { propose: { kind: 'obs', title: 'Inès a mesuré correctement ses quatre segments.', detail: 'Commentaire · fil de suivi d’Inès Martin', status: 'pending' } },
    { role: 'user', text: 'Comment aider les élèves qui partent du bord de la règle ?' },
    { role: 'lia', text: 'Fais poser le doigt sur le zéro avant chaque mesure, et compare deux mesures du même segment faites de deux façons : l’écart rend l’erreur visible.' },
  ],
}];

export const SUPPORT_CRITERES = CRITERES_INES;
