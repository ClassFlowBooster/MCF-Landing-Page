// Contrôle du site en ligne, lancé chaque jour par .github/workflows/controle-quotidien.yml :
// sitemap valide, chaque page en 200 et sous SEUIL_MS, données structurées lisibles, liens
// internes et fichiers liés présents, robots.txt et clé IndexNow servis. Une requête par
// adresse, rien d'autre : ce n'est pas du trafic simulé.
// Usage : node outils/controle-en-ligne.mjs [rapport.md] — code de sortie 1 si un contrôle échoue.
// CONTROLE_BASE=http://127.0.0.1:8000 le fait tourner sur une copie locale, sans toucher au site.
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { SITE } from "./gabarits.mjs";
import { CLE } from "./indexnow.mjs";

export const SEUIL_MS = 3000;
const BASE = process.env.CONTROLE_BASE ?? SITE;
const ENTETES = { "user-agent": "MyClassFlow-controle-quotidien (+https://github.com/ClassFlowBooster/MCF-Landing-Page)" };

/** Problèmes de forme d'un sitemap, et ses adresses. */
export function lireSitemap(xml) {
  const problemes = [];
  if (!/^<\?xml[^>]*\?>\s*<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/.test(xml.trim())) problemes.push("sitemap : en-tête ou urlset absent");
  if (!xml.trim().endsWith("</urlset>")) problemes.push("sitemap : urlset non fermé");
  const urls = [...xml.matchAll(/<url>(.*?)<\/url>/gs)].map((m) => m[1]);
  if (urls.length === 0) problemes.push("sitemap : aucune adresse");
  const adresses = [];
  for (const u of urls) {
    const loc = u.match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (!loc?.startsWith(`${SITE}/`)) { problemes.push(`sitemap : adresse invalide ${loc ?? "(vide)"}`); continue; }
    const lastmod = u.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    if (lastmod && !/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) problemes.push(`sitemap : date invalide pour ${loc}`);
    adresses.push(loc);
  }
  return { adresses, problemes };
}

/** Problèmes des blocs JSON-LD d'une page (JSON illisible, @context absent). */
export function verifierDonneesStructurees(html) {
  const problemes = [];
  for (const [, bloc] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      if (!JSON.parse(bloc)["@context"]) problemes.push("données structurées sans @context");
    } catch {
      problemes.push("données structurées : JSON illisible");
    }
  }
  return problemes;
}

/** Empreinte de la liste des problèmes : l'issue de suivi n'est commentée que si elle change. */
export const empreinte = (problemes) => createHash("sha256").update([...problemes].sort().join("\n")).digest("hex").slice(0, 12);

/** Liens et fichiers internes d'une page (href et src commençant par /). */
export const liensInternes = (html) =>
  [...new Set([...html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)].map((m) => m[1]))];

async function obtenir(adresse) {
  const debut = Date.now();
  const rep = await fetch(adresse.replace(SITE, BASE), { headers: ENTETES, redirect: "manual", signal: AbortSignal.timeout(20_000) });
  const texte = await rep.text();
  return { statut: rep.status, ms: Date.now() - debut, texte };
}

async function principal(sortie) {
  const problemes = [];
  const lignes = [];
  const verifier = async (adresse) => {
    try { return await obtenir(adresse); } catch (e) { problemes.push(`${adresse} : injoignable (${e.cause?.code ?? e.message})`); return null; }
  };

  const sitemap = await verifier(`${SITE}/sitemap.xml`);
  const { adresses, problemes: pbSitemap } = sitemap?.statut === 200 ? lireSitemap(sitemap.texte) : { adresses: [], problemes: [`sitemap : HTTP ${sitemap?.statut}`] };
  problemes.push(...pbSitemap);

  const robots = await verifier(`${SITE}/robots.txt`);
  if (robots && (robots.statut !== 200 || !robots.texte.includes(`Sitemap: ${SITE}/sitemap.xml`))) problemes.push("robots.txt absent ou sans ligne Sitemap");
  if (!CLE) problemes.push("fichier de clé IndexNow absent du dépôt");
  const cle = CLE && (await verifier(`${SITE}/${CLE}.txt`));
  if (cle && (cle.statut !== 200 || cle.texte.trim() !== CLE)) problemes.push("clé IndexNow non servie à la racine");

  const internes = new Set();
  for (const adresse of adresses) {
    const r = await verifier(adresse);
    if (!r) continue;
    lignes.push(`| ${adresse.slice(SITE.length)} | ${r.statut} | ${r.ms} ms |`);
    if (r.statut !== 200) problemes.push(`${adresse} : HTTP ${r.statut}${r.statut >= 300 && r.statut < 400 ? " (redirection)" : ""}`);
    if (r.ms > SEUIL_MS) problemes.push(`${adresse} : ${r.ms} ms (seuil ${SEUIL_MS} ms)`);
    for (const p of verifierDonneesStructurees(r.texte)) problemes.push(`${adresse} : ${p}`);
    for (const l of liensInternes(r.texte)) internes.add(l);
  }
  const pages = new Set(adresses.map((a) => a.slice(SITE.length)));
  for (const lien of [...internes].filter((l) => !pages.has(l)).sort()) {
    const r = await verifier(`${SITE}${lien}`);
    if (r && r.statut !== 200) problemes.push(`lien cassé ${lien} : HTTP ${r.statut}`);
  }

  const rapport = [
    problemes.length ? `**${problemes.length} problème(s)**\n\n${problemes.map((p) => `- ${p}`).join("\n")}` : "**Tout est en ordre.**",
    "", "| Page | HTTP | Temps |", "|---|---|---|", ...lignes,
    "", `${internes.size} liens et fichiers internes vérifiés.`,
    "", `<!-- empreinte:${problemes.length ? empreinte(problemes) : "aucune"} -->`,
  ].join("\n");
  if (sortie) writeFileSync(sortie, rapport);
  console.log(rapport);
  if (problemes.length) process.exitCode = 1;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await principal(process.argv[2]);
