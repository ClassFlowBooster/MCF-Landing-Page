import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CLE, adressesModifiees, datesDuSitemap, requete } from "../outils/indexnow.mjs";

test("IndexNow : la clé est servie à la racine, sous son propre nom", () => {
  assert.match(CLE, /^[0-9a-f]{32}$/);
  assert.equal(readFileSync(`${CLE}.txt`, "utf8"), CLE);
  assert.equal(requete([]).keyLocation, `https://myclassflow.fr/${CLE}.txt`);
});

test("IndexNow : seules les pages générées modifiées sont signalées", () => {
  const fichiers = ["index.html", "enseignants/tarifs/index.html", "presentation/index.html", "assets/css/base.css", "outils/pages.mjs", "inconnue/index.html"];
  assert.deepEqual(adressesModifiees(fichiers), ["https://myclassflow.fr/", "https://myclassflow.fr/enseignants/tarifs/"]);
});

test("IndexNow : les dates d'un sitemap (lastmod, PR #29) se lisent par adresse", () => {
  const xml = "<url><loc>https://myclassflow.fr/</loc><lastmod>2026-10-19</lastmod></url>";
  assert.deepEqual(datesDuSitemap(xml), { "https://myclassflow.fr/": "2026-10-19" });
});
