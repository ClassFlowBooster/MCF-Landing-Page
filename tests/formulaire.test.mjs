import { test } from "node:test";
import assert from "node:assert/strict";
import { construireDevis, construireContact, envoyer, lienMailto } from "../assets/js/formulaire.js";

const CHAMPS = { etablissement: "École Jules Ferry", statut_etablissement: "public", code_postal: "75001",
  nom: "Claire Martin", fonction: "Directrice", email: "claire@ecole.fr", telephone: "", site_web: "" };

test("construireDevis joint le calcul du curseur", () => {
  const d = construireDevis(CHAMPS, 12, true);
  assert.equal(d.type, "devis");
  assert.equal(d.espace, "ecoles");
  assert.equal(d.nb_enseignants, 12);
  assert.equal(d.engagement, "2_ans");
  assert.equal(d.montant_ht_mensuel, 119.88);
  assert.equal(d.site_web, "");
});

test("construireContact", () => {
  const c = construireContact({ nom: "Paul", email: "p@e.fr", message: "Rappel ?", etablissement: "", site_web: "" }, "enseignants");
  assert.deepEqual(c, { type: "contact", espace: "enseignants", nom: "Paul", email: "p@e.fr", message: "Rappel ?", etablissement: "", site_web: "" });
});

test("envoyer : 201 → ok", async () => {
  const r = await envoyer({}, () => Promise.resolve(new Response('{"ok":true}', { status: 201 })));
  assert.deepEqual(r, { ok: true });
});

test("envoyer : erreur de la fonction → son message", async () => {
  const f = () => Promise.resolve(new Response(JSON.stringify({ error: { code: "trop_de_demandes", message: "Trop de demandes envoyées. Réessayez dans quelques minutes." } }), { status: 429 }));
  assert.deepEqual(await envoyer({}, f), { ok: false, message: "Trop de demandes envoyées. Réessayez dans quelques minutes." });
});

test("envoyer : réseau coupé → message générique, jamais ok", async () => {
  const r = await envoyer({}, () => Promise.reject(new TypeError("Failed to fetch")));
  assert.equal(r.ok, false);
  assert.equal(r.message, "Envoi impossible : vérifiez votre connexion et réessayez.");
});

test("envoyer : réponse illisible → message générique", async () => {
  const r = await envoyer({}, () => Promise.resolve(new Response("<html>", { status: 502 })));
  assert.equal(r.ok, false);
});

test("envoyer : 200 sans création → jamais ok", async () => {
  const r = await envoyer({}, () => Promise.resolve(new Response('{"ok":true}', { status: 200 })));
  assert.equal(r.ok, false);
});

test("envoyer : 400 et 503 → message de la fonction", async () => {
  for (const status of [400, 503]) {
    const f = () => Promise.resolve(new Response(JSON.stringify({ error: { code: "x", message: `Erreur ${status}` } }), { status }));
    assert.deepEqual(await envoyer({}, f), { ok: false, message: `Erreur ${status}` });
  }
});

test("lienMailto direction", () => {
  const l = lienMailto("direction");
  assert.ok(l.startsWith("mailto:?subject="));
  assert.ok(decodeURIComponent(l).includes("https://myclassflow.fr/ecoles/tarifs/"));
});

test("lienMailto école", () => {
  assert.ok(decodeURIComponent(lienMailto("ecole")).includes("https://myclassflow.fr/ecoles/"));
});
