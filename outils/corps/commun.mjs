// Morceaux de HTML partagés par plusieurs pages.

/** Sélecteur de durée (deux pastilles) et bascule Par mois / Par an. */
export function controles(engagement, sousEngagement, sousSans) {
  return `<div class="controls">
    <div class="dur" role="group" aria-label="Durée d'engagement">
      <button type="button" class="on" aria-pressed="true" data-v="eng"><span class="best">★ Meilleur prix</span>${engagement}<span class="sub">${sousEngagement}</span></button>
      <button type="button" aria-pressed="false" data-v="0">Sans engagement<span class="sub">${sousSans}</span></button>
    </div>
    <div class="seg" role="group" aria-label="Période d'affichage des prix"><button type="button" class="on" aria-pressed="true" data-v="m">Par mois</button><button type="button" aria-pressed="false" data-v="a">Par an</button></div>
  </div>`;
}
