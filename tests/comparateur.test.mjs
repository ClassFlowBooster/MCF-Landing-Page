import { test } from "node:test";
import assert from "node:assert/strict";
import { positionDepuisDefilement, DEPART } from "../assets/js/comparateur.js";

// haut : bord haut de la feuille dans la fenêtre (px) ; la feuille fait 400 px,
// la fenêtre 800 px. 100 = tout l'original, 0 = toute la version adaptée.
const F = 400, H = 800;

test("feuille encore basse dans la fenêtre : l'original ou presque", () => {
  assert.equal(DEPART, 85);
  assert.equal(positionDepuisDefilement(400, F, H), 85);   // bas de la feuille au bas de la fenêtre
  assert.equal(positionDepuisDefilement(900, F, H), 85);   // feuille encore sous la fenêtre
});

test("bas de la feuille au milieu de la fenêtre : version adaptée entièrement visible", () => {
  assert.equal(positionDepuisDefilement(0, F, H), 0);
  assert.equal(positionDepuisDefilement(-600, F, H), 0);   // feuille sortie de l'écran par le haut
});

test("entre les deux : la version adaptée se révèle au fil du défilement", () => {
  assert.equal(positionDepuisDefilement(200, F, H), 42.5); // à mi-chemin
  let avant = 100;
  for (let haut = 500; haut >= -100; haut -= 10) {
    const p = positionDepuisDefilement(haut, F, H);
    assert.ok(p <= avant, `recule à ${haut}`);             // en descendant, jamais de retour vers l'original
    avant = p;
  }
});

test("toujours borné entre 0 et 100, même avec une fenêtre très petite ou des valeurs absurdes", () => {
  for (const [h, f, fen] of [[0, 400, 100], [50, 400, 1], [-1e6, 400, 800], [1e6, 400, 800], [10, 0, 0], [NaN, 400, 800]]) {
    const p = positionDepuisDefilement(h, f, fen);
    assert.ok(Number.isFinite(p) && p >= 0 && p <= 100, `${h} ${f} ${fen} → ${p}`);
  }
});

test("grand écran : feuille déjà haute au chargement, on part tout de même de l'original", () => {
  // Au chargement, le bas de la feuille est à 560 px sur 1000 : juste sous le milieu.
  const basInitial = 560;
  assert.equal(positionDepuisDefilement(basInitial - F, F, 1000, basInitial), 85);
  assert.equal(positionDepuisDefilement(500 - F - 250, F, 1000, basInitial), 0);
  const milieu = positionDepuisDefilement(basInitial - F - 150, F, 1000, basInitial);
  assert.ok(milieu > 0 && milieu < 85);
});
