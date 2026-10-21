const exerciceBoutons = [...document.querySelectorAll('.oa-exercice')];
const groupeBoutons = [...document.querySelectorAll('.oa-groupe')];
const criteres = document.querySelector('#oa-criteres');
const description = document.querySelector('#oa-description-groupe');
const avant = document.querySelector('#oa-avant');
const pages = document.querySelector('#oa-pages');
const etat = document.querySelector('#oa-etat');
const pourGroupe = document.querySelector('#oa-pour-groupe');
const legendeAvant = document.querySelector('#oa-legende-avant');
const legendeApres = document.querySelector('#oa-legende-apres');
const descriptions = {
  'lecture-accompagnee': 'aide à lire le texte : interligne, lettres espacées, syllabes en couleurs, lettres muettes en gris et une ligne sur deux.',
  'consignes-simplifiees': 'propose des consignes plus courtes et plus précises, reformulées par l’IA, des exercices découpés, un exemple et des pictogrammes.',
  'attention-courte': 'structure l’exercice étape par étape, pour que l’élève retrouve plus facilement où commencer et quoi faire ensuite.'
};
const libellesCourts = {
  "Augmenter l'interligne · 1,5": 'Interligne 1,5',
  'Espacer les lettres · Moyen': 'Lettres espacées',
  'Syllabes en couleurs dans les textes à lire': 'Syllabes en couleurs',
  'Lettres muettes en gris dans les textes à lire': 'Lettres muettes en gris',
  'Surligner une ligne sur deux': 'Une ligne sur deux',
  'Consignes courtes et directes': 'Consignes courtes',
  'Vocabulaire simple · Mots courants': 'Mots courants',
  'Préciser quoi faire, où, combien': 'Action précisée',
  'Séparer en sous-exercices les consignes à plusieurs actions': 'Exercices découpés',
  'Exemple résolu · Quand le format est ambigu': 'Exemple résolu',
  'Pictogramme devant les consignes': 'Pictogrammes',
  'Fond de couleur sous chaque consigne': 'Fond sous les consignes',
  'Textes en paragraphes courts · Sans sous-titres': 'Paragraphes courts',
  'Afficher la progression': 'Progression visible',
  'Repère « Commence ici »': 'Repère « Commence ici »',
  'Case de vérification à la fin de chaque exercice': 'Vérification',
  "Moins d'items par exercice": 'Moins d’items'
};
let documentChoisi = 'mesures-rubans';
let groupeChoisi = 'attention-courte';

try {
  const reponse = await fetch('/assets/exemples/adaptation/manifeste.json');
  if (!reponse.ok) throw new Error('indisponible');
  const manifeste = await reponse.json();
  function mettreAJourBoutons(boutons, attribut, valeur) {
    boutons.forEach(bouton => {
      const selectionne = bouton.dataset[attribut] === valeur;
      bouton.classList.toggle('is-selected', selectionne);
      bouton.setAttribute('aria-pressed', String(selectionne));
      const niveau = bouton.querySelector('small');
      if (niveau) niveau.textContent = niveau.textContent.replace(' · sélectionné', '') + (selectionne ? ' · sélectionné' : '');
    });
  }
  function afficher() {
    const exercice = manifeste.documents.find(item => item.slug === documentChoisi);
    const groupe = manifeste.groupes.find(item => item.id === groupeChoisi);
    const resultat = manifeste.resultats[exercice.slug + '/' + groupe.id];
    mettreAJourBoutons(exerciceBoutons, 'document', documentChoisi);
    mettreAJourBoutons(groupeBoutons, 'groupe', groupeChoisi);
    description.innerHTML = '<b>' + groupe.nom + '</b> ' + descriptions[groupe.id];
    pourGroupe.textContent = 'Pour le groupe ' + groupe.nom;
    criteres.replaceChildren(...groupe.criteres.map(critere => {
      const pastille = document.createElement('span');
      pastille.textContent = libellesCourts[critere.libelle] || critere.libelle;
      pastille.title = critere.libelle;
      pastille.setAttribute('aria-label', critere.libelle);
      return pastille;
    }));
    avant.src = '/assets/exemples/adaptation/originaux/' + exercice.slug + '.html';
    avant.title = 'Document d’origine : ' + exercice.titre;
    legendeAvant.textContent = 'Exercice d’origine · ' + exercice.niveau;
    pages.replaceChildren(...resultat.pages.map((chemin, index) => {
      const image = new Image();
      image.src = chemin;
      image.loading = 'lazy';
      image.alt = 'Page ' + (index + 1) + ' de l’adaptation « ' + groupe.nom + ' » pour « ' + exercice.titre + ' »';
      return image;
    }));
    legendeApres.textContent = 'Adaptation pour le groupe · ' + resultat.pages.length + ' pages';
    etat.textContent = exercice.titre + ' sélectionné, groupe ' + groupe.nom + '.';
  }
  exerciceBoutons.forEach(bouton => bouton.addEventListener('click', () => { documentChoisi = bouton.dataset.document; afficher(); }));
  groupeBoutons.forEach(bouton => bouton.addEventListener('click', () => { groupeChoisi = bouton.dataset.groupe; afficher(); }));
  afficher();
} catch {
  etat.textContent = 'Les exemples ne peuvent pas être chargés. Rechargez la page pour réessayer.';
}
