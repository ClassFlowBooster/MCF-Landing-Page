import { CLASSES, DESKTOP_TASK_SEED, EDT_SLOTS_OFFSETS, FICHES_PREP, IMPORT_ROWS, LIA_CONVERSATIONS, PROF, SEED_SEANCES, SUBJECTS } from './donnees.mjs';

const literal = (value) => JSON.stringify(value, null, 2);

// Les patchs sont intentionnellement textuels et déclarés ici : le proto source n'est jamais modifié.
export const VUES = {
  'cahier-journal': {
    type: 'bureau', url: '/index.html#planning&v=journal', root: '.app', taille: { width: 1440, height: 900 }, attente: 1400,
    patches: [
      { fichier: 'screen-planning.jsx', constante: 'DATES', valeur: ['02', '03', '04', '05', '06'] },
      { fichier: 'screen-planning.jsx', constante: 'SEED_SEANCES', valeur: SEED_SEANCES },
      { fichier: 'hifi-shell.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'prof.jsx', constante: 'MOCK_PROF', valeur: PROF },
      { fichier: 'prof.jsx', constante: 'MOCK_CLASSES', valeur: CLASSES },
      { fichier: 'hifi-shell.jsx', remplacements: [{ avant: 'function spNow() { return new Date(); }', apres: "function spNow() { return new Date('2026-11-02T12:00:00'); }" }] },
      { fichier: 'screen-planning.jsx', remplacements: [
        { avant: "subtitle={<>{seances.length} séances planifiées · {nEval} évaluation{nEval > 1 ? 's' : ''}</>}", apres: "subtitle={<>{seances.length} séances planifiées</>}" },
      ] },
      { fichier: 'lancement.jsx', retrait: true },
    ],
  },
  'emploi-du-temps': {
    type: 'bureau', url: '/index.html#planning&v=edt', root: '.app', taille: { width: 1440, height: 900 }, attente: 1400,
    patches: [
      { fichier: 'planning-edt.jsx', constante: 'SEED_SLOTS_OFFSETS', valeur: EDT_SLOTS_OFFSETS },
      { fichier: 'hifi-shell.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'prof.jsx', constante: 'MOCK_PROF', valeur: PROF },
      { fichier: 'prof.jsx', constante: 'MOCK_CLASSES', valeur: [{ ...CLASSES[0], niveau: 'CM2' }] },
      { fichier: 'lancement.jsx', retrait: true },
    ],
  },
  'fiche-de-preparation': {
    type: 'bureau', url: '/index.html#planning&v=prep', root: '.app', taille: { width: 1440, height: 900 }, attente: 1400,
    sequence: [{ texte: 'Mesurer des longueurs', selecteur: '[role="button"],button,div' }],
    patches: [
      { fichier: 'screen-planning.jsx', constante: 'FICHES_PREP', valeur: FICHES_PREP },
      { fichier: 'screen-fiches.jsx', constante: 'SEED_META', valeur: [{
        seq: 'Grandeurs et mesures · séance 2',
        objectif: 'Mesurer un segment au centimètre près en partant du zéro.',
        domaines: ['Grandeurs et mesures'],
        competences: ['Mesurer des grandeurs'],
      }] },
      { fichier: 'screen-fiches.jsx', remplacements: [
        { avant: "{ id: 'math', name: 'Maths'", apres: "{ id: 'math', name: 'Mathématiques'" },
        { avant: "folderId: [ 'fr-loup', 'math', 'quest' ][i] || INBOX", apres: "folderId: [ 'math', 'math', 'quest' ][i] || INBOX" },
        { avant: "matieres: [f.subj], domaines: [], competences: SEED_META[i] ? SEED_META[i].competences : []", apres: "matieres: [f.subj], domaines: SEED_META[i] ? (SEED_META[i].domaines || []) : [], competences: SEED_META[i] ? SEED_META[i].competences : []" },
      ] },
      { fichier: 'hifi-shell.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'prof.jsx', constante: 'MOCK_PROF', valeur: PROF },
      { fichier: 'prof.jsx', constante: 'MOCK_CLASSES', valeur: CLASSES },
      { fichier: 'lancement.jsx', retrait: true },
    ],
  },
  'adaptation-des-supports': {
    type: 'bureau', url: '/index.html#supports', root: '.app', taille: { width: 1280, height: 800 }, attente: 1400,
    css: '.support-targets{display:flex;gap:10px;align-items:stretch;flex-wrap:wrap}.support-target{border:1px solid var(--line-2);border-radius:10px;padding:10px 12px;background:var(--paper);font-size:13px}.support-target.active{border-color:var(--coral-300);background:var(--coral-50)}.support-target b{display:block;margin-bottom:6px}.criteria-family{margin-top:10px;font-size:12px;color:var(--ink-3)}.criteria-family .chip{margin:5px 4px 0 0}',
    patches: [
      { fichier: 'hifi-shell.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'prof.jsx', constante: 'MOCK_PROF', valeur: PROF },
      { fichier: 'prof.jsx', constante: 'MOCK_CLASSES', valeur: CLASSES },
      { fichier: 'screen-supports.jsx', remplacements: [
        { avant: "const [supportName, setSupportName] = React.useState(\"Fiche d'exercices — les fractions\");", apres: "const [supportName, setSupportName] = React.useState('Mesurer des segments (CE1)');" },
        { avant: "{ id: 1, name: 'fiche-fractions.pdf' },\n    { id: 2, name: 'annexe-schemas.png' },", apres: "{ id: 1, name: 'mesurer-des-segments.pdf' }," },
        { avant: 'subtitle="Déposez un support : il sera adapté aux besoins déclarés de la classe."', apres: 'subtitle="Dépose un support : il sera adapté aux critères pédagogiques de tes élèves."' },
        { avant: 'Formats acceptés : PDF, images (PNG, JPG…), Word (DOC, DOCX)', apres: 'Formats acceptés : PDF, images (PNG, JPG…), Word (DOC, DOCX)' },
        // L'app tutoie (adaptation_screen.dart:688, MCF-App).
        { avant: 'Glissez vos fichiers ici, ou ', apres: 'Glisse tes fichiers ici, ou ', toutes: true },
        { avant: '>parcourez<', apres: '>parcours<', toutes: true },
      ] },
      { fichier: 'lancement.jsx', retrait: true },
    ],
  },
  'fiches-eleves': {
    type: 'bureau', url: '/index.html#pupil', root: '.app', taille: { width: 820, height: 700 }, attente: 1400,
    patches: [
      { fichier: 'hifi-shell.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'prof.jsx', constante: 'MOCK_PROF', valeur: PROF },
      { fichier: 'prof.jsx', constante: 'MOCK_CLASSES', valeur: CLASSES },
      { fichier: 'screen-pupil.jsx', remplacements: [{ avant: 'Léa Martin', apres: 'Inès Martin', toutes: true }, { avant: 'CE2', apres: 'CE1', toutes: true }, { avant: '>L</Av>', apres: '>I</Av>' }] },
      { fichier: 'lancement.jsx', retrait: true },
    ],
  },
  lia: {
    type: 'bureau', url: '/index.html#dashboard&lia=expanded&conv=1', root: '.app', taille: { width: 1000, height: 780 }, attente: 1400,
    patches: [
      { fichier: 'lia.jsx', constante: 'LIA_SEED_CONVERSATIONS', valeur: LIA_CONVERSATIONS },
      { fichier: 'lia.jsx', remplacements: [
        { avant: "'Contexte : CE2 · Mme Durand'", apres: "'Contexte : CE1 · Mme Moreau'" },
        { avant: "'Observation à ajouter'", apres: "'Commentaire à ajouter'" },
        // L'app tutoie (lia_chat_overlay.dart:1094, MCF-App).
        { avant: 'Demandez à Lia…', apres: 'Demande à Lia…', toutes: true },
      ] },
      { fichier: 'hifi-shell.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'prof.jsx', constante: 'MOCK_PROF', valeur: PROF },
      { fichier: 'prof.jsx', constante: 'MOCK_CLASSES', valeur: CLASSES },
      { fichier: 'lancement.jsx', retrait: true },
    ],
  },
};

export const vueNoms = Object.keys(VUES);
