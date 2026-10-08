// Gabarits communs des pages : <head>, barre du haut, pied de page.
// Le HTML final est écrit par outils/generer.mjs et commité (site statique).
import { megaMenu as megaMenuDe } from "./corps/mega-menu.mjs";
import { castor, castorDe } from "./corps/castors.mjs";

export const SITE = "https://myclassflow.fr";

export const ESPACES = {
  enseignants: { cle: "enseignants", libelle: "Espace Enseignants",
    cta: { texte: "Essayer gratuitement", href: "https://app.myclassflow.fr" }, tarifs: "Tarifs" },
  ecoles: { cle: "ecoles", libelle: "Espace Écoles",
    cta: { texte: "Demander un devis", href: "/ecoles/tarifs/#devis" }, tarifs: "Tarifs & devis" },
  "parents-enfants": { cle: "parents-enfants", libelle: "Espace Parents / Enfants",
    cta: { texte: "Essayer gratuitement", href: "https://adapter.myclassflow.fr" }, tarifs: "Tarifs" },
};

// Logo de l'en-tête : il n'existe pas encore de logo MyClassFlow distinct des
// mascottes, le castor professeur (celui du favicon) en tient lieu. Décoratif :
// le nom « MyClassFlow » suit dans le lien.
const LOGO = castor("professeur", "castor-logo", 32);

const echap = (t) => t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Cartes de partage (1200 × 630) : une par espace, et une commune pour l'écran d'entrée.
const CARTES = {
  "": { fichier: "og-classflow.png", alt: "MyClassFlow : les castors professeur, direction et élève, avec l'accroche « Adaptez chaque support aux besoins de chaque élève »." },
  enseignants: { fichier: "og-enseignants.png", alt: "MyClassFlow, espace Enseignants : le castor professeur et l'accroche « Adaptez chaque support aux besoins de chaque élève »." },
  ecoles: { fichier: "og-ecoles.png", alt: "MyClassFlow, espace Écoles : le castor direction et l'accroche « L'école inclusive, outillée pour toute l'équipe »." },
  "parents-enfants": { fichier: "og-parents-enfants.png", alt: "MyClassFlow Famille, espace Parents / Enfants : le castor élève et l'accroche « Les devoirs de votre enfant, adaptés en une photo »." },
};

function barre(espace, rubrique, megaMenu) {
  const e = ESPACES[espace];
  const lien = (r, texte) =>
    `<a class="nav-link${rubrique === r ? " cur" : ""}" href="/${espace}/${r ? r + "/" : ""}"${rubrique === r ? ' aria-current="page"' : ""}>${echap(texte)}</a>`;
  // Menus fermés au chargement : leurs castors ne se téléchargent qu'à l'ouverture.
  const autres = Object.values(ESPACES)
    .map((x) => `<a role="menuitem" href="/${x.cle}/" data-espace="${x.cle}">${castorDe(x.cle, "castor-menu", 26, { differe: true })}${x.libelle}</a>`).join("");
  return `<header class="header"><nav class="nav" aria-label="Navigation principale">
  <a class="brand" href="/${espace}/">${LOGO}MyClassFlow</a>
  <div class="espace-choix">
    <button class="pill" type="button" aria-haspopup="menu" aria-expanded="false">${castorDe(espace, "castor-menu", 26)}${e.libelle} ▾</button>
    <div class="espace-menu" role="menu" hidden>${autres}</div>
  </div>
  <div class="nav-links">
    <div class="navrel"><button class="nav-link mega-bouton${rubrique === "fonctionnalites" ? " cur" : ""}" type="button" aria-expanded="false" aria-controls="mega">Fonctionnalités</button>${megaMenu ?? ""}</div>
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
  <span>© MyClassFlow</span>
  <a href="/enseignants/">Enseignants</a><a href="/ecoles/">Écoles</a><a href="/parents-enfants/">Parents / Enfants</a>
  <a href="/presentation/">Présentation</a>
</div></footer>`;
}

export function page({ espace, rubrique = "", titre, description, chemin, corps, scripts = [], megaMenu, classeBody = "", surcouche = "" }) {
  const carte = CARTES[chemin === "/" ? "" : espace ?? ""];
  const js = scripts.map((s) => `<script type="module" src="/assets/js/${s}"></script>`).join("\n");
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${echap(titre)}</title>
<meta name="description" content="${echap(description)}" />
<link rel="canonical" href="${SITE}${chemin}" />
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/assets/img/apple-touch-icon.png" />
<meta property="og:title" content="${echap(titre)}" />
<meta property="og:description" content="${echap(description)}" />
<meta property="og:url" content="${SITE}${chemin}" />
<meta property="og:type" content="website" />
<meta property="og:image" content="${SITE}/assets/img/${carte.fichier}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="${echap(carte.alt)}" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=Lexend:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap" />
<link rel="stylesheet" href="/assets/css/base.css" />
</head>
<body${classeBody ? ` class="${classeBody}"` : ""} data-espace="${espace ?? ""}">
${surcouche}${espace ? barre(espace, rubrique, megaMenu ?? megaMenuDe(espace)) : ""}
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
