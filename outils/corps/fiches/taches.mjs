// Fiche explicative « Tâches » (MCF-Pilotage#53).
// Ce qui est dit de l'app est vérifié dans MCF-App (plan de fiche, origin/main d91a67df) :
// titre, détail, échéance sans heure (« Aujourd'hui », « Demain » ou « Date… »), matière, élèves
// liés ; tri par échéance, sans échéance en dernier ; « À faire » et « Terminées » sur téléphone,
// balayage pour terminer ; cartes « À faire » sur ordinateur ; tâches visibles sur la fiche élève ;
// Lia propose, vous validez. L'agenda n'existe pas dans l'app : la fiche n'en parle pas.
// Pas de rappel avant l'échéance (seulement une notification de retard sur ordinateur), pas d'heure
// d'échéance, d'export ni de partage.

// Exemple : la semaine de la classe de CE1, triée comme dans l'app.
const A_FAIRE = [
  ["Rendre les cahiers de lecture", "Demain", ""],
  ["Photocopier la fiche de mesure, version d'origine et version adaptée", "Jeudi", "Mathématiques"],
  ["Récupérer les autorisations de sortie au musée", "Vendredi", "Maël, Nour"],
  ["Préparer la réunion avec les familles", "12 nov.", ""],
  ["Commander des règles aux graduations agrandies", "", ""],
];

const exemple = `<p>Rangées comme dans l'app : la plus proche en haut, celle sans date en bas. Deux élèves n'ont pas rendu leur autorisation : la tâche leur est reliée, et elle apparaît aussi sur leur fiche.</p>

    <div class="exemple-fiche">
      <h3>Cinq choses à faire, une déjà faite</h3>
      <ol class="ta-liste">
        ${A_FAIRE.map(([titre, quand, lien]) => `<li><span class="ta-case" aria-hidden="true"></span><span class="ta-titre">${titre}${lien ? ` <span class="ta-lien">${lien}</span>` : ""}</span><span class="ta-quand">${quand || "Sans échéance"}</span></li>`).join("\n        ")}
      </ol>
      <p class="ta-faites"><b>Terminées</b> <s>Afficher le planning des services de la classe</s></p>
      <p class="ad-note">Tâches et prénoms inventés pour la page.</p>
    </div>`;

// Illustration : écran « Tâches » du téléphone reconstitué en HTML, données fictives.

export default {
  slug: "taches",
  ariane: "Tâches",
  k: "free",
  titre: "To do list enseignant : les tâches de chaque classe — MyClassFlow",
  description: "La liste des tâches de MyClassFlow : chaque chose à faire, avec ou sans échéance, rangée par classe, reliée aux élèves concernés et cochée d'un geste sur téléphone. Une semaine de CE1 en exemple.",
  h1: "Vos choses à faire, rangées par classe",
  intro: "Photocopies, autorisations de sortie, cahiers à rendre : MyClassFlow garde la liste de ce que vous avez à faire pour chaque classe, avec une échéance si vous en donnez une, et la relie aux élèves concernés quand il y en a.",
  retenir: [
    "Les tâches avec une échéance se rangent avant les autres.",
    "Une tâche peut être reliée aux élèves concernés.",
    "Vous la passez dans « Terminées » d'un geste sur téléphone.",
  ],
  titreBenefices: "Que fait la liste pour vous ?",
  benefices: [
    ["Le plus urgent en haut", "Donnez une échéance, aujourd'hui, demain ou une date : la liste se range d'elle-même, les tâches sans date en dernier."],
    ["Les élèves concernés, nommés", "Une tâche reliée à des élèves apparaît aussi sur leur fiche : en l'ouvrant, vous voyez ce qui reste à faire pour eux."],
    ["Fait, d'un geste", "Sur téléphone, un balayage la passe dans « Terminées » ; un autre la remet à faire si vous vous êtes trompé."],
  ],
  etapes: [
    ["« Nouvelle tâche »", "Un titre ; si besoin, une échéance, une matière, des élèves et un détail."],
    ["Retrouvez-la", "Dans l'écran « Tâches » du téléphone, dans les cartes « À faire » de l'accueil sur ordinateur, et sur la fiche des élèves reliés."],
    ["Cochez-la", "Elle passe dans « Terminées ». Vous pouvez toujours la modifier ou la supprimer."],
  ],
  titreEtapes: "Comment garder vos tâches à portée de main ?",
  blocs: [{ titre: "La semaine d'une classe de CE1, en tâches", html: exemple }],
  offre: {
    titre: "Vos tâches, gratuites dans MyClassFlow",
    texte: "Avec le cahier journal, l'emploi du temps et les fiches élèves, sans carte bancaire. L'abonnement ajoute l'adaptation des supports par l'IA.",
    bouton: "Créer mon compte gratuit",
    href: "https://app.myclassflow.fr",
  },
  questions: [
    ["Une tâche peut-elle ne concerner que quelques élèves ?", "Oui : choisissez les élèves dans le champ « Élèves ». La tâche apparaît alors sur leur fiche, et depuis la tâche, un lien mène à la fiche de chaque élève."],
    ["Tâche ou séance du cahier journal : où noter quoi ?", "Ce qui se passe en classe, à une heure donnée, va dans le cahier journal. Ce que vous avez à faire, en classe ou en dehors, avant une date, est une tâche : photocopier, récupérer, commander, préparer."],
    ["Les tâches fonctionnent-elles sur téléphone et sur ordinateur ?", "Oui. Le téléphone a un écran « Tâches » avec « À faire » et « Terminées ». Sur ordinateur, les tâches s'affichent dans les cartes « À faire » de l'accueil, où vous les créez, les modifiez et les marquez faites."],
    ["Lia peut-elle créer une tâche pour moi ?", "Elle peut vous proposer d'en créer, d'en modifier ou d'en clore une ; rien n'est enregistré sans votre validation. Lia fait partie de l'abonnement Enseignant."],
    ["Les tâches sont-elles gratuites dans MyClassFlow ?", "Oui, comme le cahier journal, l'emploi du temps et les fiches élèves. Le compte gratuit ne demande pas de carte bancaire."],
  ],
  publics: [
    ["Pour la classe", "Vous rangez chaque tâche par classe et lui donnez une échéance si besoin."],
    ["Pour quelques élèves", "Vous reliez la tâche aux élèves concernés et la retrouvez aussi sur leur fiche."],
    ["Pour ce qui est fait", "Vous passez une tâche dans « Terminées » et pouvez la remettre à faire."],
  ],
  soeurs: ["Cahier journal", "Fiche élève", "Lia, votre assistante"],
};
