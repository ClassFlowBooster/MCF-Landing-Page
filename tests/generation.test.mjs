import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { PAGES } from "../outils/pages.mjs";
import { page, ESPACES } from "../outils/gabarits.mjs";

test("chaque page a un titre, une description, un canonical et la barre de son espace", () => {
  for (const p of PAGES) {
    const html = page(p);
    assert.match(html, /<title>[^<]*ClassFlow[^<]*<\/title>/, p.chemin);
    assert.match(html, /<meta name="description" content="[^"]{50,}"/, p.chemin);
    assert.ok(html.includes(`<link rel="canonical" href="https://myclassflow.fr${p.chemin}"`), p.chemin);
    if (p.espace) assert.ok(html.includes(ESPACES[p.espace].libelle), p.chemin);
  }
});

test("le nom « Class Flow » en deux mots n'apparaît plus", () => {
  for (const p of PAGES) assert.ok(!page(p).includes("Class Flow "), p.chemin);
});

test("les fichiers générés sont à jour (lancer npm run generer)", () => {
  for (const p of PAGES) {
    const fichier = `.${p.chemin}index.html`;
    assert.ok(existsSync(fichier), `${fichier} absent`);
    // Fins de ligne normalisées : un clone Windows peut les écrire en CRLF.
    assert.equal(readFileSync(fichier, "utf8").replace(/\r\n/g, "\n"), page(p), `${fichier} n'est pas à jour`);
  }
});

// Pages des tâches suivantes, déjà liées par la barre du haut (provisoire).
const A_VENIR = ["/enseignants/telecharger/", "/ecoles/telecharger/", "/parents-enfants/telecharger/"];

test("tous les liens internes pointent vers une page existante", () => {
  const chemins = new Set([...PAGES.map((p) => p.chemin), ...A_VENIR]);
  for (const p of PAGES) {
    for (const [, href] of page(p).matchAll(/href="(\/[^"#?]*)/g)) {
      if (href.startsWith("/assets/") || href.startsWith("/presentation/") || href === "/sitemap.xml") continue;
      assert.ok(chemins.has(href), `${p.chemin} → ${href} introuvable`);
    }
  }
});
