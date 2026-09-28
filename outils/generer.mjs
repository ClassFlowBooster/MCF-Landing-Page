// Écrit chaque page de PAGES dans <chemin>/index.html, puis sitemap.xml et
// robots.txt. À relancer après toute modification d'un gabarit ou d'une page :
// `npm run generer`.
import { mkdirSync, writeFileSync } from "node:fs";
import { PAGES } from "./pages.mjs";
import { page, SITE } from "./gabarits.mjs";

for (const p of PAGES) {
  const dossier = `.${p.chemin}`;
  mkdirSync(dossier, { recursive: true });
  writeFileSync(`${dossier}index.html`, page(p));
  console.log(`écrit ${dossier}index.html`);
}

const urls = PAGES.map((p) => `  <url><loc>${SITE}${p.chemin}</loc></url>`).join("\n");
writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
writeFileSync("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log("écrit sitemap.xml et robots.txt");
