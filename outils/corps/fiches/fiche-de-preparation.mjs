// Fiche explicative « Fiche de préparation » (MCF-Pilotage#53).
// Ce qui est dit de l'app est vérifié dans MCF-App : champs titre, matière, domaine,
// compétences, objectifs, matériel et déroulé libre ; banque en dossiers ; « Dupliquer » ;
// « Rattacher à une séance » copie le contenu dans la séance du cahier journal.
// Trame, exemple et questions écrits pour ne ressembler à aucun concurrent
// (contrôles de ressemblance du 18/10/2026, rapport feat-53-fiches-fonctionnalites).

// Exemple : mesurer des longueurs avec la règle graduée, en CE1.
const PHASES = [
  ["Le défi", "5 min", "Toute la classe", "Deux rubans de longueurs proches sont scotchés aux deux bouts du tableau. « Lequel est le plus long ? On n'a pas le droit de les décoller. » Les élèves proposent : comparer à l'œil, reporter avec une ficelle, utiliser la règle."],
  ["Essais", "10 min", "À deux", "Chaque binôme mesure trois bandes de papier avec sa règle et note les longueurs. L'enseignant circule et repère qui pose la règle à partir de son bord."],
  ["On en parle", "8 min", "Toute la classe", "Deux binômes ont trouvé des longueurs différentes pour la même bande : on compare leur façon de poser la règle. On écrit ensemble la marche à suivre : le zéro au début de la bande, on lit le nombre à l'autre bout, on écrit « cm »."],
  ["À soi", "12 min", "Seul", "Sur la fiche : mesurer quatre segments, puis tracer un segment de 7 cm."],
  ["Vérification", "5 min", "Toute la classe", "Un segment au tableau, la longueur sur l'ardoise. Pour finir, on revient au défi : on mesure les deux rubans."],
];

// Notre trame : sept rubriques, dans l'ordre où l'on se pose les questions en préparant.
const RUBRIQUES = [
  ["Le but", "Ce que les élèves sauront faire en sortant, en une phrase, avec la compétence des programmes qu'elle travaille."],
  ["Le fil de la séance", "Les moments qui se suivent, chacun avec sa durée, la façon dont la classe travaille et la consigne telle que vous la direz."],
  ["Les obstacles attendus", "L'erreur que vous voyez venir, et ce que vous ferez quand elle arrivera."],
  ["Ce qu'il faut sous la main", "Le matériel de l'enseignant et celui des élèves, prêt avant d'entrer en classe."],
  ["Les aides prévues", "Pour le même but, un autre chemin : un support plus lisible, un outil en plus, et de quoi continuer pour ceux qui ont fini."],
  ["Le signe que c'est acquis", "Ce que vous regarderez pour savoir si le but est atteint."],
  ["Après coup", "Deux lignes écrites le soir : ce qui a marché, ce qu'il faudra reprendre."],
];

const exemple = `<p>Chacun a sa façon de préparer. La trame que nous proposons tient sur une page et suit l'ordre des questions qu'on se pose : où va-t-on, comment, qu'est-ce qui peut coincer, avec quoi, et comment saura-t-on que c'est réussi.</p>
    <dl class="rubriques">
      ${RUBRIQUES.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join("\n      ")}
    </dl>

    <div class="exemple-fiche">
      <h3>Exemple : mesurer un segment avec la règle, en CE1</h3>
      <ul class="exemple-tete">
        <li><b>Niveau</b> CE1</li>
        <li><b>Matière</b> Mathématiques, grandeurs et mesures</li>
        <li><b>Séquence</b> Les longueurs</li>
        <li><b>Durée</b> 40 min</li>
      </ul>
      <p><b>Le but :</b> mesurer la longueur d'un segment au centimètre près avec une règle graduée. Compétence du programme : comparer, estimer, mesurer des longueurs.</p>
      <div class="tableau-defile" tabindex="0" role="region" aria-label="Le fil de la séance, tableau défilant">
        <table>
          <caption>Le fil de la séance</caption>
          <thead><tr><th scope="col">Moment</th><th scope="col">Durée</th><th scope="col">La classe travaille</th><th scope="col">Ce qui se passe</th></tr></thead>
          <tbody>
            ${PHASES.map(([phase, duree, orga, texte]) => `<tr><th scope="row">${phase}</th><td>${duree}</td><td>${orga}</td><td>${texte}</td></tr>`).join("\n            ")}
          </tbody>
        </table>
      </div>
      <p class="defile-indice" aria-hidden="true">Faites défiler le tableau →</p>
      <p><b>Les obstacles attendus :</b> poser la règle à partir de son bord, ou partir de la graduation 1. La longueur trouvée est alors fausse. Réponse prévue : faire poser le doigt sur le zéro avant chaque mesure.</p>
      <p><b>Ce qu'il faut sous la main :</b> une règle par élève, des bandes de papier de 9, 12 et 15 cm, deux rubans de 13 et 15 cm, les ardoises, la fiche d'exercices en version d'origine et en version adaptée.</p>
      <p><b>Les aides prévues :</b> une règle aux graduations agrandies avec le zéro surligné en couleur ; une fiche où chaque segment commence sur un trait repère, avec un texte agrandi et la consigne découpée en étapes. Pour ceux qui ont fini : mesurer les trois côtés d'une ligne brisée et additionner.</p>
      <p><b>Le signe que c'est acquis :</b> l'élève mesure au moins trois segments sur quatre au centimètre près et trace le segment de 7 cm en partant du zéro.</p>
      <p><b>Après coup :</b> par exemple, « le défi des rubans a accroché la classe ; six élèves partent encore du bord de la règle : une mesure en rituel demain matin ».</p>
    </div>`;

// Illustration : écran de fiche de l'app reconstitué en HTML, données fictives.
const illustration = `<figure class="maquette-fiche" aria-label="Illustration : une fiche de préparation dans MyClassFlow">
        <div class="mf-ecran" aria-hidden="true">
          <div class="mf-chemin">Fiches de prep › Maths</div>
          <div class="mf-titre">Mesurer avec la règle</div>
          <div class="mf-onglets"><span class="on">Déroulé</span><span>Infos</span></div>
          <div class="mf-etiquette">Matériel</div>
          <div class="mf-puces"><span>Règles</span><span>Bandes de papier</span><span>Deux rubans</span></div>
          <div class="mf-etiquette">Déroulé de la séance</div>
          <ol class="mf-deroule">
            <li><b>Le défi (5 min)</b> quel ruban est le plus long ?</li>
            <li><b>Essais (10 min)</b> trois bandes, à deux</li>
            <li><b>On en parle (8 min)</b> le zéro au début</li>
            <li><b>À soi (12 min)</b> mesurer, puis tracer 7 cm</li>
          </ol>
          <div class="mf-bouton">Rattacher à une séance</div>
        </div>
        <figcaption>Illustration avec des données fictives.</figcaption>
      </figure>`;

export default {
  slug: "fiche-de-preparation",
  ariane: "Fiche de préparation",
  k: "free",
  titre: "Fiche de préparation : trame d'une page et exemple en CE1 — MyClassFlow",
  description: "Une trame de fiche de préparation en sept rubriques, une séance de CE1 sur la mesure des longueurs, et le lien avec le cahier journal de MyClassFlow.",
  h1: "Une fiche de préparation pour chaque séance, sur une page",
  intro: "Une fiche de préparation, c'est une séance pensée avant d'être vécue : son but, son déroulé minute par minute, les difficultés que vous voyez venir. Voici une trame en sept rubriques et une séance de CE1 rédigée avec elle.",
  titreBenefices: "Pourquoi l'écrire avant d'entrer en classe",
  benefices: [
    ["Voir venir les difficultés", "En écrivant la séance, on repère l'endroit où les élèves vont buter, et on prépare sa réponse avant d'être devant eux."],
    ["Préparer la journée du même geste", "Rattachée à une séance du cahier journal, la fiche y apporte son déroulé : la journée et la séance se préparent ensemble."],
    ["Garder ce que la classe a appris", "Quelques lignes écrites après la séance disent ce qui a marché et ce qui reste à reprendre : la séance suivante part de là."],
  ],
  etapes: [
    ["Créez la fiche", "Titre, matière, domaine, compétences, objectifs et matériel, puis le déroulé de la séance, écrit librement, sur ordinateur ou sur téléphone."],
    ["Rangez-la dans votre banque", "Classez vos fiches en dossiers, par matière ou par séquence. « Dupliquer » en fait une variante sans repartir de zéro."],
    ["Rattachez-la à une séance", "Son contenu est copié dans la séance de votre cahier journal : le jour venu, tout est prêt."],
  ],
  illustration,
  blocs: [{ titre: "Notre trame, puis une séance de CE1", html: exemple }],
  offre: {
    titre: "Vos fiches de préparation, gratuites dans MyClassFlow",
    texte: "Avec le cahier journal et l'emploi du temps, sans carte bancaire. L'abonnement ajoute l'adaptation des supports par l'IA.",
    bouton: "Créer mon compte gratuit",
    href: "https://app.myclassflow.fr",
  },
  questions: [
    ["Jusqu'où détailler une fiche de préparation ?", "Écrivez mot pour mot ce qui doit être dit exactement : la consigne, la question qui lance la séance. Le reste tient en notes courtes. Une fiche qu'on ne peut pas relire d'un coup d'œil pendant la classe est trop longue."],
    ["Comment laisser une fiche de préparation lisible pour un remplaçant ?", "Ajoutez ce que vous êtes seul à savoir : où est rangé le matériel, ce que la classe a fait à la séance d'avant, les mots que les élèves connaissent déjà. Dans MyClassFlow, la fiche rattachée à une séance se retrouve au bon jour du cahier journal."],
    ["Comment relier une fiche de préparation au cahier journal ?", "Dans MyClassFlow, choisissez « Rattacher à une séance » depuis la fiche, ou « Insérer une fiche de ma banque » depuis la séance : le contenu est copié dans la séance. Vous l'ajustez pour ce jour-là sans toucher à la fiche d'origine."],
    ["Comment prévoir des aides dans une fiche de préparation ?", "Gardez le même but pour toute la classe et changez le chemin : un support plus lisible (texte agrandi, lignes espacées, consigne en étapes), un outil en plus, une tâche de plus pour ceux qui ont fini. Avec l'abonnement, MyClassFlow adapte vos supports selon les critères pédagogiques que vous cochez."],
    ["Comment retrouver une fiche de préparation l'année suivante ?", "Rangez vos fiches en dossiers dès la première année, par matière ou par séquence. Dans MyClassFlow, « Dupliquer » crée une copie que vous corrigez avec ce que vos notes d'après séance vous ont appris, sans perdre la version d'origine."],
    ["Les fiches de préparation sont-elles gratuites dans MyClassFlow ?", "Oui, comme le cahier journal et l'emploi du temps. Le compte gratuit ne demande pas de carte bancaire."],
  ],
  soeurs: ["Cahier journal", "Emploi du temps", "Adaptation des supports"],
};
