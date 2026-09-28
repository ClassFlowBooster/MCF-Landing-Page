// Méga-menu « Fonctionnalités » de la barre du haut.
import { THEMES, ADAPTER, libelleBadge } from "./catalogue.mjs";

const item = (o, href) =>
  `<a class="mi" href="${href}"><span class="ico" aria-hidden="true">${o.ico}</span><div><b>${o.nom} <span class="tg ${o.k}">${libelleBadge(o)}</span></b><span class="t">${o.court}</span></div></a>`;

export function megaMenu(espace) {
  const href = `/${espace}/fonctionnalites/`;
  const pied = (texte) => `<div class="megafoot"><span>${texte}</span><a href="${href}">Voir toutes les fonctionnalités →</a></div>`;
  if (espace === "parents-enfants") {
    return `<div class="mega court" id="mega" hidden>
    <div>
      <h6>ClassFlow Adapter</h6>
      ${ADAPTER.map((o) => item(o, href)).join("\n      ")}
    </div>
    ${pied("3 adaptations offertes, sans carte bancaire.")}
  </div>`;
  }
  return `<div class="mega" id="mega" hidden>
    ${THEMES.map((t) => `<div>
      <h6>${t.titre}</h6>
      ${t.outils.map((o) => item(o, href)).join("\n      ")}
    </div>`).join("\n    ")}
    ${pied("La gestion de classe est gratuite, avec 3 adaptations offertes. L'IA en illimité est dans l'abonnement.")}
  </div>`;
}
