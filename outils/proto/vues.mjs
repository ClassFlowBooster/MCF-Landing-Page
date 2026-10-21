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
      { fichier: 'hifi-shell.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'prof.jsx', constante: 'MOCK_PROF', valeur: PROF },
      { fichier: 'prof.jsx', constante: 'MOCK_CLASSES', valeur: CLASSES },
      { fichier: 'lancement.jsx', retrait: true },
    ],
  },
  'adaptation-des-supports': {
    type: 'bureau', url: '/index.html#supports', root: '.app', taille: { width: 1440, height: 900 }, attente: 1400,
    // Le proto ne possède pas encore de composant de critères pédagogiques : on masque
    // donc son ancienne ligne de profils/troubles dans cet export, sans la renommer.
    css: '.card.card-pad:first-of-type [style*="border-radius: 100"]{display:none!important}',
    patches: [
      { fichier: 'hifi-shell.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'prof.jsx', constante: 'MOCK_PROF', valeur: PROF },
      { fichier: 'prof.jsx', constante: 'MOCK_CLASSES', valeur: CLASSES },
      { fichier: 'screen-supports.jsx', remplacements: [{ avant: "const [supportName, setSupportName] = React.useState(\"Fiche d'exercices — les fractions\");", apres: "const [supportName, setSupportName] = React.useState('Fiche de mesure — version d’origine');" }] },
      { fichier: 'lancement.jsx', retrait: true },
    ],
  },
  'fiches-eleves': {
    type: 'bureau', url: '/index.html#pupil', root: '.app', taille: { width: 1440, height: 900 }, attente: 1400,
    patches: [
      { fichier: 'hifi-shell.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'prof.jsx', constante: 'MOCK_PROF', valeur: PROF },
      { fichier: 'prof.jsx', constante: 'MOCK_CLASSES', valeur: CLASSES },
      { fichier: 'screen-pupil.jsx', remplacements: [{ avant: 'Léa Martin', apres: 'Inès Martin', toutes: true }, { avant: 'CE2', apres: 'CE1', toutes: true }] },
      { fichier: 'lancement.jsx', retrait: true },
    ],
  },
  lia: {
    type: 'bureau', url: '/index.html#dashboard&lia=expanded&conv=1', root: '.app', taille: { width: 1440, height: 900 }, attente: 1400,
    patches: [
      { fichier: 'lia.jsx', constante: 'LIA_SEED_CONVERSATIONS', valeur: LIA_CONVERSATIONS },
      { fichier: 'hifi-shell.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'prof.jsx', constante: 'MOCK_PROF', valeur: PROF },
      { fichier: 'prof.jsx', constante: 'MOCK_CLASSES', valeur: CLASSES },
      { fichier: 'lancement.jsx', retrait: true },
    ],
  },
  'import-eleves-photo': {
    type: 'tel', url: '/mobile/index.html', root: '.sp', taille: { width: 390, height: 900 }, attente: 1650,
    etatInitial: "try { localStorage.setItem('sp_mob_onboarding_seen', '1'); } catch (_) {}",
    sequence: [{ evenement: 'sp:import-ocr' }],
    patches: [
      { fichier: 'mobile/sp-import-ocr.jsx', constante: 'OCR_ROWS', valeur: OCR_ROWS },
      { fichier: 'mobile/sp-core.jsx', constante: 'CLASSES', valeur: MOBILE_CLASSES },
      { fichier: 'mobile/sp-import-ocr.jsx', remplacements: [{ avant: 'reset(); setOpen(true);', apres: "reset(); setOpen(true); setStep('analyse');" }] },
      { fichier: 'mobile/sp-lancement.jsx', retrait: true },
    ],
  },
};

export const vueNoms = Object.keys(VUES);
