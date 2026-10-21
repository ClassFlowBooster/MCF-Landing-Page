import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  CONSIGNE_RECHERCHE,
  analyser,
  csv,
  environnementMinimal,
  extraireClaude,
  extraireCodex,
  lancerClaude,
  lancerCodex,
  lireOptions,
  relever,
  resume,
} from "../outils/suivi-ia/releve.mjs";

test("analyser classe le rang, les concurrents, les liens, la casse et les accents", () => {
  const resultat = analyser("Edumoov, puis MYCLASSFLOW et Préparemescours", ["https://myclassflow.fr/page"]);
  assert.deepEqual(resultat, {
    cite: "oui",
    rang: "2",
    concurrents: "Edumoov ; Préparemescours",
    lien: "oui",
    sources: "https://myclassflow.fr/page",
  });
  assert.deepEqual(analyser("Edumoov"), { cite: "non", rang: "", concurrents: "Edumoov", lien: "non", sources: "" });
  assert.equal(analyser("MyClassFlow").lien, "non");
});

test("lancerClaude transmet les arguments exacts et détruit son dossier isolé", async () => {
  let appel;
  await lancerClaude("Question seule", { executer: async (...argumentsAppel) => {
    appel = argumentsAppel;
    assert.equal(existsSync(argumentsAppel[2].cwd), true);
    assert.notEqual(argumentsAppel[2].cwd, process.cwd());
    return { stdout: '{"type":"result","subtype":"success","result":"ok"}' };
  } });
  const [, argumentsClaude, options] = appel;
  assert.deepEqual(argumentsClaude, ["-p", "--safe-mode", "--strict-mcp-config", "--no-session-persistence", "--setting-sources", "", "--tools", "WebSearch,WebFetch", "--allowedTools", "WebSearch,WebFetch", "--append-system-prompt", CONSIGNE_RECHERCHE, "--output-format", "stream-json", "--verbose", "Question seule"]);
  assert.equal(options.timeout, 300000);
  assert.deepEqual(Object.keys(options.env).sort(), Object.keys(options.env).filter((nom) => ["HOME", "USER", "LOGNAME", "PATH", "SHELL", "TMPDIR", "LANG", "LC_ALL"].includes(nom)).sort());
  assert.equal("SUIVI_IA_CLAUDE" in options.env, false);
  assert.equal(options.cwd.includes("suivi-ia-"), true);
  assert.equal(existsSync(options.cwd), false);
});

test("lancerCodex transmet les arguments exacts et détruit son dossier isolé", async () => {
  let appel;
  await lancerCodex("Question", { executer: async (...argumentsAppel) => {
    appel = argumentsAppel;
    writeFileSync(argumentsAppel[1][argumentsAppel[1].indexOf("-o") + 1], "réponse");
    return { stdout: '{"type":"item.completed","item":{"type":"web_search"}}\n{"type":"turn.completed"}' };
  } });
  const [, argumentsCodex, options] = appel;
  assert.deepEqual(argumentsCodex, ["exec", "--json", "--ignore-user-config", "--ignore-rules", "--ephemeral", "--skip-git-repo-check", "-s", "read-only", "-C", options.cwd, "--disable", "shell_tool", "--disable", "apps", "--disable", "plugins", "--disable", "browser_use", "--disable", "computer_use", "--disable", "in_app_browser", "-c", 'web_search="live"', "-o", join(options.cwd, "reponse.txt"), `Question\n\n${CONSIGNE_RECHERCHE}`]);
  assert.equal(options.timeout, 300000);
  assert.deepEqual(Object.keys(options.env).sort(), Object.keys(options.env).filter((nom) => ["HOME", "USER", "LOGNAME", "PATH", "SHELL", "TMPDIR", "LANG", "LC_ALL"].includes(nom)).sort());
  assert.equal("SUIVI_IA_CODEX" in options.env, false);
  assert.equal(existsSync(options.cwd), false);
});

test("extraireClaude collecte texte, sources et recherche, et ignore le JSONL invalide", () => {
  const sortie = [
    "ligne non JSON",
    '{"type":"assistant","message":{"content":[{"type":"tool_use","name":"WebSearch"}]}}',
    '{"type":"user","message":{"content":[{"type":"tool_result","content":"voir https://outil.test/source"}]}}',
    '{"type":"result","subtype":"success","result":"Texte https://texte.test/source"}',
  ].join("\n");
  assert.deepEqual(extraireClaude(sortie), { texte: "Texte https://texte.test/source", sources: ["https://outil.test/source", "https://texte.test/source"], recherche: true, erreur: "" });
});

test("extraireClaude interdit un outil local et exige result", () => {
  assert.equal(extraireClaude('{"type":"assistant","message":{"content":[{"type":"tool_use","name":"Bash"}]}}\n{"type":"result","subtype":"success","result":"x"}').erreur, "outil local utilisé");
  assert.throws(() => extraireClaude('{"type":"assistant"}'), /résultat Claude absent/);
});

test("extraireCodex privilégie le fichier, se replie sur agent_message et interdit command_execution", () => {
  const dossier = mkdtempSync(join(tmpdir(), "suivi-ia-test-"));
  const fichier = join(dossier, "reponse.txt");
  try {
    const sortie = '{"type":"item.completed","item":{"type":"agent_message","text":"message https://message.test"}}\nnon json\n{"type":"item.completed","item":{"type":"web_search"}}\n{"type":"item.completed","item":{"type":"command_execution"}}\n{"type":"turn.completed"}';
    assert.equal(extraireCodex(sortie).texte, "message https://message.test");
    writeFileSync(fichier, "fichier https://fichier.test");
    const resultat = extraireCodex(sortie, fichier);
    assert.equal(resultat.texte, "fichier https://fichier.test");
    assert.equal(resultat.recherche, true);
    assert.equal(resultat.erreur, "outil local utilisé");
  } finally {
    rmSync(dossier, { recursive: true, force: true });
  }
});

test("extraireCodex exige une fin de tour et rejette les erreurs", () => {
  assert.throws(() => extraireCodex('{"type":"turn.failed","message":"échec bref"}'), /échec bref/);
  assert.throws(() => extraireCodex('{"type":"error","error":{"message":"incident bref"}}'), /incident bref/);
  assert.throws(() => extraireCodex('{"type":"item.completed","item":{"type":"web_search"}}'), /tour Codex incomplet/);
});

test("environnementMinimal ne conserve que les variables autorisées", () => {
  const source = { HOME: "/tmp/home", PATH: "/bin", LANG: "fr_FR", ANTHROPIC_API_KEY: "factice", CLAUDECODE: "factice", SUIVI_IA_CLAUDE: "factice", AUTRE: "factice" };
  assert.deepEqual(environnementMinimal(source), { HOME: "/tmp/home", PATH: "/bin", LANG: "fr_FR" });
});

test("une réponse sans recherche web est signalée", async () => {
  const dossier = mkdtempSync(join(tmpdir(), "suivi-ia-test-"));
  try {
    const resultat = await relever({ sortie: dossier, date: "2026-01-01", ia: ["claude"] }, { lancerClaude: async () => ({ texte: "sans web", sources: [], recherche: false, erreur: "", modele: "claude -p" }) });
    assert.equal(resultat.lignes[0].erreur, "réponse sans recherche web");
  } finally {
    rmSync(dossier, { recursive: true, force: true });
  }
});

test("une réponse vide est signalée et ne compte pas comme réponse", async () => {
  const dossier = mkdtempSync(join(tmpdir(), "suivi-ia-test-"));
  try {
    const resultat = await relever({ sortie: dossier, date: "2026-01-01", ia: ["claude"] }, { lancerClaude: async () => ({ texte: "  \n", sources: [], recherche: true, erreur: "", modele: "claude -p" }) });
    assert.equal(resultat.lignes[0].erreur, "réponse vide");
    assert.equal(resultat.aRepondu, false);
  } finally {
    rmSync(dossier, { recursive: true, force: true });
  }
});

test("csv écrit BOM, point-virgule et guillemets doublés", () => {
  assert.equal(csv([{ question: 'a"b' }]).startsWith("\uFEFF\"date\";"), true);
  assert.match(csv([{ question: 'a"b' }]), /"a""b"/);
});

test("resume synthétise citations, rang, liens, concurrents et erreurs", () => {
  const resultat = resume("2026-01-01", [{ ia: "claude", cite: "oui", rang: "2", lien: "oui", concurrents: "Edumoov", erreur: "incident", n: 4 }]);
  assert.match(resultat, /1\/10/);
  assert.match(resultat, /Meilleur rang : 2/);
  assert.match(resultat, /Edumoov \(1\)/);
  assert.match(resultat, /question 4 : incident/);
});

test("mode essai produit les trois fichiers dans un dossier temporaire", async () => {
  const dossier = mkdtempSync(join(tmpdir(), "suivi-ia-test-"));
  try {
    const resultat = await relever({ essai: true, sortie: dossier, date: "2026-01-01", ia: ["claude"] });
    assert.equal(resultat.lignes.length, 10);
    for (const nom of ["releve-2026-01-01.csv", "resume-2026-01-01.md", "reponses-2026-01-01.json"]) assert.equal(existsSync(join(dossier, nom)), true);
    assert.match(readFileSync(join(dossier, "releve-2026-01-01.csv"), "utf8"), /réponse sans recherche web/);
  } finally {
    rmSync(dossier, { recursive: true, force: true });
  }
});

test("les questions sont posées sans appels qui se chevauchent", async () => {
  const dossier = mkdtempSync(join(tmpdir(), "suivi-ia-test-"));
  let appelsEnCours = 0;
  try {
    await relever({ sortie: dossier, date: "2026-01-01", ia: ["claude"] }, { lancerClaude: async () => {
      appelsEnCours++;
      assert.equal(appelsEnCours, 1);
      await new Promise((resoudre) => setTimeout(resoudre, 2));
      appelsEnCours--;
      return { texte: "MyClassFlow", sources: [], recherche: true, erreur: "", modele: "claude -p" };
    } });
  } finally {
    rmSync(dossier, { recursive: true, force: true });
  }
});

test("lireOptions rejette une option inconnue, une IA invalide et une date invalide", () => {
  assert.throws(() => lireOptions(["--inconnue"]), /option inconnue/);
  assert.throws(() => lireOptions(["--ia", "autre"]), /IA attendue/);
  assert.throws(() => lireOptions(["--date", "01-01-2026"]), /date attendue/);
});

test("le script ne contient ni fetch, ni security", () => {
  const contenu = readFileSync(new URL("../outils/suivi-ia/releve.mjs", import.meta.url), "utf8");
  assert.equal(/fetch\s*\(/i.test(contenu), false);
  assert.equal(/security/i.test(contenu), false);
});

test("relever réécrit les fichiers après chaque question", async () => {
  const dossier = mkdtempSync(join(tmpdir(), "suivi-ia-partiel-"));
  const vus = [];
  try {
    await relever({ essai: true, ia: ["claude"], sortie: dossier, date: "2026-10-26" }, {
      reponseEssai: (question, ia, numero) => {
        if (numero > 1) vus.push(readFileSync(join(dossier, "releve-2026-10-26.csv"), "utf8").trim().split("\n").length - 1);
        return { texte: "Edumoov", sources: [], recherche: true, erreur: "", modele: "claude -p" };
      },
    });
    assert.deepEqual(vus, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  } finally {
    rmSync(dossier, { recursive: true, force: true });
  }
});

test("executer ferme l'entrée standard : une commande qui lit stdin ne bloque pas", async () => {
  const { executer } = await import("../outils/suivi-ia/releve.mjs");
  const debut = Date.now();
  const resultat = await executer(process.execPath, ["-e", "process.stdin.resume(); process.stdin.on('end', () => console.log('fin'));"], { timeout: 5000 });
  assert.equal(resultat.stdout.trim(), "fin");
  assert.ok(Date.now() - debut < 4000);
});

test("executer signale un délai dépassé même si la commande sort sans erreur", async () => {
  const { executer } = await import("../outils/suivi-ia/releve.mjs");
  await assert.rejects(executer(process.execPath, ["-e", "process.on('SIGTERM', () => process.exit(0)); setTimeout(() => {}, 10000);"], { timeout: 300 }), /délai de 0 s dépassé|délai/);
});

test("executer donne la cause d'un échec, sans la ligne de commande", async () => {
  const { executer } = await import("../outils/suivi-ia/releve.mjs");
  await assert.rejects(
    executer(process.execPath, ["-e", "console.error('Reading additional input from stdin...'); console.error('limite d\\'usage atteinte'); process.exit(3);"], { timeout: 5000 }),
    (erreur) => /a échoué \(code 3\) : limite d'usage atteinte$/.test(erreur.message) && !erreur.message.includes("-e"),
  );
});

test("Codex : cause lue dans le flux JSON, nouvel essai après une limite d'usage (429)", async () => {
  const { executer, lancerCodex } = await import("../outils/suivi-ia/releve.mjs");
  await assert.rejects(
    executer(process.execPath, ["-e", "console.log(JSON.stringify({ type: 'error', message: 'exceeded retry limit, last status: 429 Too Many Requests' })); process.exit(1);"], { timeout: 5000 }),
    /a échoué \(code 1\) : exceeded retry limit, last status: 429 Too Many Requests$/,
  );
  let appels = 0;
  const attentes = [];
  const reponse = await lancerCodex("Q", {
    attendre: async (ms) => { attentes.push(ms); },
    executer: async () => {
      appels += 1;
      if (appels === 1) throw new Error("codex a échoué (code 1) : 429 Too Many Requests");
      return { stdout: [{ type: "item.completed", item: { type: "web_search" } }, { type: "item.completed", item: { type: "agent_message", text: "Réponse https://teetsh.com/" } }, { type: "turn.completed" }].map((e) => JSON.stringify(e)).join("\n") };
    },
  });
  assert.equal(appels, 2);
  assert.equal(attentes.length, 1);
  assert.equal(reponse.recherche, true);
});

test("relever espace les questions posées à Codex", async () => {
  const dossier = mkdtempSync(join(tmpdir(), "suivi-ia-pause-"));
  const attentes = [];
  try {
    await relever({ ia: ["chatgpt"], sortie: dossier, date: "2026-10-26" }, {
      attendre: async (ms) => { attentes.push(ms); },
      lancerCodex: async () => ({ texte: "Edumoov", sources: [], recherche: true, erreur: "", modele: "codex exec" }),
    });
    assert.equal(attentes.length, 9);
  } finally {
    rmSync(dossier, { recursive: true, force: true });
  }
});
