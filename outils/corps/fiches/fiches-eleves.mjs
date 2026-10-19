// Fiche explicative « Fiche élève » (MCF-Pilotage#53), adresse au pluriel comme la ligne des tarifs.
// Ce qui est dit de l'app est vérifié dans MCF-App (plan de fiche, origin/main d91a67df) :
// fiche ouverte depuis « Classe » (téléphone) ou « Mes élèves » (ordinateur, recherche, tri,
// filtres, fiche en fenêtre) ; identité ; « Critères pédagogiques » à réglages fermés ;
// observations ajoutées, modifiées ou supprimées ; tâches de l'élève ; Lia propose, vous validez.
// Rien sur des notes, un export ou un partage avec les familles : l'app ne les a pas.
// Vocabulaire : des critères de mise en page ou de consigne, jamais une catégorie d'élèves.

const exemple = `<p>Une fiche n'a pas besoin d'être longue pour servir. Celle-ci tient en trois blocs, et chacun a un usage précis dans la classe.</p>

    <div class="exemple-fiche">
      <h3>Inès, CE1 : sa fiche en octobre</h3>
      <dl class="fe-blocs">
        <div><dt>Critères pédagogiques</dt><dd><ul class="fe-puces"><li>Agrandir le texte</li><li>Augmenter l'interligne</li><li>Consignes courtes et directes</li></ul>Ils servent chaque fois qu'un support est adapté pour elle.</dd></div>
        <div><dt>Observations</dt><dd><ul class="fe-obs"><li>Mesure juste quand elle part du zéro de la règle ; le lui rappeler en début de séance.</li><li>Relit la consigne à voix basse avant de commencer : la laisser faire.</li></ul>Deux phrases factuelles, écrites après la classe, que vous pourrez relire en janvier.</dd></div>
        <div><dt>Tâches</dt><dd><ul class="fe-obs"><li>Préparer la fiche de mesure en version adaptée pour jeudi.</li></ul>Ce qu'il reste à faire pour elle, visible depuis sa fiche.</dd></div>
      </dl>
      <p>Jeudi, la fiche d'exercices de mesure est adaptée pour Inès avec ces trois critères : le résultat est montré dans la fiche <a href="/enseignants/fonctionnalites/adaptation-des-supports/">Adaptation des supports</a>.</p>
      <p class="ad-note">Élève et observations inventées pour la page.</p>
    </div>`;

// Illustration : fiche élève du téléphone reconstituée en HTML, données fictives.
const illustration = `<figure class="maquette-fiche" aria-label="Illustration : une fiche élève dans MyClassFlow">
        <div class="mf-ecran" aria-hidden="true">
          <div class="mf-chemin">Classe › Fiche élève</div>
          <div class="mf-titre">Inès</div>
          <div class="mf-etiquette">Critères pédagogiques</div>
          <div class="mf-puces"><span>Agrandir le texte</span><span>Augmenter l'interligne</span><span>Consignes courtes</span></div>
          <div class="mf-etiquette">Observations</div>
          <ul class="mf-seances">
            <li>Mesure juste quand elle part du zéro.</li>
            <li>Relit la consigne avant de commencer.</li>
          </ul>
          <div class="mf-bouton">Modifier l'élève</div>
        </div>
        <figcaption>Illustration avec des données fictives.</figcaption>
      </figure>`;

export default {
  slug: "fiches-eleves",
  ariane: "Fiche élève",
  k: "free",
  titre: "Fiche élève : critères pédagogiques et observations — MyClassFlow",
  description: "La fiche élève de MyClassFlow : les critères pédagogiques qui aident chaque élève, vos observations et ses tâches, réunis au même endroit et repris quand vous adaptez un support. Un exemple de fiche de CE1.",
  h1: "Une fiche par élève, pour adapter sans tout retenir",
  intro: "La fiche élève réunit, pour chaque enfant de la classe, les critères pédagogiques qui l'aident, ce que vous observez au fil de l'année et ce qu'il reste à faire pour lui. Ses critères servent ensuite quand vous adaptez un support.",
  titreBenefices: "Ce que la fiche garde pour vous",
  benefices: [
    ["Les aides de chaque élève, cochées une fois", "Texte agrandi, interligne augmenté, consignes courtes : vous les choisissez sur sa fiche, et vous n'avez plus à vous en souvenir à chaque photocopie."],
    ["Vos observations, au même endroit", "Une phrase écrite après la classe s'ajoute à sa fiche ; elle se corrige ou se supprime quand elle n'est plus vraie."],
    ["Une adaptation qui part de l'élève", "Quand vous adaptez un support pour lui, ses critères sont repris : la version qui sort est la sienne."],
  ],
  etapes: [
    ["Créez vos élèves", "Un par un, ou toute la classe d'un coup à partir d'une photo de la liste, prise avec le téléphone."],
    ["Ouvrez sa fiche et cochez ses critères", "Depuis « Classe » sur le téléphone, ou « Mes élèves » sur ordinateur, où la liste se cherche, se trie et se filtre. Puis « Critères pédagogiques »."],
    ["Complétez au fil de l'année", "Ajoutez une observation, modifiez-la ou supprimez-la, et suivez les tâches liées à l'élève."],
  ],
  illustration,
  blocs: [{ titre: "Une fiche d'élève de CE1, bloc par bloc", html: exemple }],
  offre: {
    titre: "Vos fiches élèves, gratuites dans MyClassFlow",
    texte: "Avec le cahier journal, l'emploi du temps et les fiches de préparation, sans carte bancaire. L'abonnement ajoute l'adaptation des supports par l'IA.",
    bouton: "Créer mon compte gratuit",
    href: "https://app.myclassflow.fr",
  },
  questions: [
    ["Que noter dans une fiche élève, et que laisser de côté ?", "Ce qui vous aide à enseigner : les aides qui marchent pour lui, ce que vous avez vu en classe, en phrases courtes et factuelles. Laissez de côté les informations de santé, les jugements et tout ce que vous n'écririez pas devant sa famille."],
    ["Que sont les critères pédagogiques d'une fiche élève ?", "Des aides de mise en page ou de consigne, choisies dans une liste : agrandir le texte, changer de police, augmenter l'interligne, espacer les lettres, fond crème, consignes courtes… Certains ont un réglage, comme la taille du texte. Ils servent à adapter les supports pour cet élève."],
    ["Peut-on créer toute la classe d'un coup ?", "Oui : depuis le téléphone, une photo de votre liste de classe suffit à créer tous les élèves. Vous pouvez aussi les ajouter un par un."],
    ["Lia peut-elle écrire dans une fiche élève ?", "Elle peut vous proposer une observation à ajouter, à modifier ou à retirer, mais rien n'est écrit sans votre validation. Lia fait partie de l'abonnement Enseignant."],
    ["Les fiches élèves fonctionnent-elles sur téléphone et sur ordinateur ?", "Oui. Sur téléphone, la fiche s'ouvre en plein écran depuis « Classe ». Sur ordinateur, « Mes élèves » liste la classe avec la recherche, le tri et les filtres, et ouvre chaque fiche dans une fenêtre."],
    ["Les fiches élèves sont-elles gratuites dans MyClassFlow ?", "Oui, comme le cahier journal, l'emploi du temps et les fiches de préparation. Le compte gratuit ne demande pas de carte bancaire."],
  ],
  soeurs: ["Adaptation des supports", "Import des élèves par photo", "Lia, votre assistante"],
};
