// Fiche explicative « Lia, votre assistante » (MCF-Pilotage#53).
// Ce qui est dit de l'app est vérifié dans MCF-App (plan de fiche, origin/main d91a67df) :
// bouton rond sur ordinateur, « Demander à Lia » au centre du dock du téléphone ; champ écrit ou
// bouton « Dicter » ; Lia lit les classes, les élèves et leur fiche, les tâches ; elle propose
// d'ajouter, de modifier ou de supprimer une observation, de créer, modifier ou clore une tâche,
// et rien n'est écrit sans validation. Elle ne crée ni ne modifie séances, fiches ni supports,
// et ne lit ni le cahier journal ni l'emploi du temps. Le modèle d'IA n'est pas nommé.

// Exemple : trois échanges reconstitués avec la classe de CE1 des autres fiches.
const ECHANGES = [
  ["Qu'est-ce qui me reste à faire cette semaine ?", "Trois tâches : rendre les cahiers de lecture demain, photocopier la fiche de mesure pour jeudi, récupérer les autorisations de sortie de Maël et Nour pour vendredi.", ""],
  ["Note qu'Inès a mesuré juste ses quatre segments aujourd'hui.", "Je propose d'ajouter cette observation sur la fiche d'Inès.", "Ajouter l'observation ?"],
  ["Comment aider les élèves qui partent du bord de la règle ?", "Faites poser le doigt sur le zéro avant chaque mesure, et comparez deux mesures du même segment faites de deux façons : l'écart rend l'erreur visible.", ""],
];

const exemple = `<p>Trois demandes faites à Lia par l'enseignant de la classe de CE1 qu'on retrouve dans les autres fiches : une question sur ses tâches, une observation à noter, une question de métier.</p>

    <div class="exemple-fiche">
      <h3>Une fin de journée avec Lia</h3>
      <div class="li-fil">
        ${ECHANGES.map(([q, r, action]) => `<p class="li-q">${q}</p>
        <div class="li-r"><p>${r}</p>${action ? `<p class="li-action"><span>${action}</span><b>Valider</b><i>Refuser</i></p>` : ""}</div>`).join("\n        ")}
      </div>
      <p><b>Et si vous lui demandez de préparer la séance de demain ?</b> Lia vous répond qu'elle ne crée ni ne modifie vos séances, vos fiches ni vos supports, et vous renvoie vers le Planning ou vers « Adapter un support ».</p>
      <p class="ad-note">Échanges reconstitués pour la page, avec des élèves inventés.</p>
    </div>`;

// Illustration : un échange avec Lia reconstitué en HTML, données fictives.
const illustration = `<figure class="maquette-fiche" aria-label="Illustration : une proposition de Lia à valider">
        <div class="mf-ecran" aria-hidden="true">
          <div class="mf-chemin">Lia</div>
          <div class="mf-titre">Demander à Lia</div>
          <p class="li-q">Note qu'Inès a mesuré juste ses quatre segments.</p>
          <div class="li-r"><p>Je propose d'ajouter cette observation sur sa fiche.</p><p class="li-action"><span>Ajouter l'observation ?</span><b>Valider</b></p></div>
          <div class="mf-bouton">Dicter</div>
        </div>
        <figcaption>Illustration avec des données fictives.</figcaption>
      </figure>`;

export default {
  slug: "lia",
  ariane: "Lia, votre assistante",
  k: "pay",
  titre: "Lia, l'assistante IA qui connaît votre classe — MyClassFlow",
  description: "Lia, l'assistante de MyClassFlow : vous lui écrivez ou lui dictez une question, elle répond en tenant compte de vos élèves et de vos tâches, et propose des observations ou des tâches que vous validez.",
  h1: "Lia, une assistante qui connaît votre classe",
  intro: "Lia est l'assistante de MyClassFlow. Vous lui écrivez ou lui dictez une question ; elle répond en tenant compte de vos élèves et de vos tâches, et peut vous proposer une observation ou une tâche, que vous acceptez ou non.",
  titreBenefices: "Ce que Lia change au quotidien",
  benefices: [
    ["Des réponses qui partent de votre classe", "Elle connaît vos élèves, leur fiche et vos tâches : « qu'est-ce qui me reste à faire ? » a une vraie réponse."],
    ["Rien ne s'écrit sans vous", "Une observation ou une tâche qu'elle propose attend votre validation ; vous pouvez toujours refuser."],
    ["À l'écrit ou à la voix", "Depuis n'importe quel écran, sur ordinateur comme sur téléphone, en tapant ou en dictant."],
  ],
  etapes: [
    ["Ouvrez Lia", "Le bouton rond, présent sur tous les écrans de l'ordinateur, ou « Demander à Lia », au centre de la barre du téléphone."],
    ["Écrivez ou dictez", "Une question sur vos élèves ou vos tâches, une observation à noter, une question de pédagogie."],
    ["Validez ses propositions", "Ajouter, modifier ou retirer une observation ; créer, modifier ou clore une tâche : c'est vous qui confirmez."],
  ],
  illustration,
  blocs: [{ titre: "Trois demandes, trois réponses", html: exemple }],
  offre: {
    titre: "Lia, dans l'abonnement Enseignant",
    texte: "Avec les adaptations des supports illimitées. La gestion de classe reste gratuite, sans carte bancaire.",
    bouton: "Essayer MyClassFlow",
    href: "https://app.myclassflow.fr",
  },
  questions: [
    ["Que peut faire Lia ?", "Répondre à vos questions en tenant compte de vos élèves, de leur fiche et de vos tâches ; vous proposer d'ajouter, de modifier ou de retirer une observation ; vous proposer de créer, de modifier ou de clore une tâche. Elle répond aussi aux questions de pédagogie générale."],
    ["Lia peut-elle modifier mes données sans moi ?", "Non. Chaque observation ou tâche qu'elle propose attend votre validation. Tant que vous n'avez pas confirmé, rien n'est enregistré."],
    ["À quelles informations de la classe Lia a-t-elle accès ?", "À celles dont elle a besoin pour répondre : vos classes, vos élèves et leur fiche, vos tâches. Elle ne lit ni le cahier journal ni l'emploi du temps."],
    ["Lia prépare-t-elle des séances ou des supports ?", "Non. Elle ne crée ni ne modifie vos séances, vos fiches de préparation ni vos supports. Pour un support, utilisez « Adapter un support » ; pour une séance, le Planning."],
    ["Peut-on parler à Lia à voix haute ?", "Oui : avec le bouton « Dicter », vous posez votre question à voix haute. Vous pouvez aussi la taper."],
    ["Lia est-elle comprise dans le compte gratuit ?", "Non, Lia fait partie de l'abonnement Enseignant, avec les adaptations des supports illimitées. Le cahier journal, l'emploi du temps, les fiches élèves et les tâches restent gratuits."],
  ],
  soeurs: ["Agenda et tâches", "Fiche élève", "Adaptation des supports"],
};
