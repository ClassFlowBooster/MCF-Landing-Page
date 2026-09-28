// Fenêtre de choix de l'espace, posée sur l'accueil Enseignants de « / ».
// Cachée sans JavaScript : assets/js/entree.js l'affiche au premier passage.
import { castor } from "./castors.mjs";

export default `<div class="entree" id="entree" role="dialog" aria-modal="true" aria-labelledby="entreeTitre" hidden>
  <div class="veil"></div>
  <div class="modal">
    <h2 id="entreeTitre">Bienvenue sur ClassFlow</h2>
    <p class="sub">Pour vous montrer ce qui vous concerne, dites-nous qui vous êtes :</p>
    <div class="choices">
      <a class="ch" data-espace="enseignants" href="/enseignants/">${castor("professeur", "ic", 120)}<b>Enseignant·e</b><span>J'adapte mes supports et je prépare ma classe</span></a>
      <a class="ch" data-espace="ecoles" href="/ecoles/">${castor("direction", "ic", 120)}<b>École</b><span>Je dirige un établissement et j'équipe mon équipe</span></a>
      <a class="ch" data-espace="parents-enfants" href="/parents-enfants/">${castor("eleve", "ic", 120)}<b>Parent / Enfant</b><span>J'adapte les devoirs et les leçons à la maison</span></a>
    </div>
    <div class="foot"><label><input type="checkbox" id="seSouvenir" checked> Se souvenir de mon choix</label><span>Vous pourrez changer à tout moment en haut de page</span></div>
  </div>
</div>`;
