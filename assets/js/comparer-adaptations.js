// Les chemins des rendus sont issus du manifeste livré avec le site.
// Aucune donnée visiteur ne part vers le service d’adaptation.
const documentSelect = document.querySelector('#oa-document');
const groupeSelect = document.querySelector('#oa-groupe');
const criteres = document.querySelector('#oa-criteres');
const avant = document.querySelector('#oa-avant');
const pages = document.querySelector('#oa-pages');
const etat = document.querySelector('#oa-etat');
try {
  const reponse = await fetch('/assets/exemples/adaptation/manifeste.json');
  if (!reponse.ok) throw new Error('manifeste indisponible');
  const manifeste = await reponse.json();
  function afficher() {
    const document = manifeste.documents.find(x => x.slug === documentSelect.value);
    const groupe = manifeste.groupes.find(x => x.id === groupeSelect.value);
    const resultat = manifeste.resultats[`${document.slug}/${groupe.id}`];
    criteres.textContent = `Critères appliqués : ${groupe.criteres.map(x => x.libelle).join(' ; ')}.`;
    avant.src = `/assets/exemples/adaptation/originaux/${document.slug}.html`;
    pages.replaceChildren(...resultat.pages.map((chemin, index) => {
      const image = new Image();
      image.src = chemin;
      image.loading = 'lazy';
      image.alt = `Version adaptée « ${groupe.nom} » de « ${document.titre} », page ${index + 1}`;
      return image;
    }));
    const jour = new Date(`${resultat.date}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    etat.textContent = `${document.titre} · ${groupe.nom}. Adaptation produite dans MyClassFlow le ${jour}.`;
  }
  documentSelect.addEventListener('change', afficher);
  groupeSelect.addEventListener('change', afficher);
  afficher();
} catch {
  etat.textContent = 'Les exemples ne peuvent pas être chargés. Rechargez la page pour réessayer.';
}
