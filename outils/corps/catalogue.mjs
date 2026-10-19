// Catalogue des fonctionnalités : source unique du méga-menu, des pages
// Fonctionnalités et de l'aperçu de l'accueil. `court` : ligne du menu ;
// `long` : texte de la carte ; `page: false` : absente de la page (menu seul) ;
// `fiche` : adresse courte de sa fiche explicative, quand elle existe.

export const THEMES = [
  { titre: "Adapter pour chaque élève", sous: "L'IA fait le travail d'adaptation, vous validez.", outils: [
    { ico: "✨", nom: "Adaptation des supports", k: "pay", fiche: "adaptation-des-supports", court: "Vos fiches adaptées automatiquement, selon vos critères",
      long: "Cochez des critères pédagogiques, avec ou sans élève relié&nbsp;: l'exercice ressort avec un texte agrandi, une mise en page aérée, des consignes en étapes." },
    { ico: "💬", nom: "Lia, votre assistante", k: "pay", fiche: "lia", court: "Posez vos questions sur vos élèves et vos tâches",
      long: "Une question sur vos élèves, vos tâches ou la pédagogie : Lia répond et vous propose des observations ou des tâches à valider." },
  ] },
  { titre: "Préparer la classe", sous: "Tout est relié : vos fiches de préparation passent dans le cahier journal, et bientôt l'emploi du temps aussi.", outils: [
    { ico: "📓", nom: "Cahier journal", k: "free", fiche: "cahier-journal", court: "Chaque séance du jour, sa fiche à côté",
      long: "Jour après jour, vos séances avec leurs objectifs et la fiche de prep qui les accompagne, à garder en PDF." },
    { ico: "🗓️", nom: "Emploi du temps", k: "free", fiche: "emploi-du-temps", court: "Le total d'heures de chaque matière, sans calcul",
      long: "Cours, récréations et rituels posés une fois pour l'année : MyClassFlow additionne les heures de chaque matière." },
    { ico: "📝", nom: "Fiches de préparation", k: "free", fiche: "fiche-de-preparation", court: "Séances et séquences, simplement",
      long: "Séances et séquences, avec objectifs et compétences." },
    { ico: "✅", nom: "Tâches", k: "free", fiche: "taches", court: "Les choses à faire, par classe et par échéance", page: false },
  ] },
  { titre: "Suivre ses élèves", sous: "Repérez d'un coup d'œil qui a besoin de quoi.", outils: [
    { ico: "👤", nom: "Fiche élève", k: "free", fiche: "fiches-eleves", court: "Critères pédagogiques, observations, tâches",
      long: "Critères pédagogiques, observations et tâches de l'élève, au même endroit." },
    { ico: "📸", nom: "Import des élèves par photo", k: "free", fiche: "import-eleves-photo", court: "Une photo de la liste, vos élèves sont ajoutés",
      long: "Une photo de votre liste de classe, et vos élèves sont ajoutés à la classe après relecture." },
  ] },
];

// MyClassFlow Famille (espace Parents / Enfants).
export const ADAPTER = [
  { ico: "📸", nom: "Adapter une leçon en photo", k: "free", badge: "Essai gratuit", court: "Une photo, et la version adaptée se prépare",
    long: "Photographiez la leçon, l'exercice ou la page du cahier : MyClassFlow Famille en prépare une version adaptée." },
  { ico: "🎯", nom: "Cocher les critères pédagogiques", k: "pay", badge: "Abonnement", court: "Texte agrandi, lignes espacées, consignes en étapes…",
    long: "Texte agrandi, lignes espacées, consignes en étapes… Vous cochez les critères qui aident votre enfant&nbsp;: la page suit." },
  { ico: "🖨️", nom: "Imprimer ou lire à l'écran", k: "pay", badge: "Abonnement", court: "Une version claire et aérée, prête à l'emploi",
    long: "Une version claire et aérée, à imprimer pour le cartable ou à lire sur le téléphone, la tablette ou l'ordinateur." },
  { ico: "👨‍👩‍👧", nom: "Tous les enfants du foyer", k: "pay", badge: "Abonnement", court: "Un seul abonnement pour toute la famille",
    long: "Un seul abonnement couvre tous les enfants du foyer, chacun avec ses propres critères." },
];

export const libelleBadge = (o) => o.badge ?? (o.k === "free" ? "Gratuit" : "Abonnement");

/** Adresse de la fiche explicative d'un outil, ou null s'il n'en a pas encore. */
export const lienFiche = (o) => (o.fiche ? `/enseignants/fonctionnalites/${o.fiche}/` : null);

/** Outil du catalogue Enseignants, par son nom affiché. */
export const outil = (nom) => THEMES.flatMap((t) => t.outils).find((o) => o.nom === nom);

/** Texte lié à la fiche de l'outil si elle existe, texte seul sinon. */
export const nomLie = (o, texte = o.nom) => {
  const href = lienFiche(o);
  return href ? `<a class="lien-fiche" href="${href}">${texte}</a>` : texte;
};
