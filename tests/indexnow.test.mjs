import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CLE, adressesModifiees, baseDeComparaison, requete } from "../outils/indexnow.mjs";

test("IndexNow : la clé est servie à la racine, sous son propre nom", () => {
  assert.match(CLE, /^[0-9a-f]{32}$/);
  assert.equal(readFileSync(`${CLE}.txt`, "utf8"), CLE);
  assert.equal(requete([]).keyLocation, `https://myclassflow.fr/${CLE}.txt`);
});

test("IndexNow : seules les pages générées modifiées sont signalées", () => {
  const fichiers = ["index.html", "enseignants/tarifs/index.html", "presentation/index.html", "assets/css/base.css", "outils/pages.mjs", "inconnue/index.html"];
  assert.deepEqual(adressesModifiees(fichiers), ["https://myclassflow.fr/", "https://myclassflow.fr/enseignants/tarifs/"]);
});


test("IndexNow : premier push comparé à l'arbre vide, sinon au commit précédent", () => {
  assert.equal(baseDeComparaison("0000000000000000000000000000000000000000"), "4b825dc642cb6eb9a060e54bf8d69288fbee4904");
  assert.equal(baseDeComparaison(""), "4b825dc642cb6eb9a060e54bf8d69288fbee4904");
  assert.equal(baseDeComparaison("abc123"), "abc123");
});
