import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const script = new URL("../outils/verifier-publication.mjs", import.meta.url);

test("verifier-publication accepte un site propre et bloque les marqueurs avec leurs lignes", () => {
  const dossier = mkdtempSync(join(tmpdir(), "mcf-publication-"));
  try {
    mkdirSync(join(dossier, "salon"));
    mkdirSync(join(dossier, "outils"));
    writeFileSync(join(dossier, "index.html"), "<p>Site prêt</p>\n");
    writeFileSync(join(dossier, "salon", "index.html"), "<p>Prêt aussi</p>\n");
    writeFileSync(join(dossier, "outils", "brouillon.html"), "[À COMPLÉTER]\n");

    const propre = spawnSync(process.execPath, [script.pathname, dossier], { encoding: "utf8" });
    assert.equal(propre.status, 0);
    assert.match(propre.stdout, /Vérification de publication réussie/);

    writeFileSync(join(dossier, "salon", "index.html"), "<p>STRIPE_LIEN_PARENT</p>\n<p>[À COMPLÉTER]</p>\n");
    const bloque = spawnSync(process.execPath, [script.pathname, dossier], { encoding: "utf8" });
    assert.equal(bloque.status, 1);
    assert.match(bloque.stderr, /salon\/index\.html:1: <p>STRIPE_LIEN_PARENT<\/p>/);
    assert.match(bloque.stderr, /salon\/index\.html:2: <p>\[À COMPLÉTER\]<\/p>/);
  } finally {
    rmSync(dossier, { recursive: true, force: true });
  }
});
