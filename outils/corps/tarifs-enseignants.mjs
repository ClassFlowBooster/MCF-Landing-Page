// Page Tarifs de l'espace Enseignants (prix TTC).
import { texteProf, prixHtml, renvoiHtml, insecables, badgeEnseignant } from "../../assets/js/tarifs-ui.js";
import { controles } from "./commun.mjs";
import { castorDe } from "./castors.mjs";
import { bandeMailto } from "./sections.mjs";
import { outil, nomLie } from "./catalogue.mjs";

const t = texteProf(true, false);

export default `<section class="page" data-tarifs="enseignants">
  <h1 class="t">Un prix simple, pour toute votre classe</h1>
  <p class="lead">Toutes les adaptations de vos supports et tous les outils de préparation.</p>

  ${controles("Engagement 1 an", "9,99 € les 6 premiers mois", "Résiliable à tout moment")}

  <div class="cards">
    <div class="card">
      <span class="badge vert">Sans carte bancaire</span>
      <h3>Gratuit</h3>
      <p class="d">Toute la gestion de classe, pour toujours</p>
      <div class="old"></div>
      <div class="price">0 €</div>
      <span class="quota"><i>3</i> adaptations offertes</span>
      <ul class="feat grow"><li>${nomLie(outil("Cahier journal"))}, ${nomLie(outil("Emploi du temps"), "emploi du temps")}, ${nomLie(outil("Fiches de préparation"), "fiches de prep")}</li><li>${nomLie(outil("Tâches"))}</li><li>${nomLie(outil("Fiche élève"), "Fiches élèves")}</li><li>${nomLie(outil("Import des élèves par photo"))}</li><li>${nomLie(outil("Base commune"))} : consulter les fiches, suivre des collègues</li></ul>
      <a class="btn ghost" href="https://app.myclassflow.fr">Créer mon compte gratuit</a>
    </div>
    <div class="card hl avec-castor">
      ${castorDe("enseignants", "castor-carte", 120)}
      <span class="badge" id="pBadge">${badgeEnseignant()}</span>
      <h3>MyClassFlow Enseignant</h3>
      <p class="d">Pour un·e enseignant·e, toutes classes confondues</p>
      <div class="old" id="pOld">${insecables(t.old)}</div>
      <div class="price" id="pPrice">${prixHtml(t)}</div>
      <div class="fine" id="pFine">${renvoiHtml(t)}</div>
      <a class="btn" href="https://app.myclassflow.fr">Je commence</a>
      <ul class="feat"><li>Tout le gratuit, plus :</li><li>${nomLie(outil("Adaptation des supports"), "Adaptations des supports")} illimitées</li><li>${nomLie(outil("Lia, votre assistante"))}</li><li>${nomLie(outil("Base commune"))} : reprendre, partager, donner un avis</li></ul>
    </div>
    <div class="card">
      <span class="badge vert">Pour toute l'équipe</span>
      <h3>Votre école paie ?</h3>
      <p class="d">Dès 5 enseignants, le prix baisse pour chacun.</p>
      <div class="old"></div>
      <div class="price" style="font-size:30px">Dès 9,99 € <small>TTC / enseignant / mois</small></div>
      <div class="fine">Calcul en direct et devis sous 48 h dans l'Espace Écoles.</div>
      <a class="btn ghost" href="/ecoles/tarifs/#devis">Calculer le prix pour mon école</a>
    </div>
  </div>

  ${bandeMailto("direction")}
</section>`;
