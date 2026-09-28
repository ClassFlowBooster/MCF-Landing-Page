import { test } from "node:test";
import assert from "node:assert/strict";
import { palierEcole, indexPalier, offreEcole, offreEnseignant, offreAdapter, parAn, ttc, euros } from "../assets/js/tarifs.js";

const arrondi = (v) => Math.round(v * 100) / 100;

test("palierEcole : −10 % par tranche de 5, plancher 9,99", () => {
  assert.equal(arrondi(palierEcole(1)), 14.99);
  assert.equal(arrondi(palierEcole(4)), 14.99);
  assert.equal(arrondi(palierEcole(5)), 13.49);
  assert.equal(arrondi(palierEcole(9)), 13.49);
  assert.equal(arrondi(palierEcole(10)), 12.14);
  assert.equal(arrondi(palierEcole(15)), 10.93);
  assert.equal(arrondi(palierEcole(19)), 10.93);
  assert.equal(palierEcole(20), 9.99);
  assert.equal(palierEcole(40), 9.99);
});

test("indexPalier", () => {
  assert.deepEqual([1, 4, 5, 9, 10, 14, 15, 19, 20, 40].map(indexPalier), [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]);
});

test("offreEcole sans engagement : barré = plein tarif", () => {
  const o = offreEcole(12, false);
  assert.equal(arrondi(o.totalMensuel), 145.70);
  assert.equal(arrondi(o.barreMensuel), 179.88);
  assert.equal(o.remisePct, 19);
  assert.equal(o.anneeDeux, null);
});

test("offreEcole sans engagement, 1 à 4 enseignants : ni barré ni remise", () => {
  const o = offreEcole(4, false);
  assert.equal(arrondi(o.totalMensuel), 59.96);
  assert.equal(o.barreMensuel, null);
  assert.equal(o.remisePct, 0);
});

test("offreEcole engagement 2 ans : 9,99 la 1re année, barré = palier", () => {
  const cinq = offreEcole(5, true);
  assert.equal(arrondi(cinq.totalMensuel), 49.95);
  assert.equal(arrondi(cinq.barreMensuel), 67.46);
  assert.equal(cinq.remisePct, 26);
  assert.equal(arrondi(cinq.anneeDeux), 67.46);
  const douze = offreEcole(12, true);
  assert.equal(arrondi(douze.totalMensuel), 119.88);
  assert.equal(arrondi(douze.barreMensuel), 145.70);
  assert.equal(douze.remisePct, 18);
});

test("offreEcole à 20 enseignants et plus : ni barré ni remise, avec ou sans engagement", () => {
  for (const eng of [true, false]) {
    const o = offreEcole(22, eng);
    assert.equal(arrondi(o.totalMensuel), 219.78);
    if (eng) assert.equal(o.barreMensuel, null);
  }
  assert.equal(offreEcole(22, true).remisePct, 0);
});

test("offreEcole 1 enseignant engagé : remise réelle affichée", () => {
  const o = offreEcole(1, true);
  assert.equal(arrondi(o.totalMensuel), 9.99);
  assert.equal(arrondi(o.barreMensuel), 14.99);
  assert.equal(o.remisePct, 33);
});

test("offreEnseignant", () => {
  assert.deepEqual(offreEnseignant(true), { prix: 9.99, barre: 14.99, renvoi: "Pendant 6 mois avec un engagement d’un an, puis 14,99 €/mois TTC." });
  assert.deepEqual(offreEnseignant(false), { prix: 14.99, barre: null, renvoi: null });
});

test("offreAdapter : −50 % pendant 3 mois avec engagement 6 mois", () => {
  assert.deepEqual(offreAdapter("essentiel", true), { prix: 2.49, barre: 4.99, renvoi: "Pendant 3 mois avec un engagement de 6 mois, puis 4,99 €/mois TTC." });
  assert.deepEqual(offreAdapter("illimite", true), { prix: 4.99, barre: 9.99, renvoi: "Pendant 3 mois avec un engagement de 6 mois, puis 9,99 €/mois TTC." });
  assert.deepEqual(offreAdapter("essentiel", false), { prix: 4.99, barre: null, renvoi: null });
  assert.deepEqual(offreAdapter("illimite", false), { prix: 9.99, barre: null, renvoi: null });
});

test("parAn avec période promotionnelle", () => {
  assert.equal(arrondi(parAn(14.99, 6, 9.99)), 149.88);
  assert.equal(arrondi(parAn(9.99, 3, 4.99)), 104.88);
  assert.equal(arrondi(parAn(4.99, 3, 2.49)), 52.38);
  assert.equal(arrondi(parAn(14.99)), 179.88);
});

test("ttc et euros", () => {
  assert.equal(arrondi(ttc(49.95)), 59.94);
  assert.equal(euros(1966.99), "1 966,99 €");
  assert.equal(euros(9.99), "9,99 €");
});
