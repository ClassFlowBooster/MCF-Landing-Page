// Accueil de l'espace Parents / Enfants (ClassFlow Adapter).
import { texteAdapter, prixHtml, insecables } from "../../assets/js/tarifs-ui.js";
import { lienMailto } from "../../assets/js/formulaire.js";
import { COCHE, FLECHE, demo, TROUBLES, confiance, HEBERGE, RGPD, carteConfiance, etapes, bandeau } from "./sections.mjs";

const e = texteAdapter("essentiel", true, false);
const i = texteAdapter("illimite", true, false);

const question = (q, r) => `<details><summary>${q}</summary><p>${r}</p></details>`;

export default `<div class="acc">
  <section class="section hero">
    <div class="wrap hero-seul">
      <div class="hero-badge"><span class="pill">Adapter</span><span>Pour les familles, <b>tous les enfants du foyer</b></span></div>
      <h1 class="h-display">Les devoirs de votre enfant, <em>adaptés en une photo</em></h1>
      <p class="llede">Prenez en photo la leçon ou l'exercice : ClassFlow Adapter le transforme selon les besoins de votre enfant — DYS, TDAH, TSA…</p>
      <div class="hero-actions">
        <a class="lbtn lbtn-primary lbtn-lg" href="https://adapter.myclassflow.fr">Essayer gratuitement ${FLECHE}</a>
        <a class="lbtn lbtn-ghost lbtn-lg" href="#exemple">Voir un exemple</a>
      </div>
      <div class="hero-reassure"><span>${COCHE} 3 adaptations offertes</span><span>${COCHE} Sans carte bancaire</span><span>${COCHE} Hébergé en France</span></div>
    </div>
  </section>

  ${TROUBLES}

  ${etapes({ titre: "Une photo, quelques secondes", texte: "Pas besoin de tout retaper : ClassFlow Adapter part de la page que votre enfant a sous les yeux.", liste: [
    ["1", "Photographiez", "La leçon ou l'exercice", "La leçon, l'exercice ou la page du cahier."],
    ["2", "Choisissez", "Les besoins de votre enfant", "Les besoins de votre enfant : dyslexie, TDAH, TSA…"],
    ["3", "Imprimez", "Ou lisez à l'écran", "Une version claire et aérée, prête en quelques secondes."],
  ] })}

  <section class="section exemple" id="exemple">
    <div class="wrap">
      <div class="sec-head center">
        <span class="eyebrow center">Avant / après</span>
        <h2 class="h-section">La page d'origine, et sa version adaptée</h2>
        <p class="llede">Même contenu, même exercice : une consigne à la fois, une police lisible, des lignes espacées.</p>
      </div>
      ${demo({ original: "La page d'origine", annotation: false })}
    </div>
  </section>

  <section class="section apercu" id="tarifs" style="padding-top:0">
    <div class="wrap">
      <h2 class="t">Essayez gratuitement, puis choisissez votre formule</h2>
      <p class="lead">Un abonnement couvre tous les enfants du foyer.</p>
      <div class="cards3">
        <div class="card free">
          <span class="badge vert">Sans carte bancaire</span>
          <h3>Essai gratuit</h3>
          <p class="d">Pour découvrir, sans rien payer</p>
          <div class="old"></div>
          <div class="price">0 €</div>
          <span class="quota"><i>3</i> adaptations offertes</span>
          <div class="grow"></div>
          <a class="btn ghost" href="https://adapter.myclassflow.fr">J'essaie gratuitement</a>
        </div>
        <div class="card">
          <span class="badge">−50 % les 3 premiers mois</span>
          <h3>Essentiel</h3>
          <p class="d">Les devoirs de la semaine</p>
          <div class="old">${insecables(e.old)}</div>
          <div class="price">${prixHtml(e)}</div>
          <span class="quota"><i>Adaptations limitées</i> par mois</span>
          <div class="grow"></div>
          <a class="btn ghost" href="https://adapter.myclassflow.fr">Je choisis Essentiel</a>
        </div>
        <div class="card hl">
          <span class="pop">Le plus choisi</span>
          <span class="badge">−50 % les 3 premiers mois</span>
          <h3>Illimité</h3>
          <p class="d">Toutes les leçons, tous les exercices</p>
          <div class="old">${insecables(i.old)}</div>
          <div class="price">${prixHtml(i)}</div>
          <span class="quota"><i>∞</i> adaptations illimitées</span>
          <div class="grow"></div>
          <a class="btn" href="https://adapter.myclassflow.fr">Je choisis Illimité</a>
        </div>
      </div>
      <p class="renvoi"><b>*</b> Pendant 3 mois avec un engagement de 6 mois.</p>
      <p class="centre"><a class="lien-suite" href="/parents-enfants/tarifs/">Voir les tarifs →</a></p>
    </div>
  </section>

  ${confiance([
    carteConfiance("photo", "Les photos de votre enfant restent privées", "Elles servent uniquement à produire la version adaptée."),
    HEBERGE, RGPD],
  { titre: "Les données de votre enfant, protégées", texte: "Les devoirs et les besoins de votre enfant sont des informations sensibles. ClassFlow Adapter est conçu pour les protéger." })}

  ${bandeau("🏫", "Et si l'école de votre enfant s'équipait ?", "Parlez de ClassFlow à l'enseignant·e : les adaptations seraient faites directement en classe.", "Envoyer à l'école", lienMailto("ecole"), 'data-mailto="ecole" ')}

  <section class="section" id="questions" style="padding-top:0">
    <div class="wrap">
      <div class="sec-head center">
        <span class="eyebrow center">Questions fréquentes</span>
        <h2 class="h-section">Vos questions</h2>
      </div>
      <div class="faq">
        ${question("Faut-il un diagnostic ?", "Non. Vous choisissez les besoins de votre enfant, avec ou sans diagnostic.")}
        ${question("Sur quels appareils ?", "Téléphone, tablette et ordinateur : voir la page <a href=\"/parents-enfants/telecharger/\">Télécharger</a>.")}
        ${question("Combien d'enfants ?", "Un abonnement couvre tous les enfants du foyer.")}
        ${question("Puis-je résilier ?", "Sans engagement, à tout moment. Avec engagement, à la fin des 6 mois.")}
      </div>
    </div>
  </section>
</div>`;
