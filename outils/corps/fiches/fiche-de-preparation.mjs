// Fiche explicative « Fiche de préparation » (MCF-Pilotage#53).
// Ce qui est dit de l'app est vérifié dans MCF-App : champs titre, matière, domaine,
// compétences, objectifs, matériel et déroulé libre ; banque en dossiers ; « Dupliquer » ;
// « Rattacher à une séance » copie le contenu dans la séance du cahier journal.

export const MODELE_PDF = "/assets/docs/modele-fiche-de-preparation.pdf";

// Exemple : séance 3 d'une séquence sur les fractions, CM1 (même thème que la
// démonstration de l'accueil Enseignants).
const PHASES = [
  ["Rituel", "5 min", "Collectif", "Calcul mental sur les moitiés et les quarts : « la moitié de 8 », « le quart de 12 »… Réponses sur l'ardoise."],
  ["Découverte", "10 min", "Collectif", "Au tableau, deux bandes identiques : l'une colorée aux 3/4, l'autre à la moitié. « Laquelle est la plus colorée ? Comment en être sûr ? » Les élèves proposent, on garde les idées au tableau."],
  ["Recherche", "15 min", "Par deux", "Chaque binôme plie et colorie des bandes de papier pour représenter 1/2, 3/4, 2/8 et 5/4, puis les range de la plus petite à la plus grande."],
  ["Mise en commun", "5 min", "Collectif", "On compare les bandes des binômes. On écrit ensemble ce qu'on retient : avec le même dénominateur, on compare les numérateurs ; une fraction dont le numérateur dépasse le dénominateur est plus grande que 1."],
  ["Entraînement", "10 min", "Individuel", "Exercice : colorier les trois quarts de deux figures, puis ranger 3/4 ; 1/2 ; 2/8 ; 5/4 dans l'ordre croissant."],
];

const RUBRIQUES = [
  ["L'en-tête", "Niveau, matière, domaine, date, durée, et la place de la séance dans la séquence (séance 3 sur 6, par exemple)."],
  ["L'objectif", "Ce que les élèves sauront faire à la fin de la séance, en une phrase qui commence par un verbe : comparer, ranger, rédiger…"],
  ["Les compétences du programme", "Celles que la séance travaille, reprises des programmes de l'Éducation nationale."],
  ["Le matériel", "Pour vous et pour les élèves : supports, manipulations, ardoises, fiches d'exercices."],
  ["Le déroulement", "Les phases de la séance, chacune avec sa durée, son organisation (collectif, en groupes, individuel), ce que fait l'enseignant et ce que font les élèves."],
  ["La différenciation", "Comment le même objectif reste accessible à chacun : un support plus lisible, une aide matérielle, un prolongement pour ceux qui ont fini."],
  ["L'évaluation et le bilan", "Comment vous saurez que l'objectif est atteint, puis, après la séance, ce qui a marché et ce qu'il faudra reprendre."],
];

const exemple = `<p>Une fiche de préparation tient sur une page. Voici les rubriques qu'on y retrouve presque toujours, puis une séance complète de CM1 rédigée avec elles.</p>
    <dl class="rubriques">
      ${RUBRIQUES.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join("\n      ")}
    </dl>

    <div class="exemple-fiche">
      <h3>Exemple : comparer des fractions, en CM1</h3>
      <ul class="exemple-tete">
        <li><b>Niveau</b> CM1</li>
        <li><b>Matière</b> Mathématiques, nombres et calculs</li>
        <li><b>Séquence</b> Les fractions, séance 3 sur 6</li>
        <li><b>Durée</b> 45 min</li>
      </ul>
      <p><b>Objectif :</b> comparer et ranger des fractions simples en s'appuyant sur des représentations.</p>
      <p><b>Compétence du programme :</b> comprendre et utiliser la notion de fraction simple ; comparer des fractions.</p>
      <p><b>Matériel :</b> bandes de papier, crayons de couleur, ardoises, fiche d'exercices en version d'origine et en version adaptée.</p>
      <div class="tableau-defile" tabindex="0" role="region" aria-label="Déroulement de la séance, tableau défilant">
        <table>
          <caption>Déroulement de la séance</caption>
          <thead><tr><th scope="col">Phase</th><th scope="col">Durée</th><th scope="col">Organisation</th><th scope="col">Ce qui se passe</th></tr></thead>
          <tbody>
            ${PHASES.map(([phase, duree, orga, texte]) => `<tr><th scope="row">${phase}</th><td>${duree}</td><td>${orga}</td><td>${texte}</td></tr>`).join("\n            ")}
          </tbody>
        </table>
      </div>
      <p class="defile-indice" aria-hidden="true">Faites défiler le tableau →</p>
      <p><b>Différenciation :</b> la fiche d'exercices existe aussi en version adaptée, avec un texte agrandi, des lignes espacées, des figures déjà partagées et la consigne découpée en étapes. Prolongement pour ceux qui ont fini : comparer 2/3 et 3/4.</p>
      <p><b>Évaluation :</b> l'objectif est atteint quand l'élève range correctement les quatre fractions et justifie au moins une comparaison par une phrase.</p>
      <p><b>Bilan :</b> à remplir après la séance, par exemple « 5/4 a posé problème : reprendre les fractions plus grandes que 1 en séance 4 ».</p>
    </div>

    <div class="modele">
      <div><b>Le modèle vierge, à imprimer</b><p>La même trame, sur une page A4, prête à remplir à la main.</p></div>
      <a class="btn ghost" href="${MODELE_PDF}" download>Télécharger le modèle (PDF)</a>
    </div>`;

// Illustration : écran de fiche de l'app reconstitué en HTML, données fictives.
const illustration = `<figure class="maquette-fiche" aria-label="Illustration : une fiche de préparation dans MyClassFlow">
        <div class="mf-ecran" aria-hidden="true">
          <div class="mf-chemin">Fiches de prep › Maths</div>
          <div class="mf-titre">Comparer des fractions</div>
          <div class="mf-onglets"><span class="on">Déroulé</span><span>Infos</span></div>
          <div class="mf-etiquette">Matériel</div>
          <div class="mf-puces"><span>Bandes de papier</span><span>Ardoises</span><span>Fiche d'exercices</span></div>
          <div class="mf-etiquette">Déroulé de la séance</div>
          <ol class="mf-deroule">
            <li><b>Rituel (5 min)</b> moitiés et quarts</li>
            <li><b>Découverte (10 min)</b> 3/4 ou 1/2 ?</li>
            <li><b>Recherche (15 min)</b> bandes pliées, par deux</li>
            <li><b>Entraînement (10 min)</b> ranger 4 fractions</li>
          </ol>
          <div class="mf-bouton">Rattacher à une séance</div>
        </div>
        <figcaption>Illustration avec des données fictives.</figcaption>
      </figure>`;

export default {
  slug: "fiche-de-preparation",
  ariane: "Fiche de préparation",
  k: "free",
  titre: "Fiche de préparation : modèle gratuit et exemple — MyClassFlow",
  description: "Ce que contient une fiche de préparation, une séance complète de CM1 en exemple, un modèle gratuit à télécharger, et comment MyClassFlow la relie au cahier journal.",
  h1: "La fiche de préparation, simplement",
  intro: "Une fiche de préparation décrit une séance de classe : ce que les élèves vont apprendre, avec quel matériel et dans quel ordre. Elle sert à l'enseignant titulaire comme au remplaçant ou au stagiaire. Voici ce qu'elle contient, un exemple complet en CM1 et un modèle gratuit à télécharger.",
  titreBenefices: "À quoi sert une fiche de préparation",
  benefices: [
    ["Savoir où l'on va", "L'objectif est écrit avant la séance : chaque phase, chaque exercice et chaque question au tableau servent ce même but."],
    ["Tenir le temps de classe", "Les durées de chaque phase évitent la séance qui déborde ou la mise en commun sacrifiée faute de temps."],
    ["Préparer une fois, réutiliser", "Une fiche bien rangée se reprend l'année suivante, s'ajuste pour une autre classe ou se confie à un remplaçant."],
  ],
  etapes: [
    ["Créez la fiche", "Titre, matière, domaine, compétences, objectifs et matériel, puis le déroulé de la séance, écrit librement, sur ordinateur ou sur téléphone."],
    ["Rangez-la dans votre banque", "Classez vos fiches en dossiers, par matière ou par séquence. « Dupliquer » en fait une variante sans repartir de zéro."],
    ["Rattachez-la à une séance", "Son contenu est copié dans la séance de votre cahier journal : le jour venu, tout est prêt."],
  ],
  illustration,
  blocs: [{ titre: "Ce que contient une fiche de préparation", html: exemple }],
  offre: {
    titre: "Vos fiches de préparation, gratuites dans MyClassFlow",
    texte: "Avec le cahier journal et l'emploi du temps, sans carte bancaire. L'abonnement ajoute l'adaptation des supports par l'IA.",
    bouton: "Créer mon compte gratuit",
    href: "https://app.myclassflow.fr",
  },
  questions: [
    ["Une fiche de préparation par séance, ou une seule pour toute la séquence ?", "Les deux se complètent. La fiche de séquence présente tout un apprentissage sur plusieurs séances : l'objectif final, la liste des séances et l'évaluation. La fiche de préparation détaille une seule de ces séances, phase par phase."],
    ["Doit-on montrer ses fiches de préparation lors d'une inspection ?", "Elles peuvent vous être demandées : lors d'une visite, l'inspecteur ou le conseiller pédagogique peut regarder vos préparations et votre cahier journal. Aucun texte n'impose en revanche de modèle, c'est la clarté qui compte."],
    ["Que mettre dans une fiche de préparation pour un remplaçant ?", "L'objectif, le matériel et où le trouver, le déroulement minuté, et ce que les élèves ont fait à la séance précédente. Une fiche lisible par quelqu'un d'autre est aussi plus facile à reprendre pour vous l'année suivante."],
    ["Où noter la différenciation dans une fiche de préparation ?", "Dans une rubrique à part, sous le déroulement. Prévoyez, pour le même objectif, un support plus lisible (texte agrandi, lignes espacées, consigne découpée en étapes), une aide matérielle et un prolongement. Dans MyClassFlow, l'abonnement adapte vos supports en quelques secondes selon les critères pédagogiques que vous cochez."],
    ["Que faire de ses fiches de préparation l'année suivante ?", "Les reprendre en notant ce que le bilan a appris, plutôt que tout réécrire. Dans MyClassFlow, vos fiches restent dans votre banque, rangées en dossiers : vous les dupliquez et les ajustez."],
    ["Les fiches de préparation sont-elles gratuites dans MyClassFlow ?", "Oui, comme le cahier journal et l'emploi du temps. Le compte gratuit ne demande pas de carte bancaire."],
  ],
  soeurs: ["Cahier journal", "Emploi du temps", "Adaptation des supports"],
};
