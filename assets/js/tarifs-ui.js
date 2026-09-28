// Pages Tarifs : pastilles de durée, bascule mois / an, calculateur école.
// Les fonctions texte*() et *Html() sont pures (testées, et utilisées par le
// générateur pour écrire les valeurs par défaut dans le HTML) ; brancher()
// relie le DOM.
import { offreEcole, offreEnseignant, offreAdapter, parAn, ttc, euros, indexPalier } from "./tarifs.js";

export const etatInitial = () => ({ engagement: true, parAn: false });

export function texteEcole(n, engagement, annuel) {
  const o = offreEcole(n, engagement);
  const mul = annuel ? 12 : 1;
  const base = annuel ? "/an HT" : "/mois HT";
  return {
    badge: o.remisePct > 0
      ? (engagement ? `Engagement 2 ans · −${o.remisePct} % la 1re année` : `Remise volume · −${o.remisePct} %`)
      : null,
    lic: `${n} enseignant${n > 1 ? "s" : ""}`,
    old: o.barreMensuel ? euros(o.barreMensuel * mul) : "",
    tot: euros(o.totalMensuel * mul),
    unite: engagement ? `${base}, 1re année` : base,
    pu: `${euros(o.prixUnitaire)} HT`,
    ttc: `${euros(ttc(o.totalMensuel) * mul)} / ${annuel ? "an" : "mois"}`,
    fine: engagement
      ? `Engagement de 24 mois. 1re année : 9,99 € HT par enseignant. 2e année : ${euros(o.anneeDeux / n)} HT par enseignant, soit ${euros(o.anneeDeux * mul)} ${base} (prix selon vos paliers). Une seule facture, au nom de l’établissement.`
      : "Sans engagement, résiliable à tout moment. Le prix par enseignant baisse dès 5 enseignants, jusqu’à 9,99 € HT.",
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

export function totalEcoleHtml(t) {
  return `${insecables(t.tot)}<small>${exposants(t.unite)}</small>`;
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

export function brancher(doc = document) {
  const r = doc.querySelector("[data-tarifs]");
  if (!r) return;
  const etat = () => ({ engagement: valeur(r, ".dur") === "eng", parAn: valeur(r, ".seg") === "a" });
  const $ = (id) => doc.getElementById(id);
  const dessiner = () => {
    const { engagement, parAn: annuel } = etat();
    const type = r.dataset.tarifs;
    if (type === "enseignants") {
      const t = texteProf(engagement, annuel);
      $("pBadge").hidden = !t.badge; $("pOld").textContent = insecables(t.old); $("pPrice").innerHTML = prixHtml(t); $("pFine").innerHTML = renvoiHtml(t);
    }
    if (type === "parents-enfants") {
      for (const [f, p] of [["essentiel", "e"], ["illimite", "i"]]) {
        const t = texteAdapter(f, engagement, annuel);
        $(`${p}Badge`).hidden = !t.badge; $(`${p}Old`).textContent = insecables(t.old); $(`${p}Price`).innerHTML = prixHtml(t); $(`${p}Fine`).innerHTML = renvoiHtml(t);
      }
    }
    if (type === "ecoles") {
      const n = Number($("eR").value);
      const t = texteEcole(n, engagement, annuel);
      $("eN").textContent = n; $("eLic").textContent = t.lic;
      $("eBadge").hidden = !t.badge; $("eBadge").textContent = t.badge ?? "";
      $("eOld").textContent = insecables(t.old); $("eTot").innerHTML = totalEcoleHtml(t);
      $("ePu").textContent = t.pu; $("eTtc").textContent = insecables(t.ttc); $("eFine").innerHTML = exposants(insecables(t.fine));
      doc.querySelectorAll("#ePals .pal").forEach((p, i) => p.classList.toggle("on", i === t.palier));
      $("eR").setAttribute("aria-valuetext", t.lic);
      if ($("ePlus")) $("ePlus").hidden = n < 40;
    }
  };
  groupe(r, ".dur", dessiner);
  groupe(r, ".seg", dessiner);
  doc.getElementById("eR")?.addEventListener("input", dessiner);
  dessiner();
}

if (typeof document !== "undefined") brancher();
