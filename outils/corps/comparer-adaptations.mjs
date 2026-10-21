import manifeste from "../../assets/exemples/adaptation/manifeste.json" with { type: "json" };

const exercices = manifeste.documents.map((document, index) => `<button class="oa-exercice${index === 1 ? " is-selected" : ""}" type="button" data-document="${document.slug}" aria-pressed="${index === 1 ? "true" : "false"}"><span class="oa-exercice-apercu" aria-hidden="true"></span><span><small>${document.niveau}${index === 1 ? " · sélectionné" : ""}</small><b>${document.titre}</b></span></button>`).join("");
const groupes = manifeste.groupes.map(groupe => `<button class="oa-groupe${groupe.id === "attention-courte" ? " is-selected" : ""}" type="button" data-groupe="${groupe.id}" aria-pressed="${groupe.id === "attention-courte" ? "true" : "false"}">${groupe.nom}</button>`).join("");

export default `<section class="page oa">
  <section class="oa-entete" aria-labelledby="oa-titre">
    <div><p class="oa-surtitre">Comparer une adaptation</p><h1 id="oa-titre">Un même exercice,<br>un autre confort de lecture.</h1><p class="oa-intro">Choisissez un exercice et un groupe pour mettre les deux supports face à face.</p></div>
    <p class="oa-note">Exemples conçus pour vous aider à regarder les choix de mise en forme, à votre rythme.</p>
  </section>
  <section class="oa-choix" aria-label="Choix de l'exercice et du groupe">
    <div class="oa-choix-entete"><h2>Votre atelier de comparaison</h2><p>3 exercices · 3 groupes</p></div>
    <div class="oa-exercices">${exercices}</div>
    <div class="oa-groupes"><strong>Groupe :</strong>${groupes}</div>
  </section>
  <p class="oa-resume"><span aria-hidden="true">✓</span><span id="oa-description-groupe"></span></p>
  <p id="oa-etat" class="oa-etat" role="status" aria-live="polite"></p>
  <section class="oa-comparaison" aria-label="Comparaison des documents">
    <article class="oa-panneau"><header class="oa-panneau-entete"><p>Le document de la classe</p><h2>Avant</h2></header><div class="oa-document"><iframe id="oa-avant" title="Document d’origine : Des rubans pour la maquette" sandbox="" src="/assets/exemples/adaptation/originaux/mesures-rubans.html"></iframe></div><p class="oa-legende" id="oa-legende-avant">Exercice d’origine · CE2</p></article>
    <article class="oa-panneau"><header class="oa-panneau-entete oa-panneau-entete-apres"><p id="oa-pour-groupe">Pour le groupe Attention courte</p><h2>Après</h2><div id="oa-criteres" class="oa-criteres"></div></header><div id="oa-pages" class="oa-document" aria-live="polite"></div><p class="oa-legende" id="oa-legende-apres"></p></article>
  </section>
  <p class="oa-provenance"><strong>Résultat produit par MyClassFlow, sans retouche.</strong> Seul le groupe Consignes simplifiées fait reformuler les consignes par l’IA ; les autres changent la mise en forme.</p>
  <noscript><p>Activez JavaScript pour changer d’exercice et comparer les adaptations.</p></noscript>
  <p class="oa-lien"><a href="/enseignants/fonctionnalites/adaptation-des-supports/">Comprendre l’adaptation des supports dans MyClassFlow</a></p>
</section>`;
