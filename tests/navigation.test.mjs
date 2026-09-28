import { test } from "node:test";
import assert from "node:assert/strict";
import { basculer } from "../assets/js/navigation.js";
import { megaMenu } from "../outils/corps/mega-menu.mjs";

test("basculer : clic ouvre / ferme, Échap ferme toujours", () => {
  assert.equal(basculer(false), true);
  assert.equal(basculer(true), false);
  assert.equal(basculer(true, "Escape"), false);
  assert.equal(basculer(false, "Escape"), false);
});

test("méga-menu enseignants : 10 fonctionnalités, badges conformes", () => {
  const html = megaMenu("enseignants");
  assert.equal((html.match(/class="mi"/g) ?? []).length, 10);
  assert.equal((html.match(/tg pay/g) ?? []).length, 3);
  assert.equal((html.match(/tg free/g) ?? []).length, 7);
  assert.ok(html.includes("Import des élèves par photo <span class=\"tg free\">Gratuit</span>"));
});

test("méga-menu : liens vers la page Fonctionnalités de l'espace", () => {
  assert.ok(megaMenu("ecoles").includes('href="/ecoles/fonctionnalites/"'));
  assert.ok(!megaMenu("ecoles").includes('href="/enseignants/'));
  const parents = megaMenu("parents-enfants");
  assert.equal((parents.match(/class="mi"/g) ?? []).length, 4);
  assert.ok(parents.includes('href="/parents-enfants/fonctionnalites/"'));
});
