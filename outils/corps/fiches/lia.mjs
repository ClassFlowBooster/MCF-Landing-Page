import { illustrations } from "./illustrations.mjs";
// Fiche explicative « Lia, votre assistante » (MCF-Pilotage#53).
// Ce qui est dit de l'app est vérifié dans MCF-App (plan de fiche, origin/main d91a67df) :
// bouton rond sur ordinateur, « Demander à Lia » au centre du dock du téléphone ; champ écrit ou
// bouton « Dicter » ; Lia lit les classes, les élèves, leur fil de suivi et les tâches (pas leurs
// critères) ; elle propose d'ajouter, de modifier ou de supprimer un commentaire du fil de suivi, de créer, modifier ou clore une tâche,
// et rien n'est écrit sans validation. Elle ne crée ni ne modifie séances, fiches ni supports,
// et ne lit ni le cahier journal ni l'emploi du temps. Le modèle d'IA n'est pas nommé.

// Exemple : trois échanges reconstitués avec la classe de CE1 des autres fiches.
const ECHANGES = [
  ["Qu'est-ce qui me reste à faire cette semaine ?", "Trois tâches : rendre les cahiers de lecture demain, photocopier la fiche de mesure pour jeudi, récupérer les autorisations de sortie de Maël et Nour pour vendredi.", ""],
  ["Note qu'Inès a mesuré correctement ses quatre segments aujourd'hui.", "Je propose d'ajouter ce commentaire au fil de suivi d'Inès.", "Ajouter le commentaire ?"],
  ["Comment aider les élèves qui partent du bord de la règle ?", "Faites poser le doigt sur le zéro avant chaque mesure, et comparez deux mesures du même segment faites de deux façons : l'écart rend l'erreur visible.", ""],
];

const exemple = `<p>L'enseignant de la classe de CE1 des autres fiches, un soir de semaine : il fait le point sur ce qui lui reste, note ce qu'il a vu en mesure, puis cherche une idée pour le lendemain.</p>

    <div class="exemple-fiche">
      <h3>Une tâche, un commentaire, un conseil de métier</h3>
      <div class="li-fil">
        ${ECHANGES.map(([q, r, action]) => `<p class="li-q">${q}</p>
        <div class="li-r"><p>${r}</p>${action ? `<p class="li-action"><span>${action}</span><b>Valider</b><i>Refuser</i></p>` : ""}</div>`).join("\n        ")}
      </div>
      <p class="ad-note">Échanges reconstitués pour la page, avec des élèves inventés.</p>
    </div>`;

// Illustration : un échange avec Lia reconstitué en HTML, données fictives.
const illustration = illustrations["lia"];

export default {
  slug: "lia",
  ariane: "Lia, votre assistante",
  k: "pay",
  titre: "Assistant IA pour les enseignants : Lia — MyClassFlow",
  description: "Lia, l'assistante IA de MyClassFlow : elle cherche dans vos élèves, leur fil de suivi et vos tâches pour répondre, puis prépare un commentaire ou une tâche que vous confirmez.",
  carte: { fichier: "og-lia.png", alt: "MyClassFlow, abonnement pour les enseignants : le castor professeur et l'accroche « Lia répond à partir de vos élèves, de leur suivi et de vos tâches »." },
  h1: "Lia répond à partir de vos élèves et de vos tâches",
  intro: "Lia est l'assistante intégrée à MyClassFlow. Elle s'appuie sur ce que l'app sait déjà, vos élèves, leur fil de suivi, vos tâches, pour répondre ; et quand votre demande appelle une écriture, elle la prépare et vous la soumet.",
  retenir: [
    "Lia répond à partir de vos élèves, de leur fil de suivi et de vos tâches.",
    "Elle prépare un commentaire ou une tâche à partir de votre demande.",
    "Aucun changement n'est fait avant votre confirmation.",
  ],
  titreBenefices: "Pourquoi passer par Lia ?",
  benefices: [
    ["Elle cherche à votre place", "Un élève, son fil de suivi, une tâche reliée : au lieu d'ouvrir les fiches une à une, vous posez la question."],
    ["Elle prépare, vous signez", "Un commentaire à noter, une tâche à créer ou à clore : Lia rédige la proposition, et vous la confirmez ou l'écartez."],
    ["Elle répond dans le contexte de votre classe", "Vos élèves, leur fil de suivi et vos tâches lui donnent le contexte utile pour répondre à vos questions."],
  ],
  etapes: [
    ["Formulez votre demande", "Avec le bouton rond, sur tous les écrans de l'ordinateur, ou « Demander à Lia », au centre de la barre du téléphone : au clavier, ou avec « Dicter »."],
    ["Lisez la réponse", "Elle s'appuie sur vos classes, vos élèves, leur fil de suivi et vos tâches pour répondre à votre demande."],
    ["Confirmez l'action éventuelle", "Si la réponse propose d'ajouter, de modifier ou de retirer un commentaire du fil de suivi, ou de créer, modifier ou clore une tâche, rien ne change avant votre confirmation."],
  ],
  titreEtapes: "Comment demander de l'aide à Lia ?",
  illustration,
  blocs: [{ titre: "À quoi ressemble un soir de semaine avec Lia ?", html: exemple }],
  offre: {
    titre: "Lia, dans l'abonnement Enseignant",
    texte: "Avec les adaptations des supports illimitées. La gestion de classe reste gratuite, sans carte bancaire.",
    bouton: "Essayer MyClassFlow",
    href: "https://app.myclassflow.fr",
  },
  questions: [
    ["Sur quelles données Lia s'appuie-t-elle ?", "Sur vos classes, vos élèves, leur fil de suivi et vos tâches, afin de répondre à vos questions."],
    ["Que peut faire Lia avec ces données ?", "Répondre à vos questions, et vous proposer d'ajouter, de modifier ou de retirer un commentaire du fil de suivi, ou de créer, de modifier ou de clore une tâche. Elle répond aussi aux questions générales : gardez un œil critique sur ses conseils."],
    ["Lia est-elle comprise dans le compte gratuit ?", "Non, Lia fait partie de l'abonnement Enseignant, avec les adaptations des supports illimitées. Le cahier journal, l'emploi du temps, les fiches élèves et les tâches restent gratuits."],
    ["Lia peut-elle enregistrer quelque chose sans moi ?", "Non. Chaque proposition attend votre confirmation ; tant que vous n'avez pas confirmé, rien n'est enregistré."],
    ["Peut-on parler à Lia à voix haute ?", "Oui : avec le bouton « Dicter », vous posez votre question à voix haute. Vous pouvez aussi la taper."],
  ],
  publics: [
    ["Pour retrouver une information", "Vous posez une question sur vos élèves, leur fil de suivi ou vos tâches."],
    ["Pour préparer une écriture", "Lia vous soumet un commentaire à noter ou une tâche à créer ou à clore."],
    ["Pour garder la main", "Vous confirmez ou écartez la proposition avant qu'un commentaire ou une tâche change."],
  ],
  soeurs: ["Tâches", "Fiche élève", "Adaptation des supports"],
};
