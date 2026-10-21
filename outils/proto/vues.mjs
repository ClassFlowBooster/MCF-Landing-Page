import { CLASSES, EDT_SLOTS_OFFSETS, FICHES_PREP, LIA_CONVERSATIONS, MOBILE_CLASSES, OCR_ROWS, PROF, PUPILS, SEED_SEANCES, SUBJECTS, TASK_SEED } from './donnees.mjs';

const literal = (value) => JSON.stringify(value, null, 2);

// Les patchs sont intentionnellement textuels et déclarés ici : le proto source n'est jamais modifié.
export const VUES = {
  'cahier-journal': {
    type: 'bureau', url: '/index.html#planning&v=journal', root: '.app', taille: { width: 1440, height: 900 }, attente: 1400,
    patches: [
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
  taches: {
    type: 'tel', url: '/mobile/index.html', root: '.sp', taille: { width: 390, height: 900 }, attente: 1400,
    etatInitial: "try { localStorage.setItem('sp_mob_onboarding_seen', '1'); } catch (_) {}",
    sequence: [{ texte: 'Voir toutes les tâches', selecteur: 'button, [role="button"]' }],
    css: '.sp{width:390px !important;min-width:390px !important;max-width:390px !important;height:auto !important;min-height:900px !important;overflow:visible !important}.sp-screen{min-height:calc(100% - 76px) !important;padding-bottom:18px !important}.tabbar{position:static !important;width:390px !important;box-sizing:border-box !important;margin-top:0 !important}',
    patches: [
      { fichier: 'mobile/sp-taches.jsx', constante: 'TASK_SEED', valeur: TASK_SEED },
      { fichier: 'mobile/sp-core.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'mobile/sp-core.jsx', constante: 'CLASSES', valeur: MOBILE_CLASSES },
      { fichier: 'mobile/sp-core.jsx', apres: 'Object.assign(window,', texte: `window.PUPILS = ${literal(PUPILS)};\n\n` },
      { fichier: 'mobile/sp-lancement.jsx', retrait: true },
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
    type: 'bureau', url: '/index.html#supports', root: '.app', taille: { width: 1440, height: 900 }, attente: 1400,
    css: '.support-targets{display:flex;gap:10px;align-items:stretch;flex-wrap:wrap}.support-target{border:1px solid var(--line-2);border-radius:10px;padding:10px 12px;background:var(--paper);font-size:13px}.support-target.active{border-color:var(--coral-300);background:var(--coral-50)}.support-target b{display:block;margin-bottom:6px}.criteria-family{margin-top:10px;font-size:12px;color:var(--ink-3)}.criteria-family .chip{margin:5px 4px 0 0}',
    patches: [
      { fichier: 'hifi-shell.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'prof.jsx', constante: 'MOCK_PROF', valeur: PROF },
      { fichier: 'prof.jsx', constante: 'MOCK_CLASSES', valeur: CLASSES },
      { fichier: 'screen-supports.jsx', remplacements: [
        { avant: "const [supportName, setSupportName] = React.useState(\"Fiche d'exercices — les fractions\");", apres: "const [supportName, setSupportName] = React.useState('Fiche de mesure — version d’origine');" },
        { avant: "{ id: 1, name: 'fiche-fractions.pdf' },\n    { id: 2, name: 'annexe-schemas.png' },", apres: "{ id: 1, name: 'mesurer-des-segments.pdf' }," },
        { avant: 'subtitle="Déposez un support : il sera adapté aux besoins déclarés de la classe."', apres: 'subtitle="Déposez un support : il sera adapté selon les critères pédagogiques de vos élèves."' },
        { avant: '<span>Accueil</span> › <span>Supports</span> › <b>Adapter un support</b>', apres: '<span>Accueil</span> › <b>Adaptation</b>' },
        { avant: 'Formats acceptés : PDF, images (PNG, JPG…), Word (DOC, DOCX)', apres: 'Formats acceptés : PDF ou image (PNG, JPG, WEBP), jusqu’à 8 pages' },
      ] },
      { fichier: 'lancement.jsx', retrait: true },
    ],
  },
  'fiches-eleves': {
    type: 'bureau', url: '/index.html#pupil', root: '.app', taille: { width: 1440, height: 900 }, attente: 1400,
    patches: [
      { fichier: 'hifi-shell.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'prof.jsx', constante: 'MOCK_PROF', valeur: PROF },
      { fichier: 'prof.jsx', constante: 'MOCK_CLASSES', valeur: CLASSES },
      { fichier: 'screen-pupil.jsx', remplacements: [{ avant: 'Léa Martin', apres: 'Inès Martin', toutes: true }, { avant: 'CE2', apres: 'CE1', toutes: true }, { avant: '>L</Av>', apres: '>I</Av>' }] },
      { fichier: 'lancement.jsx', retrait: true },
    ],
  },
  lia: {
    type: 'bureau', url: '/index.html#dashboard&lia=expanded&conv=1', root: '.app', taille: { width: 1440, height: 900 }, attente: 1400,
    patches: [
      { fichier: 'lia.jsx', constante: 'LIA_SEED_CONVERSATIONS', valeur: LIA_CONVERSATIONS },
      { fichier: 'lia.jsx', remplacements: [{ avant: "'Contexte : CE2 · Mme Durand'", apres: "'Contexte : CE1 · Mme Moreau'" }] },
      { fichier: 'hifi-shell.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'prof.jsx', constante: 'MOCK_PROF', valeur: PROF },
      { fichier: 'prof.jsx', constante: 'MOCK_CLASSES', valeur: CLASSES },
      { fichier: 'lancement.jsx', retrait: true },
    ],
  },
  'import-eleves-photo': {
    type: 'tel', url: '/mobile/index.html', pret: '.sp', root: '.ocr-screen', taille: { width: 390, height: 900 }, attente: 1650,
    etatInitial: "try { localStorage.setItem('sp_mob_onboarding_seen', '1'); } catch (_) {}",
    sequence: [{ evenement: 'sp:import-ocr' }],
    css: '.sp{width:390px!important;min-width:390px!important;max-width:390px!important;margin:0!important;overflow:hidden!important}.ocr-screen{width:390px!important;max-width:390px!important;box-sizing:border-box!important;transform:none!important}.ocr-check-static{width:20px;height:20px;box-sizing:border-box;border:1.5px solid var(--coral-500);border-radius:6px;background:var(--coral-500);display:inline-flex;align-items:center;justify-content:center;color:white;font-size:13px;font-weight:700}.ocr-field-static{height:40px!important;min-height:40px!important;box-sizing:border-box!important;display:flex!important;align-items:center!important;padding:0 10px!important}',
    patches: [
      { fichier: 'mobile/sp-import-ocr.jsx', constante: 'OCR_ROWS', valeur: OCR_ROWS },
      { fichier: 'mobile/sp-core.jsx', constante: 'CLASSES', valeur: MOBILE_CLASSES },
      { fichier: 'mobile/sp-import-ocr.jsx', remplacements: [{ avant: 'reset(); setOpen(true);', apres: "reset(); setOpen(true); setStep('analyse');" }] },
      { fichier: 'mobile/sp-lancement.jsx', retrait: true },
    ],
  },
};

export const vueNoms = Object.keys(VUES);
