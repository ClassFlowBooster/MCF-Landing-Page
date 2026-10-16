// Page 404 : servie par le serveur pour toute adresse inconnue (404.html).
// Liens en chemins absolus : la page s'affiche à n'importe quelle profondeur.
import { castor } from "./castors.mjs";

export default `<section class="page introuvable">
  ${castor("professeur", "castor-introuvable", 140)}
  <h1 class="t">Cette page n'existe pas</h1>
  <p class="lead">L'adresse est peut-être mal saisie, ou la page a changé de place. Choisissez votre espace&nbsp;:</p>
  <div class="introuvable-liens">
    <a class="btn" href="/enseignants/">Enseignants</a>
    <a class="btn" href="/ecoles/">Écoles</a>
    <a class="btn" href="/parents-enfants/">Parents / Enfants</a>
  </div>
  <p class="lead"><a href="/">Revenir à l'accueil</a></p>
</section>`;
