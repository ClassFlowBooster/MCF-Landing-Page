// Signale à IndexNow (Bing, Yandex, Seznam, Naver…) les pages modifiées entre deux commits.
// Usage : node outils/indexnow.mjs <commit-avant> <commit-après> [--attendre] [--envoyer]
//   --attendre : attend (15 min au plus) que chaque page en ligne soit identique à celle du
//                dépôt, sinon s'arrête en échec sans rien envoyer ;
//   --envoyer  : envoie vraiment la liste ; sans lui, l'affiche seulement.
// La clé est publique par conception : elle est servie à la racine du site (<clé>.txt).
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { PAGES } from "./pages.mjs";
import { SITE } from "./gabarits.mjs";

export const CLE = readdirSync(".").find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.slice(0, -4);
const HOTE = new URL(SITE).host;
const ARBRE_VIDE = "4b825dc642cb6eb9a060e54bf8d69288fbee4904";

/** Commit de départ de la comparaison : l'arbre vide pour le premier push d'une branche. */
export const baseDeComparaison = (avant) => (!avant || /^0+$/.test(avant) ? ARBRE_VIDE : avant);

/** Adresses publiques des pages dont le fichier généré figure dans la liste de fichiers modifiés. */
export function adressesModifiees(fichiers) {
  const chemins = new Set(PAGES.map((p) => p.chemin));
  return fichiers
    .filter((f) => f === "index.html" || f.endsWith("/index.html"))
    .map((f) => `/${f.slice(0, -"index.html".length)}`)
    .filter((chemin) => chemins.has(chemin))
    .map((chemin) => `${SITE}${chemin}`);
}

/** Corps de la requête IndexNow. */
export const requete = (adresses) => ({ host: HOTE, key: CLE, keyLocation: `${SITE}/${CLE}.txt`, urlList: adresses });

const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

// Une page est à jour en ligne quand elle est identique au fichier du dépôt (dates à la journée
// insuffisantes : deux mises en ligne peuvent tomber le même jour).
const normaliser = (t) => t.replace(/\r\n/g, "\n");
const fichierDe = (adresse) => `.${adresse.slice(SITE.length)}index.html`;

async function enLigne(adresses) {
  for (let essai = 1; essai <= 15; essai++) {
    try {
      const pages = await Promise.all(adresses.map((a) => fetch(a, { headers: { "cache-control": "no-cache" }, signal: AbortSignal.timeout(20_000) }).then((r) => r.text())));
      if (pages.every((html, i) => normaliser(html) === normaliser(readFileSync(fichierDe(adresses[i]), "utf8")))) return true;
    } catch { /* site momentanément injoignable : on réessaie */ }
    console.log(`site pas encore à jour (essai ${essai}/15)`);
    await attendre(60_000);
  }
  return false;
}

async function principal([avant, apres, ...options]) {
  if (!CLE) throw new Error("fichier de clé IndexNow introuvable à la racine");
  const fichiers = execFileSync("git", ["diff", "--name-only", baseDeComparaison(avant), apres], { encoding: "utf8" }).split("\n").filter(Boolean);
  const adresses = adressesModifiees(fichiers);
  if (adresses.length === 0) return console.log("aucune page modifiée : rien à signaler");
  console.log(`pages modifiées :\n${adresses.join("\n")}`);
  if (options.includes("--attendre") && !(await enLigne(adresses))) {
    console.error("les pages en ligne ne sont pas à jour après 15 min : rien n'est envoyé");
    process.exitCode = 1;
    return;
  }
  if (!options.includes("--envoyer")) return console.log("(--envoyer absent : rien n'est envoyé)");
  const rep = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(requete(adresses)),
    signal: AbortSignal.timeout(30_000),
  });
  console.log(`IndexNow : HTTP ${rep.status}`);
  if (rep.status >= 400) process.exitCode = 1;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await principal(process.argv.slice(2));
