// Écrit chaque page de PAGES dans <chemin>/index.html, la page 404 dans
// 404.html, puis sitemap.xml, robots.txt et llms.txt. À relancer après toute
// modification d'un gabarit ou d'une page : `npm run generer`.
import { mkdirSync, writeFileSync } from "node:fs";
import { PAGES, PAGE_404 } from "./pages.mjs";
import { page } from "./gabarits.mjs";
import { sitemap, robots, llms, dateModification } from "./racine.mjs";

for (const p of PAGES) {
  const dossier = `.${p.chemin}`;
  mkdirSync(dossier, { recursive: true });
  writeFileSync(`${dossier}index.html`, page(p));
  console.log(`écrit ${dossier}index.html`);
}

writeFileSync("404.html", page(PAGE_404));
console.log("écrit 404.html");

// Après l'écriture des pages : une page dont le HTML a changé prend la date du jour.
writeFileSync("sitemap.xml", sitemap(PAGES.map((p) => ({ chemin: p.chemin, lastmod: dateModification(`.${p.chemin}index.html`) }))));
writeFileSync("robots.txt", robots());
writeFileSync("llms.txt", llms(PAGES));
console.log("écrit sitemap.xml, robots.txt et llms.txt");
