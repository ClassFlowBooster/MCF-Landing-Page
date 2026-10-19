// Signale à IndexNow (Bing, Yandex, Seznam, Naver…) les pages modifiées entre deux commits.
// Usage : node outils/indexnow.mjs <commit-avant> <commit-après> [--attendre] [--envoyer]
//   --attendre : attend (15 min au plus) que le sitemap en ligne porte les mêmes dates que le
//                sitemap du dépôt pour ces pages, sinon s'arrête sans rien envoyer ;
//   --envoyer  : envoie vraiment la liste ; sans lui, l'affiche seulement.
// La clé est publique par conception : elle est servie à la racine du site (<clé>.txt).
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { PAGES } from "./pages.mjs";
import { SITE } from "./gabarits.mjs";

export const CLE = readdirSync(".").find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.slice(0, -4);
const HOTE = new URL(SITE).host;

/** Adresses publiques des pages dont le fichier généré figure dans la liste de fichiers modifiés. */
export function adressesModifiees(fichiers) {
  const chemins = new Set(PAGES.map((p) => p.chemin));
  return fichiers
    .filter((f) => f === "index.html" || f.endsWith("/index.html"))
    .map((f) => `/${f.slice(0, -"index.html".length)}`)
    .filter((chemin) => chemins.has(chemin))
    .map((chemin) => `${SITE}${chemin}`);
}

/** Dates <lastmod> d'un sitemap, par adresse. */
export function datesDuSitemap(xml) {
  return Object.fromEntries([...xml.matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)].map((m) => [m[1], m[2]]));
}

/** Corps de la requête IndexNow. */
export const requete = (adresses) => ({ host: HOTE, key: CLE, keyLocation: `${SITE}/${CLE}.txt`, urlList: adresses });

const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

async function enLigne(adresses) {
  const attendues = datesDuSitemap(readFileSync("sitemap.xml", "utf8"));
  for (let essai = 1; essai <= 15; essai++) {
    try {
      const rep = await fetch(`${SITE}/sitemap.xml`, { headers: { "cache-control": "no-cache" } });
      const enLigne = datesDuSitemap(await rep.text());
      if (adresses.every((a) => enLigne[a] === attendues[a])) return true;
    } catch { /* site momentanément injoignable : on réessaie */ }
    console.log(`site pas encore à jour (essai ${essai}/15)`);
    await attendre(60_000);
  }
  return false;
}

async function principal([avant, apres, ...options]) {
  if (!CLE) throw new Error("fichier de clé IndexNow introuvable à la racine");
  // Premier push d'une branche : pas de commit « avant », on ne signale que le dernier commit.
  const base = !avant || /^0+$/.test(avant) ? `${apres}~1` : avant;
  const fichiers = execFileSync("git", ["diff", "--name-only", base, apres], { encoding: "utf8" }).split("\n").filter(Boolean);
  const adresses = adressesModifiees(fichiers);
  if (adresses.length === 0) return console.log("aucune page modifiée : rien à signaler");
  console.log(`pages modifiées :\n${adresses.join("\n")}`);
  if (options.includes("--attendre") && !(await enLigne(adresses)))
    return console.log("le site en ligne n'a pas les nouvelles dates après 15 min : rien n'est envoyé");
  if (!options.includes("--envoyer")) return console.log("(--envoyer absent : rien n'est envoyé)");
  const rep = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(requete(adresses)),
  });
  console.log(`IndexNow : HTTP ${rep.status}`);
  if (rep.status >= 400) process.exitCode = 1;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await principal(process.argv.slice(2));
