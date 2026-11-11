import { PRIX_SALON, euros } from "../../assets/js/tarifs.js";

const prixMensuel = (prix) => `${euros(prix)}/mois TTC`;

export default `<article class="page legal">
  <h1 class="t">Conditions générales de vente — abonnements MyClassFlow</h1>
  <p class="lead">Version de travail applicable aux abonnements MyClassFlow.</p>

  <p class="legal-avis">Projet à relire par Joseph ; à valider par un juriste</p>

  <h2>1. Identité de l’éditeur</h2>
  <ul>
    <li>Titulaire légal : [À COMPLÉTER]</li>
    <li>Nom commercial : MyClassFlow</li>
    <li>SIRET : [À COMPLÉTER]</li>
    <li>Adresse : [À COMPLÉTER]</li>
    <li>E-mail de contact : [À COMPLÉTER]</li>
    <li>Directeur de la publication : [À COMPLÉTER]</li>
  </ul>

  <h2>2. Objet</h2>
  <p>Les présentes conditions générales de vente (« CGV ») régissent la souscription et l’utilisation des abonnements MyClassFlow proposés aux enseignants et aux parents, ainsi que les modalités de paiement et de résiliation.</p>

  <h2>3. Offres et prix</h2>
  <p>Les caractéristiques des offres sont présentées sur les pages <a href="/enseignants/tarifs/">Tarifs Enseignants</a> et <a href="/parents-enfants/tarifs/">Tarifs Famille</a>. Les prix sont indiqués toutes taxes comprises (TTC). Dans le cadre de l’offre salon, le prix mensuel applicable après l’essai est de ${prixMensuel(PRIX_SALON.enseignant)} pour l’offre Enseignant et de ${prixMensuel(PRIX_SALON.parent)} pour la formule Essentiel destinée aux parents.</p>

  <h2>4. Offre d’essai de 6 mois avec carte enregistrée</h2>
  <p>L’offre salon comprend une période d’essai gratuite de 180 jours à compter de la souscription (présentée comme « 6 mois offerts ») ; la date exacte de fin d’essai est indiquée lors de la souscription et dans l’e-mail de rappel. La carte bancaire du client est enregistrée lors de la souscription, mais aucun prélèvement n’est effectué pendant cette période d’essai. À l’issue des 6 mois, l’abonnement devient automatiquement payant au prix mensuel normal indiqué lors de la souscription, sauf résiliation préalable.</p>

  <h2>5. Information avant le premier prélèvement</h2>
  <p>Un e-mail rappelant la date et le montant du premier prélèvement est envoyé avant celui-ci. Le délai est de [À COMPLÉTER] ; proposition : 7 jours.</p>

  <h2>6. Reconduction et résiliation</h2>
  <p>Après l’essai, l’abonnement est reconduit tacitement chaque mois. Le client peut le résilier à tout moment depuis le portail client Stripe ou par e-mail à l’adresse [À COMPLÉTER]. La résiliation prend effet à la fin de la période en cours. En cas de résiliation pendant l’essai, aucun prélèvement n’est effectué.</p>

  <h2>7. Droit de rétractation</h2>
  <p>Conformément à l’article L221-18 du Code de la consommation, le consommateur dispose d’un délai de 14 jours à compter de la souscription pour exercer son droit de rétractation, sans avoir à motiver sa décision. Il peut adresser sa demande par e-mail à [À COMPLÉTER] ou utiliser toute déclaration dénuée d’ambiguïté. Si le client demande expressément que le service commence pendant ce délai, l’exécution peut débuter pendant l’essai ; l’exercice du droit de rétractation reste soumis aux règles applicables à ce commencement d’exécution.</p>

  <h2>8. Paiement sécurisé</h2>
  <p>Les paiements sont traités de manière sécurisée par Stripe. L’éditeur ne conserve aucune donnée de carte bancaire.</p>

  <h2>9. Médiation de la consommation</h2>
  <p>En cas de litige non résolu après une réclamation écrite, le consommateur peut recourir gratuitement au médiateur de la consommation suivant : [À COMPLÉTER].</p>

  <h2>10. Données personnelles</h2>
  <p>Les modalités de traitement des données personnelles sont décrites dans la politique de confidentialité : [À COMPLÉTER].</p>

  <h2>11. Droit applicable et juridiction</h2>
  <p>Les présentes CGV sont soumises au droit français. En cas de litige, les juridictions compétentes sont déterminées conformément aux règles légales applicables.</p>
</article>`;
