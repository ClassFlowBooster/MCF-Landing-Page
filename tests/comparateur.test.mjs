import { test } from "node:test";
import assert from "node:assert/strict";
import { position, CYCLE } from "../assets/js/comparateur.js";

test("le curseur part de l'original, glisse vers la gauche, puis revient", () => {
  assert.equal(position(0), 100);                 // d'abord la copie d'origine
  assert.equal(position(999), 100);
  assert.ok(position(2100) < 100 && position(2100) > 3);
  assert.equal(position(4000), 3);                // pause sur la copie adaptée
  assert.ok(position(6400) > 3);                  // retour vers la droite
  assert.equal(position(CYCLE), 100);             // et ça recommence
});

test("le curseur ne va jamais vers la droite pendant l'aller", () => {
  for (let t = 1000; t < 3200; t += 50) assert.ok(position(t + 50) <= position(t));
});
