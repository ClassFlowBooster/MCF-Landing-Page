// Fiche explicative « Cahier journal » (MCF-Pilotage#53).
// Ce qui est dit de l'app est vérifié dans MCF-App (plan de fiche, origin/main d91a67df) :
// Planning › Cahier journal en vue jour ou semaine ; champs titre, matière, horaires, domaine,
// compétences, séquence, objectifs (type, matériel et déroulé sur ordinateur) ; « Insérer une
// fiche de ma banque » ; « Reporter » copie le contenu ; PDF jour ou semaine, impression sur
// ordinateur ; récréations de l'emploi du temps dans la vue Journal du téléphone.
// Rien sur un remplissage automatique ni sur un champ bilan : l'app ne les a pas.

export const MODELE_PDF = "/assets/docs/modele-cahier-journal.pdf";

// Exemple : un mardi de CE1, dont la séance de mesure de la fiche de préparation.
const JOURNEE = [
  ["8 h 30", "Mathématiques", "Rituel : le nombre du jour", "Décomposer 47 de trois façons."],
  ["8 h 45", "Français", "Lecture : « Le hérisson en hiver »", "Retrouver dans un texte documentaire deux informations demandées."],
  ["9 h 45", "Mathématiques", "Mesurer un segment avec la règle", "Mesurer au centimètre près en partant du zéro.", true],
  ["10 h 25", "Récréation", "", ""],
  ["10 h 40", "Français", "Copie : la phrase du jour", "Copier une phrase sans erreur, en respectant les lignes."],
  ["13 h 30", "EPS", "Lancer loin", "Lancer un objet le plus loin possible, d'une main, après un élan."],
  ["14 h 30", "EMC", "Les règles de la cour", "Proposer une règle et dire à quoi elle sert."],
  ["15 h 15", "Récréation", "", ""],
  ["15 h 30", "Questionner le monde", "Ce que mange le hérisson", "Classer des aliments en deux groupes et justifier."],
];

const ligne = ([heure, matiere, seance, but, fiche]) => seance
  ? `<tr><th scope="row">${heure}</th><td>${matiere}</td><td>${fiche ? `<a href="/enseignants/fonctionnalites/fiche-de-preparation/">${seance}</a> <span class="cj-fiche">fiche rattachée</span>` : seance}</td><td>${but}</td></tr>`
  : `<tr class="cj-pause"><th scope="row">${heure}</th><td colspan="3">${matiere}</td></tr>`;

const exemple = `<p>Un cahier journal se lit d'une traite : les séances dans l'ordre de la journée, chacune avec son horaire et ce que les élèves doivent en retirer. Voici un mardi de CE1, tel que MyClassFlow le présente puis l'imprime.</p>

    <div class="exemple-fiche">
      <h3>Exemple : un mardi en CE1</h3>
      <div class="tableau-defile" tabindex="0" role="region" aria-label="Le mardi en CE1, tableau défilant">
        <table class="cj-jour">
          <caption>Mardi, CE1</caption>
          <thead><tr><th scope="col">Heure</th><th scope="col">Matière</th><th scope="col">Séance</th><th scope="col">Ce que les élèves en retirent</th></tr></thead>
          <tbody>
            ${JOURNEE.map(ligne).join("\n            ")}
          </tbody>
        </table>
      </div>
      <p class="defile-indice" aria-hidden="true">Faites défiler le tableau →</p>
      <p><b>La séance de mathématiques</b> a sa fiche de préparation rattachée : son déroulé, son matériel et ses aides sont dans la séance, sans recopie.</p>
      <p><b>À 14 h 30, la séance d'EMC n'a pas eu lieu</b> : la discussion sur la cour a pris le temps. Elle est reportée à jeudi, avec son objectif et son contenu.</p>
    </div>

    <div class="modele">
      <div><b>La page du jour, à imprimer</b><p>Une journée sur une page A4, avec une colonne pour noter ce qui s'est passé.</p></div>
      <a class="btn ghost" href="${MODELE_PDF}" download>Télécharger le modèle (PDF)</a>
    </div>`;

// Illustration : vue Jour du cahier journal reconstituée en HTML, données fictives.
const illustration = `<figure class="maquette-fiche" aria-label="Illustration : une journée du cahier journal dans MyClassFlow">
        <div class="mf-ecran" aria-hidden="true">
          <div class="mf-chemin">Planning › Cahier journal</div>
          <div class="mf-titre">Mardi</div>
          <div class="mf-onglets"><span class="on">Jour</span><span>Semaine</span></div>
          <ol class="mf-seances">
            <li><span>8 h 30</span><b>Le nombre du jour</b></li>
            <li><span>8 h 45</span><b>Lecture : le hérisson</b></li>
            <li><span>9 h 45</span><b>Mesurer avec la règle</b><i>Fiche rattachée</i></li>
            <li class="pause"><span>10 h 25</span>Récréation</li>
            <li><span>10 h 40</span><b>Copie : la phrase du jour</b></li>
          </ol>
          <div class="mf-bouton">Ajouter une séance</div>
        </div>
        <figcaption>Illustration avec des données fictives.</figcaption>
      </figure>`;

export default {
  slug: "cahier-journal",
  ariane: "Cahier journal",
  k: "free",
  titre: "Cahier journal numérique : vos séances du jour — MyClassFlow",
  description: "Tenir son cahier journal séance par séance, avec la fiche de préparation rattachée, les séances reportées et l'export en PDF. Un mardi de CE1 en exemple, et la page du jour à imprimer.",
  h1: "Votre cahier journal, séance par séance",
  intro: "Le cahier journal garde la trace de la journée de classe : quelles séances, à quelle heure, pour apprendre quoi. Il vous sert le matin pour savoir où vous allez, et il sert à celui qui vous remplace. MyClassFlow le tient avec vous, sur ordinateur et sur téléphone.",
  titreBenefices: "Ce qu'un cahier journal bien tenu vous apporte",
  benefices: [
    ["La journée d'un coup d'œil", "Les séances dans l'ordre, avec leurs horaires, leurs objectifs et les récréations : vous savez où vous en êtes à chaque moment."],
    ["Une classe qui peut changer de mains", "Un remplaçant ou un collègue y trouve l'objectif de chaque séance et son déroulé, sans vous appeler."],
    ["Rien ne se perd quand une séance glisse", "Une séance qui n'a pas eu lieu se reporte à un autre jour avec tout son contenu : il n'y a rien à réécrire."],
  ],
  etapes: [
    ["Posez vos séances", "Dans le Planning, « Ajouter une séance » : titre, matière, horaires, puis domaine, compétences, séquence et objectifs. Sur ordinateur s'ajoutent le type de séance, le matériel et le déroulé."],
    ["Apportez la préparation", "« Insérer une fiche de ma banque » copie le contenu d'une fiche de préparation dans la séance. Une séance qui n'a pas eu lieu se reporte à un autre jour avec son contenu."],
    ["Gardez-en la trace", "Téléchargez le cahier journal en PDF, pour un jour ou pour la semaine, en choisissant les jours. Sur ordinateur, vous pouvez aussi l'imprimer directement."],
  ],
  illustration,
  blocs: [{ titre: "Un mardi de CE1 dans le cahier journal", html: exemple }],
  offre: {
    titre: "Votre cahier journal, gratuit dans MyClassFlow",
    texte: "Avec les fiches de préparation et l'emploi du temps, sans carte bancaire. L'abonnement ajoute l'adaptation des supports par l'IA.",
    bouton: "Créer mon compte gratuit",
    href: "https://app.myclassflow.fr",
  },
  questions: [
    ["Que noter dans un cahier journal pour qu'un remplaçant s'y retrouve ?", "Pour chaque séance : l'heure, la matière, ce que les élèves doivent savoir faire à la fin et ce qui a été fait juste avant. Ajoutez où trouver le matériel. Dans MyClassFlow, une fiche de préparation rattachée apporte en plus le déroulé complet de la séance."],
    ["Cahier journal, fiche de préparation, emploi du temps : qui fait quoi ?", "L'emploi du temps est la semaine type, posée une fois pour l'année. La fiche de préparation détaille une séance. Le cahier journal dit ce qui se passe tel jour, à telle heure. Dans MyClassFlow, la fiche se rattache à la séance du cahier journal, qui reste dans les horaires de votre classe."],
    ["Que faire d'une séance prévue qui n'a pas eu lieu ?", "Reportez-la plutôt que de la supprimer. Dans MyClassFlow, « Reporter » la place à un autre jour et y copie son contenu pédagogique : objectifs, compétences, déroulé."],
    ["Peut-on imprimer son cahier journal ?", "Oui. Depuis un ordinateur, MyClassFlow l'imprime ou le télécharge en PDF, au format jour ou semaine. Depuis un téléphone, vous le téléchargez en PDF."],
    ["Peut-on tenir son cahier journal sur téléphone ?", "Oui. Dans MyClassFlow, la vue Journal du Planning affiche les séances du jour et les récréations. Vous y ajoutez une séance, vous la modifiez ou vous la reportez, et vous téléchargez le PDF."],
    ["Le cahier journal est-il gratuit dans MyClassFlow ?", "Oui, comme les fiches de préparation et l'emploi du temps. Le compte gratuit ne demande pas de carte bancaire."],
  ],
  soeurs: ["Fiches de préparation", "Emploi du temps", "Adaptation des supports"],
};
