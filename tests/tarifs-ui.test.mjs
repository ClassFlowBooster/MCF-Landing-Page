import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { texteEcole, etatInitial, positionCurseur, enseignantsCurseur, largeursPaliers, CRANS } from "../assets/js/tarifs-ui.js";
import { indexPalier } from "../assets/js/tarifs.js";

test("état par défaut : engagement et prix au mois", () => {
  assert.deepEqual(etatInitial(), { engagement: true, parAn: false });
});

test("texteEcole 5 enseignants, engagement, au mois (affichage par défaut)", () => {
  const t = texteEcole(5, true, false);
  assert.equal(t.badge, "Engagement 2 ans · −26 % la 1re année");
  assert.equal(t.lic, "5 enseignants");
  assert.equal(t.old, "13,49 €");
  assert.equal(t.pu, "9,99 €");
  assert.equal(t.unite, "TTC / enseignant / mois, 1re année");
  assert.equal(t.tot, "49,95 € TTC / mois");
  assert.equal(t.ht, "41,63 € / mois");
  assert.match(t.fine, /1re année : 9,99 € TTC par enseignant\. 2e année : 13,49 € TTC par enseignant, soit 67,46 € \/mois TTC/);
});

test("texteEcole 12 enseignants sans engagement, à l'an", () => {
  const t = texteEcole(12, false, true);
  assert.equal(t.badge, "Remise volume · −19 %");
  assert.equal(t.old, "179,88 €");
  assert.equal(t.pu, "145,70 €");
  assert.equal(t.unite, "TTC / enseignant / an");
  assert.equal(t.tot, "1 748,43 € TTC / an");
  assert.equal(t.ht, "1 457,03 € / an");
  assert.match(t.fine, /jusqu’à 9,99 € TTC\.$/);
});

test("texteEcole 1 enseignant sans engagement : pas de badge ni de barré", () => {
  const t = texteEcole(1, false, false);
  assert.equal(t.badge, null);
  assert.equal(t.old, "");
  assert.equal(t.lic, "1 enseignant");
});

test("texteEcole 25 enseignants engagé : pas de badge ni de barré", () => {
  const t = texteEcole(25, true, false);
  assert.equal(t.badge, null);
  assert.equal(t.old, "");
  assert.equal(t.pu, "9,99 €");
  assert.equal(t.tot, "249,75 € TTC / mois");
});

test("texteEcole : plus aucun « HT » hors du montant HT", () => {
  for (const n of [1, 5, 12, 20, 40]) for (const eng of [true, false]) for (const an of [true, false]) {
    const t = texteEcole(n, eng, an);
    for (const [k, v] of Object.entries(t)) if (typeof v === "string") assert.ok(!/\bHT\b/.test(v), `${n} ${eng} ${an} ${k} : ${v}`);
  }
});

test("curseur école : les repères 1, 5, 10, 15, 20, 40 tombent sur les limites des cinq paliers", () => {
  assert.deepEqual(CRANS, [[1, 0], [5, 20], [10, 40], [15, 60], [20, 80], [40, 100]]);
  for (const [n, p] of CRANS) assert.equal(positionCurseur(n), p, `${n} enseignants`);
});

test("curseur école : chaque nombre d'enseignants a sa position, et le palier allumé est celui sous le curseur", () => {
  let avant = -1;
  for (let n = 1; n <= 40; n++) {
    const p = positionCurseur(n);
    assert.ok(Number.isInteger(p) && p > avant && p <= 100, `${n} → ${p}`);
    assert.equal(enseignantsCurseur(p), n, `aller-retour ${n}`);
    // Le curseur est au-dessus de la pastille allumée, à 2 % au moins d'une pastille voisine.
    const debut = largeursPaliers().slice(0, indexPalier(n)).reduce((a, b) => a + b, 0);
    const fin = debut + largeursPaliers()[indexPalier(n)];
    assert.ok((debut === 0 || p >= debut + 2) && (fin === 100 || p <= fin - 2), `${n} enseignants (${p} %) hors de la pastille ${indexPalier(n)} [${debut} ; ${fin}]`);
    avant = p;
  }
});

test("curseur école : toute position du curseur donne un nombre entier de 1 à 40", () => {
  for (let p = 0; p <= 100; p++) {
    const n = enseignantsCurseur(p);
    assert.ok(Number.isInteger(n) && n >= 1 && n <= 40, `${p} → ${n}`);
    assert.ok(Math.abs(positionCurseur(n) - p) <= 2.5, `${p} → ${n} : la position la plus proche`);
  }
});

// Fausse page du calculateur école : compte les écritures dans le DOM.
function fauxCalculateur() {
  const ecritures = []; let rafs = [];
  const el = (id) => new Proxy({ id, ecouteurs: {}, classList: { toggle() {} }, dataset: {}, value: "5",
    addEventListener(t, f) { (this.ecouteurs[t] ??= []).push(f); }, setAttribute(k, v) { ecritures.push(`${id}@${k}`); } }, {
    set(o, k, v) { if (["textContent", "innerHTML", "hidden"].includes(k)) ecritures.push(`${id}.${k}`); o[k] = v; return true; },
  });
  const ids = {}; for (const id of ["eR", "eN", "eLic", "eBadge", "eOld", "ePu", "eTotLab", "eTot", "eHt", "eFine", "ePlus"]) ids[id] = el(id);
  const bouton = (v, on) => ({ dataset: { v }, classList: { toggle() {} }, setAttribute() {} , on });
  const racine = { dataset: { tarifs: "ecoles" },
    querySelector: (s) => (s === ".dur .on" ? bouton("eng") : s === ".seg .on" ? bouton("m") : { addEventListener() {}, querySelectorAll: () => [] }) };
  const doc = { querySelector: () => racine, getElementById: (id) => ids[id], querySelectorAll: () => [] };
  const win = { requestAnimationFrame: (f) => rafs.push(f) };
  return { doc, win, ids, ecritures, image: () => { const l = rafs; rafs = []; l.forEach((f) => f(0)); return l.length; } };
}

test("curseur école : un seul redessin par image, et rien n'est réécrit à l'identique", async () => {
  const { brancher } = await import("../assets/js/tarifs-ui.js");
  const c = fauxCalculateur();
  brancher(c.doc, c.win);
  assert.ok(c.ecritures.length > 0, "premier dessin immédiat");
  c.ecritures.length = 0;
  for (let n = 6; n <= 25; n++) { c.ids.eR.value = String(positionCurseur(n)); c.ids.eR.ecouteurs.input.forEach((f) => f()); }
  assert.equal(c.ecritures.length, 0, "aucune écriture pendant les événements");
  assert.equal(c.image(), 1, "20 mouvements du curseur → un seul redessin");
  assert.equal(c.ids.eN.textContent, 25, "dessine la dernière valeur");
  const apres = c.ecritures.length;
  assert.ok(apres > 0 && apres <= 13, `${apres} écritures`);
  c.ecritures.length = 0;
  c.ids.eR.ecouteurs.input.forEach((f) => f());
  c.image();
  assert.equal(c.ecritures.length, 0, "même valeur : aucune écriture");
});

test("curseur école : les flèches du clavier changent le nombre d'enseignants de 1", async () => {
  const { brancher } = await import("../assets/js/tarifs-ui.js");
  const c = fauxCalculateur();
  c.ids.eR.value = String(positionCurseur(5));
  brancher(c.doc, c.win);
  const touche = (key) => { const e = { key, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } }; c.ids.eR.ecouteurs.keydown.forEach((f) => f(e)); c.image(); return e; };
  assert.ok(touche("ArrowRight").defaultPrevented);
  assert.equal(c.ids.eN.textContent, 6);
  assert.equal(Number(c.ids.eR.value), positionCurseur(6));
  touche("ArrowLeft"); touche("ArrowDown");
  assert.equal(c.ids.eN.textContent, 4);
  touche("ArrowUp");
  assert.equal(c.ids.eN.textContent, 5);
  c.ids.eR.value = "0"; c.image(); touche("ArrowLeft");
  assert.equal(c.ids.eN.textContent, 1, "ne descend pas sous 1");
  c.ids.eR.value = "100"; touche("ArrowRight");
  assert.equal(c.ids.eN.textContent, 40, "ne monte pas au-dessus de 40");
  assert.equal(touche("Home").defaultPrevented, false, "les autres touches gardent leur comportement");
});

test("curseur école : la page générée place les graduations et le curseur sur la même échelle", () => {
  const html = readFileSync("ecoles/tarifs/index.html", "utf8");
  assert.match(html, new RegExp(`<input type="range" id="eR" min="0" max="100" value="${positionCurseur(5)}"`));
  for (const [n, p] of CRANS) assert.ok(html.includes(`<span style="--p:${p}">${n}</span>`), `graduation ${n}`);
  assert.ok(html.includes(`<div class="paliers" id="ePals" style="grid-template-columns:${largeursPaliers().map((l) => `${l}fr`).join(" ")}">`));
  assert.equal(largeursPaliers().length, 5);
  assert.equal(largeursPaliers().reduce((a, b) => a + b, 0), 100);
});
