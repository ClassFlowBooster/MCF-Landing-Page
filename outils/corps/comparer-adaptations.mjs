// Comparaison statique d’exemples réels, sans appel IA à la consultation.
import manifeste from "../../assets/exemples/adaptation/manifeste.json" with { type: "json" };
const options = (liste, cle) => liste.map(x => `<option value="${x[cle]}">${x.titre ? `${x.niveau} — ${x.titre}` : x.nom}</option>`).join("");
export default `<section class="page oa">
<nav aria-label="Fil d’Ariane"><a href="/enseignants/fonctionnalites/">Fonctionnalités</a> / <a href="/enseignants/fonctionnalites/adaptation-des-supports/">Adaptation des supports</a></nav>
<h1 class="t">Un document, plusieurs critères à comparer</h1>
<p class="lead">Choisissez un exercice et une famille de critères pédagogiques pour examiner le document d’origine et sa version adaptée.</p>
<p>Trois exercices fictifs créés pour cette page, sans données d’élèves. Les familles et les critères viennent de MyClassFlow. Le détail des critères appliqués est affiché sous votre choix.</p>
<div class="oa-commandes"><label for="oa-document">Document<select id="oa-document">${options(manifeste.documents,"slug")}</select></label><label for="oa-groupe">Famille de critères<select id="oa-groupe">${options(manifeste.groupes,"id")}</select></label></div>
<p id="oa-criteres"></p><p id="oa-etat" role="status" aria-live="polite"></p>
<div class="oa-comparaison"><section><h2>Document d’origine</h2><iframe id="oa-avant" title="Document d’origine" sandbox="" src="/assets/exemples/adaptation/originaux/lecture-jardin.html"></iframe></section><section><h2>Version adaptée</h2><div id="oa-indisponible">Aucun résultat réel disponible pour ce choix.</div><iframe id="oa-apres" title="Version adaptée" sandbox="" hidden></iframe></section></div>
<noscript><p>Activez JavaScript pour changer de document et comparer les versions. Le premier document reste lisible ci-dessus.</p></noscript>
<details><summary>Origine des exemples et critères</summary><p>Les exercices sont des créations originales MyClassFlow. Les documents d’origine ont été composés en HTML, puis convertis en PDF pour préparer leur passage dans le circuit d’adaptation de l’app. Un résultat n’est présenté comme une adaptation de l’app qu’après réception de son rendu réel.</p><p>Les cinq familles reprennent le catalogue de critères pédagogiques de MyClassFlow. Chaque choix applique uniquement les critères affichés, une sélection de cette famille. Seul le choix « Consignes », qui contient « Consignes courtes et directes », demande une reformulation. Les critères de présentation suivent les mêmes réglages sur les trois documents.</p><p>Source vérifiée : MCF-App, version d91a67df, catalogue <code>criteres_pedagogiques_depot.dart</code> et familles <code>critere_pedagogique.dart</code>. Ces exercices demandent une relecture pédagogique avant usage en classe.</p></details>
<p><a href="/enseignants/fonctionnalites/adaptation-des-supports/">Comprendre l’adaptation des supports dans MyClassFlow</a></p>
</section>`;
