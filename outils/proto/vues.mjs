import { PUPILS, SEED_SEANCES, SUBJECTS, TASK_SEED } from './donnees.mjs';

const literal = (value) => JSON.stringify(value, null, 2);

// Les patchs sont intentionnellement textuels et déclarés ici : le proto source n'est jamais modifié.
export const VUES = {
  'cahier-journal': {
    type: 'bureau', url: '/index.html#planning&v=journal', root: '.app', taille: { width: 1440, height: 900 }, attente: 1400,
    patches: [
      { fichier: 'screen-planning.jsx', constante: 'SEED_SEANCES', valeur: SEED_SEANCES },
      { fichier: 'hifi-shell.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'lancement.jsx', retrait: true },
    ],
  },
  taches: {
    type: 'tel', url: '/mobile/index.html', root: '.sp', taille: { width: 390, height: 900 }, attente: 1400,
    etatInitial: "try { localStorage.setItem('sp_mob_onboarding_seen', '1'); } catch (_) {}",
    sequence: [{ texte: 'Voir toutes les tâches', selecteur: 'button, [role="button"]' }],
    patches: [
      { fichier: 'mobile/sp-taches.jsx', constante: 'TASK_SEED', valeur: TASK_SEED },
      { fichier: 'mobile/sp-core.jsx', constante: 'SUBJECTS', valeur: SUBJECTS },
      { fichier: 'mobile/sp-core.jsx', apres: 'Object.assign(window,', texte: `window.PUPILS = ${literal(PUPILS)};\n\n` },
      { fichier: 'mobile/sp-lancement.jsx', retrait: true },
    ],
  },
};

export const vueNoms = Object.keys(VUES);
