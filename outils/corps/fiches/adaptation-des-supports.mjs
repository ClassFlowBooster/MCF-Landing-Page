// Fiche explicative « Adaptation des supports » (MCF-Pilotage#53).
// Ce qui est dit de l'app est vérifié dans MCF-App (plan de fiche, origin/main d91a67df) :
// « Adapter un support » ; sources « Photo », « Photothèque » ou « Fichier » (PDF, images, Word),
// 8 pages au plus ; critères par familles (libellés exacts ci-dessous) ; versions par élève ou
// par groupe, « Lancer l'adaptation » ; « Imprimer », « Télécharger », « Tout télécharger (.zip) ».
// Aucun décompte d'adaptations dans l'app (MCF-App#124) : on garde la formule des tarifs.
// Vocabulaire : des critères pédagogiques, jamais une catégorie d'élèves.

// Quelques critères de l'app, avec leurs libellés exacts, par famille.
const CRITERES = [
  ["Lisibilité", ["Agrandir le texte", "Changer de police", "Augmenter l'interligne", "Espacer les lettres", "Raccourcir les lignes", "Fond crème"]],
  ["Consignes", ["Consignes courtes et directes", "Vocabulaire simple", "Lexique des mots difficiles"]],
  ["Structure", ["Textes en paragraphes courts", "Afficher la progression"]],
];

// Exemple : la fiche d'exercices de la séance de mesure (fiche de préparation, CE1).
const SEGMENTS = [["A", 9], ["B", 4], ["C", 12], ["D", 6]];
const trait = ([nom, cm], grand) => `<li><span class="ad-nom">${nom}</span><span class="ad-trait" style="width:${cm * 5}%"></span>${grand ? `<span class="ad-rep">… cm</span>` : ""}</li>`;

const exemple = `<p>Les critères se rangent en familles. En voici une partie, avec les mots exacts de MyClassFlow :</p>
    <div class="ad-criteres">
      ${CRITERES.map(([famille, liste]) => `<div><b>${famille}</b><ul>${liste.map((c) => `<li>${c}</li>`).join("")}</ul></div>`).join("\n      ")}
    </div>

    <div class="exemple-fiche">
      <h3>Une mesure en CE1, du document importé au résultat</h3>
      <p>La même fiche que dans notre <a href="/enseignants/fonctionnalites/fiche-de-preparation/">exemple de fiche de préparation</a>. Trois critères cochés : « Agrandir le texte », « Augmenter l'interligne » et « Consignes courtes et directes ».</p>
      <div class="ad-duo">
        <figure class="ad-feuille">
          <figcaption>Support importé</figcaption>
          <p class="ad-consigne">Mesure chacun des segments ci-dessous avec ta règle graduée, écris sa longueur en centimètres à côté, puis trace sur ton cahier un segment de 7 cm en commençant au point rouge.</p>
          <ol class="ad-traits">${SEGMENTS.map((s) => trait(s, false)).join("")}</ol>
        </figure>
        <figure class="ad-feuille adaptee">
          <figcaption>Résultat à contrôler</figcaption>
          <ol class="ad-etapes"><li>Pose le zéro de la règle au début du trait.</li><li>Lis le nombre au bout du trait.</li><li>Écris la longueur.</li></ol>
          <ol class="ad-traits">${SEGMENTS.map((s) => trait(s, true)).join("")}</ol>
          <p class="ad-consigne">Ensuite : trace un trait de 7 cm sur ton cahier.</p>
        </figure>
      </div>
      <p class="ad-note">Exemple reconstitué pour la page. Il montre ce que vise l'adaptation : garder le but de l'exercice, changer sa présentation et la façon de dire la consigne.</p>
    </div>`;

// Illustration : écran « Adapter un support » reconstitué en HTML, données fictives.
const illustration = `<figure class="maquette-fiche" aria-label="Illustration : adapter un support dans MyClassFlow">
        <div class="mf-ecran" aria-hidden="true">
          <div class="mf-chemin">Adaptation › Adapter un support</div>
          <div class="mf-titre">Mesurer des segments</div>
          <div class="mf-etiquette">Source</div>
          <div class="mf-puces"><span>Photo</span><span>Photothèque</span><span>Fichier</span></div>
          <div class="mf-etiquette">Pour qui</div>
          <ul class="mf-seances">
            <li><b>Groupe bleu</b><i>3 critères</i></li>
            <li><b>Inès</b><i>critères de sa fiche</i></li>
          </ul>
          <div class="mf-bouton">Lancer l'adaptation</div>
        </div>
        <figcaption>Illustration avec des données fictives.</figcaption>
      </figure>`;

export default {
  slug: "adaptation-des-supports",
  ariane: "Adaptation des supports",
  k: "pay",
  titre: "Adapter un exercice selon des critères pédagogiques — MyClassFlow",
  description: "Adapter un exercice ou une leçon selon des critères pédagogiques cochés : texte agrandi, interligne, consignes courtes. Les critères de l'app, une mesure en CE1 du document importé au résultat, les versions par élève ou par groupe.",
  h1: "Du support de la classe aux versions à imprimer",
  intro: "Vous prenez en photo ou importez l'exercice prévu pour la classe, vous cochez les critères pédagogiques qui aident tel élève ou tel groupe, et MyClassFlow en tire une version adaptée, à relire puis à imprimer à côté de l'originale. Un outil de différenciation pédagogique, qui s'occupe de la mise en page pendant que vous gardez la main sur le fond.",
  titreBenefices: "Ce que l'adaptation vous évite",
  benefices: [
    ["Une mise en page à ne pas refaire", "La présentation des variantes est produite par l'IA à partir de l'exercice de la classe ; vous gardez la relecture pédagogique."],
    ["Se souvenir de qui a besoin de quoi", "Les critères de chaque élève restent sur sa fiche : vous les retrouvez au moment d'adapter, sans les recocher."],
    ["Trier les copies au photocopieur", "L'impression prépare ensemble la version d'origine et chaque version adaptée ; « Tout télécharger (.zip) » les garde dans un seul fichier."],
  ],
  etapes: [
    ["Ajoutez le support", "« Adapter un support », un titre, puis une photo, une image de la photothèque ou un fichier PDF, image ou Word, jusqu'à 8 pages. Les pages se réordonnent ou se retirent."],
    ["Dites pour qui", "Partez des critères de vos élèves ou de vos groupes, ou choisissez les critères pour l'occasion. Puis « Lancer l'adaptation »."],
    ["Imprimez ou téléchargez", "Chaque version s'imprime, se télécharge ou se renomme ; une version inutile se supprime."],
  ],
  illustration,
  blocs: [{ titre: "Les critères de l'app, puis une mesure en CE1", html: exemple }],
  offre: {
    titre: "L'adaptation des supports, dans l'abonnement Enseignant",
    texte: "3 adaptations offertes pour l'essayer avec le compte gratuit. L'abonnement Enseignant rend les adaptations illimitées et ajoute Lia, votre assistante.",
    bouton: "Essayer gratuitement",
    href: "https://app.myclassflow.fr",
  },
  questions: [
    ["Quels critères pédagogiques peut-on cocher pour adapter un exercice ?", "Ils sont rangés par familles. Lisibilité : agrandir le texte, changer de police, augmenter l'interligne, espacer les lettres, raccourcir les lignes, fond crème. Consignes : consignes courtes et directes, vocabulaire simple, lexique des mots difficiles. Structure : textes en paragraphes courts, afficher la progression. D'autres critères complètent ces familles dans l'app."],
    ["Quels documents peut-on adapter ?", "Une photo prise sur le moment, une image de votre photothèque, ou un fichier PDF, image (PNG, JPG, WEBP) ou Word, jusqu'à 8 pages par support. Pour un document Word, un seul fichier à la fois."],
    ["Faut-il relier l'adaptation à un élève ?", "Non. Vous pouvez partir des critères enregistrés sur la fiche d'un élève, adapter pour un groupe, ou cocher des critères pour l'occasion. Un même support peut sortir en plusieurs versions."],
    ["L'adaptation peut-elle modifier l'exercice ?", "Elle vise à garder son but et à changer sa présentation et la formulation des consignes, selon les critères cochés. C'est une IA qui produit la version : relisez-la avant de l'imprimer, et supprimez-la si elle ne convient pas."],
    ["L'adaptation remplace-t-elle la différenciation pédagogique ?", "Non, elle en est un outil. Différencier, c'est aussi changer le matériel, l'accompagnement ou la tâche ; l'adaptation s'occupe du support, pour que chaque élève puisse travailler sur le même exercice que la classe."],
    ["Peut-on adapter des supports avec le compte gratuit ?", "Oui : 3 adaptations sont offertes pour essayer. Les adaptations illimitées font partie de l'abonnement Enseignant."],
  ],
  soeurs: ["Fiche élève", "Fiches de préparation", "Lia, votre assistante"],
};
