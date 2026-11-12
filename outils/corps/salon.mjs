import { PRIX_SALON, euros } from "../../assets/js/tarifs.js";

const prixMensuel = (prix) => `${euros(prix)}/mois TTC`;

export default `<section class="page">
  <h1 class="t">Votre offre salon MyClassFlow</h1>
  <p class="lead">Choisissez votre espace pour profiter de 6 mois offerts.</p>

  <div class="cards salon-cartes">
    <article class="card hl salon-carte">
      <span class="badge">Offre salon</span>
      <h2>Je suis enseignant</h2>
      <p class="d">Toutes les adaptations de vos supports et vos outils de préparation.</p>
      <div class="price">6 mois offerts</div>
      <p class="fine grow">Puis ${prixMensuel(PRIX_SALON.enseignant)}, sans engagement, résiliable en un clic, rappel par e-mail avant le premier prélèvement.</p>
      <p class="fine">Après avoir créé votre compte, enregistrez votre carte de façon sécurisée ; rien n’est prélevé pendant les 6 mois offerts (180 jours).</p>
      <a class="btn" href="https://app.myclassflow.fr/creer-compte?offre=enseignant&amp;salon=1">Je suis enseignant</a>
    </article>
    <article class="card salon-carte">
      <span class="badge">Offre salon</span>
      <h2>Je suis parent</h2>
      <p class="d">La formule Essentiel pour adapter les devoirs de votre enfant.</p>
      <div class="price">6 mois offerts</div>
      <p class="fine grow">Puis ${prixMensuel(PRIX_SALON.parent)}, sans engagement, résiliable en un clic, rappel par e-mail avant le premier prélèvement.</p>
      <p class="fine">Après avoir créé votre compte, enregistrez votre carte de façon sécurisée ; rien n’est prélevé pendant les 6 mois offerts (180 jours).</p>
      <a class="btn" href="https://app.myclassflow.fr/creer-compte?offre=parent&amp;salon=1">Je suis parent</a>
    </article>
  </div>
  <a class="salon-decouvrir" href="https://myclassflow.fr/">Découvrir MyClassFlow en détail →</a>

  <p class="salon-cgv">Créez votre compte, puis enregistrez votre carte ; rien n’est prélevé pendant les 6 mois offerts (180 jours).</p>
  <p class="salon-cgv">En choisissant une offre, vous acceptez les <a href="/cgv/">conditions générales de vente</a>.</p>
</section>`;
