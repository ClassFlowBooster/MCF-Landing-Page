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

// Exemple : une semaine de CM1 sur quatre jours, 22 h de cours une fois les récréations déduites.
const VOLUMES = [
  ["Français", "7 h 30", "7 h 20", "+ 10 min"],
  ["Mathématiques", "4 h 30", "4 h 35", "− 5 min"],
  ["Langues vivantes", "1 h 15", "1 h 20", "− 5 min"],
  ["Éducation physique et sportive", "2 h 45", "2 h 45", "="],
  ["Sciences et technologie", "1 h 45", "1 h 50", "− 5 min"],
  ["Enseignements artistiques", "1 h 45", "1 h 50", "− 5 min"],
  ["Histoire, géographie et EMC", "2 h 30", "2 h 20", "+ 10 min"],
];

const exemple = `<p>Une classe de CM1, quatre jours par semaine, de 8 h 30 à 11 h 30 et de 13 h 30 à 16 h 30, avec une récréation de 15 minutes par demi-journée. Une fois les créneaux posés, MyClassFlow donne le total de chaque matière ; il ne reste qu'à le mettre en face des horaires des programmes.</p>

    <div class="exemple-fiche">
      <h3>Les heures de la semaine, matière par matière</h3>
      <div class="tableau-defile" tabindex="0" role="region" aria-label="Volumes horaires du CM1, tableau défilant">
        <table class="edt-volumes">
          <caption>CM1 : notre semaine type et les programmes</caption>
          <thead><tr><th scope="col">Matière</th><th scope="col">Notre semaine</th><th scope="col">Programmes, récréations déduites</th><th scope="col">Écart</th></tr></thead>
          <tbody>
            ${VOLUMES.map(([m, nous, prog, ecart]) => `<tr><th scope="row">${m}</th><td>${nous}</td><td>${prog}</td><td>${ecart}</td></tr>`).join("\n            ")}
            <tr class="edt-total"><th scope="row">Enseignement par semaine</th><td>22 h</td><td>22 h</td><td>=</td></tr>
          </tbody>
        </table>
      </div>
      <p class="defile-indice" aria-hidden="true">Faites défiler le tableau →</p>
      <p><b>Les écarts de quelques minutes sont normaux</b> : l'horaire de chaque matière est fixé pour l'année, et sa répartition d'une semaine à l'autre peut suivre vos projets. Ici, le français et l'histoire-géographie prennent dix minutes de plus chacun, prises sur quatre autres matières : quelques semaines plus scientifiques ou plus artistiques dans l'année rééquilibrent les totaux.</p>
      <p class="edt-source">Horaires des programmes : <a href="${SOURCE}" rel="noopener">arrêté du 9 novembre 2015</a> fixant les horaires des écoles élémentaires, cycle de consolidation (CM1 et CM2). Pour l'année : 864 heures, soit 24 heures par semaine, récréations comprises.</p>
    </div>`;

// Illustration : semaine type et volume par matière reconstitués en HTML, données fictives.
const illustration = `<figure class="maquette-fiche" aria-label="Illustration : une semaine type et son volume horaire dans MyClassFlow">
        <div class="mf-ecran" aria-hidden="true">
          <div class="mf-chemin">Planning › Emploi du temps</div>
          <div class="mf-titre">Semaine type</div>
          <div class="mf-grille">
            <span class="j">Lun</span><span class="j">Mar</span><span class="j">Jeu</span><span class="j">Ven</span>
            <span class="c fr">Français</span><span class="c fr">Français</span><span class="c ma">Maths</span><span class="c fr">Français</span>
            <span class="c ma">Maths</span><span class="c ma">Maths</span><span class="c fr">Français</span><span class="c ma">Maths</span>
            <span class="c p">Récré</span><span class="c p">Récré</span><span class="c p">Récré</span><span class="c p">Récré</span>
            <span class="c eps">EPS</span><span class="c hg">Histoire</span><span class="c eps">EPS</span><span class="c ar">Arts</span>
          </div>
          <div class="mf-etiquette">Volume par matière</div>
          <ul class="mf-volumes">
            <li><span>Français</span><i style="width:100%"></i><b>7 h 30</b></li>
            <li><span>Mathématiques</span><i style="width:60%"></i><b>4 h 30</b></li>
            <li><span>EPS</span><i style="width:37%"></i><b>2 h 45</b></li>
          </ul>
          <div class="mf-total">22 h d'enseignement / semaine</div>
        </div>
        <figcaption>Illustration avec des données fictives.</figcaption>
      </figure>`;

export default {
  slug: "emploi-du-temps",
  ariane: "Emploi du temps",
  k: "free",
  titre: "Emploi du temps de classe : votre semaine type — MyClassFlow",
  description: "Construire l'emploi du temps de sa classe créneau par créneau, voir le volume horaire de chaque matière sans calcul et le comparer aux horaires du cycle 3. Une semaine de CM1 en exemple.",
  h1: "L'emploi du temps de votre classe, et ses heures par matière",
  intro: "L'emploi du temps pose la semaine type de la classe : les cours, les récréations, les rituels. Sa vraie question est souvent : chaque matière a-t-elle son compte d'heures ? MyClassFlow fait l'addition pour vous, au fil des créneaux.",
  titreBenefices: "Ce que vous y gagnez",
  benefices: [
    ["Les heures de chaque matière, sans tableur", "Chaque cours ajouté met à jour le total de sa matière et le total d'enseignement de la semaine : un oubli se voit tout de suite."],
    ["Une semaine posée une fois pour l'année", "La semaine type se règle à la rentrée, puis s'ajuste : un créneau qui ne sert plus s'archive sans être détruit."],
    ["Une grille à afficher", "Le PDF de la semaine type s'imprime pour la porte de la classe, ou se glisse dans le classeur du remplaçant."],
  ],
  etapes: [
    ["Réglez la plage horaire", "L'heure de début et de fin de la journée, dans les réglages de la plage horaire."],
    ["Posez vos créneaux", "Touchez une case vide : un cours avec sa matière, une récréation ou une pause, ou un rituel, avec son jour, son début et sa fin. Un clic sur un créneau le modifie."],
    ["Lisez les totaux, puis imprimez", "Le volume de chaque matière s'affiche à côté de la grille, du plus grand au plus petit. « Imprimer l'emploi du temps » en fait un PDF ; le téléphone le télécharge."],
  ],
  illustration,
  blocs: [{ titre: "Une semaine de CM1 face aux horaires des programmes", html: exemple }],
  offre: {
    titre: "Votre emploi du temps, gratuit dans MyClassFlow",
    texte: "Avec le cahier journal et les fiches de préparation, sans carte bancaire. L'abonnement ajoute l'adaptation des supports par l'IA.",
    bouton: "Créer mon compte gratuit",
    href: "https://app.myclassflow.fr",
  },
  questions: [
    ["Combien d'heures par matière en CM1 et en CM2 ?", "Par semaine, en moyenne : 8 h de français, 5 h de mathématiques, 1 h 30 de langues vivantes, 3 h d'EPS, 2 h de sciences et technologie, 2 h d'enseignements artistiques, et 2 h 30 d'histoire, de géographie et d'enseignement moral et civique. Soit 24 heures, récréations comprises (arrêté du 9 novembre 2015, cycle de consolidation)."],
    ["Faut-il tenir ces horaires chaque semaine, à la minute ?", "Non. Ce qui compte est l'horaire de l'année pour chaque matière ; l'arrêté permet d'ajuster la répartition d'une semaine à l'autre selon vos projets. Une semaine type proche des moyennes aide simplement à ne pas dériver."],
    ["Les récréations comptent-elles dans les 24 heures ?", "Oui : elles sont prises sur l'ensemble des matières, de façon équilibrée dans la semaine. Avec deux récréations de 15 minutes par jour sur quatre jours, il reste 22 heures de cours. Dans MyClassFlow, une récréation est un créneau à part, qui n'entre dans aucun total."],
    ["Un rituel de calcul mental compte-t-il dans les heures de mathématiques ?", "Dans MyClassFlow, seuls les cours entrent dans le volume par matière. Si votre rituel de calcul mental fait partie de vos mathématiques, posez-le comme un cours de mathématiques ; gardez le type « Rituel » pour l'appel, la date ou la météo."],
    ["L'emploi du temps sert-il au cahier journal ?", "Il lui donne son cadre : sur téléphone, les récréations de l'emploi du temps s'affichent dans la vue Journal, et les heures proposées pour une séance restent dans la plage horaire de la classe. Les séances du jour, elles, s'ajoutent dans le cahier journal."],
    ["L'emploi du temps est-il gratuit dans MyClassFlow ?", "Oui, comme le cahier journal et les fiches de préparation. Le compte gratuit ne demande pas de carte bancaire."],
  ],
  soeurs: ["Cahier journal", "Fiches de préparation", "Adaptation des supports"],
};
