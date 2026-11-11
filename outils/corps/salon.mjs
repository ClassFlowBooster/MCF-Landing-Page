// Liens à remplacer par les Payment Links Stripe avant publication.
export const STRIPE_LIEN_ENSEIGNANT = "STRIPE_LIEN_ENSEIGNANT";
export const STRIPE_LIEN_PARENT = "STRIPE_LIEN_PARENT";

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
      <p class="fine">Votre carte est enregistrée de façon sécurisée ; rien n’est prélevé pendant les 6 mois offerts (180 jours).</p>
      <a class="btn" href="${STRIPE_LIEN_ENSEIGNANT}">Je suis enseignant</a>
    </article>
    <article class="card salon-carte">
      <span class="badge">Offre salon</span>
      <h2>Je suis parent</h2>
      <p class="d">La formule Essentiel pour adapter les devoirs de votre enfant.</p>
      <div class="price">6 mois offerts</div>
      <p class="fine grow">Puis ${prixMensuel(PRIX_SALON.parent)}, sans engagement, résiliable en un clic, rappel par e-mail avant le premier prélèvement.</p>
      <p class="fine">Votre carte est enregistrée de façon sécurisée ; rien n’est prélevé pendant les 6 mois offerts (180 jours).</p>
      <a class="btn" href="${STRIPE_LIEN_PARENT}">Je suis parent</a>
    </article>
  </div>

  <p class="salon-cgv">Après l’enregistrement de votre carte, créez votre compte MyClassFlow avec la même adresse e-mail.</p>
  <p class="salon-cgv">En choisissant une offre, vous acceptez les <a href="/cgv/">conditions générales de vente</a>.</p>
</section>`;
