// Imprime les modèles à télécharger (outils/modeles/*.html) en PDF dans
// assets/docs/, avec Chrome sans fenêtre. À relancer après toute modification
// d'un modèle : `npm run modeles` (variable CHROME pour un autre chemin).
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

for (const f of readdirSync("outils/modeles").filter((n) => n.endsWith(".html"))) {
  const sortie = `assets/docs/modele-${f.replace(/\.html$/, ".pdf")}`;
  execFileSync(CHROME, ["--headless", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${resolve(sortie)}`,
    pathToFileURL(resolve("outils/modeles", f)).href], { stdio: "ignore" });
  console.log(`écrit ${sortie}`);
}
