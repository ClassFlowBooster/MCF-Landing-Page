// Écran d'entrée de « / » : fenêtre de choix au premier passage, redirection
// vers l'espace mémorisé ensuite. Sans JavaScript, l'accueil reste lisible
// derrière (et la fenêtre n'apparaît pas) : le HTML est le même pour tous.
// Seule une arrivée directe sur « / » est concernée : venir d'une autre page
// du site (le logo, par exemple) montre l'accueil, sans fenêtre ni redirection.
const ESPACES = ["enseignants", "ecoles", "parents-enfants"];
const CLE = "cf-espace";

export function decider(choix, depuisLeSite = false) {
  if (depuisLeSite) return { afficherFenetre: false, redirection: null };
  if (choix && ESPACES.includes(choix)) return { afficherFenetre: false, redirection: `/${choix}/` };
  return { afficherFenetre: true, redirection: null };
}

function lire() { try { return localStorage.getItem(CLE); } catch { return null; } }
function ecrire(v) { try { localStorage.setItem(CLE, v); } catch { /* bloqué : on ne retient rien */ } }

if (typeof document !== "undefined") {
  let depuisLeSite = false;
  try { depuisLeSite = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch { /* référent illisible : arrivée directe */ }
  const d = decider(lire(), depuisLeSite);
  const fenetre = document.getElementById("entree");
  if (d.redirection) {
    location.replace(d.redirection);
  } else if (fenetre) {
    // Le reste de la page devient inaccessible (souris et clavier) tant que la fenêtre est ouverte.
    const derriere = document.querySelectorAll("body > header, body > main, body > footer");
    document.body.classList.add("avec-entree");
    derriere.forEach((el) => { el.inert = true; });
    fenetre.hidden = false;
    fenetre.querySelector(".ch")?.focus();
    // Le lien de chaque carte mène à l'espace ; on retient le choix si demandé.
    fenetre.querySelectorAll(".ch").forEach((c) => c.addEventListener("click", () => {
      if (fenetre.querySelector("#seSouvenir").checked) ecrire(c.dataset.espace);
    }));
  }
}
