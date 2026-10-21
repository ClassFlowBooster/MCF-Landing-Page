// Accueil commun : il oriente vers les trois espaces sans présumer du rôle de la personne.
import { castorDe } from "./castors.mjs";
import { EQUIPE, confiance, HEBERGE, RGPD } from "./sections.mjs";
import { FICHES } from "./fiches/index.mjs";
import { adresseFiche } from "./fiche.mjs";
import { THEMES } from "./catalogue.mjs";

// Ligne courte de chaque fiche : celle du menu et du catalogue.
const court = (f) => THEMES.flatMap((t) => t.outils).find((o) => o.fiche === f.slug)?.court ?? f.intro;

const espaces = [
  ["enseignants", "Enseignants", "J'adapte mes supports et je prépare ma classe."],
  ["ecoles", "Écoles", "Je dirige un établissement et j'équipe mon équipe."],
  ["parents-enfants", "Familles", "J'adapte les devoirs et les leçons à la maison."],
];

export default `<div class="acc">
  <section class="section hero"><div class="wrap hero-grid"><div class="hero-copy">
    <span class="eyebrow">MyClassFlow</span>
    <h1 class="h-display">Des supports adaptés, <em>une classe organisée</em></h1>
    <p class="llede">L'app qui adapte les supports aux critères pédagogiques de chaque élève et organise la classe.</p>
  </div><div class="accueil-castor">${castorDe("enseignants", "", 230)}</div></div></section>

  <section class="section who" aria-labelledby="choisir-espace"><div class="wrap">
    <div class="sec-head center"><span class="eyebrow center">Choisir votre espace</span><h2 class="h-section" id="choisir-espace">MyClassFlow selon votre quotidien</h2></div>
    <div class="who-grid trois">
      ${espaces.map(([cle, titre, texte]) => `<article class="persona"><div>${castorDe(cle, "castor-menu", 80)}</div><h3>${titre}</h3><p>${texte}</p><a class="lien-suite" href="/${cle}/">Découvrir l'espace ${titre} →</a></article>`).join("\n      ")}
    </div>
  </div></section>

  <section class="section" aria-labelledby="fonctions"><div class="wrap"><div class="guides">
    <div class="sec-head center"><span class="eyebrow center">Pour la classe</span><h2 class="h-section" id="fonctions">Ce que fait MyClassFlow</h2></div>
    <div class="guides-liste">
      ${FICHES.map((f) => `<a class="guide" href="${adresseFiche(f)}"><span class="tg ${f.k}">${f.k === "free" ? "Gratuit" : "Abonnement"}</span><b>${f.ariane}</b><span class="t">${court(f)}</span></a>`).join("\n      ")}
    </div>
    <p class="centre"><a class="lien-suite" href="/enseignants/fonctionnalites/">Voir toutes les fonctionnalités →</a></p>
  </div></div></section>

  ${confiance([HEBERGE, RGPD], { afficher: true, texte: "MyClassFlow traite les informations utiles à la classe avec une attention particulière à leur protection." })}
  ${EQUIPE}
</div>`;
