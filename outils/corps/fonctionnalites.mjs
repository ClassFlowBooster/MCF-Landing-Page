// Pages « Fonctionnalités » des trois espaces.
import { THEMES, ADAPTER, libelleBadge } from "./catalogue.mjs";

const carte = (o) =>
  `<div class="fc" data-k="${o.k}"><div class="top"><span class="ico" aria-hidden="true">${o.ico}</span><span class="tg ${o.k}">${libelleBadge(o)}</span></div><b>${o.nom}</b><span class="t">${o.long}</span></div>`;

const ruban = (titre, texte, bouton, href) =>
  `<div class="ribbon"><div><b>${titre}</b><p>${texte}</p></div><a class="btn" href="${href}">${bouton}</a></div>`;

export function fonctionnalites(espace) {
  if (espace === "parents-enfants") {
    return `<section class="page">
  <h1 class="t">Des devoirs adaptés, sans y passer la soirée</h1>
  <p class="lead">MyClassFlow Famille transforme les leçons et les exercices selon les besoins de votre enfant.</p>
  <div class="theme"><h3>MyClassFlow Famille</h3><p class="s">Une photo suffit : vous gardez la main sur les besoins de votre enfant.</p>
    <div class="grid deux">
      ${ADAPTER.map(carte).join("\n      ")}
    </div></div>
  ${ruban("Essayez gratuitement : 3 adaptations offertes", "Sans carte bancaire. Un abonnement couvre ensuite tous les enfants du foyer.", "Essayer gratuitement", "https://adapter.myclassflow.fr")}
</section>`;
  }
  const ecoles = espace === "ecoles";
  return `<section class="page">
  <h1 class="t">${ecoles ? "Tout ce qu'il faut pour votre équipe" : "Tout ce qu'il faut pour votre classe"}</h1>
  <p class="lead">La gestion de classe est gratuite. L'IA qui adapte vos supports est dans l'abonnement.</p>
  <div class="filters" id="flt" role="group" aria-label="Filtrer les fonctionnalités"><button type="button" class="on" aria-pressed="true" data-f="all">Tout</button><button type="button" aria-pressed="false" data-f="free">Gratuit</button><button type="button" aria-pressed="false" data-f="pay">Abonnement</button></div>

  ${THEMES.map((t) => `<div class="theme"><h3>${t.titre}</h3><p class="s">${t.sous}</p>
    <div class="grid">
      ${t.outils.filter((o) => o.page !== false).map(carte).join("\n      ")}
    </div></div>`).join("\n\n  ")}

  ${ecoles
    ? ruban("Équipez toute l'équipe", "Le prix par enseignant baisse dès 5 enseignants, avec une seule facture pour l'établissement.", "Demander un devis", "/ecoles/tarifs/#devis")
    : ruban("Commencez gratuitement", "Sans carte bancaire. Passez à l'abonnement quand vous voulez adapter vos supports.", "Créer mon compte gratuit", "https://app.myclassflow.fr")}
</section>`;
}
