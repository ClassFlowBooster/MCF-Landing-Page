// Fiche explicative « Import des élèves par photo » (MCF-Pilotage#53).
// Ce qui est dit de l'app est vérifié dans MCF-App (plan de fiche, origin/main d91a67df) :
// photo sur téléphone seulement (« Photographier la liste », « Prendre une photo », « Choisir dans
// la photothèque », « ou saisir à la main ») ; relecture avec « Prénom », « Nom » et les états
// « À vérifier », « Déjà dans la classe », « En double dans la liste » ; « Ajouter N élèves » ;
// sur ordinateur, « Import PDF, Excel ou CSV — ou saisie à la main ». L'import remplit une
// classe existante. Rien sur le devenir de la photo : à trancher avec la page Confidentialité.

// Exemple : une liste fictive de huit élèves, et ce que montre la relecture.
const LISTE = ["BRUNET Adam", "DUVAL Chloé", "MARTIN Inès", "PETIT Lucas", "R?NAUD Maël", "SAÏDI Nour", "PETIT Lucas", "VIDAL Théo"];
const RELECTURE = [
  ["Adam", "Brunet", ""], ["Chloé", "Duval", ""], ["Inès", "Martin", "Déjà dans la classe"], ["Lucas", "Petit", ""],
  ["Maël", "R?naud", "À vérifier"], ["Nour", "Saïdi", ""], ["Lucas", "Petit", "En double dans la liste"], ["Théo", "Vidal", ""],
];

const exemple = `<p>Une liste de rentrée fictive, photographiée sur le bureau : huit lignes, dont une mal imprimée, un élève déjà inscrit et un nom recopié deux fois.</p>

    <div class="exemple-fiche">
      <h3>De la feuille à la relecture</h3>
      <div class="ad-duo">
        <figure class="ad-feuille ip-liste">
          <figcaption>La liste photographiée</figcaption>
          <ol>${LISTE.map((n) => `<li>${n}</li>`).join("")}</ol>
        </figure>
        <figure class="ad-feuille ip-relecture">
          <figcaption>Ce que vous relisez</figcaption>
          <table><thead><tr><th scope="col">Prénom</th><th scope="col">Nom</th><th scope="col">État</th></tr></thead><tbody>
            ${RELECTURE.map(([p, n, e]) => `<tr${e ? ` class="ip-signale"` : ""}><td>${p}</td><td>${n}</td><td>${e}</td></tr>`).join("\n            ")}
          </tbody></table>
        </figure>
      </div>
      <p>Vous corrigez « R?naud » en « Renaud », vous laissez de côté Inès, déjà dans la classe, et le second Lucas. Il reste six élèves à ajouter : le bouton devient « Ajouter 6 élèves ».</p>
      <p class="ad-note">Liste et noms inventés pour la page.</p>
    </div>`;

// Illustration : écran de relecture du téléphone reconstitué en HTML, données fictives.

export default {
  slug: "import-eleves-photo",
  ariane: "Import des élèves par photo",
  k: "free",
  titre: "Importer sa liste d'élèves en une photo — MyClassFlow",
  description: "À la rentrée, photographiez la liste de classe avec votre téléphone : MyClassFlow lit les prénoms et les noms, signale ce qui est à vérifier et les doublons, puis ajoute les élèves après votre relecture.",
  h1: "Votre classe remplie à partir d'une photo de la liste",
  intro: "À la rentrée, au lieu de recopier vingt-cinq prénoms, vous photographiez la liste de classe avec votre téléphone. MyClassFlow lit les prénoms et les noms, vous relisez, puis vous ajoutez les élèves en une fois.",
  retenir: [
    "Vous photographiez la liste de classe avec votre téléphone.",
    "Vous corrigez les prénoms et les noms avant l'ajout.",
    "Les lignes à vérifier et les doublons sont signalés.",
  ],
  titreBenefices: "Que vous épargne la photo de la liste ?",
  benefices: [
    ["La saisie de la rentrée", "Une photo au lieu de vingt-cinq fiches remplies une à une, la semaine où le temps manque le plus."],
    ["Un élève créé par erreur", "Rien n'est ajouté avant votre relecture, et une ligne mal lue ressort marquée « À vérifier »."],
    ["Les doublons", "Un élève déjà dans la classe, ou présent deux fois sur la feuille, est repéré avant l'ajout."],
  ],
  etapes: [
    ["Photographiez la liste", "Sur votre téléphone, dans « Classe », « Photographier la liste » : prenez la photo ou choisissez-la dans la photothèque."],
    ["Relisez", "Corrigez un prénom ou un nom, et choisissez les élèves à ajouter."],
    ["Ajoutez-les", "« Ajouter N élèves » remplit la classe : chaque élève apparaît dans « Classe », et sa fiche s'ouvre d'un toucher."],
  ],
  titreEtapes: "Comment ajouter votre classe à partir d'une photo ?",
  blocs: [{ titre: "Une liste de huit élèves, de la photo à la classe", html: exemple }],
  offre: {
    titre: "L'import par photo, gratuit dans MyClassFlow",
    texte: "Avec les fiches élèves, le cahier journal et l'emploi du temps, sans carte bancaire. L'abonnement ajoute l'adaptation des supports par l'IA.",
    bouton: "Créer mon compte gratuit",
    href: "https://app.myclassflow.fr",
  },
  questions: [
    ["Quelle liste de classe peut-on photographier ?", "Une page à plat, bien éclairée, avec un élève par ligne : la liste imprimée de l'école convient. Plus l'écriture est difficile à lire, plus il y a de lignes « À vérifier » à corriger."],
    ["Que se passe-t-il si un prénom est mal lu ?", "La ligne est marquée « À vérifier » quand la lecture est incertaine. Vous corrigez le prénom ou le nom dans la relecture ; rien n'est ajouté tant que vous n'avez pas validé."],
    ["Peut-on importer la liste depuis un ordinateur ?", "Oui, sans photo : sur ordinateur, « Ajouter des élèves » accepte un PDF, un fichier Excel ou CSV, ou la saisie à la main. La photo se prend avec le téléphone."],
    ["Un élève déjà inscrit sera-t-il ajouté deux fois ?", "Non. La relecture signale « Déjà dans la classe » pour un élève présent, et « En double dans la liste » pour un nom écrit deux fois sur la feuille."],
    ["L'import crée-t-il la classe ?", "Il remplit une classe que vous avez déjà créée dans MyClassFlow. Créez d'abord la classe, puis ajoutez-y les élèves à partir de la photo."],
    ["L'import des élèves par photo est-il gratuit ?", "Oui, comme les fiches élèves, le cahier journal et l'emploi du temps. Le compte gratuit ne demande pas de carte bancaire."],
  ],
  publics: [
    ["Pour la rentrée", "Vous ajoutez toute la classe en une fois au lieu de remplir les fiches une à une."],
    ["Pour relire la liste", "Vous corrigez chaque prénom ou nom avant d'ajouter les élèves."],
    ["Pour éviter les doublons", "MyClassFlow repère un élève déjà dans la classe ou présent deux fois sur la feuille."],
  ],
  soeurs: ["Fiche élève", "Adaptation des supports", "Cahier journal"],
};
