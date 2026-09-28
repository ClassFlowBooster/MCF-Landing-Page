// Page « Tarifs & devis » de l'espace Écoles (HT en avant, TTC lisible) :
// calculateur et formulaire de demande de devis.
import { texteEcole, prixEcoleHtml, exposants, insecables } from "../../assets/js/tarifs-ui.js";
import { controles } from "./commun.mjs";

const N = 5;
const t = texteEcole(N, true, false);
const PALIERS = ["1–4 : plein tarif", "5–9 : −10 %", "10–14 : −19 %", "15–19 : −27 %", "20 et + : 9,99 €"];

export default `<section class="page" data-tarifs="ecoles">
  <h1 class="t">Équipez toute votre équipe</h1>
  <p class="lead">Plus vous êtes nombreux, moins chaque enseignant coûte. Devis envoyé sous 48 h.</p>

  ${controles("Engagement 2 ans", "9,99 € HT par enseignant la 1<sup>re</sup> année", "Remise selon le nombre d'enseignants")}

  <div class="calc" id="devis">
    <div class="offer">
      <span class="badge" id="eBadge">${t.badge}</span>
      <div style="font-weight:600;font-size:15px" id="eLic">${t.lic}</div>
      <div class="old" id="eOld">${insecables(t.old)}</div>
      <div class="price" id="ePu">${prixEcoleHtml(t)}</div>
      <button type="button" class="btn" data-scroll="devis">Recevoir mon devis →</button>
      <div class="fine" id="eFine">${exposants(insecables(t.fine))}</div>
      <div class="lines">
        <div><span id="eTotLab">Total · ${t.lic}</span><b id="eTot">${insecables(t.tot)}</b></div>
        <div><span>Montant TTC</span><span id="eTtc">${insecables(t.ttc)}</span></div>
      </div>
    </div>
    <div>
      <div class="lab">Nombre d'enseignants <span class="n" id="eN">${N}</span></div>
      <input type="range" id="eR" min="1" max="40" value="${N}" aria-label="Nombre d'enseignants" aria-valuetext="${t.lic}">
      <div class="ticks" aria-hidden="true"><span>1</span><span>5</span><span>10</span><span>15</span><span>20</span><span>40</span></div>
      <div class="paliers" id="ePals">${PALIERS.map((p, i) => `<span class="pal${i === t.palier ? " on" : ""}">${p}</span>`).join("")}</div>
      <p class="plus40" id="ePlus" hidden>Plus de 40 enseignants ? Précisez-le dans votre demande : nous vous faisons un devis sur mesure.</p>
      <form id="formDevis" class="f" novalidate>
        <label class="full">Nom de l'établissement<input class="in" name="etablissement" required maxlength="200" placeholder="Nom de l'établissement"></label>
        <label class="sel">Statut<select class="in" name="statut_etablissement" required>
          <option value="">Public / Privé sous contrat / Hors contrat</option>
          <option value="public">Public</option><option value="prive_sous_contrat">Privé sous contrat</option><option value="hors_contrat">Hors contrat</option>
        </select></label>
        <label>Code postal<input class="in" name="code_postal" required inputmode="numeric" pattern="[0-9]{5}" maxlength="5" placeholder="Code postal" autocomplete="postal-code"></label>
        <label>Votre nom<input class="in" name="nom" required maxlength="120" autocomplete="name" placeholder="Votre nom"></label>
        <label>Votre fonction<input class="in" name="fonction" maxlength="120" list="fonctions" placeholder="Votre fonction"></label>
        <datalist id="fonctions"><option value="Directeur·rice"><option value="Chef·fe d'établissement"><option value="Enseignant·e"><option value="Gestionnaire"></datalist>
        <label>E-mail<input class="in" type="email" name="email" required maxlength="254" autocomplete="email" placeholder="E-mail"></label>
        <label>Téléphone (facultatif)<input class="in" type="tel" name="telephone" maxlength="30" autocomplete="tel" placeholder="Téléphone (facultatif)"></label>
        <input class="piege" name="site_web" tabindex="-1" autocomplete="off" aria-hidden="true">
        <p class="form-erreur" role="alert" hidden></p>
        <button class="btn cta" type="submit">Recevoir mon devis →</button>
        <p class="form-rgpd">Vos coordonnées servent uniquement à vous répondre au sujet de ce devis. Elles sont conservées 3 ans après notre dernier échange.</p>
      </form>
      <div class="form-merci" hidden role="status"><b>Merci, votre demande est bien reçue.</b> Nous vous envoyons votre devis sous 48 h.</div>
    </div>
  </div>
</section>`;
