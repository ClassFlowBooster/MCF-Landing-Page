// Catalogue des fonctionnalités : source unique du méga-menu, des pages
// Fonctionnalités et de l'aperçu de l'accueil. `court` : ligne du menu ;
// `long` : texte de la carte ; `page: false` : absente de la page (menu seul).

export const THEMES = [
  { titre: "Adapter pour chaque élève", sous: "L'IA fait le travail d'adaptation, vous validez.", outils: [
    { ico: "✨", nom: "Adaptation des supports", k: "pay", court: "Vos fiches personnalisées en quelques secondes, selon vos critères",
      long: "Cochez des critères pédagogiques, avec ou sans élève relié&nbsp;: l'exercice ressort avec un texte agrandi, une mise en page aérée, des consignes en étapes." },
    { ico: "💬", nom: "Lia, votre assistante", k: "pay", court: "Posez vos questions, elle prépare avec vous",
      long: "Une question de pédagogie, une idée de séance : Lia répond et vous propose des actions à valider." },
  ] },
  { titre: "Préparer la classe", sous: "Tout est relié : l'emploi du temps nourrit le cahier journal.", outils: [
    { ico: "📓", nom: "Cahier journal", k: "free", court: "Votre journée prête en quelques minutes",
      long: "Votre journée se remplit toute seule à partir de l'emploi du temps et des fiches." },
    { ico: "🗓️", nom: "Emploi du temps", k: "free", court: "Glissez vos séances, le volume horaire se calcule",
      long: "Glissez-déposez vos séances, le volume horaire par matière se calcule." },
    { ico: "📝", nom: "Fiches de préparation", k: "free", court: "Séances et séquences, simplement",
      long: "Séances et séquences, avec objectifs et compétences." },
    { ico: "✅", nom: "Agenda et tâches", k: "free", court: "Réunions, rendez-vous, choses à faire", page: false },
  ] },
  { titre: "Suivre ses élèves", sous: "Repérez d'un coup d'œil qui a besoin de quoi.", outils: [
    { ico: "👤", nom: "Fiche élève", k: "free", court: "Critères pédagogiques, observations, évaluations",
      long: "Évaluations, observations et critères pédagogiques de l'élève, au même endroit." },
    { ico: "📊", nom: "Évaluations", k: "free", court: "Progression par matière, d'un coup d'œil",
      long: "La progression par matière, élève par élève." },
    { ico: "📸", nom: "Import des élèves par photo", k: "free", court: "Une photo de la liste, la classe est créée",
      long: "Une photo de votre liste de classe, et tous vos élèves sont créés." },
  ] },
];

// MyClassFlow Famille (espace Parents / Enfants).
export const ADAPTER = [
  { ico: "📸", nom: "Adapter une leçon en photo", k: "free", badge: "Essai gratuit", court: "Une photo, la version adaptée en quelques secondes",
    long: "Photographiez la leçon, l'exercice ou la page du cahier : MyClassFlow Famille la transforme en quelques secondes." },
  { ico: "🎯", nom: "Cocher les critères pédagogiques", k: "pay", badge: "Abonnement", court: "Texte agrandi, lignes espacées, consignes en étapes…",
    long: "Texte agrandi, lignes espacées, consignes en étapes… Vous cochez les critères qui aident votre enfant&nbsp;: la page suit." },
  { ico: "🖨️", nom: "Imprimer ou lire à l'écran", k: "pay", badge: "Abonnement", court: "Une version claire et aérée, prête à l'emploi",
    long: "Une version claire et aérée, à imprimer pour le cartable ou à lire sur le téléphone, la tablette ou l'ordinateur." },
  { ico: "👨‍👩‍👧", nom: "Tous les enfants du foyer", k: "pay", badge: "Abonnement", court: "Un seul abonnement pour toute la famille",
    long: "Un seul abonnement couvre tous les enfants du foyer, chacun avec ses propres critères." },
];

export const libelleBadge = (o) => o.badge ?? (o.k === "free" ? "Gratuit" : "Abonnement");
