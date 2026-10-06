// Pages Tarifs : pastilles de durée, bascule mois / an, calculateur école.
// Les fonctions texte*() et *Html() sont pures (testées, et utilisées par le
// générateur pour écrire les valeurs par défaut dans le HTML) ; brancher()
// relie le DOM.
import { offreEcole, offreEnseignant, offreAdapter, parAn, euros, indexPalier, montantHt, remiseEnseignant, remiseAdapter } from "./tarifs.js";

/**
 * Échelle du curseur école : [enseignants, position en %]. Chaque palier occupe
 * un cinquième du curseur, comme les pastilles et les graduations dessous ;
 * entre deux repères, la position est linéaire et toujours entière.
 */
export const CRANS = [[1, 0], [5, 20], [10, 40], [15, 60], [20, 80], [40, 100]];

/** Position (0 à 100) du curseur pour n enseignants. */
export function positionCurseur(n) {
  const i = CRANS.findIndex(([m], k) => k > 0 && n <= m);
  const [[n0, p0], [n1, p1]] = [CRANS[i - 1], CRANS[i]];
  return p0 + ((n - n0) * (p1 - p0)) / (n1 - n0);
}

/**
 * Largeur (en % du curseur) de la pastille de chaque palier : une limite tombe à
 * mi-chemin entre le dernier nombre d'un palier et le premier du suivant, pour
 * que le curseur soit toujours au-dessus de la pastille allumée.
 */
export function largeursPaliers() {
  const limites = [0, ...CRANS.slice(1, -1).map(([n, p]) => (positionCurseur(n - 1) + p) / 2), 100];
  return limites.slice(1).map((l, i) => l - limites[i]);
}

/** Nombre d'enseignants (le plus proche) pour une position du curseur. */
export function enseignantsCurseur(p) {
  const q = Math.min(Math.max(p, 0), 100);
  const i = CRANS.findIndex(([, m], k) => k > 0 && q <= m);
  const [[n0, p0], [n1, p1]] = [CRANS[i - 1], CRANS[i]];
  return Math.round(n0 + ((q - p0) * (n1 - n0)) / (p1 - p0));
}

export const etatInitial = () => ({ engagement: true, parAn: false });

/** Textes des badges de remise, calculés à partir des prix (tarifs.js). */
export const badgeEnseignant = () => `Avec engagement · −${remiseEnseignant()} %`;
export const badgeAdapter = (formule) => `−${remiseAdapter(formule)} % les 3 premiers mois`;

export function texteEcole(n, engagement, annuel) {
  const o = offreEcole(n, engagement);
  const mul = annuel ? 12 : 1;
  const base = annuel ? "/an TTC" : "/mois TTC";
  return {
    badge: o.remisePct > 0
      ? (engagement ? `Engagement 2 ans · −${o.remisePct} % la 1re année` : `Remise volume · −${o.remisePct} %`)
      : null,
    lic: `${n} enseignant${n > 1 ? "s" : ""}`,
    // En grand : le prix par enseignant (barré : le prix de référence par enseignant).
    old: o.barreMensuel ? euros((o.barreMensuel / n) * mul) : "",
    pu: euros(o.prixUnitaire * mul),
    unite: `TTC / enseignant / ${annuel ? "an" : "mois"}${engagement ? ", 1re année" : ""}`,
    // En petit : le total pour l'établissement (TTC), et son montant HT.
    tot: `${euros(o.totalMensuel * mul)} TTC / ${annuel ? "an" : "mois"}`,
    // Tous les prix sont affichés TTC ; le montant HT suit la même conversion que le devis.
    ht: `${euros(montantHt(o.totalMensuel * mul))} / ${annuel ? "an" : "mois"}`,
    fine: engagement
      ? `Engagement de 24 mois. 1re année : 9,99 € TTC par enseignant. 2e année : ${euros(o.anneeDeux / n)} TTC par enseignant, soit ${euros(o.anneeDeux * mul)} ${base} (prix selon vos paliers). Une seule facture, au nom de l’établissement.`
      : "Sans engagement, résiliable à tout moment. Le prix par enseignant baisse dès 5 enseignants, jusqu’à 9,99 € TTC.",
    palier: indexPalier(n),
  };
}

function texteOffre(o, moisPromo, annuel) {
  const unite = annuel ? "/an TTC" : "/mois TTC";
  if (!o.barre) return { badge: false, old: "", prix: euros(annuel ? parAn(o.prix) : o.prix), unite, astre: false, fine: "Sans engagement, résiliable à tout moment." };
  return {
    badge: true,
    old: euros(annuel ? parAn(o.barre) : o.barre),
    prix: euros(annuel ? parAn(o.barre, moisPromo, o.prix) : o.prix),
    unite,
    astre: true,
    fine: o.renvoi,
  };
}

export const texteProf = (engagement, annuel) => texteOffre(offreEnseignant(engagement), 6, annuel);
export const texteAdapter = (formule, engagement, annuel) => texteOffre(offreAdapter(formule, engagement), 3, annuel);

/** À l'affichage, les milliers sont séparés par une espace fine insécable. */
export function insecables(t) {
  return t.replace(/(\d) (\d{3})\b/g, "$1" + String.fromCharCode(0x202f) + "$2");
}

/** « 1re », « 2e » en exposant. */
export function exposants(t) {
  return t.replace(/\b1re\b/g, "1<sup>re</sup>").replace(/\b2e\b/g, "2<sup>e</sup>");
}

export function prixHtml(t) {
  return `${insecables(t.prix)}${t.astre ? '<sup class="astre">*</sup>' : ""}<small>${t.unite}</small>`;
}

export function renvoiHtml(t) {
  return t.astre ? `<b>*</b> ${t.fine}` : t.fine;
}

export function prixEcoleHtml(t) {
  return `${insecables(t.pu)}<small> ${exposants(t.unite)}</small>`;
}

/** Lit l'état d'un groupe de pastilles / d'une bascule. */
function valeur(racine, sel) {
  return racine.querySelector(`${sel} .on`)?.dataset.v;
}

function groupe(racine, sel, rappel) {
  const g = racine.querySelector(sel);
  g?.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    for (const x of g.querySelectorAll("button")) {
      x.classList.toggle("on", x === b);
      x.setAttribute("aria-pressed", String(x === b));
    }
    rappel();
  });
}

export function brancher(doc = document, win = typeof window !== "undefined" ? window : undefined) {
  const r = doc.querySelector("[data-tarifs]");
  if (!r) return;
  const etat = () => ({ engagement: valeur(r, ".dur") === "eng", parAn: valeur(r, ".seg") === "a" });
  const $ = (id) => doc.getElementById(id);
  // N'écrit dans le DOM que si la valeur change.
  const deja = new Map();
  const ecrire = (id, prop, v) => {
    const k = `${id}.${prop}`;
    if (deja.get(k) === v) return;
    deja.set(k, v);
    const el = $(id);
    if (!el) return;
    if (prop === "aria-valuetext") el.setAttribute(prop, v); else el[prop] = v;
  };
  let palier = null;
  const dessiner = () => {
    const { engagement, parAn: annuel } = etat();
    const type = r.dataset.tarifs;
    if (type === "enseignants") {
      const t = texteProf(engagement, annuel);
      ecrire("pBadge", "hidden", !t.badge); ecrire("pOld", "textContent", insecables(t.old)); ecrire("pPrice", "innerHTML", prixHtml(t)); ecrire("pFine", "innerHTML", renvoiHtml(t));
    }
    if (type === "parents-enfants") {
      for (const [f, p] of [["essentiel", "e"], ["illimite", "i"]]) {
        const t = texteAdapter(f, engagement, annuel);
        ecrire(`${p}Badge`, "hidden", !t.badge); ecrire(`${p}Old`, "textContent", insecables(t.old)); ecrire(`${p}Price`, "innerHTML", prixHtml(t)); ecrire(`${p}Fine`, "innerHTML", renvoiHtml(t));
      }
    }
    if (type === "ecoles") {
      const n = enseignantsCurseur(Number($("eR").value));
      // Le curseur se cale sur la position exacte du nombre affiché.
      if (Number($("eR").value) !== positionCurseur(n)) $("eR").value = String(positionCurseur(n));
      const t = texteEcole(n, engagement, annuel);
      ecrire("eN", "textContent", n); ecrire("eLic", "textContent", t.lic);
      ecrire("eBadge", "hidden", !t.badge); ecrire("eBadge", "textContent", t.badge ?? "");
      ecrire("eOld", "textContent", insecables(t.old)); ecrire("ePu", "innerHTML", prixEcoleHtml(t));
      ecrire("eTotLab", "textContent", `Total · ${t.lic}`); ecrire("eTot", "textContent", insecables(t.tot)); ecrire("eHt", "textContent", insecables(t.ht)); ecrire("eFine", "innerHTML", exposants(insecables(t.fine)));
      if (t.palier !== palier) { palier = t.palier; doc.querySelectorAll("#ePals .pal").forEach((p, i) => p.classList.toggle("on", i === t.palier)); }
      ecrire("eR", "aria-valuetext", t.lic);
      ecrire("ePlus", "hidden", n < 40);
    }
  };
  // Un seul redessin par image, quel que soit le nombre d'événements (curseur glissé).
  let prevu = false;
  const planifier = () => {
    if (prevu) return;
    if (!win?.requestAnimationFrame) { dessiner(); return; }
    prevu = true;
    win.requestAnimationFrame(() => { prevu = false; dessiner(); });
  };
  groupe(r, ".dur", planifier);
  groupe(r, ".seg", planifier);
  doc.getElementById("eR")?.addEventListener("input", planifier);
  // Les flèches ajoutent ou retirent un enseignant, quelle que soit la largeur du palier.
  doc.getElementById("eR")?.addEventListener("keydown", (e) => {
    const pas = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
    if (!pas) return;
    e.preventDefault();
    const curseur = doc.getElementById("eR");
    const n = Math.min(Math.max(enseignantsCurseur(Number(curseur.value)) + pas, CRANS[0][0]), CRANS.at(-1)[0]);
    curseur.value = String(positionCurseur(n));
    planifier();
  });
  dessiner();
}

if (typeof document !== "undefined") brancher();
