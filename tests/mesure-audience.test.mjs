import { test } from "node:test";
import assert from "node:assert/strict";
import { balise } from "../outils/mesure-audience.mjs";

test("sans jeton, aucun script de mesure", () => {
  assert.equal(balise(""), "");
});

test("avec jeton, le script Cloudflare porte le jeton nettoyé", () => {
  const b = balise("abc123\"><x");
  assert.match(b, /static\.cloudflareinsights\.com\/beacon\.min\.js/);
  assert.match(b, /"token": "abc123x"/);
  assert.doesNotMatch(b, /"></);
});
