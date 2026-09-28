// Accueil de l'espace Enseignants (aussi affiché, flouté, derrière l'écran d'entrée de « / »).
import { texteProf, prixHtml, renvoiHtml, insecables, badgeEnseignant } from "../../assets/js/tarifs-ui.js";
import { lienMailto } from "../../assets/js/formulaire.js";
import { THEMES, libelleBadge } from "./catalogue.mjs";
import { COCHE, FLECHE, comparateur, TROUBLES, douleur, confiance, HEBERGE, RGPD, carteConfiance, etapes, formulaireContact } from "./sections.mjs";
import { castor } from "./castors.mjs";

const prof = texteProf(true, false);

export default `<div class="acc">
  <section class="section hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <div class="hero-badge"><span class="pill">Nouveau</span><span>L'inclusion scolaire, <b>sans la charge de travail</b></span></div>
        <h1 class="h-display">Adaptez chaque support <br class="br-md" />aux besoins de <em>chaque élève.</em> <br class="br-md" />En un clic.</h1>
        <p class="llede">ClassFlow régénère vos exercices et vos leçons pour les élèves DYS, TDAH, TSA, EANA… grâce à l'IA. Vous gagnez des heures&nbsp;; chaque enfant reçoit immédiatement un document fait pour lui.</p>
        <div class="hero-actions">
          <a class="lbtn lbtn-primary lbtn-lg" href="https://app.myclassflow.fr">Créer mon compte gratuit ${FLECHE}</a>
          <a class="lbtn lbtn-ghost lbtn-lg" href="#etapes">Voir comment ça marche</a>
        </div>
        <div class="hero-reassure"><span>${COCHE} Hébergé en France</span><span>${COCHE} Conforme RGPD</span><span>${COCHE} Conçu avec des enseignants</span></div>
      </div>
      <div class="hero-demo">
        ${comparateur()}
        ${castor("professeur", "castor-hero", 230)}
      </div>
    </div>
  </section>

  ${TROUBLES}

  <section class="section problem">
    <div class="wrap problem-grid">
      <div>
        <span class="eyebrow">Le constat</span>
        <h2 class="h-section" style="margin:16px 0 18px;">Différencier est essentiel.<br /><span class="serif-em text-coral">Mais ça vous prend vos soirées.</span></h2>
        <p class="llede" style="margin-bottom:14px;">Adapter un exercice pour un élève dyslexique, un autre pour un élève TDAH, rédiger un PPRE, suivre chaque progrès… L'école inclusive est une mission que vous portez tous les jours.</p>
        <p style="color:var(--ink-2); font-size:16px;">Mais aujourd'hui, elle repose sur des heures de remise en forme manuelle, des documents refaits un par un, et une charge mentale qui s'accumule. Le temps passé sur la mise en page, c'est du temps en moins pour vos élèves.</p>
      </div>
      <div class="pain-list">
        ${douleur("horloge", "Chronophage", "Reformer un même support pour trois profils différents, à la main, chaque semaine.")}
        ${douleur("alerte", "Complexe", "Connaître les bons aménagements pour chaque trouble demande une expertise que personne n'a le temps d'acquérir seul.")}
        ${douleur("lignes", "Éparpillé", "Cahier journal, dispositifs, suivi, agenda : autant d'outils séparés, aucune vue d'ensemble.")}
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
    ["1", "Choisir", "L'élève ou le trouble", "Sélectionnez un élève de votre classe — son profil est déjà connu — ou directement un trouble. Importez ou collez le support à adapter."],
    ["2", "Adapter", "L'IA fait le travail", "Police lisible, mise en page aérée, consignes reformulées pas à pas&nbsp;: le document est régénéré selon les aménagements adaptés au profil."],
    ["3", "Partager", "Imprimer ou envoyer", "Récupérez la version adaptée et la version de référence. À imprimer pour l'élève, à archiver dans son suivi, ou à partager en un lien."],
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
          <h3>ClassFlow Enseignant</h3>
          <p class="d">Pour un·e enseignant·e, toutes classes confondues</p>
          <div class="old">${insecables(prof.old)}</div>
          <div class="price">${prixHtml(prof)}</div>
          <div class="fine">${renvoiHtml(prof)}</div>
          <a class="btn" href="https://app.myclassflow.fr">Je commence</a>
        </div>
      </div>
      <div class="band">${castor("direction", "castor-bande", 88)}<div style="flex:1"><b>Faites équiper votre école</b><p>Envoyez l'offre école à votre direction en un clic : votre abonnement pourrait être pris en charge, et toute l'équipe en profite.</p></div><a class="btn" data-mailto="direction" href="${lienMailto("direction")}">Envoyer à ma direction</a></div>
      <p class="centre"><a class="lien-suite" href="/enseignants/tarifs/">Voir les tarifs →</a></p>
    </div>
  </section>

  ${confiance([HEBERGE, RGPD, carteConfiance("equipe", "Conçu avec des enseignants",
    "Chaque fonctionnalité est imaginée et testée avec des professeurs des écoles. L'outil suit vos pratiques réelles, pas l'inverse.")],
  { texte: "Les informations sur vos élèves sont sensibles. ClassFlow est conçu pour les protéger, dès le premier jour.",
    note: "ClassFlow se construit avec les premiers établissements partenaires." })}

  <section class="section final" id="contact">
    <div class="wrap final-grid">
      <div>
        <span class="eyebrow center" style="color:var(--coral-300)">Demander une démo</span>
        <h2 style="margin-top:16px;">Découvrez ClassFlow avec votre classe</h2>
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
