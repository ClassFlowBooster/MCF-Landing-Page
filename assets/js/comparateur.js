// Visuel avant / après du header : le curseur suit le défilement de la page.
// En haut de page, il montre l'original (ou presque) ; en descendant, la
// version adaptée se révèle, entièrement quand le haut de la feuille atteint
// 20 % de l'écran ; en remontant, il revient. La position affichée rejoint en
// douceur celle que donne le défilement. Dès que le visiteur touche le
// curseur (souris, doigt, clavier), il le pilote directement et le défilement
// ne le déplace plus. Mouvements réduits ou sans JavaScript : fixe au milieu.
// positionDepuisDefilement() et lisser() sont pures (testées) ; brancher() relie le DOM.

/** Position de départ (en %, 100 = tout l'original). */
export const DEPART = 85;
const ARRIVEE_HAUT = 0.2;      // arrivée : haut de la feuille à 20 % de l'écran
const COURSE_MIN = 0.5;        // au moins une demi-hauteur d'écran de course
const LISSAGE = 0.18;          // part de l'écart rattrapée par image à 60 i/s
const IMAGE_MS = 1000 / 60;
const ECART_MIN = 0.05;        // en dessous (en %), on pose la cible

/**
 * Position cible du curseur (en %, 100 = tout l'original, 0 = toute la version adaptée).
 * haut : bord haut de la feuille dans la fenêtre (px) ; hauteurFeuille, hauteurFenetre (px) ;
 * basInitial (facultatif) : bas de la feuille dans la fenêtre au chargement, en haut de page.
 */
export function positionDepuisDefilement(haut, hauteurFeuille, hauteurFenetre, basInitial = Infinity) {
  const bas = haut + hauteurFeuille;
  if (!Number.isFinite(bas) || !(hauteurFenetre > 0)) return DEPART;
  // Départ : bas de la feuille au bas de l'écran, ou plus haut si elle y est déjà au chargement.
  const debut = Math.min(hauteurFenetre, basInitial);
  // Arrivée (exprimée par le bas de la feuille) : haut de la feuille à 20 % de l'écran.
  const fin = Math.min(ARRIVEE_HAUT * hauteurFenetre + hauteurFeuille, debut - COURSE_MIN * hauteurFenetre);
  const p = (DEPART * (bas - fin)) / (debut - fin);
  return Math.min(DEPART, Math.max(0, p));
}

/**
 * Rapproche la position affichée de la cible, indépendamment du nombre
 * d'images par seconde. dtMs : temps écoulé depuis l'image précédente.
 */
export function lisser(affiche, cible, dtMs) {
  if (Number.isNaN(dtMs) || dtMs > 1000) return cible;   // onglet revenu au premier plan
  if (!(dtMs > 0)) return affiche;
  const k = 1 - Math.pow(1 - LISSAGE, dtMs / IMAGE_MS);
  const suivant = affiche + (cible - affiche) * k;
  return Math.abs(cible - suivant) < ECART_MIN ? cible : suivant;
}

export function brancher(doc = document, win = window) {
  const reduit = win.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  for (const ba of doc.querySelectorAll("[data-comparateur]")) {
    const range = ba.querySelector(".ba-range");
    const feuille = ba.querySelector(".ba-feuille") ?? ba;
    const adap = ba.querySelector(".ba-adap");
    const poignee = ba.querySelector(".ba-poignee");
    let largeur = feuille.clientWidth ?? 0;

    // Écritures seulement : aucune lecture de mise en page ici.
    let valeur = null, debut = null, fin = null, affichee = 50;
    const poser = (p) => {
      affichee = p;
      if (adap) adap.style.clipPath = `inset(0 0 0 ${p}%)`;
      if (poignee) poignee.style.transform = `translateX(${(p / 100) * largeur}px)`;
      const v = String(Math.round(p));
      if (v !== valeur) { valeur = v; range.value = v; }
      const d = p > 82, f = p < 18;
      if (d !== debut) { debut = d; ba.classList.toggle("ba-debut", d); }
      if (f !== fin) { fin = f; ba.classList.toggle("ba-fin", f); }
    };
    ba.classList.add("ba-actif");   // la poignée se place désormais par transform (voir base.css)
    if (typeof win.ResizeObserver === "function") {
      new win.ResizeObserver((entrees) => { largeur = entrees[0].contentRect.width; poser(affichee); }).observe(feuille);
    }

    let manuel = false;
    const prendre = () => { manuel = true; ba.classList.add("ba-manuel"); };
    range.addEventListener("pointerdown", prendre);
    range.addEventListener("keydown", prendre);
    // À la main : pas de lissage, le curseur suit le doigt ou la souris.
    range.addEventListener("input", () => { prendre(); poser(Number(range.value)); });
    if (reduit) { poser(50); continue; }

    // Bas de la feuille en haut de page (indépendant du défilement au chargement).
    const r0 = feuille.getBoundingClientRect();
    let basInitial = r0.bottom + win.scrollY;
    const cibleDe = (r) => positionDepuisDefilement(r.top, r.height, win.innerHeight, basInitial);

    let tourne = false, tPrec = null;
    const image = (t) => {
      if (manuel) { tourne = false; return; }
      const r = feuille.getBoundingClientRect();          // seule lecture de l'image, avant les écritures
      const dt = tPrec === null ? IMAGE_MS : t - tPrec;
      tPrec = t;
      const cible = cibleDe(r);
      poser(lisser(affichee, cible, dt));
      if (affichee !== cible) win.requestAnimationFrame(image);
      else { tourne = false; tPrec = null; }             // cible atteinte : la boucle s'arrête
    };
    const relancer = () => {
      if (tourne || manuel) return;
      tourne = true;
      win.requestAnimationFrame(image);
    };
    win.addEventListener("scroll", relancer, { passive: true });
    win.addEventListener("resize", () => {
      basInitial = feuille.getBoundingClientRect().bottom + win.scrollY;
      relancer();
    }, { passive: true });
    poser(cibleDe(r0));                                   // premier affichage : sans animation
  }
}

if (typeof document !== "undefined") brancher();
