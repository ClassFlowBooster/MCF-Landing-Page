import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { analyser, csv, demanderClaude, extraireClaude, extraireOpenAI, releve, resume } from "../outils/suivi-ia/releve.mjs";

test("analyse les rangs, concurrents, accents, casse et liens", () => {
  const resultat = analyser("Préparemescours, puis edumoov et MY CLASS FLOW", ["https://myclassflow.fr/a"]);
  assert.deepEqual(resultat, { cite: "oui", rang: "3", concurrents: "Préparemescours ; Edumoov", lien: "oui", sources: "https://myclassflow.fr/a" });
  assert.equal(analyser("Lalilo seulement").cite, "non");
  assert.equal(analyser("Lalilo seulement").rang, "");
});

test("extrait Claude, y compris citations et résultat de recherche invalide", () => {
  const resultat = extraireClaude({ content: [{ type: "text", text: "bonjour", citations: [{ type: "web_search_result_location", url: "https://a/" }] }, { type: "web_search_tool_result", content: [{ url: "https://b/" }] }] });
  assert.deepEqual(resultat.sources, ["https://a/", "https://b/"]);
  assert.equal(resultat.texte, "bonjour");
  assert.throws(() => extraireClaude({ content: [{ type: "web_search_tool_result", content: {} }] }), /invalide/);
});

test("reprend Claude après pause_turn avec fetch injecté", async () => {
  const corps = [];
  const fetch = async (_url, options) => {
    corps.push(JSON.parse(options.body));
    const reponse = corps.length === 1 ? { stop_reason: "pause_turn", content: [{ type: "text", text: "suite" }] } : { stop_reason: "end_turn", content: [{ type: "text", text: "MyClassFlow" }] };
    return { ok: true, json: async () => reponse };
  };
  const resultat = await demanderClaude("question", "cle-factice", { fetch, attendre: async () => {} });
  assert.equal(corps.length, 2);
  assert.equal(corps[1].messages[1].role, "assistant");
  assert.equal(resultat.texte, "suite\nMyClassFlow");
});

test("extrait les messages et citations OpenAI", () => {
  assert.deepEqual(extraireOpenAI({ output: [{ type: "message", content: [{ type: "output_text", text: "MyClassFlow", annotations: [{ type: "url_citation", url: "https://myclassflow.fr" }] }] }] }), { texte: "MyClassFlow", sources: ["https://myclassflow.fr"] });
});

test("produit un CSV BOM avec échappement et un résumé", () => {
  assert.ok(csv([{ date: "2026-01-01", question: "il dit \"oui\"" }]).startsWith("\uFEFF"));
  assert.match(csv([{ date: "2026-01-01", question: "il dit \"oui\"" }]), /"il dit ""oui"""/);
  assert.match(resume("2026-01-01", [{ ia: "claude", cite: "oui", rang: "2", lien: "oui", concurrents: "Edumoov", erreur: "", n: 1 }]), /1\/10/);
});

test("le mode essai écrit le relevé complet sans secret", async () => {
  const dossier = mkdtempSync(join(tmpdir(), "suivi-ia-"));
  try {
    const resultat = await releve({ essai: true, sortie: dossier, date: "2026-01-01", ia: ["claude"] });
    assert.equal(resultat.aRepondu, true);
    const fichiers = ["releve-2026-01-01.csv", "resume-2026-01-01.md", "reponses-2026-01-01.json"];
    for (const fichier of fichiers) assert.ok(readFileSync(join(dossier, fichier), "utf8").length);
    assert.equal(fichiers.some((f) => readFileSync(join(dossier, f), "utf8").includes("sk-")), false);
  } finally { rmSync(dossier, { recursive: true, force: true }); }
});

test("le code ne lit aucune variable d'environnement de clé", () => {
  const code = readFileSync(new URL("../outils/suivi-ia/releve.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(code, /process\.env\.[A-Z0-9_]*_API_KEY/);
});
