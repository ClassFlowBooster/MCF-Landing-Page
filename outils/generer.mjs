// Écrit chaque page de PAGES dans <chemin>/index.html. À relancer après toute
// modification d'un gabarit ou d'une page : `npm run generer`.
import { mkdirSync, writeFileSync } from "node:fs";
import { PAGES } from "./pages.mjs";
import { page } from "./gabarits.mjs";

for (const p of PAGES) {
  const dossier = `.${p.chemin}`;
  mkdirSync(dossier, { recursive: true });
  writeFileSync(`${dossier}index.html`, page(p));
  console.log(`écrit ${dossier}index.html`);
}
