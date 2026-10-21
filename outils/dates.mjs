// Dates des pages, tirées de l'historique Git.
// Sans Git, la génération échoue : mieux vaut aucune date qu'une date inventée.
import { execFileSync } from "node:child_process";

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

/** Date locale du jour, AAAA-MM-JJ. */
export const aujourdhui = (j = new Date()) =>
  `${j.getFullYear()}-${String(j.getMonth() + 1).padStart(2, "0")}-${String(j.getDate()).padStart(2, "0")}`;

/**
 * Date de dernière modification d'une page : celle du dernier commit qui a
 * changé son fichier. Si le fichier généré diffère du dernier commit, il sera
 * commité avec ce changement : la date est celle du jour. Une page inchangée
 * garde donc sa date, quelle que soit la date de génération.
 */
export function dateModification(fichier) {
  const modifie = git("status", "--porcelain", "--", fichier) !== "";
  const date = modifie ? "" : git("log", "-1", "--format=%cs", "--", fichier);
  return date || aujourdhui();
}

/** Date de première publication d'un fichier : celle du commit qui l'a ajouté (le jour même s'il n'est pas encore commité). */
export function datePublication(fichier) {
  const dates = git("log", "--diff-filter=A", "--follow", "--format=%cs", "--", fichier).split("\n").filter(Boolean);
  return dates.at(-1) || aujourdhui();
}
