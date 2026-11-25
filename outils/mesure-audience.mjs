// Mesure d'audience : Cloudflare Web Analytics (sans cookie, sans suivi individuel).
// Coller ici le jeton fourni par Cloudflare (tableau de bord → Web Analytics →
// « Add a site » → myclassflow.fr → valeur de "token" dans l'extrait JS), puis
// `npm run generer`. Le jeton est public : il figure dans chaque page.
// Vide : aucun script, et la politique de confidentialité dit qu'il n'y a pas de mesure.
export const JETON_CLOUDFLARE_ANALYTICS = "";

export const balise = (jeton = JETON_CLOUDFLARE_ANALYTICS) =>
  jeton
    ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${jeton.replace(/[^A-Za-z0-9]/g, "")}"}'></script>\n`
    : "";
