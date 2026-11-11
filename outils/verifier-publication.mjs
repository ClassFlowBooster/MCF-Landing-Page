// Empêche la publication d'une page qui contient encore un renseignement ou
// un lien de paiement provisoire. Usage : node outils/verifier-publication.mjs [dossier-site]
import { readdirSync, readFileSync } from "node:fs";
import { resolve, relative, join, extname } from "node:path";
import { pathToFileURL } from "node:url";

const DOSSIERS_EXCLUS = new Set([".git", "outils", "tests", "docs", "node_modules", ".github", ".claude"]);
const EXTENSIONS_PUBLIEES = new Set([".html", ".txt", ".xml", ".js"]);
const MARQUE = /À COMPLÉTER|STRIPE_LIEN_/u;

const extrait = (ligne) => {
  const resultat = MARQUE.exec(ligne);
  MARQUE.lastIndex = 0;
  const debut = Math.max(0, resultat.index - 60);
  const fin = Math.min(ligne.length, resultat.index + resultat[0].length + 100);
  return `${debut ? "…" : ""}${ligne.slice(debut, fin).trim()}${fin < ligne.length ? "…" : ""}`;
};

function fichiersPublies(dossier, racine = dossier) {
  const trouves = [];
  for (const entree of readdirSync(dossier, { withFileTypes: true })) {
    if (entree.isDirectory()) {
      if (!DOSSIERS_EXCLUS.has(entree.name)) trouves.push(...fichiersPublies(join(dossier, entree.name), racine));
      continue;
    }
    if (entree.isFile() && EXTENSIONS_PUBLIEES.has(extname(entree.name).toLowerCase())) {
      trouves.push({ absolu: join(dossier, entree.name), relatif: relative(racine, join(dossier, entree.name)) });
    }
  }
  return trouves;
}

export function verifierPublication(dossier = process.cwd()) {
  const racine = resolve(dossier);
  const erreurs = [];
  for (const fichier of fichiersPublies(racine)) {
    const lignes = readFileSync(fichier.absolu, "utf8").split(/\r?\n/);
    lignes.forEach((ligne, index) => {
      if (MARQUE.test(ligne)) erreurs.push(`${fichier.relatif}:${index + 1}: ${extrait(ligne)}`);
      MARQUE.lastIndex = 0;
    });
  }
  return erreurs;
}

function executer() {
  const erreurs = verifierPublication(process.argv[2]);
  if (erreurs.length) {
    console.error("Publication bloquée : informations provisoires détectées.");
    for (const erreur of erreurs) console.error(erreur);
    process.exitCode = 1;
  } else {
    console.log("Vérification de publication réussie.");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) executer();
