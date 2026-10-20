// Les chemins des rendus sont issus du manifeste livré avec le site.
// Aucune donnée visiteur ne part vers le service d’adaptation.
const documentSelect = document.querySelector('#oa-document');
const groupeSelect = document.querySelector('#oa-groupe');
try {
  const reponse = await fetch('/assets/exemples/adaptation/manifeste.json');
  if (!reponse.ok) throw new Error('manifeste indisponible');
  const manifeste = await reponse.json();
  function afficher() {
    const document = manifeste.documents.find(x => x.slug === documentSelect.value);
    const groupe = manifeste.groupes.find(x => x.id === groupeSelect.value);
    const resultat = manifeste.resultats[`${document.slug}/${groupe.id}`];
    window.document.querySelector('#oa-criteres').textContent = `Critères appliqués : ${groupe.criteres.map(x => x.libelle).join(' ; ')}.`;
    window.document.querySelector('#oa-avant').src = `/assets/exemples/adaptation/originaux/${document.slug}.html`;
    const apres = window.document.querySelector('#oa-apres');
    apres.hidden = !resultat;
    window.document.querySelector('#oa-indisponible').hidden = !!resultat;
    if (resultat) apres.src = resultat.chemin;
    else apres.removeAttribute('src');
    window.document.querySelector('#oa-etat').textContent = resultat
      ? `${document.titre} · ${groupe.nom}. Adaptation réelle préparée le ${resultat.date}. Aucun appel IA pendant la consultation.`
      : `${document.titre} · ${groupe.nom}. Résultat réel en attente : aucune adaptation n’est présentée pour ce choix.`;
  }
  documentSelect.addEventListener('change', afficher);
  groupeSelect.addEventListener('change', afficher);
  afficher();
} catch {
  document.querySelector('#oa-etat').textContent = 'Les exemples ne peuvent pas être chargés. Rechargez la page pour réessayer.';
}
