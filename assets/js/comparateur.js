// Visuel avant / après du header : le curseur suit le défilement de la page.
// En haut de page, il montre l'original (ou presque) ; en descendant, la
// version adaptée se révèle, entièrement quand le bas de la feuille atteint
// le milieu de l'écran ; en remontant, il revient. Dès que le visiteur touche
// le curseur (souris, doigt, clavier), il le pilote et le défilement ne le
// déplace plus. Mouvements réduits ou sans JavaScript : curseur fixe au milieu.
// positionDepuisDefilement() est pure (testée) ; brancher() relie le DOM.

/** Position de départ (en %, 100 = tout l'original). */
export const DEPART = 85;

/**
 * Position du curseur (en %, 100 = tout l'original, 0 = toute la version adaptée).
 * haut : bord haut de la feuille dans la fenêtre (px) ; hauteurFeuille, hauteurFenetre (px) ;
 * basInitial (facultatif) : bas de la feuille dans la fenêtre au chargement, en haut de page.
 */
export function positionDepuisDefilement(haut, hauteurFeuille, hauteurFenetre, basInitial = Infinity) {
  const bas = haut + hauteurFeuille;
  if (!Number.isFinite(bas) || !(hauteurFenetre > 0)) return DEPART;
  // Départ : bas de la feuille au bas de l'écran, ou plus haut si elle y est déjà au chargement.
  const debut = Math.min(hauteurFenetre, basInitial);
  // Arrivée : bas de la feuille au milieu de l'écran, avec au moins un quart d'écran de course.
  const fin = Math.min(hauteurFenetre / 2, debut - hauteurFenetre / 4);
  const p = (DEPART * (bas - fin)) / (debut - fin);
  return Math.min(DEPART, Math.max(0, p));
}

export function brancher(doc = document, win = window) {
  const reduit = win.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  for (const ba of doc.querySelectorAll("[data-comparateur]")) {
    const range = ba.querySelector(".ba-range");
    const feuille = ba.querySelector(".ba-feuille") ?? ba;
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

    // Bas de la feuille en haut de page (indépendant du défilement au chargement).
    let basInitial = feuille.getBoundingClientRect().bottom + win.scrollY;
    let prevu = false;
    const suivre = () => {
      prevu = false;
      if (manuel) return;
      const r = feuille.getBoundingClientRect();
      poser(positionDepuisDefilement(r.top, r.height, win.innerHeight, basInitial));
    };
    // Un seul calcul par image, quel que soit le nombre d'événements de défilement.
    const demander = () => { if (!prevu && !manuel) { prevu = true; win.requestAnimationFrame(suivre); } };
    win.addEventListener("scroll", demander, { passive: true });
    win.addEventListener("resize", () => {
      basInitial = feuille.getBoundingClientRect().bottom + win.scrollY;
      demander();
    }, { passive: true });
    suivre();
  }
}

if (typeof document !== "undefined") brancher();
