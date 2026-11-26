// Écrit chaque page de PAGES dans <chemin>/index.html, la page 404 dans
// 404.html, puis sitemap.xml, robots.txt, llms.txt et llms-full.txt. À relancer après toute
// modification d'un gabarit ou d'une page : `npm run generer`.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { cssPourPage, adresseCssProto } from "./css-page.mjs";
import { PAGES, PAGE_404 } from "./pages.mjs";
import { page } from "./gabarits.mjs";
import { sitemap, robots, llms, llmsFull, dateModification } from "./racine.mjs";

// Feuille du proto, réduite pour chaque page qui montre un visuel de l'app.
const cssProto = readFileSync("assets/css/visuels-proto.css", "utf8");
mkdirSync("assets/css/visuels-proto", { recursive: true });

for (const p of PAGES) {
  const dossier = `.${p.chemin}`;
  mkdirSync(dossier, { recursive: true });
  const html = page(p);
  writeFileSync(`${dossier}index.html`, html);
  console.log(`écrit ${dossier}index.html`);
  const adresseCss = adresseCssProto(p.chemin);
  if (html.includes(`href="${adresseCss}"`)) writeFileSync(`.${adresseCss}`, cssPourPage(cssProto, html));
}

writeFileSync("404.html", page(PAGE_404));
console.log("écrit 404.html");

// Après l'écriture des pages : une page dont le HTML a changé prend la date du jour.
const pagesIndexables = PAGES.filter((p) => p.indexable !== false);
writeFileSync("sitemap.xml", sitemap(pagesIndexables.map((p) => ({ chemin: p.chemin, lastmod: dateModification(`.${p.chemin}index.html`) }))));
writeFileSync("robots.txt", robots());
writeFileSync("llms.txt", llms(pagesIndexables));
writeFileSync("llms-full.txt", llmsFull(pagesIndexables));
console.log("écrit sitemap.xml, robots.txt, llms.txt et llms-full.txt");
