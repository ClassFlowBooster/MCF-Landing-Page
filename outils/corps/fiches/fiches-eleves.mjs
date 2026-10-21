import { illustrations } from "./illustrations.mjs";
// Fiche explicative « Fiche élève » (MCF-Pilotage#53), adresse au pluriel comme la ligne des tarifs.
// Ce qui est dit de l'app est vérifié dans MCF-App (plan de fiche, origin/main d91a67df) :
// fiche ouverte depuis « Classe » (téléphone) ou « Mes élèves » (ordinateur, recherche, tri,
// filtres, fiche en fenêtre) ; identité ; « Critères pédagogiques » à réglages fermés ;
// commentaires du « fil de suivi » ajoutés, modifiés ou supprimés ; tâches de l'élève ; Lia propose, vous validez.
// Rien sur des notes, un export ou un partage avec les familles : l'app ne les a pas.
// Vocabulaire : des critères de mise en page ou de consigne, jamais une catégorie d'élèves.

const exemple = `<p>Une fiche n'a pas besoin d'être longue pour servir. Celle-ci tient en trois blocs, et chacun a un usage précis dans la classe.</p>

    <div class="exemple-fiche">
      <h3>Trois repères pour Inès, en CE1</h3>
      <dl class="fe-blocs">
        <div><dt>Critères pédagogiques</dt><dd><ul class="fe-puces"><li>Espacer les lettres</li><li>Augmenter l'interligne</li><li>Consignes courtes et directes</li></ul>Ils servent chaque fois qu'un support est adapté pour elle.</dd></div>
        <div><dt>Fil de suivi</dt><dd><ul class="fe-obs"><li>Mesure juste quand elle part du zéro de la règle ; le lui rappeler en début de séance.</li><li>Relit la consigne à voix basse avant de commencer : la laisser faire.</li></ul>Deux phrases factuelles, écrites après la classe, que vous pourrez relire en janvier.</dd></div>
        <div><dt>Tâches</dt><dd><ul class="fe-obs"><li>Préparer la fiche de mesure en version adaptée pour jeudi.</li></ul>Ce qu'il reste à faire pour elle, visible depuis sa fiche.</dd></div>
      </dl>
      <p>Jeudi, la fiche d'exercices de mesure est adaptée pour Inès avec ces trois critères : le résultat est montré dans la fiche <a href="/enseignants/fonctionnalites/adaptation-des-supports/">Adaptation des supports</a>.</p>
      <p class="ad-note">Élève et commentaires inventés pour la page.</p>
    </div>`;

// Illustration : fiche élève du téléphone reconstituée en HTML, données fictives.
const illustration = illustrations["fiches-eleves"];

export default {
  slug: "fiches-eleves",
  ariane: "Fiche élève",
  k: "free",
  titre: "Fiche élève : critères et fil de suivi — MyClassFlow",
  description: "La fiche élève de MyClassFlow : les critères pédagogiques qui aident chaque élève, son fil de suivi et ses tâches, réunis au même endroit et repris quand vous adaptez un support. Un exemple de fiche de CE1.",
  carte: { fichier: "og-fiches-eleves.png", alt: "MyClassFlow, fiche gratuite pour les enseignants : le castor professeur et l'accroche « Les critères et le fil de suivi de chaque élève, réunis »." },
  h1: "Une fiche par élève, pour adapter sans tout retenir",
  intro: "La fiche élève réunit, pour chaque enfant de la classe, les critères pédagogiques qui l'aident, ce que vous observez au fil de l'année et ce qu'il reste à faire pour lui. Ses critères servent ensuite quand vous adaptez un support.",
  retenir: [
    "Les critères pédagogiques restent réunis sur la fiche de chaque élève.",
    "Les commentaires forment son fil de suivi.",
    "Ses critères sont repris quand vous adaptez un support pour lui.",
  ],
  titreBenefices: "Que garde la fiche pour vous ?",
  benefices: [
    ["Les aides de chaque élève, cochées une fois", "Texte agrandi, interligne augmenté, consignes courtes : vous les choisissez sur sa fiche, et vous n'avez plus à vous en souvenir à chaque photocopie."],
    ["Le fil de suivi, au même endroit", "Un commentaire écrit après la classe s'ajoute au fil de suivi de l'élève ; il se corrige ou se supprime quand il n'est plus vrai."],
    ["Une adaptation qui part de l'élève", "Quand vous adaptez un support pour lui, ses critères sont repris : la version qui sort est la sienne."],
  ],
  etapes: [
    ["Créez vos élèves", "Un par un, ou toute la classe d'un coup à partir d'une photo de la liste, prise avec le téléphone."],
    ["Ouvrez sa fiche et cochez ses critères", "Depuis « Classe » sur le téléphone, ou « Mes élèves » sur ordinateur, où la liste se cherche, se trie et se filtre. Puis « Critères pédagogiques »."],
    ["Complétez au fil de l'année", "Ajoutez un commentaire au fil de suivi, modifiez-le ou supprimez-le, et suivez les tâches liées à l'élève."],
  ],
  titreEtapes: "Comment remplir une fiche élève ?",
  illustration,
  blocs: [{ titre: "Que contient une fiche d'élève de CE1, bloc par bloc ?", html: exemple }],
  offre: {
    titre: "Vos fiches élèves, gratuites dans MyClassFlow",
    texte: "Avec le cahier journal, l'emploi du temps et les fiches de préparation, sans carte bancaire. L'abonnement ajoute l'adaptation des supports par l'IA.",
    bouton: "Créer mon compte gratuit",
    href: "https://app.myclassflow.fr",
  },
  questions: [
    ["Que garder dans une fiche élève ?", "Un repère utile pour la prochaine séance : une aide qui a marché, un point à reprendre, en une phrase. Le reste n'a pas sa place dans la fiche : ni donnée médicale, ni appréciation sur la personne."],
    ["Que sont les critères pédagogiques d'une fiche élève ?", "Des aides de mise en page ou de consigne, choisies dans une liste : agrandir le texte, changer de police, augmenter l'interligne, espacer les lettres, fond crème, consignes courtes… Certains ont un réglage, comme la taille du texte. Ils servent à adapter les supports pour cet élève."],
    ["Peut-on créer toute la classe d'un coup ?", "Oui : depuis le téléphone, une photo de votre liste de classe suffit à créer tous les élèves. Vous pouvez aussi les ajouter un par un."],
    ["Lia peut-elle écrire dans une fiche élève ?", "Elle peut vous proposer un commentaire à ajouter au fil de suivi, à modifier ou à retirer, mais rien n'est écrit sans votre validation. Lia fait partie de l'abonnement Enseignant."],
    ["Les fiches élèves fonctionnent-elles sur téléphone et sur ordinateur ?", "Oui. Sur téléphone, la fiche s'ouvre en plein écran depuis « Classe ». Sur ordinateur, « Mes élèves » liste la classe avec la recherche, le tri et les filtres, et ouvre chaque fiche dans une fenêtre."],
    ["Les fiches élèves sont-elles gratuites dans MyClassFlow ?", "Oui, comme le cahier journal, l'emploi du temps et les fiches de préparation. Le compte gratuit ne demande pas de carte bancaire."],
  ],
  publics: [
    ["Pour créer la classe", "Vous créez les élèves un par un ou à partir d'une photo de la liste."],
    ["Pour suivre chaque élève", "Vous ajoutez des commentaires et retrouvez les tâches qui lui sont liées."],
    ["Pour adapter un support", "Vous retrouvez les critères pédagogiques de l'élève au moment de l'adaptation."],
  ],
  soeurs: ["Adaptation des supports", "Import des élèves par photo", "Lia, votre assistante"],
};
