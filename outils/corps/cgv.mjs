import {
  ADAPTATIONS_ESSENTIEL,
  PRIX_SALON,
  euros,
  offreAdapter,
  offreEnseignant,
} from "../../assets/js/tarifs.js";

const prixMensuel = (prix) => `${euros(prix)}/mois TTC`;

// Date de mise en ligne des abonnements payables en ligne (#549) : à ajuster
// au jour de la fusion, en même temps que l'app (P13 de la spec).
export const EN_VIGUEUR_LE = "1er décembre 2026";

const ens = { libre: offreEnseignant(false), engage: offreEnseignant(true) };
const ess = { libre: offreAdapter("essentiel", false), engage: offreAdapter("essentiel", true) };
const ill = { libre: offreAdapter("illimite", false), engage: offreAdapter("illimite", true) };

const ligneOffre = (nom, o) =>
  `<li><strong>${nom}</strong> : sans engagement, ${prixMensuel(o.libre.prix)} ; avec engagement, ${prixMensuel(o.engage.prix)} (${o.engage.renvoi.replace(/^Pendant/, "pendant").replace(/\.$/, "")})</li>`;

export default `<article class="page legal">
  <h1 class="t">Conditions générales de vente — abonnements MyClassFlow</h1>
  <p class="lead">Conditions applicables aux abonnements MyClassFlow, en vigueur au ${EN_VIGUEUR_LE}.</p>


  <h2>1. Identité de l’éditeur</h2>
  <ul>
    <li>Titulaire légal : Benoist de Montgrand, entrepreneur individuel (EI)</li>
    <li>Nom commercial : MyClassFlow</li>
    <li>SIRET : 100 495 142 00018</li>
    <li>Adresse : 9 rue Robert II, 21000 Dijon</li>
    <li>E-mail de contact : contact@myclassflow.fr</li>
    <li>Directeur de la publication : Benoist de Montgrand</li>
  </ul>

  <h2>2. Objet</h2>
  <p>Les présentes conditions générales de vente (« CGV ») régissent la souscription et l’utilisation des abonnements MyClassFlow proposés aux enseignants et aux parents, ainsi que les modalités de paiement et de résiliation.</p>

  <h2>3. Offres et prix</h2>
  <p>Trois abonnements mensuels sont proposés en ligne. Les prix sont indiqués toutes taxes comprises (TTC).</p>
  <ul>
    ${ligneOffre("MyClassFlow Enseignant", ens)}
    ${ligneOffre(`MyClassFlow Famille Essentiel (${ADAPTATIONS_ESSENTIEL} adaptations par mois)`, ess)}
    ${ligneOffre("MyClassFlow Famille Illimité (adaptations illimitées)", ill)}
  </ul>
  <p>Les caractéristiques des offres sont présentées sur les pages <a href="/enseignants/tarifs/">Tarifs Enseignants</a> et <a href="/parents-enfants/tarifs/">Tarifs Famille</a>. Les écoles et établissements bénéficient d’un tarif sur devis, hors paiement en ligne : voir la page <a href="/ecoles/tarifs/">Tarifs Écoles</a>.</p>

  <h2>4. Une seule offre par compte</h2>
  <p>Une adresse e-mail correspond à un compte, et un compte ne peut avoir qu’une seule offre à la fois. Souscrire un abonnement met fin à l’offre gratuite ou à l’offre de lancement en cours, y compris celle de l’autre espace du compte (Enseignant ou Famille) : les offres ne se cumulent pas.</p>
  <p>Un abonnement en cours ne se change pas directement en un autre : pour passer, par exemple, de l’offre Enseignant à une offre Famille, il faut d’abord résilier l’abonnement en cours, puis souscrire la nouvelle offre une fois qu’il a pris fin. Seul le passage entre Essentiel et Illimité sans engagement se fait directement depuis « Gérer mon abonnement » (rubrique 8).</p>

  <h2>5. Souscription et paiement</h2>
  <p>La souscription se fait depuis l’application, rubrique « Choisir mon offre ». Le paiement est traité par Stripe sur sa page de paiement sécurisée ; l’éditeur ne conserve aucune donnée de carte bancaire. Le premier prélèvement a lieu le jour de la souscription, puis chaque mois à la même date. Stripe envoie un reçu par e-mail à chaque prélèvement.</p>
  <p>Conformément à l’article L221-18 du Code de la consommation, le consommateur dispose d’un délai de 14 jours à compter de la souscription pour exercer son droit de rétractation, sans avoir à motiver sa décision. Il peut adresser sa demande par e-mail à contact@myclassflow.fr ou utiliser toute déclaration dénuée d’ambiguïté. Si le client demande expressément que le service commence pendant ce délai, l’exercice du droit de rétractation reste soumis aux règles applicables à ce commencement d’exécution.</p>

  <h2>6. Abonnement avec engagement</h2>
  <p>L’abonnement avec engagement bénéficie d’un prix réduit pendant les premiers mois (6 mois pour l’offre Enseignant, 3 mois pour les offres Famille), puis du plein tarif. L’engagement dure 12 mois pour l’offre Enseignant et 6 mois pour les offres Famille, à compter de la souscription. Une résiliation demandée pendant l’engagement prend effet à la fin de l’engagement : l’abonnement reste actif jusque-là et les mensualités continuent jusqu’à cette date.</p>

  <h2>7. Abonnement sans engagement</h2>
  <p>L’abonnement sans engagement est résiliable à tout moment. La résiliation prend effet à la fin de la période mensuelle déjà payée.</p>

  <h2>8. Gérer mon abonnement</h2>
  <p>Le bouton « Gérer mon abonnement » de l’application ouvre l’espace client Stripe : changer de carte, changer de formule (offres Famille sans engagement), télécharger les factures ou résilier. Le client peut aussi écrire à contact@myclassflow.fr.</p>

  <h2>9. Fin de l’abonnement</h2>
  <p>À la fin de l’abonnement, le compte revient à l’offre gratuite (version gratuite pour les enseignants ; compte gratuit Famille avec 3 adaptations offertes). Les fiches et documents déjà créés ou adaptés restent accessibles.</p>
  <p>En cas d’échec de paiement, Stripe procède automatiquement à de nouvelles tentatives pendant environ deux semaines et en informe le client par e-mail ; les fonctions restent disponibles pendant ce temps. Après la dernière tentative sans succès, l’abonnement prend fin, avec ou sans engagement, et le compte revient à l’offre gratuite.</p>
  <p>La suppression du compte met fin immédiatement à l’abonnement en cours et, le cas échéant, à l’engagement, sans remboursement de la période entamée.</p>

  <h2>10. Offres passées</h2>
  <p>L’offre de lancement donne accès à la version complète jusqu’au 31 décembre 2026 aux comptes qui en bénéficient ; un avertissement est affiché du 1er au 10 janvier 2027 et l’offre prend fin le 11 janvier 2027.</p>
  <p>L’offre salon reste applicable à ses abonnés : période d’essai gratuite de 180 jours à compter de la souscription (présentée comme « 6 mois offerts »), carte enregistrée sans prélèvement pendant l’essai, e-mail de rappel envoyé 7 jours avant la fin de l’essai, puis abonnement mensuel reconduit tacitement au prix de ${prixMensuel(PRIX_SALON.enseignant)} pour l’offre Enseignant et de ${prixMensuel(PRIX_SALON.parent)} pour la formule Essentiel destinée aux parents, résiliable à tout moment depuis « Gérer mon abonnement » avec effet à la fin de la période en cours.</p>

  <h2>11. Réclamations</h2>
  <p>Toute réclamation peut être adressée par e-mail à contact@myclassflow.fr.</p>

  <h2>12. Données personnelles</h2>
  <p>Les modalités de traitement des données personnelles sont décrites dans la <a href="/confidentialite/">politique de confidentialité</a>.</p>

  <h2>13. Droit applicable et juridiction</h2>
  <p>Les présentes CGV sont soumises au droit français. En cas de litige, les juridictions compétentes sont déterminées conformément aux règles légales applicables.</p>
</article>`;
