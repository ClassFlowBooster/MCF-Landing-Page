import { test } from "node:test";
import assert from "node:assert/strict";
import { texteEcole, etatInitial } from "../assets/js/tarifs-ui.js";

test("état par défaut : engagement et prix au mois", () => {
  assert.deepEqual(etatInitial(), { engagement: true, parAn: false });
});

test("texteEcole 5 enseignants, engagement, au mois (maquette)", () => {
  const t = texteEcole(5, true, false);
  assert.equal(t.badge, "Engagement 2 ans · −26 % la 1re année");
  assert.equal(t.lic, "5 enseignants");
  assert.equal(t.old, "67,46 €");
  assert.equal(t.tot, "49,95 €");
  assert.equal(t.unite, "/mois HT, 1re année");
  assert.equal(t.pu, "9,99 € HT");
  assert.equal(t.ttc, "59,94 € / mois");
  assert.match(t.fine, /2e année : 13,49 € HT par enseignant, soit 67,46 € \/mois HT/);
});

test("texteEcole 12 enseignants sans engagement, à l'an", () => {
  const t = texteEcole(12, false, true);
  assert.equal(t.badge, "Remise volume · −19 %");
  assert.equal(t.old, "2 158,56 €");
  assert.equal(t.tot, "1 748,43 €");
  assert.equal(t.unite, "/an HT");
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
  assert.equal(t.tot, "249,75 €");
});
