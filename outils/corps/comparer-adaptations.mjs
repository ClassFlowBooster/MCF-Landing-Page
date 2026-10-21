// Comparaison statique d’exemples réels, sans appel IA à la consultation.
import manifeste from "../../assets/exemples/adaptation/manifeste.json" with { type: "json" };
const options = (liste, cle) => liste.map(x => `<option value="${x[cle]}">${x.titre ? `${x.niveau} — ${x.titre}` : x.nom}</option>`).join("");
export default `<section class="page oa">
<nav aria-label="Fil d’Ariane"><a href="/enseignants/fonctionnalites/">Fonctionnalités</a> / <a href="/enseignants/fonctionnalites/adaptation-des-supports/">Adaptation des supports</a></nav>
<h1 class="t">Un document, plusieurs critères à comparer</h1>
<p class="lead">Choisissez un exercice et un groupe pour examiner le document d’origine et sa version adaptée.</p>
<p>Trois exercices fictifs créés pour cette page, sans données d’élèves. Les groupes et les critères viennent de MyClassFlow. Le détail des critères appliqués est affiché sous votre choix.</p>
<div class="oa-commandes"><label for="oa-document">Exercice<select id="oa-document">${options(manifeste.documents,"slug")}</select></label><label for="oa-groupe">Groupe<select id="oa-groupe">${options(manifeste.groupes,"id")}</select></label></div>
<p id="oa-criteres"></p><p id="oa-etat" role="status" aria-live="polite"></p>
<p class="oa-provenance">Résultat produit par MyClassFlow, sans retouche. Seul le groupe Consignes simplifiées fait reformuler les consignes par l'IA ; les autres changent la mise en forme.</p>
<div class="oa-comparaison"><section><h2>Document d’origine</h2><iframe id="oa-avant" title="Document d’origine" sandbox="" src="/assets/exemples/adaptation/originaux/lecture-jardin.html"></iframe></section><section><h2>Version adaptée</h2><div id="oa-pages" aria-live="polite"></div></section></div>
<noscript><p>Activez JavaScript pour changer de document et comparer les versions. Le premier document reste lisible ci-dessus.</p></noscript>
<details><summary>Origine des exemples et critères</summary><p>Les exercices sont des créations originales MyClassFlow. Chaque version adaptée est celle que l’app a réellement produite pour l’exercice et le groupe choisis.</p><p>Les trois groupes reprennent les critères cochés dans MyClassFlow. Seul le groupe « Consignes simplifiées », qui contient « Consignes courtes et directes », fait reformuler les consignes par l’IA. Les autres groupes changent la mise en forme.</p></details>
<p><a href="/enseignants/fonctionnalites/adaptation-des-supports/">Comprendre l’adaptation des supports dans MyClassFlow</a></p>
</section>`;
