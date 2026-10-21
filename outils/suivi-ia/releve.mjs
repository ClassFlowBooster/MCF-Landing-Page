// Relève la visibilité de MyClassFlow dans les réponses de Claude et Codex.
// Usage : node outils/suivi-ia/releve.mjs [--essai] [--ia claude,chatgpt] [--date AAAA-MM-JJ] [--sortie dossier]
// Options : --essai emploie des réponses factices ; --ia limite les assistants ; --sortie choisit le dossier produit.
// Isolation : chaque assistant s'exécute dans un dossier temporaire vide, supprimé après son appel.
// Ce script ne fait jamais d'appel d'API direct, n'emploie aucune clé et n'exécute aucune commande git.
import { execFile } from "node:child_process";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ICI = dirname(fileURLToPath(import.meta.url));
const QUESTIONS = JSON.parse(readFileSync(resolve(ICI, "questions.json"), "utf8"));
const CONCURRENTS = JSON.parse(readFileSync(resolve(ICI, "concurrents.json"), "utf8"));
export const IA_PAR_DEFAUT = ["claude", "chatgpt"];
export const MON_OUTIL = { nom: "MyClassFlow", motifs: ["\\bmyclassflow\\b", "myclassflow\\.fr", "\\bmy class flow\\b"] };
export const CONSIGNE_RECHERCHE = "Avant de répondre, fais une recherche sur le web. Termine par une ligne « Sources : » avec les adresses des pages utilisées.";

const valeursUniques = (valeurs) => [...new Set(valeurs.filter(Boolean))];
const extraireUrls = (valeur) => String(valeur ?? "").match(/https?:\/\/[^\s<>"')\]}]+/g) ?? [];
const modeleDe = (ia) => (ia === "claude" ? "claude -p" : "codex exec");
const messageCourt = (erreur) => String(erreur?.message ?? erreur).replace(/[\r\n]+/g, " ").slice(0, 240);

/** Retourne l'environnement minimal autorisé pour les assistants. */
export function environnementMinimal(source = process.env) {
  return Object.fromEntries(["HOME", "USER", "LOGNAME", "PATH", "SHELL", "TMPDIR", "LANG", "LC_ALL"]
    .filter((nom) => source[nom] !== undefined)
    .map((nom) => [nom, source[nom]]));
}

/** Analyse la présence, le rang, les concurrents et les liens dans une réponse. */
export function analyser(texte = "", sources = []) {
  const mentions = [];
  for (const concurrent of [...CONCURRENTS, MON_OUTIL]) {
    const premierIndex = Math.min(...concurrent.motifs.map((motif) => {
      const occurrence = new RegExp(motif, "i").exec(texte);
      return occurrence ? occurrence.index : Infinity;
    }));
    if (premierIndex !== Infinity) {
      mentions.push({ nom: concurrent.nom, index: premierIndex });
    }
  }
  mentions.sort((gauche, droite) => gauche.index - droite.index || gauche.nom.localeCompare(droite.nom, "fr"));
  const indexMonOutil = mentions.findIndex((mention) => mention.nom === MON_OUTIL.nom);
  const sourcesUniques = valeursUniques(sources);
  return {
    cite: indexMonOutil >= 0 ? "oui" : "non",
    rang: indexMonOutil >= 0 ? String(indexMonOutil + 1) : "",
    concurrents: mentions.filter((mention) => mention.nom !== MON_OUTIL.nom).map((mention) => mention.nom).join(" ; "),
    lien: /myclassflow\.fr/i.test(texte) || sourcesUniques.some((source) => /myclassflow\.fr/i.test(source)) ? "oui" : "non",
    sources: sourcesUniques.join(" ; "),
  };
}

const lireJsonl = (sortie) => String(sortie).split(/\r?\n/).filter(Boolean).flatMap((ligne) => {
  try {
    return [JSON.parse(ligne)];
  } catch {
    return [];
  }
});

/** Exécute un programme et retourne ses sorties standard et d'erreur. */
export function executer(commande, argumentsCommande, options = {}) {
  return new Promise((resoudre, rejeter) => {
    const debut = Date.now();
    const enfant = execFile(commande, argumentsCommande, { encoding: "utf8", maxBuffer: 10485760, ...options }, (erreur, sortieStandard, sortieErreur) => {
      // Codex peut sortir sans erreur quand il est interrompu : le délai se vérifie aussi à la durée.
      const delaiDepasse = options.timeout && Date.now() - debut >= options.timeout;
      if (erreur || delaiDepasse) {
        // Message court et lisible : la commande et ses arguments ne sont pas repris, seulement la cause.
        // Codex écrit sa cause dans le flux JSON (événement « error ») plutôt que sur la sortie d'erreur.
        const causeJson = lireJsonl(sortieStandard ?? "").filter((evenement) => evenement.type === "error" && evenement.message).at(-1)?.message;
        const cause = causeJson ?? String(sortieErreur ?? "").split("\n").map((ligne) => ligne.trim()).filter((ligne) => ligne && !/^Reading additional input/.test(ligne)).at(-1);
        const echec = delaiDepasse
          ? new Error(`délai de ${Math.round(options.timeout / 1000)} s dépassé`)
          : new Error(`${commande.split("/").at(-1)} a échoué (code ${erreur.code ?? "?"})${cause ? ` : ${cause}` : ""}`);
        echec.stdout = sortieStandard;
        echec.stderr = sortieErreur;
        rejeter(echec);
      } else {
        resoudre({ stdout: sortieStandard, stderr: sortieErreur });
      }
    });
    // Entrée standard fermée : sinon `codex exec` attend une suite de consigne et n'écrit rien jusqu'au délai.
    enfant.stdin?.end();
  });
}

/** Extrait la réponse, les sources et les garde-fous de la sortie JSONL de Claude. */
export function extraireClaude(sortie) {
  let rechercheWeb = false;
  let outilLocal = false;
  let resultat;
  const sources = [];
  for (const evenement of lireJsonl(sortie)) {
    if (evenement.type === "assistant") {
      for (const bloc of evenement.message?.content ?? []) {
        if (bloc.type !== "tool_use") continue;
        if (["WebSearch", "WebFetch"].includes(bloc.name)) {
          rechercheWeb = true;
        } else {
          outilLocal = true;
        }
      }
    }
    if (evenement.type === "user") {
      for (const bloc of evenement.message?.content ?? []) {
        if (bloc.type === "tool_result") {
          sources.push(...extraireUrls(JSON.stringify(bloc)));
        }
      }
    }
    if (evenement.type === "result") {
      resultat = evenement;
    }
  }
  if (!resultat) throw new Error("résultat Claude absent");
  if (resultat.subtype !== "success" || resultat.is_error) throw new Error("erreur Claude");
  const texte = String(resultat.result ?? "");
  return { texte, sources: valeursUniques([...sources, ...extraireUrls(texte)]), recherche: rechercheWeb, erreur: outilLocal ? "outil local utilisé" : "" };
}

/** Extrait la réponse, les sources et les garde-fous de la sortie JSONL de Codex. */
export function extraireCodex(sortie, fichierReponse) {
  let rechercheWeb = false;
  let outilLocal = false;
  let dernierMessage = "";
  let tourTermine = false;
  for (const evenement of lireJsonl(sortie)) {
    if (["turn.failed", "error"].includes(evenement.type)) {
      throw new Error(messageCourt(evenement.error ?? evenement.message ?? evenement));
    }
    if (evenement.type === "turn.completed") tourTermine = true;
    if (evenement.type !== "item.completed") {
      continue;
    }
    const element = evenement.item ?? {};
    if (element.type === "web_search") {
      rechercheWeb = true;
    }
    if (["command_execution", "file_change", "mcp_tool_call"].includes(element.type)) {
      outilLocal = true;
    }
    if (element.type === "agent_message" && element.text) {
      dernierMessage = element.text;
    }
  }
  if (!tourTermine) throw new Error("tour Codex incomplet");
  const texte = fichierReponse && existsSync(fichierReponse) ? readFileSync(fichierReponse, "utf8") : dernierMessage;
  return { texte, sources: valeursUniques(extraireUrls(texte)), recherche: rechercheWeb, erreur: outilLocal ? "outil local utilisé" : "" };
}

/** Lance Claude dans un dossier temporaire isolé et analyse sa réponse. */
export async function lancerClaude(question, dependances = {}) {
  const dossierTravail = mkdtempSync(join(tmpdir(), "suivi-ia-"));
  try {
    const argumentsClaude = ["-p", "--safe-mode", "--strict-mcp-config", "--no-session-persistence", "--setting-sources", "", "--tools", "WebSearch,WebFetch", "--allowedTools", "WebSearch,WebFetch", "--append-system-prompt", CONSIGNE_RECHERCHE, "--output-format", "stream-json", "--verbose", question];
    const resultat = await (dependances.executer ?? executer)(process.env.SUIVI_IA_CLAUDE || "claude", argumentsClaude, { cwd: dossierTravail, timeout: 300000, env: environnementMinimal() });
    return { ...extraireClaude(resultat.stdout), modele: "claude -p" };
  } finally {
    rmSync(dossierTravail, { recursive: true, force: true });
  }
}

/** Lance Codex en lecture seule dans un dossier temporaire isolé et analyse sa réponse. */
const attendre = (ms) => new Promise((resoudre) => setTimeout(resoudre, ms));

/** Pose une question à Codex ; sur une limite d'usage (429), attend puis réessaie une fois. */
export async function lancerCodex(question, dependances = {}) {
  try {
    return await poserACodex(question, dependances);
  } catch (erreur) {
    if (!/\b429\b|Too Many Requests/i.test(String(erreur?.message))) throw erreur;
    await (dependances.attendre ?? attendre)(Number(process.env.SUIVI_IA_ATTENTE_429 ?? 180000));
    return poserACodex(question, dependances);
  }
}

async function poserACodex(question, dependances) {
  const dossierTravail = mkdtempSync(join(tmpdir(), "suivi-ia-"));
  const fichierReponse = join(dossierTravail, "reponse.txt");
  try {
    const argumentsCodex = ["exec", "--json", "--ignore-user-config", "--ignore-rules", "--ephemeral", "--skip-git-repo-check", "-s", "read-only", "-C", dossierTravail, "--disable", "shell_tool", "--disable", "apps", "--disable", "plugins", "--disable", "browser_use", "--disable", "computer_use", "--disable", "in_app_browser", "-c", "web_search=\"live\"", "-o", fichierReponse, `${question}\n\n${CONSIGNE_RECHERCHE}`];
    const resultat = await (dependances.executer ?? executer)(process.env.SUIVI_IA_CODEX || "codex", argumentsCodex, { cwd: dossierTravail, timeout: 300000, env: environnementMinimal() });
    return { ...extraireCodex(resultat.stdout, fichierReponse), modele: "codex exec" };
  } finally {
    rmSync(dossierTravail, { recursive: true, force: true });
  }
}

/** Produit une réponse déterministe pour tester le relevé sans lancer d'assistant. */
export function reponseEssai(question, ia, numero) {
  if (numero % 4 === 3) throw new Error("erreur factice");
  if (numero % 4 === 1) return { texte: `Edumoov puis MyClassFlow : https://myclassflow.fr pour ${question}`, sources: ["https://myclassflow.fr/"], recherche: true, erreur: "", modele: modeleDe(ia) };
  if (numero % 4 === 2) return { texte: `Edumoov peut convenir : ${question}`, sources: ["https://edumoov.com/"], recherche: true, erreur: "", modele: modeleDe(ia) };
  return { texte: `Réponse factice sans recherche : ${question}`, sources: [], recherche: false, erreur: "", modele: modeleDe(ia) };
}

/** Sérialise les lignes du relevé au format CSV UTF-8 avec BOM et séparateur point-virgule. */
export function csv(lignes) {
  const colonnes = ["date", "ia", "modele", "n", "question", "cite", "rang", "concurrents", "lien", "sources", "erreur"];
  const cellule = (valeur) => `"${String(valeur ?? "").replaceAll("\"", "\"\"")}"`;
  return `\uFEFF${[colonnes, ...lignes.map((ligne) => colonnes.map((colonne) => ligne[colonne]))].map((ligne) => ligne.map(cellule).join(";")).join("\n")}\n`;
}

/** Construit le résumé Markdown des résultats, regroupés par assistant. */
export function resume(date, lignes) {
  const parties = [`# Relevé IA — ${date}`, ""];
  for (const ia of valeursUniques(lignes.map((ligne) => ligne.ia))) {
    const groupe = lignes.filter((ligne) => ligne.ia === ia);
    const citations = groupe.filter((ligne) => ligne.cite === "oui");
    const rangs = citations.map((ligne) => Number(ligne.rang)).filter(Boolean);
    const liens = groupe.filter((ligne) => ligne.lien === "oui").length;
    const compteurs = new Map();
    for (const ligne of groupe) {
      for (const concurrent of ligne.concurrents.split(" ; ").filter(Boolean)) {
        compteurs.set(concurrent, (compteurs.get(concurrent) ?? 0) + 1);
      }
    }
    const concurrents = [...compteurs].sort((gauche, droite) => droite[1] - gauche[1] || gauche[0].localeCompare(droite[0], "fr"));
    parties.push(`## ${ia}`, "", `- Réponses citant MyClassFlow : ${citations.length}/10`, `- Meilleur rang : ${rangs.length ? Math.min(...rangs) : "—"}`, `- Réponses avec lien : ${liens}`, `- Concurrents les plus cités : ${concurrents.length ? concurrents.map(([nom, nombre]) => `${nom} (${nombre})`).join(", ") : "aucun"}`);
    const erreurs = groupe.filter((ligne) => ligne.erreur).map((ligne) => `question ${ligne.n} : ${ligne.erreur}`);
    if (erreurs.length) parties.push("- Erreurs :", ...erreurs.map((erreur) => `  - ${erreur}`));
    parties.push("");
  }
  return parties.join("\n");
}

/** Lance toutes les questions demandées et écrit les trois fichiers du relevé. */
export async function relever(options = {}, dependances = {}) {
  const date = options.date ?? new Date().toISOString().slice(0, 10);
  const assistants = options.ia ?? IA_PAR_DEFAUT;
  const dossierSortie = resolve(options.sortie ?? resolve(ICI, "../../../MCF-Pilotage/docs/suivi-ia"));
  mkdirSync(dossierSortie, { recursive: true });
  const lignes = [];
  const reponses = [];
  // Les trois fichiers sont réécrits après chaque question : un relevé interrompu garde ce qu'il a déjà obtenu.
  const ecrire = () => {
    writeFileSync(join(dossierSortie, `releve-${date}.csv`), csv(lignes), "utf8");
    writeFileSync(join(dossierSortie, `resume-${date}.md`), resume(date, lignes), "utf8");
    writeFileSync(join(dossierSortie, `reponses-${date}.json`), `${JSON.stringify(reponses, null, 2)}\n`, "utf8");
  };
  for (const ia of assistants) {
    for (const { n: numero, question } of QUESTIONS) {
      let reponse;
      let erreur = "";
      // Entre deux questions à Codex, une pause : le compte ChatGPT limite les requêtes rapprochées (429).
      if (!options.essai && ia === "chatgpt" && numero > 1) await (dependances.attendre ?? attendre)(Number(process.env.SUIVI_IA_PAUSE ?? 45000));
      try {
        reponse = options.essai ? (dependances.reponseEssai ?? reponseEssai)(question, ia, numero) : await (ia === "claude" ? (dependances.lancerClaude ?? lancerClaude)(question, dependances) : (dependances.lancerCodex ?? lancerCodex)(question, dependances));
      } catch (exception) {
        erreur = messageCourt(exception);
        reponse = { texte: "", sources: [], recherche: false, modele: modeleDe(ia) };
      }
      if (!erreur) erreur = reponse.erreur || (!String(reponse.texte ?? "").trim() ? "réponse vide" : !reponse.recherche ? "réponse sans recherche web" : "");
      lignes.push({ date, ia, modele: reponse.modele, n: numero, question, ...analyser(reponse.texte, reponse.sources), erreur });
      reponses.push({ question, ia, texte: reponse.texte, sources: reponse.sources });
      ecrire();
    }
  }
  return { lignes, reponses, sortie: dossierSortie, aRepondu: lignes.some((ligne) => !ligne.erreur) };
}

export const releve = relever;

/** Lit et valide les options de ligne de commande du relevé. */
export function lireOptions(argumentsLigneCommande) {
  const options = { ia: [] };
  for (let index = 0; index < argumentsLigneCommande.length; index++) {
    if (argumentsLigneCommande[index] === "--essai") options.essai = true;
    else if (argumentsLigneCommande[index] === "--ia") {
      options.ia = argumentsLigneCommande[++index]?.split(",") ?? [];
      if (!options.ia.length || options.ia.some((ia) => !IA_PAR_DEFAUT.includes(ia))) throw new Error("IA attendue : claude, chatgpt");
    } else if (argumentsLigneCommande[index] === "--sortie") options.sortie = argumentsLigneCommande[++index];
    else if (argumentsLigneCommande[index] === "--date") options.date = argumentsLigneCommande[++index];
    else throw new Error(`option inconnue : ${argumentsLigneCommande[index]}`);
  }
  if (!options.ia.length) options.ia = IA_PAR_DEFAUT;
  if (options.date && !/^\d{4}-\d{2}-\d{2}$/.test(options.date)) throw new Error("date attendue : AAAA-MM-JJ");
  return options;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const resultat = await relever(lireOptions(process.argv.slice(2)));
    process.exitCode = resultat.aRepondu ? 0 : 1;
  } catch (erreur) {
    console.error(messageCourt(erreur));
    process.exitCode = 1;
  }
}
