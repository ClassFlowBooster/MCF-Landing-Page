// Visuel avant / après du header : le curseur glisse tout seul de droite à
// gauche (copie d'origine → copie adaptée), puis revient ; dès que le visiteur
// le touche (souris, doigt, clavier), l'animation s'arrête et il le pilote.
// position() est pure (testée) ; brancher() relie le DOM.

const ATTENTE = 1000, ALLER = 2200, PAUSE = 2400, RETOUR = 1600;
export const CYCLE = ATTENTE + ALLER + PAUSE + RETOUR;
const FIN = 3;

const douce = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

/** Position du curseur (en %, 100 = tout l'original) à l'instant t (ms). */
export function position(t) {
  const c = ((t % CYCLE) + CYCLE) % CYCLE;
  if (c < ATTENTE) return 100;
  if (c < ATTENTE + ALLER) return 100 - (100 - FIN) * douce((c - ATTENTE) / ALLER);
  if (c < ATTENTE + ALLER + PAUSE) return FIN;
  return FIN + (100 - FIN) * douce((c - ATTENTE - ALLER - PAUSE) / RETOUR);
}

export function brancher(doc = document, win = window) {
  const reduit = win.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  for (const ba of doc.querySelectorAll("[data-comparateur]")) {
    const range = ba.querySelector(".ba-range");
    const poser = (p) => {
      ba.style.setProperty("--pos", `${p}%`);
      ba.classList.toggle("ba-debut", p > 82);
      ba.classList.toggle("ba-fin", p < 18);
      range.value = String(Math.round(p));
    };
    let manuel = false;
    const prendre = () => { manuel = true; ba.classList.add("ba-manuel"); };
    range.addEventListener("pointerdown", prendre);
    range.addEventListener("keydown", prendre);
    range.addEventListener("input", () => { prendre(); poser(Number(range.value)); });
    if (reduit) { poser(50); continue; }
    const t0 = win.performance.now();
    const boucle = (t) => {
      if (manuel) return;
      poser(position(t - t0));
      win.requestAnimationFrame(boucle);
    };
    win.requestAnimationFrame(boucle);
  }
}

if (typeof document !== "undefined") brancher();
