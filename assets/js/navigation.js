// Barre du haut : méga-menu, pastille d'espace, burger. Échap ferme tout.
// Aussi : filtres de la page Fonctionnalités.
export function basculer(ouvert, touche) {
  if (touche === "Escape") return false;
  return !ouvert;
}

function lier(bouton, panneau, { survol = false } = {}) {
  if (!bouton || !panneau) return;
  const regler = (ouvert) => { bouton.setAttribute("aria-expanded", String(ouvert)); panneau.hidden = !ouvert; };
  const ouvert = () => bouton.getAttribute("aria-expanded") === "true";
  bouton.addEventListener("click", (e) => {
    e.stopPropagation();
    // Souris sur un menu qui s'ouvre au survol : le clic ne referme pas.
    if (survol && e.detail > 0) regler(true);
    else regler(basculer(ouvert()));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !ouvert()) return;
    regler(basculer(true, e.key));
    bouton.focus();
  });
  document.addEventListener("click", (e) => { if (!panneau.contains(e.target)) regler(false); });
  // Au clavier, quitter le menu par Tab le referme.
  const parent = bouton.parentElement;
  if (parent.contains(panneau)) {
    parent.addEventListener("focusout", (e) => { if (e.relatedTarget && !parent.contains(e.relatedTarget)) regler(false); });
  }
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
  lier(document.querySelector(".nav-burger"), document.getElementById("menuMobile"));
  // Changer d'espace mémorise le nouveau choix (écran d'entrée).
  document.querySelectorAll(".espace-menu a[data-espace], .mobile-menu a[data-espace]").forEach((a) => a.addEventListener("click", () => {
    try { localStorage.setItem("cf-espace", a.dataset.espace); } catch { /* stockage bloqué : sans effet */ }
  }));
  brancherFiltres();
}
