import { test } from "node:test";
import assert from "node:assert/strict";
import { positionDepuisDefilement, lisser, DEPART } from "../assets/js/comparateur.js";

// haut : bord haut de la feuille dans la fenêtre (px). 100 = tout l'original,
// 0 = toute la version adaptée. Fenêtre de 1000 px, feuille de 240 px :
// départ quand le bas de la feuille est au bas de l'écran (haut = 760),
// arrivée quand le haut de la feuille est à 20 % de l'écran (haut = 200).
const F = 240, H = 1000;

test("départ : bas de la feuille au bas de l'écran, ou feuille encore plus bas → l'original ou presque", () => {
  assert.equal(DEPART, 85);
  assert.equal(positionDepuisDefilement(760, F, H), 85);
  assert.equal(positionDepuisDefilement(2000, F, H), 85);
});

test("arrivée : haut de la feuille à 20 % de l'écran → version adaptée entière", () => {
  assert.equal(positionDepuisDefilement(200, F, H), 0);
  assert.equal(positionDepuisDefilement(-900, F, H), 0);   // feuille sortie de l'écran par le haut
});

test("milieu de la course, et jamais de retour vers l'original en descendant", () => {
  assert.equal(positionDepuisDefilement(480, F, H), 42.5);
  let avant = 100;
  for (let haut = 900; haut >= -200; haut -= 7) {
    const p = positionDepuisDefilement(haut, F, H);
    assert.ok(p <= avant, `recule à ${haut}`);
    avant = p;
  }
});

test("au moins une demi-hauteur d'écran de course, même avec une grande feuille", () => {
  // Feuille de 500 px : haut à 20 % → bas à 700, soit 300 px de course seulement ; on en garde 500.
  assert.equal(positionDepuisDefilement(500, 500, H), 85);  // bas au bas de l'écran
  assert.ok(positionDepuisDefilement(200, 500, H) > 0);    // pas encore fini à 20 %
  assert.equal(positionDepuisDefilement(0, 500, H), 0);    // fini après une demi-hauteur
});

test("grand écran : feuille déjà haute au chargement, on part tout de même de l'original", () => {
  const basInitial = 700;                                   // bas de la feuille au chargement
  assert.equal(positionDepuisDefilement(basInitial - 400, 400, H, basInitial), 85);
  const p = positionDepuisDefilement(0, 400, H, basInitial);
  assert.ok(p > 0 && p < 85, `${p}`);
  assert.equal(positionDepuisDefilement(-200, 400, H, basInitial), 0);  // demi-hauteur de course
});

test("toujours borné entre 0 et 100 : fenêtre minuscule, hauteur nulle, valeurs absurdes", () => {
  for (const [h, f, fen] of [[0, 400, 100], [50, 400, 1], [-1e6, 400, 800], [1e6, 400, 800], [10, 0, 0], [NaN, 400, 800], [10, 400, -5]]) {
    const p = positionDepuisDefilement(h, f, fen);
    assert.ok(Number.isFinite(p) && p >= 0 && p <= 100, `${h} ${f} ${fen} → ${p}`);
  }
});

test("lisser : converge vers la cible sans jamais la dépasser", () => {
  for (const [depart, cible] of [[85, 0], [0, 85], [40, 41]]) {
    let p = depart;
    for (let i = 0; i < 200; i++) {
      const suivant = lisser(p, cible, 16.67);
      assert.ok(Math.abs(cible - suivant) <= Math.abs(cible - p), "se rapproche");
      assert.ok((cible - suivant) * (cible - depart) >= 0, "ne dépasse pas");
      p = suivant;
    }
    assert.equal(p, cible, "finit exactement sur la cible");
  }
});

test("lisser : même résultat à 60 et à 120 images par seconde sur la même durée", () => {
  let a = 85, b = 85;
  for (let i = 0; i < 12; i++) a = lisser(a, 0, 1000 / 60);   // 200 ms à 60 i/s
  for (let i = 0; i < 24; i++) b = lisser(b, 0, 1000 / 120);  // 200 ms à 120 i/s
  assert.ok(Math.abs(a - b) <= 0.5, `${a} / ${b}`);
});

test("lisser : dt nul, négatif ou énorme", () => {
  assert.equal(lisser(50, 10, 0), 50);           // rien ne s'est écoulé
  assert.equal(lisser(50, 10, -5), 50);
  assert.equal(lisser(50, 10, 5000), 10);        // onglet revenu au premier plan : on pose la cible
  assert.equal(lisser(50, 10, NaN), 10);
  assert.equal(lisser(10.02, 10, 16.67), 10);    // écart sous 0,05 % : on pose la cible
});
