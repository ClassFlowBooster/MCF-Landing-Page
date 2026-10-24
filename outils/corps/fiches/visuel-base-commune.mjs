// Illustration de la base commune : l'écran « Découvrir » de l'app reconstitué en HTML,
// données fictives (MCF-Landing-Page#37). Repris des captures de l'app après MCF-App#398 et #399 :
// en-tête, recherche et filtres sur une ligne, « Récemment publiées » avec auteur, aperçu de la
// fiche, matière, niveau, durée, avis et reprises. Purement décoratif (aria-hidden), sans contrôle.

const CARTES = [
  { initiales: "LR", auteur: "Léa R.", couleur: "#B45309", matiere: "Mathématiques", teinte: "#0891B2", niveau: "CE1", duree: "40 min",
    titre: "Mesurer un segment", domaine: "Grandeurs et mesures", ligne: "Le zéro au début de la bande, on lit à l'autre bout.", avis: "3 avis", reprises: "5 reprises" },
  { initiales: "TB", auteur: "Tom B.", couleur: "#4D7C0F", matiere: "Français", teinte: "#6366F1", niveau: "CE1", duree: "30 min",
    titre: "Les sons « in » et « an »", domaine: "Lecture et écriture", ligne: "Trier les mots de l'album selon le son entendu.", avis: "Aucun avis", nouvelle: true },
  { initiales: "CD", auteur: "Camille D.", couleur: "#7C3AED", matiere: "Questionner le monde", teinte: "#059669", niveau: "CE1", duree: "45 min",
    titre: "Les états de l'eau", domaine: "La matière", ligne: "Observer un glaçon fondre, noter ce qui change.", avis: "1 avis", reprises: "2 reprises" },
];

const carte = (c) => `<div class="bc-carte">
        <div class="bc-auteur"><span class="bc-avatar" style="background:${c.couleur}">${c.initiales}</span><span><b>${c.auteur}</b><small>Partagée le 20 octobre</small></span></div>
        <div class="bc-apercu" style="--bc-teinte:${c.teinte}"><span class="bc-apercu-tag">${c.matiere} · ${c.niveau}</span><b>${c.titre}</b><span class="bc-apercu-trait"></span><span class="bc-apercu-ligne">• ${c.ligne}</span></div>
        <div class="bc-meta"><span class="bc-point" style="background:${c.teinte}"></span>${c.matiere} <span>${c.niveau}</span> <span>${c.duree}</span></div>
        <div class="bc-carte-titre">${c.titre}</div>
        <div class="bc-domaine">${c.domaine}</div>
        <div class="bc-pied"><span>${c.avis}</span>${c.nouvelle ? '<span class="bc-nouvelle">Nouvelle</span>' : `<span>${c.reprises}</span>`}</div>
      </div>`;

export const visuelBaseCommune = `<figure class="bc-visuel" id="visuel-base-commune" aria-label="Illustration : l'écran Découvrir de la base commune dans MyClassFlow">
  <div class="bc-ecran" aria-hidden="true">
    <div class="bc-chemin">Fiches de prep › Base commune</div>
    <div class="bc-titre">Base commune</div>
    <p class="bc-sous">Les fiches de prep partagées par des enseignants, rangées par programme et notées par ceux qui les ont utilisées</p>
    <div class="bc-filtres"><span class="bc-recherche">Titre, compétence ou auteur…</span><span class="bc-pilule on">CE1</span><span class="bc-pilule">Toutes les matières ▾</span></div>
    <div class="bc-section"><b>Récemment publiées</b><small>Les dernières arrivées, sans classement</small></div>
    <div class="bc-cartes">
      ${CARTES.map(carte).join("\n      ")}
    </div>
  </div>
  <figcaption>Écran de MyClassFlow reconstitué, données fictives.</figcaption>
</figure>`;
