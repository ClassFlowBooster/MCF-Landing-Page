// Accueil de l'espace Enseignants (aussi affiché, flouté, derrière l'écran d'entrée de « / »).
import { texteProf, prixHtml, renvoiHtml, insecables, badgeEnseignant } from "../../assets/js/tarifs-ui.js";
import { THEMES, libelleBadge } from "./catalogue.mjs";
import { COCHE, FLECHE, comparateur, FAMILLES, douleur, confiance, HEBERGE, RGPD, carteConfiance, etapes, formulaireContact, bandeMailto, EQUIPE } from "./sections.mjs";
import { castorDe } from "./castors.mjs";

const prof = texteProf(true, false);

// Grand titre : celui de « / » et celui de /enseignants/ diffèrent, pour que les
// moteurs de recherche ne voient pas deux pages au même titre.
export const TITRE_ENTREE = 'Adaptez chaque support <br class="br-md" />aux besoins de <em>chaque élève.</em> <br class="br-md" />En un clic.';
export const TITRE_ENSEIGNANTS = 'Vos exercices adaptés <br class="br-md" />aux besoins de <em>chaque élève.</em> <br class="br-md" />En un clic.';

export default (titre) => `<div class="acc">
  <section class="section hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <div class="hero-badge"><span class="pill">Nouveau</span><span>L'inclusion scolaire, <b>sans la charge de travail</b></span></div>
        <h1 class="h-display">${titre}</h1>
        <p class="llede">MyClassFlow régénère vos exercices et vos leçons selon les critères pédagogiques que vous cochez&nbsp;: texte agrandi, mise en page aérée, consignes en étapes… Vous gagnez des heures&nbsp;; chaque élève reçoit un support personnalisé.</p>
        <div class="hero-actions">
          <a class="lbtn lbtn-primary lbtn-lg" href="https://app.myclassflow.fr">Créer mon compte gratuit ${FLECHE}</a>
          <a class="lbtn lbtn-ghost lbtn-lg" href="#etapes">Voir comment ça marche</a>
        </div>
        <div class="hero-reassure"><span>${COCHE} Hébergé en France</span><span>${COCHE} Conforme RGPD</span><span>${COCHE} Conçu avec des enseignants</span></div>
      </div>
      <div class="hero-demo">
        ${comparateur()}
        ${castorDe("enseignants", "castor-hero", 230)}
      </div>
    </div>
  </section>

  ${FAMILLES}

  <section class="section problem">
    <div class="wrap problem-grid">
      <div>
        <span class="eyebrow">Le constat</span>
        <h2 class="h-section" style="margin:16px 0 18px;">Différencier est essentiel.<br /><span class="serif-em text-coral">Mais ça vous prend vos soirées.</span></h2>
        <p class="llede" style="margin-bottom:14px;">Agrandir le texte pour un élève, découper les consignes pour un autre, refaire la mise en page, suivre chaque progrès… L'école inclusive est une mission que vous portez tous les jours.</p>
        <p style="color:var(--ink-2); font-size:16px;">Mais aujourd'hui, elle repose sur des heures de remise en forme manuelle, des documents refaits un par un, et une charge mentale qui s'accumule. Le temps passé sur la mise en page, c'est du temps en moins pour vos élèves.</p>
      </div>
      <div class="pain-list">
        ${douleur("horloge", "Chronophage", "Refaire un même support pour trois élèves différents, à la main, chaque semaine.")}
        ${douleur("alerte", "Complexe", "Trouver la bonne présentation pour chaque élève, puis la refaire à la main dans chaque document, demande un temps que personne n'a.")}
        ${douleur("lignes", "Éparpillé", "Cahier journal, suivi des élèves, évaluations, agenda : autant d'outils séparés, aucune vue d'ensemble.")}
      </div>
    </div>
  </section>

  <section class="section" id="solution" style="background:linear-gradient(180deg,var(--paper),var(--paper-2))">
    <div class="wrap">
      <div class="sec-head center">
        <span class="eyebrow center">La solution</span>
        <h2 class="h-section">Tout ce qu'il faut pour votre classe</h2>
        <p class="llede">La gestion de classe est gratuite, avec 3 adaptations offertes. L'IA qui adapte vos supports est dans l'abonnement.</p>
      </div>
      <div class="themes">
        ${THEMES.map((t) => `<div class="theme-carte"><h3>${t.titre}</h3><p>${t.sous}</p><ul>${t.outils.map((o) => `<li>${o.nom} <span class="tg ${o.k}">${libelleBadge(o)}</span></li>`).join("")}</ul></div>`).join("\n        ")}
      </div>
      <p class="centre"><a class="lien-suite" href="/enseignants/fonctionnalites/">Voir toutes les fonctionnalités →</a></p>
    </div>
  </section>

  ${etapes({ titre: "Trois étapes, quelques secondes", texte: "De votre support habituel à un document adapté, sans rien réapprendre.", liste: [
    ["1", "Choisir", "Les critères pédagogiques", "Cochez les critères utiles&nbsp;: texte agrandi, lignes espacées, consignes en étapes… Enregistrez-les pour un élève, ou adaptez un support sans le relier à un élève. Importez ou collez le support."],
    ["2", "Adapter", "L'IA fait le travail", "Police lisible, mise en page aérée, consignes reformulées pas à pas&nbsp;: le document est régénéré selon les critères cochés. Un même support adapté sert à tous les élèves qui ont les mêmes critères."],
    ["3", "Imprimer", "Ou télécharger", "Récupérez le support adapté et la version d'origine. Choisissez le nombre de copies à l'impression, ou téléchargez le PDF."],
  ] })}

  <section class="section apercu" id="tarifs">
    <div class="wrap">
      <h2 class="t">Un prix simple, pour toute votre classe</h2>
      <p class="lead">Commencez gratuitement, passez à l'abonnement quand vous voulez adapter vos supports.</p>
      <div class="cards deux">
        <div class="card">
          <span class="badge vert">Sans carte bancaire</span>
          <h3>Gratuit</h3>
          <p class="d">Toute la gestion de classe, pour toujours</p>
          <div class="old"></div>
          <div class="price">0 €</div>
          <span class="quota"><i>3</i> adaptations offertes</span>
          <div class="grow"></div>
          <a class="btn ghost" href="https://app.myclassflow.fr">Créer mon compte gratuit</a>
        </div>
        <div class="card hl">
          <span class="badge">${badgeEnseignant()}</span>
          <h3>MyClassFlow Enseignant</h3>
          <p class="d">Pour un·e enseignant·e, toutes classes confondues</p>
          <div class="old">${insecables(prof.old)}</div>
          <div class="price">${prixHtml(prof)}</div>
          <div class="fine">${renvoiHtml(prof)}</div>
          <a class="btn" href="https://app.myclassflow.fr">Je commence</a>
        </div>
      </div>
      ${bandeMailto("direction")}
      <p class="centre"><a class="lien-suite" href="/enseignants/tarifs/">Voir les tarifs →</a></p>
    </div>
  </section>

  ${confiance([HEBERGE, RGPD, carteConfiance("equipe", "Conçu avec des enseignants",
    "Chaque fonctionnalité est imaginée et testée avec des professeurs des écoles. L'outil suit vos pratiques réelles, pas l'inverse.")],
  { texte: "Les informations sur vos élèves doivent être protégées. MyClassFlow est conçu pour cela, dès le premier jour.",
    note: "MyClassFlow se construit avec les premiers établissements partenaires." })}

  ${EQUIPE}

  <section class="section final" id="contact">
    <div class="wrap final-grid">
      <div>
        <span class="eyebrow center" style="color:var(--coral-300)">Demander une démo</span>
        <h2 style="margin-top:16px;">Découvrez MyClassFlow avec votre classe</h2>
        <p class="llede">Présentez-nous votre contexte&nbsp;: nous vous montrons l'adaptation des supports en direct et répondons à vos questions sur les données et le déploiement.</p>
        <ul class="final-points">
          <li>${COCHE} Démonstration adaptée à votre cycle (2 ou 3)</li>
          <li>${COCHE} Échange sur l'hébergement et le RGPD</li>
          <li>${COCHE} Conditions « premiers établissements »</li>
        </ul>
        <a class="lbtn lbtn-primary lbtn-lg" href="https://app.myclassflow.fr">Créer mon compte gratuit ${FLECHE}</a>
      </div>
      <div>
        ${formulaireContact({ titre: "Parlons de votre classe", sous: "Réponse sous 48&nbsp;h ouvrées.", message: "Votre contexte, votre cycle, vos besoins…" })}
      </div>
    </div>
  </section>
</div>`;
