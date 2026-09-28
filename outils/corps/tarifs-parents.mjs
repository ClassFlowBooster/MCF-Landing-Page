// Page Tarifs de l'espace Parents / Enfants : ClassFlow Adapter (prix TTC).
import { texteAdapter, prixHtml, renvoiHtml, insecables, badgeAdapter } from "../../assets/js/tarifs-ui.js";
import { remiseAdapter } from "../../assets/js/tarifs.js";
import { controles } from "./commun.mjs";
import { castorDe } from "./castors.mjs";
import { bandeMailto } from "./sections.mjs";

const e = texteAdapter("essentiel", true, false);
const i = texteAdapter("illimite", true, false);

export default `<section class="page" data-tarifs="parents-enfants">
  <h1 class="t">Des devoirs adaptés à votre enfant, en une photo</h1>
  <p class="lead">Prenez en photo la leçon ou l'exercice : ClassFlow Adapter le transforme selon les besoins de votre enfant (DYS, TDAH, TSA…).</p>

  ${controles("Engagement 6 mois", `−${remiseAdapter("illimite")} % les 3 premiers mois`, "Résiliable à tout moment")}

  <div class="cards3">
    <div class="card free">
      <span class="badge vert">Sans carte bancaire</span>
      <h3>Essai gratuit</h3>
      <p class="d">Pour découvrir, sans rien payer</p>
      <div class="old"></div>
      <div class="price">0 €</div>
      <span class="quota"><i>3</i> adaptations offertes</span>
      <div class="fine grow">Aucune carte demandée. Vos 3 adaptations restent accessibles ensuite.</div>
      <a class="btn ghost" href="https://adapter.myclassflow.fr">J'essaie gratuitement</a>
    </div>

    <div class="card">
      <span class="badge" id="eBadge">${badgeAdapter("essentiel")}</span>
      <h3>Essentiel</h3>
      <p class="d">Les devoirs de la semaine</p>
      <div class="old" id="eOld">${insecables(e.old)}</div>
      <div class="price" id="ePrice">${prixHtml(e)}</div>
      <span class="quota"><i>Adaptations limitées</i> par mois</span>
      <div class="fine grow" id="eFine">${renvoiHtml(e)}</div>
      <a class="btn ghost" href="https://adapter.myclassflow.fr">Je choisis Essentiel</a>
    </div>

    <div class="card hl avec-castor">
      <span class="pop">Le plus choisi</span>
      ${castorDe("parents-enfants", "castor-carte gauche", 120)}
      <span class="badge" id="iBadge">${badgeAdapter("illimite")}</span>
      <h3>Illimité</h3>
      <p class="d">Toutes les leçons, tous les exercices</p>
      <div class="old" id="iOld">${insecables(i.old)}</div>
      <div class="price" id="iPrice">${prixHtml(i)}</div>
      <span class="quota"><i>∞</i> adaptations illimitées</span>
      <div class="fine grow" id="iFine">${renvoiHtml(i)}</div>
      <a class="btn" href="https://adapter.myclassflow.fr">Je choisis Illimité</a>
    </div>
  </div>

  <div class="reassure"><span>🔒 Paiement sécurisé</span><span>👨‍👩‍👧 Tous les enfants du foyer</span><span>📱 Téléphone, tablette et ordinateur</span></div>

  ${bandeMailto("ecole")}
</section>`;
