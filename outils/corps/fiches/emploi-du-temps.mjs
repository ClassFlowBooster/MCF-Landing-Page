import { illustrations } from "./illustrations.mjs";
// Fiche explicative « Emploi du temps » (MCF-Pilotage#53).
// Ce qui est dit de l'app est vérifié dans MCF-App (plan de fiche, origin/main d91a67df) :
// semaine type récurrente du lundi au vendredi ; créneaux « Cours », « Récré/pause » ou « Rituel »
// créés en touchant une case vide ; réglage de la plage horaire ; volume par matière calculé
// sur les cours seulement, avec le total d'enseignement par semaine ; PDF « semaine type ».
// Rien sur le glisser-déposer, les semaines A/B, les périodes ni une comparaison automatique
// avec les horaires officiels : l'app ne les a pas.
// Horaires du cycle 3 : arrêté du 9 novembre 2015 (NOR MENE1526553A), article 2, colonne
// « récréations déduites » ; l'arrêté du 12 juin 2026 ne modifie que le cycle 2.

const SOURCE = "https://www.education.gouv.fr/bo/15/Hebdo44/MENE1526553A.htm";

// Exemple : une semaine de CM2 sur quatre jours et demi, ramenée à l'année (36 semaines).
// Cours : 21 h 45 par semaine (24 h moins 9 récréations de 15 min) ; écart annuel = 81 h de récréations.
const VOLUMES = [
  ["Français", "7 h 15", "261 h", "288 h"],
  ["Mathématiques", "4 h 30", "162 h", "180 h"],
  ["Langues vivantes", "1 h 15", "45 h", "54 h"],
  ["Éducation physique et sportive", "2 h 45", "99 h", "108 h"],
  ["Sciences et technologie", "1 h 45", "63 h", "72 h"],
  ["Enseignements artistiques", "1 h 45", "63 h", "72 h"],
  ["Histoire, géographie et EMC", "2 h 30", "90 h", "90 h"],
];

const exemple = `<p>Une classe de CM2 qui a cours le mercredi matin : quatre jours de 8 h 30 à 11 h 45 et de 13 h 30 à 15 h 45, plus le mercredi de 8 h 30 à 10 h 30. Neuf récréations de 15 minutes. Une fois les créneaux posés, MyClassFlow affiche les heures de cours de chaque matière ; multipliées par les 36 semaines de l'année, elles se lisent à côté de l'horaire annuel fixé par les programmes.</p>

    <div class="exemple-fiche">
      <h3>Du total de la semaine au total de l'année</h3>
      <div class="tableau-defile" tabindex="0" role="region" aria-label="Heures de cours du CM2, tableau défilant">
        <table class="edt-volumes">
          <caption>CM2, semaine de quatre jours et demi</caption>
          <thead><tr><th scope="col">Matière</th><th scope="col">Par semaine dans MyClassFlow</th><th scope="col">Sur 36 semaines</th><th scope="col">Horaire annuel des programmes</th></tr></thead>
          <tbody>
            ${VOLUMES.map(([m, semaine, annee, prog]) => `<tr><th scope="row">${m}</th><td>${semaine}</td><td>${annee}</td><td>${prog}</td></tr>`).join("\n            ")}
            <tr class="edt-total"><th scope="row">Total</th><td>21 h 45</td><td>783 h</td><td>864 h</td></tr>
          </tbody>
        </table>
      </div>
      <p class="defile-indice" aria-hidden="true">Faites défiler le tableau →</p>
      <p><b>Les 81 heures qui manquent sont les récréations</b> : 2 h 15 par semaine, sur 36 semaines. L'horaire annuel les inclut et les répartit sur toutes les matières ; MyClassFlow, lui, ne compte que les cours. La perte suit à peu près le poids de chaque matière : 27 heures en français, 18 en mathématiques, 9 dans chacune des autres, et aucune en histoire-géographie, servie un peu plus généreusement cette année.</p>
      <p class="edt-source">Horaires annuels : <a href="${SOURCE}" rel="noopener">arrêté du 9 novembre 2015</a> fixant les horaires des écoles élémentaires, cycle de consolidation (CM1 et CM2), 864 heures par an.</p>
    </div>`;

// Illustration : semaine type et volume par matière reconstitués en HTML, données fictives.
const illustration = illustrations["emploi-du-temps"];

export default {
  slug: "emploi-du-temps",
  ariane: "Emploi du temps",
  k: "free",
  titre: "Emploi du temps de classe : votre semaine type — MyClassFlow",
  description: "Construire l'emploi du temps de sa classe créneau par créneau et lire le volume horaire de chaque matière pendant la saisie. Exemple : une semaine de CM2 sur quatre jours et demi, ramenée aux horaires annuels du cycle 3.",
  h1: "L'emploi du temps de votre classe, et ses heures par matière",
  intro: "L'emploi du temps pose la semaine type de la classe : les cours, les récréations, les rituels. Sa vraie question est souvent : chaque matière a-t-elle son compte d'heures ? MyClassFlow fait l'addition pour vous, au fil des créneaux.",
  titreBenefices: "Pourquoi le poser dans MyClassFlow",
  benefices: [
    ["La répartition sous les yeux", "Le total de chaque matière change à chaque cours que vous posez : vous voyez la semaine se répartir, et un manque se repère avant la rentrée, pas en février."],
    ["Une base hebdomadaire que vous corrigez", "L'anglais passe du mardi au jeudi en janvier ? Vous modifiez le jour du créneau ; un créneau qui ne sert plus s'archive sans être détruit."],
    ["Une copie papier dans la classe", "« Imprimer l'emploi du temps » donne la semaine type en PDF, à consulter sans écran."],
  ],
  etapes: [
    ["Réglez la plage horaire", "L'heure de début et de fin de la journée, dans les réglages de la plage horaire."],
    ["Posez vos créneaux", "Touchez une case vide : un cours avec sa matière, une récréation ou une pause, ou un rituel, avec son jour, son début et sa fin. Un clic sur un créneau le modifie."],
    ["Lisez les totaux, puis imprimez", "Le volume de chaque matière s'affiche à côté de la grille, du plus grand au plus petit. « Imprimer l'emploi du temps » en fait un PDF ; le téléphone le télécharge."],
  ],
  illustration,
  blocs: [{ titre: "Une semaine de CM2 sur quatre jours et demi, totalisée par MyClassFlow", html: exemple }],
  offre: {
    titre: "Votre emploi du temps, gratuit dans MyClassFlow",
    texte: "Avec le cahier journal et les fiches de préparation, sans carte bancaire. L'abonnement ajoute l'adaptation des supports par l'IA.",
    bouton: "Créer mon compte gratuit",
    href: "https://app.myclassflow.fr",
  },
  questions: [
    ["Mon rituel de calcul mental compte-t-il dans les heures de mathématiques ?", "Seulement si vous le posez comme un cours de mathématiques. Dans MyClassFlow, un créneau de type « Rituel », comme une récréation ou une pause, reste en dehors des totaux par matière : gardez ce type pour l'appel, la date ou la météo."],
    ["Une semaine de quatre jours et demi change-t-elle quelque chose ?", "Non : la grille va du lundi au vendredi, le mercredi matin se remplit comme les autres jours. Seule la plage horaire, commune à toute la semaine, se règle sur la journée la plus longue."],
    ["L'emploi du temps sert-il au cahier journal ?", "Il lui donne son cadre : sur téléphone, les récréations de l'emploi du temps s'affichent dans la vue Journal, et les heures proposées pour une séance restent dans la plage horaire de la classe. Les séances du jour, elles, s'ajoutent dans le cahier journal."],
    ["Sur l'année, quel horaire chaque matière doit-elle atteindre en CM1 et en CM2 ?", "288 heures de français, 180 de mathématiques, 54 de langues vivantes, 108 d'EPS, 72 de sciences et technologie, 72 d'enseignements artistiques et 90 d'histoire, de géographie et d'enseignement moral et civique : 864 heures (arrêté du 9 novembre 2015). La répartition d'une semaine à l'autre peut varier, du moment que le total de l'année est tenu."],
    ["Où passent les récréations dans ce calcul ?", "L'arrêté les impute sur l'ensemble des matières, de façon équilibrée dans la semaine. C'est pourquoi un total de cours tiré de MyClassFlow est toujours un peu inférieur à l'horaire officiel : l'écart doit correspondre à vos récréations."],
    ["L'emploi du temps est-il gratuit dans MyClassFlow ?", "Oui, comme le cahier journal et les fiches de préparation. Le compte gratuit ne demande pas de carte bancaire."],
  ],
  soeurs: ["Cahier journal", "Fiches de préparation", "Adaptation des supports"],
};
