import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { FICHES } from "../outils/corps/fiches/index.mjs";
import { page } from "../outils/gabarits.mjs";
import { PAGES, PAGE_404 } from "../outils/pages.mjs";

function extrait(texte, index) {
  return texte.slice(Math.max(0, index - 80), index + 120).replace(/\s+/g, " ");
}

const pages = [
  ...PAGES.map((p) => [`.${p.chemin}index.html`, p]),
  [PAGE_404.chemin.slice(1), PAGE_404],
];

test("chaque page du générateur existe sur disque", () => {
  for (const [fichier] of pages) {
    assert.ok(existsSync(fichier), `${fichier} absent : lancer npm run generer`);
  }
});

test("les pages générées ne contiennent aucune valeur de rendu invalide", () => {
  for (const [fichier] of pages) {
    const html = readFileSync(fichier, "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "");
    const faute = /undefined|\bNaN\b|\[object Object\]|>null</.exec(html);
    if (faute) assert.fail(`${fichier} : ${faute[0]} dans « ${extrait(html, faute.index)} »`);
  }
});

test("chaque page générée est à jour (lancer npm run generer)", () => {
  for (const [fichier, p] of pages) {
    const html = readFileSync(fichier, "utf8").replace(/\r\n/g, "\n");
    assert.equal(html, page(p), `${fichier} n'est pas à jour : lancer npm run generer`);
  }
});

test("chaque fiche possède une accroche non vide", () => {
  for (const fiche of FICHES) {
    assert.equal(typeof fiche.accroche, "string", `${fiche.slug} : accroche absente`);
    assert.ok(fiche.accroche.trim(), `${fiche.slug} : accroche vide`);
  }
});
