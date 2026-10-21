import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { lireSitemap, verifierDonneesStructurees, liensInternes, empreinte } from "../outils/controle-en-ligne.mjs";

test("contrôle : le sitemap du dépôt est valide", () => {
  const { adresses, problemes } = lireSitemap(readFileSync("sitemap.xml", "utf8"));
  assert.deepEqual(problemes, []);
  assert.ok(adresses.includes("https://myclassflow.fr/"));
});

test("contrôle : un sitemap tronqué ou une adresse étrangère sont signalés", () => {
  const { problemes } = lireSitemap('<?xml version="1.0"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://ailleurs.fr/</loc></url>');
  assert.ok(problemes.some((p) => p.includes("non fermé")));
  assert.ok(problemes.some((p) => p.includes("adresse invalide")));
});

test("contrôle : données structurées illisibles ou sans @context", () => {
  assert.deepEqual(verifierDonneesStructurees('<script type="application/ld+json">{"@context":"https://schema.org"}</script>'), []);
  assert.equal(verifierDonneesStructurees('<script type="application/ld+json">{oups</script>').length, 1);
  assert.equal(verifierDonneesStructurees('<script type="application/ld+json">{"@type":"Thing"}</script>').length, 1);
});

test("contrôle : liens et fichiers internes, sans doublon ni ancre", () => {
  assert.deepEqual(liensInternes('<a href="/a/">x</a><img src="/i.png"><a href="/a/#b">y</a><a href="https://x.fr/">z</a>'), ["/a/", "/i.png"]);
});

test("contrôle : l'empreinte ne dépend que de la liste des problèmes, pas de leur ordre", () => {
  assert.equal(empreinte(["b", "a"]), empreinte(["a", "b"]));
  assert.notEqual(empreinte(["a", "b"]), empreinte(["a", "c"]));
});
