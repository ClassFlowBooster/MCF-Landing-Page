// Relevé hebdomadaire des réponses d'IA sur les outils pour professeurs des écoles.
// Les secrets restent dans le trousseau macOS ; ce fichier ne fait jamais d'opération git.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ICI = dirname(fileURLToPath(import.meta.url));
const QUESTIONS = JSON.parse(readFileSync(resolve(ICI, "questions.json"), "utf8"));
const CONCURRENTS = JSON.parse(readFileSync(resolve(ICI, "concurrents.json"), "utf8"));
export const IA_PAR_DEFAUT = ["claude", "chatgpt"];
export const MON_OUTIL = { nom: "MyClassFlow", motifs: ["\\bmyclassflow\\b", "myclassflow\\.fr", "\\bmy class flow\\b"] };

const unique = (valeurs) => [...new Set(valeurs.filter(Boolean))];
const messageCourt = (erreur) => String(erreur?.message ?? erreur).replace(/[\r\n]+/g, " ").slice(0, 240);
const dateDuJour = () => new Date().toISOString().slice(0, 10);

/** Analyse une réponse sans dépendre d'un fournisseur ni du réseau. */
export function analyser(texte = "", sources = []) {
  const trouves = [];
  for (const outil of [...CONCURRENTS, MON_OUTIL]) {
    const index = Math.min(...outil.motifs.map((motif) => {
      const resultat = new RegExp(motif, "i").exec(texte);
      return resultat ? resultat.index : Infinity;
    }));
    if (index !== Infinity) trouves.push({ nom: outil.nom, index });
  }
  trouves.sort((a, b) => a.index - b.index || a.nom.localeCompare(b.nom, "fr"));
  const rang = trouves.findIndex((o) => o.nom === MON_OUTIL.nom);
  const adresses = unique(sources);
  return {
    cite: rang >= 0 ? "oui" : "non",
    rang: rang >= 0 ? String(rang + 1) : "",
    concurrents: trouves.filter((o) => o.nom !== MON_OUTIL.nom).map((o) => o.nom).join(" ; "),
    lien: /myclassflow\.fr/i.test(texte) || adresses.some((s) => /myclassflow\.fr/i.test(s)) ? "oui" : "non",
    sources: adresses.join(" ; "),
  };
}

/** Extrait les textes et les résultats Web d'une réponse Claude. */
export function extraireClaude(reponse) {
  const sources = [];
  const textes = [];
  for (const bloc of reponse.content ?? []) {
    if (bloc.type === "text") {
      textes.push(bloc.text ?? "");
      for (const citation of bloc.citations ?? []) if (citation.type === "web_search_result_location" && citation.url) sources.push(citation.url);
    }
    if (bloc.type === "web_search_tool_result") {
      if (!Array.isArray(bloc.content)) throw new Error("résultat de recherche Claude invalide");
      for (const resultat of bloc.content) if (resultat?.url) sources.push(resultat.url);
    }
  }
  return { texte: textes.join("\n"), sources: unique(sources), stop_reason: reponse.stop_reason };
}

/** Extrait les textes et les citations URL d'une réponse de l'API Responses. */
export function extraireOpenAI(reponse) {
  const sources = [];
  const textes = [];
  if (reponse.output_text) textes.push(reponse.output_text);
  for (const sortie of reponse.output ?? []) {
    if (sortie.type !== "message") continue;
    if (sortie.output_text) textes.push(sortie.output_text);
    for (const contenu of sortie.content ?? []) {
      if (contenu.type === "output_text" && contenu.text) textes.push(contenu.text);
      for (const annotation of contenu.annotations ?? []) if (annotation.type === "url_citation" && annotation.url) sources.push(annotation.url);
    }
    for (const annotation of sortie.annotations ?? []) if (annotation.type === "url_citation" && annotation.url) sources.push(annotation.url);
  }
  return { texte: unique(textes).join("\n"), sources: unique(sources) };
}

export function lireCle(service, execFile = execFileSync) {
  return execFile("security", ["find-generic-password", "-a", process.env.USER, "-s", service, "-w"], { encoding: "utf8" }).trim();
}

const pause = (ms) => new Promise((resolveur) => setTimeout(resolveur, ms));
async function appeler(url, options, dependances) {
  let dernier;
  for (let tentative = 0; tentative < 3; tentative++) {
    try {
      const controleur = new AbortController();
      const minuteur = setTimeout(() => controleur.abort(), 60_000);
      let rep;
      try { rep = await dependances.fetch(url, { ...options, signal: controleur.signal }); } finally { clearTimeout(minuteur); }
      if (!rep.ok) {
        const erreur = new Error(`HTTP ${rep.status}`);
        if (rep.status !== 429 && rep.status < 500) throw erreur;
        dernier = erreur;
      } else return await rep.json();
    } catch (erreur) {
      // Une réponse HTTP 4xx (hors limitation) ne deviendra pas valide en réessayant.
      if (/^HTTP 4\d\d$/.test(erreur.message) && erreur.message !== "HTTP 429") throw erreur;
      dernier = erreur;
    }
    if (tentative < 2) await dependances.attendre(1_000 * (tentative + 1));
  }
  throw dernier;
}

/** Appelle Claude, y compris la reprise prescrite après pause_turn. */
export async function demanderClaude(question, cle, dependances = {}) {
  const d = { fetch: globalThis.fetch, attendre: pause, ...dependances };
  const messages = [{ role: "user", content: question }];
  const modele = process.env.SUIVI_IA_MODELE_CLAUDE || "claude-opus-5-5";
  const textes = [], sources = [];
  for (let reprise = 0; reprise <= 3; reprise++) {
    const corps = { model: modele, max_tokens: 16000, output_config: { effort: "low" }, tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 5, user_location: { type: "approximate", country: "FR" } }], messages };
    const reponse = await appeler("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "x-api-key": cle, "anthropic-version": "2023-06-01", "content-type": "application/json" }, body: JSON.stringify(corps) }, d);
    const extrait = extraireClaude(reponse);
    textes.push(extrait.texte);
    sources.push(...extrait.sources);
    if (extrait.stop_reason !== "pause_turn") {
      if (extrait.stop_reason === "refusal") throw new Error("refus Claude");
      return { texte: textes.filter(Boolean).join("\n"), sources: unique(sources), modele };
    }
    if (reprise === 3) throw new Error("Claude n'a pas terminé après 3 reprises");
    messages.push({ role: "assistant", content: reponse.content });
  }
}

export async function demanderOpenAI(question, cle, dependances = {}) {
  const d = { fetch: globalThis.fetch, attendre: pause, ...dependances };
  const modele = process.env.SUIVI_IA_MODELE_OPENAI || "gpt-5";
  const reponse = await appeler("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${cle}`, "content-type": "application/json" }, body: JSON.stringify({ model: modele, input: question, tools: [{ type: "web_search" }] }) }, d);
  return { ...extraireOpenAI(reponse), modele };
}

/** Réponses prévisibles, volontairement sans clé ni réseau, pour vérifier le circuit complet. */
export function reponseEssai(question, ia, n) {
  if (n % 3 === 0) throw new Error("erreur factice");
  if (n % 3 === 1) return { texte: `Edumoov puis MyClassFlow : https://myclassflow.fr pour ${question}`, sources: ["https://myclassflow.fr/"], modele: ia === "claude" ? "claude-essai" : "gpt-essai" };
  return { texte: `L'outil Edumoov peut convenir à cette question : ${question}`, sources: ["https://edumoov.com/"], modele: ia === "claude" ? "claude-essai" : "gpt-essai" };
}

export function csv(lignes) {
  const colonnes = ["date", "ia", "modele", "n", "question", "cite", "rang", "concurrents", "lien", "sources", "erreur"];
  const cellule = (v) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  return `\uFEFF${[colonnes, ...lignes.map((ligne) => colonnes.map((c) => ligne[c]))].map((ligne) => ligne.map(cellule).join(";")).join("\n")}\n`;
}

export function resume(date, lignes) {
  const parties = [`# Relevé IA — ${date}`, ""];
  for (const ia of unique(lignes.map((l) => l.ia))) {
    const groupe = lignes.filter((l) => l.ia === ia);
    const cites = groupe.filter((l) => l.cite === "oui");
    const rangs = cites.map((l) => Number(l.rang)).filter(Boolean);
    const liens = groupe.filter((l) => l.lien === "oui").length;
    const comptes = new Map();
    for (const ligne of groupe) for (const nom of ligne.concurrents.split(" ; ").filter(Boolean)) comptes.set(nom, (comptes.get(nom) ?? 0) + 1);
    const concurrents = [...comptes].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "fr"));
    parties.push(`## ${ia}`, "", `- Réponses citant MyClassFlow : ${cites.length}/10`, `- Meilleur rang : ${rangs.length ? Math.min(...rangs) : "—"}`, `- Réponses avec lien : ${liens}`, `- Concurrents les plus cités : ${concurrents.length ? concurrents.map(([n, c]) => `${n} (${c})`).join(", ") : "aucun"}`);
    const erreurs = groupe.filter((l) => l.erreur).map((l) => `question ${l.n} : ${l.erreur}`);
    if (erreurs.length) parties.push("- Erreurs :", ...erreurs.map((e) => `  - ${e}`));
    parties.push("");
  }
  return parties.join("\n");
}

export async function relever(options = {}, dependances = {}) {
  const date = options.date ?? dateDuJour();
  const iaListe = options.ia ?? IA_PAR_DEFAUT;
  const sortie = resolve(options.sortie ?? resolve(ICI, "../../../MCF-Pilotage/docs/suivi-ia"));
  const d = { lireCle, demanderClaude, demanderOpenAI, reponseEssai, ...dependances };
  mkdirSync(sortie, { recursive: true });
  const lignes = [], reponses = [];
  for (const ia of iaListe) {
    let cle;
    if (!options.essai) {
      try { cle = d.lireCle(ia === "claude" ? "mcf-suivi-ia-anthropic" : "mcf-suivi-ia-openai"); }
      catch { cle = null; console.error(`Clé absente du trousseau : ajoutez-la avec security add-generic-password -a "$USER" -s ${ia === "claude" ? "mcf-suivi-ia-anthropic" : "mcf-suivi-ia-openai"} -w`); }
    }
    for (const { n, question } of QUESTIONS) {
      let resultat, erreur = "";
      try {
        if (!options.essai && !cle) throw new Error("clé absente du trousseau");
        resultat = options.essai ? d.reponseEssai(question, ia, n) : await (ia === "claude" ? d.demanderClaude(question, cle) : d.demanderOpenAI(question, cle));
      } catch (e) { erreur = messageCourt(e); resultat = { texte: "", sources: [], modele: ia === "claude" ? process.env.SUIVI_IA_MODELE_CLAUDE || "claude-opus-5-5" : process.env.SUIVI_IA_MODELE_OPENAI || "gpt-5" }; }
      // Même si un fournisseur renvoyait la valeur reçue, elle ne doit jamais atteindre un fichier.
      if (cle) {
        resultat = { ...resultat, texte: resultat.texte.replaceAll(cle, "[secret masqué]"), sources: resultat.sources.map((source) => source.replaceAll(cle, "[secret masqué]")) };
      }
      const analyse = analyser(resultat.texte, resultat.sources);
      lignes.push({ date, ia, modele: resultat.modele, n, question, ...analyse, erreur });
      reponses.push({ question, ia, texte: resultat.texte, sources: resultat.sources });
    }
  }
  writeFileSync(resolve(sortie, `releve-${date}.csv`), csv(lignes), "utf8");
  writeFileSync(resolve(sortie, `resume-${date}.md`), resume(date, lignes), "utf8");
  writeFileSync(resolve(sortie, `reponses-${date}.json`), `${JSON.stringify(reponses, null, 2)}\n`, "utf8");
  return { lignes, reponses, sortie, aRepondu: lignes.some((l) => !l.erreur) };
}

// Alias conservé pour une API de module directe, cohérente avec le nom du script.
export const releve = relever;

export function lireOptions(argumentsCli) {
  const options = { ia: [] };
  for (let i = 0; i < argumentsCli.length; i++) {
    const arg = argumentsCli[i];
    if (arg === "--essai") options.essai = true;
    else if (arg === "--ia") options.ia = argumentsCli[++i]?.split(",").filter((ia) => IA_PAR_DEFAUT.includes(ia)) ?? [];
    else if (arg === "--sortie") options.sortie = argumentsCli[++i];
    else if (arg === "--date") options.date = argumentsCli[++i];
    else throw new Error(`option inconnue : ${arg}`);
  }
  if (!options.ia.length) options.ia = IA_PAR_DEFAUT;
  if (options.date && !/^\d{4}-\d{2}-\d{2}$/.test(options.date)) throw new Error("date attendue : AAAA-MM-JJ");
  return options;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { const resultat = await relever(lireOptions(process.argv.slice(2))); process.exitCode = resultat.aRepondu ? 0 : 1; }
  catch (e) { console.error(messageCourt(e)); process.exitCode = 1; }
}
