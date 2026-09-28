// Accueil de l'espace Écoles.
import { COCHE, FLECHE, comparateur, TROUBLES, douleur, confiance, HEBERGE, RGPD, carteConfiance, formulaireContact, ICONES } from "./sections.mjs";

const benefice = (ic, titre, texte) =>
  `<article class="persona"><span class="persona-ic">${ICONES[ic]}</span><h3>${titre}</h3><p>${texte}</p></article>`;

const persona = (extrait, titre, texte, pied) =>
  `<article class="persona avec-extrait"><div class="extrait" aria-hidden="true">${extrait}</div><h3>${titre}</h3><p>${texte}</p><div class="persona-foot">${COCHE} ${pied}</div></article>`;

// Extraits de l'app (illustratifs) en tête des cartes « Pour qui ».
const trouble = (t) => `<i style="background:var(--t-${t})"></i>`;
const EXTRAIT_PROF = `<div class="mini"><div class="mini-t"><i></i>Ma semaine · CM1</div><div class="mini-kpi"><div><b>14</b><span>supports adaptés</span></div><div><b>2 h 10</b><span>de temps gagné</span></div></div><div class="mini-barre"><i></i></div></div>`;
const EXTRAIT_ECOLE = `<div class="mini"><div class="mini-t"><i></i>École · vue d'ensemble</div><div class="mini-classes">${[["CP", ["dys", "tdah"]], ["CE1", ["tsa"]], ["CE2", ["dys", "eana"]], ["CM1", ["dys", "tdah", "tsa"]]].map(([c, ts]) => `<div>${c}<em>${ts.map(trouble).join("")}</em></div>`).join("")}</div><div class="mini-note">Mêmes aménagements pour un élève, d'une classe à l'autre</div></div>`;
const EXTRAIT_FORMATION = `<div class="mini"><div class="mini-t"><i></i>Parcours · école inclusive</div><div class="mini-modules"><div><b>✓</b>Repérer les besoins d'un élève</div><div><b>✓</b>Choisir les aménagements</div><div><b class="a-faire">3</b>Adapter un support en classe</div></div></div>`;

export default `<div class="acc">
  <section class="section hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <div class="hero-badge"><span class="pill">Écoles</span><span>Une démarche commune, <b>dans chaque classe</b></span></div>
        <h1 class="h-display">L'école inclusive, <em>outillée</em> pour toute l'équipe</h1>
        <p class="llede">Une même démarche d'adaptation dans chaque classe, des élèves mieux accompagnés, une seule facture pour l'établissement.</p>
        <div class="hero-actions">
          <a class="lbtn lbtn-primary lbtn-lg" href="/ecoles/tarifs/#devis">Calculer mon devis ${FLECHE}</a>
          <a class="lbtn lbtn-ghost lbtn-lg" href="#contact">Prendre rendez-vous</a>
        </div>
        <div class="hero-reassure"><span>${COCHE} Hébergé en France</span><span>${COCHE} Conforme RGPD</span><span>${COCHE} Devis sous 48 h</span></div>
      </div>
      <div class="hero-demo">
        ${comparateur()}
      </div>
    </div>
  </section>

  ${TROUBLES}

  <section class="section problem">
    <div class="wrap problem-grid">
      <div>
        <span class="eyebrow">Le constat</span>
        <h2 class="h-section" style="margin:16px 0 18px;">Chaque enseignant adapte seul, <span class="serif-em text-coral">à sa façon, le soir.</span></h2>
        <p class="llede">Les élèves à besoins particuliers sont dans toutes les classes. Sans outil commun, chaque enseignant réinvente ses adaptations et l'équipe perd la vue d'ensemble.</p>
      </div>
      <div class="pain-list">
        ${douleur("lignes", "Hétérogène", "D'une classe à l'autre, les aménagements ne sont pas les mêmes pour un même élève.")}
        ${douleur("alerte", "Difficile à suivre", "PPRE, PAI, GEVA-Sco : les dispositifs s'accumulent sans vue d'ensemble.")}
        ${douleur("horloge", "Épuisant", "Adapter chaque support à la main prend des heures chaque semaine.")}
      </div>
    </div>
  </section>

  <section class="section who" style="background:linear-gradient(180deg,var(--paper),var(--paper-2))">
    <div class="wrap">
      <div class="sec-head center">
        <span class="eyebrow center">Ce que votre école obtient</span>
        <h2 class="h-section">Une équipe outillée, des élèves mieux accompagnés</h2>
      </div>
      <div class="who-grid quatre">
        ${benefice("equipe", "Toute l'équipe équipée", "Chaque enseignant adapte ses supports en quelques secondes.")}
        ${benefice("facture", "Une facture unique", "Au nom de l'établissement, pour tous les enseignants.")}
        ${benefice("cible", "Des adaptations homogènes", "Les mêmes règles d'adaptation pour un élève, d'une année et d'une classe à l'autre.")}
        ${benefice("diplome", "Une prise en main accompagnée", "Nous présentons ClassFlow à votre équipe.")}
      </div>
    </div>
  </section>

  <section class="section who" id="pour-qui">
    <div class="wrap">
      <div class="sec-head center">
        <span class="eyebrow center">Pour qui</span>
        <h2 class="h-section">Au service de l'école inclusive</h2>
        <p class="llede">De la salle de classe à l'institution, ClassFlow accompagne tous ceux qui font vivre l'inclusion au quotidien.</p>
      </div>
      <div class="who-grid">
        ${persona(EXTRAIT_PROF, "Professeurs des écoles", "Cycles 2 et 3. Un gain de temps concret chaque semaine et des supports adaptés sans expertise préalable — pour enseigner à toute la classe, vraiment.", "Gain de temps au quotidien")}
        ${persona(EXTRAIT_ECOLE, "Écoles &amp; réseaux inclusifs", "Une démarche d'inclusion homogène et outillée sur tout l'établissement, des dispositifs mieux suivis et des pratiques partagées entre collègues.", "Une politique inclusive concrète")}
        ${persona(EXTRAIT_FORMATION, "Instituts de formation &amp; rectorats", "Un appui à la formation des enseignants (INSPÉ) et à la mission d'inclusion&nbsp;: un outil aligné sur le cadre de l'école inclusive, pour passer de la théorie à la pratique en classe.", "Aligné sur la mission d'inclusion")}
      </div>
    </div>
  </section>

  <section class="section apercu" id="tarifs" style="padding-top:0">
    <div class="wrap">
      <div class="offer">
        <span class="badge vert">Pour toute l'équipe</span>
        <div class="price" style="margin-top:10px">Dès 9,99 € <small>HT / enseignant / mois</small></div>
        <div class="fine" style="min-height:0">Dès 5 enseignants, le prix baisse pour chacun.</div>
        <a class="btn" href="/ecoles/tarifs/#devis">Calculer mon devis</a>
      </div>
    </div>
  </section>

  ${confiance([HEBERGE, RGPD, carteConfiance("equipe", "Conçu avec des enseignants",
    "Chaque fonctionnalité est imaginée et testée avec des professeurs des écoles. L'outil suit les pratiques réelles des équipes.")],
  { texte: "Les informations sur les élèves sont sensibles. ClassFlow est conçu pour les protéger, dès le premier jour.",
    note: "ClassFlow se construit avec les premiers établissements partenaires." })}

  <!-- Établissements partenaires : section à afficher quand nous aurons des logos ou des témoignages de directions. -->

  <section class="section final" id="contact">
    <div class="wrap final-grid">
      <div>
        <span class="eyebrow center" style="color:var(--coral-300)">Prendre rendez-vous</span>
        <h2 style="margin-top:16px;">Équipez votre équipe dès cette année</h2>
        <p class="llede">Calculez votre devis en ligne, ou écrivez-nous : nous vous présentons ClassFlow et répondons à vos questions sur les données et le déploiement.</p>
        <ul class="final-points">
          <li>${COCHE} Devis envoyé sous 48 h</li>
          <li>${COCHE} Une seule facture, au nom de l'établissement</li>
          <li>${COCHE} Présentation de ClassFlow à votre équipe</li>
        </ul>
        <a class="lbtn lbtn-primary lbtn-lg" href="/ecoles/tarifs/#devis">Recevoir mon devis ${FLECHE}</a>
      </div>
      <div>
        ${formulaireContact({ titre: "Parlons de votre établissement", sous: "Réponse sous 48&nbsp;h ouvrées.", message: "Vos disponibilités pour un rendez-vous, vos questions…" })}
      </div>
    </div>
  </section>
</div>`;
