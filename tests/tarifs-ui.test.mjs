import { test } from "node:test";
import assert from "node:assert/strict";
import { texteEcole, etatInitial } from "../assets/js/tarifs-ui.js";

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
  for (let n = 6; n <= 25; n++) { c.ids.eR.value = String(n); c.ids.eR.ecouteurs.input.forEach((f) => f()); }
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
