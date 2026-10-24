import { visuelBaseCommune } from "./visuel-base-commune.mjs";
// Fiche explicative « Base commune » (MCF-Landing-Page#37).
// Ce qui est dit de l'app est vérifié dans MCF-App (origin/main du 23/10/2026, après #398, #399 et #409) :
// Découvrir (récemment publiées, plus reprises), recherche par titre, compétence ou auteur, filtres
// niveau et matière ; « Reprendre dans ma banque » crée une copie, l'original ne bouge pas, crédit
// « Inspirée de … par … » ; « Partager dans la base commune » depuis Ma banque, sous son nom ou un
// pseudonyme ; mise à jour (« Publier la mise à jour ») et « Retirer de la base » ; suivre un collègue
// ou un coin du programme, Mon fil ; avis réservés à ceux qui ont repris la fiche, réponse de l'auteur ;
// publication bloquée si un mot correspond au prénom ou au nom d'un élève de ses classes ; profil
// d'auteur limité au pseudonyme, aux niveaux et aux publications ; réservée aux comptes connectés.
// Offres (offre_provider.dart, gratuit_logique.dart, gratuit_widgets.dart) : le gratuit consulte, suit et publie
// par son propre parcours (ses fiches publiées sont publiques) ; le payant reprend, note, partage depuis Ma banque
// et peut garder une fiche complète privée. Page d'auteur (auteur_widgets.dart) : pseudonyme, niveaux,
// ancienneté, présentation facultative, fiches publiées et leurs totaux.
// Rien sur la licence détaillée (texte pas encore validé), le signalement (inactif) ni le téléphone.

const confidentialite = `<p>Une fiche partagée ne contient que la séance. Les informations sur vos élèves restent dans votre compte.</p>
    <ul class="bc-garanties">
      <li><b>Aucun nom d'élève ne passe.</b> Avant la publication, MyClassFlow compare la fiche aux prénoms et aux noms des élèves de vos classes. Si un mot correspond, la publication est bloquée : l'app vous montre le mot et la section où il se trouve, et « Modifier la fiche » vous y emmène.</li>
      <li><b>Vous choisissez le nom affiché.</b> Votre vrai nom ou un pseudonyme, jamais le nom d'un élève ni une adresse e-mail.</li>
      <li><b>Votre page d'auteur ne parle que de la base.</b> Les collègues y voient ce nom, vos niveaux, une présentation si vous en écrivez une, vos fiches partagées et combien de fois elles ont été reprises.</li>
      <li><b>Entre enseignants seulement.</b> La base commune est réservée aux comptes enseignants connectés.</li>
    </ul>`;

const communaute = `<p>Des enseignants qui utilisent MyClassFlow, pour leur propre classe. La base grandit avec les fiches que chacun y dépose, et chaque fiche garde la trace de ceux qui l'ont faite.</p>
    <ul class="bc-garanties">
      <li><b>L'auteur reste crédité.</b> Chaque fiche porte le nom choisi par son auteur. Une fiche reprise, adaptée puis partagée à son tour indique de quelle fiche elle est inspirée, et par qui.</li>
      <li><b>Les avis viennent de ceux qui l'ont utilisée.</b> On ne peut donner un avis qu'après avoir repris la fiche, et l'auteur peut y répondre.</li>
      <li><b>« Les plus reprises » n'est pas un classement.</b> C'est une entrée parmi d'autres, à côté des fiches récentes et du programme de votre classe.</li>
    </ul>`;

export default {
  slug: "base-commune",
  ariane: "Base commune",
  // Carte de partage : outils/partage/gabarit.html?page=base-commune.
  carte: { fichier: "og-base-commune.png", alt: "MyClassFlow, fiche pour les enseignants : le castor professeur et l'accroche « Des fiches de prep partagées entre enseignants »." },
  accroche: "Des fiches de prep partagées entre enseignants : vous les découvrez, les reprenez, partagez les vôtres.",
  k: "free",
  titre: "Base commune : fiches de prep entre collègues — MyClassFlow",
  description: "Dans MyClassFlow, des enseignants partagent leurs fiches de préparation, s'en inspirent, se suivent et se donnent des avis. Sans aucune donnée d'élève.",
  h1: "Des fiches de prep partagées entre enseignants",
  intro: "Une séance qui a bien marché dans votre classe peut servir à d'autres. Dans la base commune de MyClassFlow, des enseignants partagent leurs fiches de préparation, s'inspirent les uns des autres, se suivent et se donnent des avis.",
  retenir: [
    "La base commune rassemble des fiches de préparation partagées par des enseignants, à chercher par niveau, matière, compétence ou auteur.",
    "« Reprendre dans ma banque » en fait votre copie : vous l'adaptez à vos élèves, l'original ne bouge pas.",
    "Aucune donnée d'élève n'y entre : une fiche qui contient le prénom ou le nom d'un de vos élèves ne peut pas être publiée.",
  ],
  titreBenefices: "Pourquoi partager ses fiches entre collègues ?",
  benefices: [
    ["Ne plus partir d'une page blanche", "Avant de préparer une séance, regardez comment des collègues l'ont menée pour le même niveau et la même matière, puis reprenez ce qui vous sert."],
    ["Faire vivre une séance qui a marché", "Partagée, une fiche qui a fait ses preuves sert à d'autres classes. Les collègues qui vous suivent voient vos nouvelles fiches et vos mises à jour dans leur fil."],
    ["Savoir ce qu'en pensent ceux qui l'ont faite", "Les avis viennent d'enseignants qui ont repris la fiche pour leur classe. Vous pouvez leur répondre."],
  ],
  titreEtapes: "Comment s'en servir dans MyClassFlow ?",
  etapes: [
    ["Découvrez les fiches partagées", "Dans Fiches de prep, Découvrir rassemble les fiches des collègues, les plus récentes et les plus reprises. Cherchez par titre, compétence ou auteur, puis choisissez un niveau et une matière."],
    ["Reprenez celle qui vous inspire", "« Reprendre dans ma banque » en fait votre copie. Vous l'adaptez à vos élèves ; l'original ne bouge pas."],
    ["Partagez les vôtres", "Depuis Ma banque, « Partager dans la base commune » offre votre fiche aux collègues, sous votre nom ou un pseudonyme. Vous publiez une mise à jour quand vous la retouchez, ou vous la retirez de la base."],
    ["Suivez vos collègues et donnez votre avis", "Suivez des collègues ou un coin du programme : leurs nouvelles fiches arrivent dans Mon fil. Sur une fiche que vous avez reprise, laissez un avis à son auteur."],
  ],
  illustration: visuelBaseCommune,
  blocs: [
    { titre: "Qui partage les fiches de la base commune ?", html: communaute },
    { titre: "Et les données de vos élèves ?", html: confidentialite },
  ],
  offre: {
    titre: "La base commune, ouverte dès le compte gratuit",
    texte: "Avec le compte gratuit, vous consultez les fiches, suivez vos collègues et partagez les vôtres. L'abonnement ajoute la reprise dans votre banque et les avis.",
    bouton: "Créer mon compte gratuit",
    href: "https://app.myclassflow.fr",
  },
  questions: [
    ["La base commune est-elle gratuite ?", "La consulter, suivre des collègues et y partager vos fiches est gratuit, avec un compte enseignant ; avec le compte gratuit, les fiches que vous publiez sont publiques. Reprendre une fiche dans votre banque, donner un avis et garder une fiche complète privée font partie de l'abonnement."],
    ["Si je modifie une fiche reprise, l'original change-t-il ?", "Non. « Reprendre dans ma banque » crée votre copie : vous l'adaptez à vos élèves, et la fiche de l'auteur reste telle qu'il l'a partagée."],
    ["Puis-je partager une fiche sans donner mon vrai nom ?", "Oui. Vous choisissez le nom affiché sur vos fiches : votre vrai nom ou un pseudonyme, jamais une adresse e-mail. C'est ce nom que les collègues voient sur vos fiches et sur votre page d'auteur."],
    ["Que se passe-t-il si ma fiche contient le prénom d'un élève ?", "La publication est bloquée. MyClassFlow vous montre le mot en cause et la section où il se trouve ; « Modifier la fiche » vous y emmène pour le corriger avant de partager."],
    ["Qui peut donner un avis sur une fiche ?", "Les enseignants abonnés qui ont repris la fiche : un avis n'a de sens que pour ceux qui l'ont utilisée. L'auteur peut répondre à chaque avis."],
  ],
  publics: [
    ["Vous débutez", "Des séances déjà menées par des collègues pour votre niveau : un point de départ que vous adaptez à vos élèves."],
    ["Vous changez de niveau", "Suivez le coin du programme de votre nouveau niveau : les fiches que les collègues y partagent arrivent dans votre fil."],
    ["Vos séances marchent", "Partagez-les : elles servent à d'autres classes, et les avis de ceux qui les ont utilisées vous reviennent."],
  ],
  soeurs: ["Fiches de préparation", "Cahier journal", "Adaptation des supports"],
};
