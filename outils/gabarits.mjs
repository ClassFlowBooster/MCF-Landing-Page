// Gabarits communs des pages : <head>, barre du haut, pied de page.
// Le HTML final est écrit par outils/generer.mjs et commité (site statique).

export const SITE = "https://myclassflow.fr";

export const ESPACES = {
  enseignants: { cle: "enseignants", libelle: "Espace Enseignants", emoji: "🧑‍🏫",
    cta: { texte: "Essayer gratuitement", href: "https://app.myclassflow.fr" }, tarifs: "Tarifs" },
  ecoles: { cle: "ecoles", libelle: "Espace Écoles", emoji: "🏫",
    cta: { texte: "Demander un devis", href: "/ecoles/tarifs/#devis" }, tarifs: "Tarifs & devis" },
  "parents-enfants": { cle: "parents-enfants", libelle: "Espace Parents / Enfants", emoji: "👨‍👧",
    cta: { texte: "Essayer gratuitement", href: "https://adapter.myclassflow.fr" }, tarifs: "Tarifs" },
};

const echap = (t) => t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function barre(espace, rubrique, megaMenu) {
  const e = ESPACES[espace];
  const lien = (r, texte) =>
    `<a class="nav-link${rubrique === r ? " cur" : ""}" href="/${espace}/${r ? r + "/" : ""}"${rubrique === r ? ' aria-current="page"' : ""}>${echap(texte)}</a>`;
  const autres = Object.values(ESPACES)
    .map((x) => `<a role="menuitem" href="/${x.cle}/" data-espace="${x.cle}">${x.emoji} ${x.libelle}</a>`).join("");
  return `<header class="header"><nav class="nav" aria-label="Navigation principale">
  <a class="brand" href="/${espace}/"><span class="dot" aria-hidden="true"></span>ClassFlow</a>
  <div class="espace-choix">
    <button class="pill" type="button" aria-haspopup="menu" aria-expanded="false">${e.emoji} ${e.libelle} <span class="fleche" aria-hidden="true">▾</span></button>
    <div class="espace-menu" role="menu" hidden>${autres}</div>
  </div>
  <div class="nav-links">
    <div class="navrel"><button class="nav-link mega-bouton${rubrique === "fonctionnalites" ? " cur" : ""}" type="button" aria-expanded="false" aria-controls="mega">Fonctionnalités <span class="fleche" aria-hidden="true">▾</span></button>${megaMenu ?? ""}</div>
    ${lien("tarifs", e.tarifs)}
    ${lien("telecharger", "Télécharger")}
  </div>
  <span class="sp"></span>
  <a class="btn" href="${e.cta.href}">${e.cta.texte}</a>
  <button class="nav-burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="menuMobile"><span></span><span></span><span></span></button>
</nav>
<nav class="mobile-menu" id="menuMobile" hidden aria-label="Navigation mobile">
  <a href="/${espace}/fonctionnalites/">Fonctionnalités</a><a href="/${espace}/tarifs/">${echap(e.tarifs)}</a><a href="/${espace}/telecharger/">Télécharger</a>${autres}
</nav></header>`;
}

function pied() {
  return `<footer class="footer"><div class="footer-inner">
  <span>© ClassFlow</span>
  <a href="/enseignants/">Enseignants</a><a href="/ecoles/">Écoles</a><a href="/parents-enfants/">Parents / Enfants</a>
  <a href="/presentation/">Présentation</a>
</div></footer>`;
}

export function page({ espace, rubrique = "", titre, description, chemin, corps, scripts = [], megaMenu = "", classeBody = "" }) {
  const js = scripts.map((s) => `<script type="module" src="/assets/js/${s}"></script>`).join("\n");
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${echap(titre)}</title>
<meta name="description" content="${echap(description)}" />
<link rel="canonical" href="${SITE}${chemin}" />
<meta property="og:title" content="${echap(titre)}" />
<meta property="og:description" content="${echap(description)}" />
<meta property="og:url" content="${SITE}${chemin}" />
<meta property="og:type" content="website" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" />
<link rel="stylesheet" href="/assets/css/base.css" />
</head>
<body${classeBody ? ` class="${classeBody}"` : ""} data-espace="${espace ?? ""}">
${espace ? barre(espace, rubrique, megaMenu) : ""}
<main>
${corps}
</main>
${pied()}
<script type="module" src="/assets/js/navigation.js"></script>
${js}
</body>
</html>
`;
}
