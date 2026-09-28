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
