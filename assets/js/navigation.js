// Barre du haut : méga-menu, pastille d'espace, burger. Échap ferme tout.
// Aussi : filtres de la page Fonctionnalités.
export function basculer(ouvert, touche) {
  if (touche === "Escape") return false;
  return !ouvert;
}

/**
 * Relie un bouton à son panneau (méga-menu, pastille d'espace, burger).
 * Le panneau peut être n'importe où dans la page (le menu mobile est un frère
 * de la barre) : le bouton et le panneau forment ensemble la zone du menu.
 * retourFocus : en quittant le menu au clavier, le focus revient sur le bouton.
 */
export function lier(bouton, panneau, { survol = false, retourFocus = false, doc = document } = {}) {
  if (!bouton || !panneau) return;
  const regler = (ouvert) => { bouton.setAttribute("aria-expanded", String(ouvert)); panneau.hidden = !ouvert; };
  const ouvert = () => bouton.getAttribute("aria-expanded") === "true";
  const dansLeMenu = (x) => bouton.contains(x) || panneau.contains(x);
  bouton.addEventListener("click", (e) => {
    e.stopPropagation();
    // Souris sur un menu qui s'ouvre au survol : le clic ne referme pas.
    if (survol && e.detail > 0) regler(true);
    else regler(basculer(ouvert()));
  });
  doc.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !ouvert()) return;
    regler(basculer(true, e.key));
    bouton.focus();
  });
  doc.addEventListener("click", (e) => { if (!panneau.contains(e.target)) regler(false); });
  // Au clavier, quitter le menu par Tab le referme.
  const sortie = (e) => {
    if (!ouvert() || !e.relatedTarget || dansLeMenu(e.relatedTarget)) return;
    regler(false);
    if (retourFocus) bouton.focus();
  };
  bouton.addEventListener("focusout", sortie);
  panneau.addEventListener("focusout", sortie);
  const parent = bouton.parentElement;
  if (survol) {
    parent.addEventListener("mouseenter", () => regler(true));
    parent.addEventListener("mouseleave", () => regler(false));
  }
}

export function brancherFiltres(doc = document) {
  const f = doc.getElementById("flt");
  if (!f) return;
  f.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    for (const x of f.querySelectorAll("button")) {
      x.classList.toggle("on", x === b);
      x.setAttribute("aria-pressed", String(x === b));
    }
    const k = b.dataset.f;
    doc.querySelectorAll(".fc").forEach((c) => { c.hidden = !(k === "all" || c.dataset.k === k); });
    doc.querySelectorAll(".theme").forEach((t) => { t.hidden = ![...t.querySelectorAll(".fc")].some((c) => !c.hidden); });
  });
}

if (typeof document !== "undefined") {
  const survol = window.matchMedia("(hover: hover)").matches;
  lier(document.querySelector(".mega-bouton"), document.getElementById("mega"), { survol });
  lier(document.querySelector(".espace-choix .pill"), document.querySelector(".espace-menu"));
  lier(document.querySelector(".nav-burger"), document.getElementById("menuMobile"), { retourFocus: true });
  // Changer d'espace mémorise le nouveau choix (écran d'entrée).
  document.querySelectorAll(".espace-menu a[data-espace], .mobile-menu a[data-espace]").forEach((a) => a.addEventListener("click", () => {
    try { localStorage.setItem("cf-espace", a.dataset.espace); } catch { /* stockage bloqué : sans effet */ }
  }));
  brancherFiltres();
}
