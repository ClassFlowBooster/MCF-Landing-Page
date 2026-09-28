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

test("tous les liens internes pointent vers une page existante", () => {
  const chemins = new Set(PAGES.map((p) => p.chemin));
  for (const p of PAGES) {
    for (const [, href] of page(p).matchAll(/href="(\/[^"#?]*)/g)) {
      if (href.startsWith("/assets/") || href.startsWith("/presentation/") || href === "/sitemap.xml") continue;
      assert.ok(chemins.has(href), `${p.chemin} → ${href} introuvable`);
    }
  }
});

test("sitemap.xml et robots.txt à jour", () => {
  const sitemap = readFileSync("sitemap.xml", "utf8");
  for (const p of PAGES) assert.ok(sitemap.includes(`<loc>https://myclassflow.fr${p.chemin}</loc>`), p.chemin);
  assert.match(readFileSync("robots.txt", "utf8"), /Sitemap: https:\/\/myclassflow\.fr\/sitemap\.xml/);
});

test("13 pages : l'entrée et quatre pages par espace", () => {
  assert.equal(PAGES.length, 13);
  assert.equal(new Set(PAGES.map((p) => p.chemin)).size, 13);
});

test("prix des écoles en TTC : aucun « HT » sur les pages tarifs, hors la ligne « Montant HT »", () => {
  for (const chemin of ["/enseignants/tarifs/", "/ecoles/tarifs/", "/ecoles/"]) {
    const p = PAGES.find((x) => x.chemin === chemin);
    const texte = page(p).replace(/<[^>]+>/g, " ").replace("Montant HT", "");
    assert.ok(!/\bHT\b/.test(texte), chemin);
  }
});

test("mascottes castor : chaque page référence ses castors, en <img> décoratif, et les fichiers existent", () => {
  const ATTENDUS = {
    "/": ["professeur", "direction", "eleve"],
    "/enseignants/": ["professeur", "direction"],
    "/ecoles/": ["direction"],
    "/parents-enfants/": ["eleve", "direction"],
    "/enseignants/tarifs/": ["professeur", "direction"],
    "/parents-enfants/tarifs/": ["eleve", "direction"],
  };
  for (const nom of ["professeur", "direction", "eleve"]) assert.ok(existsSync(`./assets/img/castors/${nom}.svg`), nom);
  for (const [chemin, noms] of Object.entries(ATTENDUS)) {
    const html = page(PAGES.find((p) => p.chemin === chemin));
    for (const nom of noms) assert.ok(html.includes(`src="/assets/img/castors/${nom}.svg"`), `${chemin} : castor ${nom} absent`);
  }
  for (const p of PAGES) {
    const html = page(p);
    assert.ok(!html.includes("<svg version"), `${p.chemin} : castor intégré au HTML`);
    for (const [img] of html.matchAll(/<img [^>]*castors\/[^>]*>/g)) {
      assert.match(img, /alt=""/, p.chemin);
      assert.match(img, /width="\d+" height="\d+"/, p.chemin);
      assert.match(img, /decoding="async"/, p.chemin);
    }
  }
});

test("badges de remise : toujours le pourcentage calculé à partir des prix", async () => {
  const { remiseEnseignant, remiseAdapter } = await import("../assets/js/tarifs.js");
  const attendu = { enseignants: [remiseEnseignant()], "parents-enfants": [remiseAdapter("essentiel"), remiseAdapter("illimite")] };
  for (const p of PAGES.filter((x) => attendu[x.espace] && ["tarifs", ""].includes(x.rubrique))) {
    const trouves = [...page(p).matchAll(/−(\d+) %/g)].map((m) => Number(m[1]));
    for (const v of trouves) assert.ok(attendu[p.espace].includes(v), `${p.chemin} : −${v} % ne correspond pas aux prix`);
  }
});

test("carte de partage : og:image absolue, dimensions, texte alternatif, fichier PNG 1200 × 630 de moins de 200 Ko", () => {
  for (const p of PAGES) {
    const html = page(p);
    const m = html.match(/<meta property="og:image" content="https:\/\/myclassflow\.fr\/(assets\/img\/og-[\w-]+\.png)" \/>/);
    assert.ok(m, `${p.chemin} : og:image absent`);
    for (const balise of ['<meta property="og:image:width" content="1200" />', '<meta property="og:image:height" content="630" />', '<meta name="twitter:card" content="summary_large_image" />'])
      assert.ok(html.includes(balise), `${p.chemin} : ${balise}`);
    assert.match(html, /<meta property="og:image:alt" content="[^"]{20,}" \/>/, p.chemin);
    const png = readFileSync(`./${m[1]}`);
    assert.equal(png.subarray(1, 4).toString(), "PNG", m[1]);
    assert.equal(png.readUInt32BE(16), 1200, m[1]);
    assert.equal(png.readUInt32BE(20), 630, m[1]);
    assert.ok(png.length < 200 * 1024, `${m[1]} : ${png.length} octets`);
  }
});

test("formule Essentiel : le nombre d'adaptations vient de tarifs.js, partout où il est affiché", async () => {
  const { ADAPTATIONS_ESSENTIEL } = await import("../assets/js/tarifs.js");
  assert.equal(ADAPTATIONS_ESSENTIEL, 70);
  for (const chemin of ["/parents-enfants/tarifs/", "/parents-enfants/"]) {
    const html = page(PAGES.find((p) => p.chemin === chemin));
    assert.ok(html.includes(`<span class="quota"><i>${ADAPTATIONS_ESSENTIEL}</i> adaptations par mois</span>`), chemin);
    assert.ok(!/(?<!il)limitées/i.test(html), `${chemin} : « limitées » encore présent`);
  }
});
