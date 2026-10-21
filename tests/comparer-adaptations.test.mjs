import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { PAGES } from '../outils/pages.mjs';
const manifeste = JSON.parse(readFileSync('assets/exemples/adaptation/manifeste.json', 'utf8'));
const script = readFileSync('assets/js/comparer-adaptations.js', 'utf8');
test('le comparateur expose trois documents originaux et les trois groupes réels', () => {
  assert.equal(manifeste.documents.length, 3);
  assert.deepEqual(manifeste.groupes.map(x => x.nom), ['Lecture accompagnée', 'Consignes simplifiées', 'Attention courte']);
  for (const doc of manifeste.documents) assert.ok(existsSync(`assets/exemples/adaptation/originaux/${doc.slug}.html`));
  const page = PAGES.find(x => x.chemin === '/enseignants/outils/comparer-adaptations/');
  assert.ok(page.scripts.includes('comparer-adaptations.js'));
  assert.match(page.corps, /role="status"/);
  assert.match(page.corps, /for="oa-document"/);
  assert.match(page.corps, /for="oa-groupe"/);
});
test('les neuf résultats publiés ont leurs pages JPEG réelles, sans nom d’élève ni PDF proposé', () => {
  assert.equal(Object.keys(manifeste.resultats).length, 9);
  for (const [cle, resultat] of Object.entries(manifeste.resultats)) {
    const [doc, groupe] = cle.split('/');
    assert.ok(manifeste.documents.some(x => x.slug === doc));
    assert.ok(manifeste.groupes.some(x => x.id === groupe));
    assert.equal(resultat.date, '2026-10-21');
    assert.equal(resultat.provenance, 'adaptation-fiche');
    assert.ok(Array.isArray(resultat.pages));
    assert.ok(resultat.pages.length >= 2);
    for (const page of resultat.pages) {
      assert.match(page, /^\/assets\/exemples\/adaptation\/rendus\/[a-z-]+\/[a-z-]+-\d+\.jpg$/);
      assert.ok(existsSync(`.${page}`));
    }
  }
  const page = PAGES.find(x => x.chemin === '/enseignants/outils/comparer-adaptations/');
  assert.doesNotMatch(page.corps, /href="[^"]*\.pdf|download=/);
  assert.doesNotMatch(page.corps, /pour\s+[A-ZÀ-ÖÙ-Ý][a-zà-öù-ý]+/);
  assert.match(page.corps, /id="oa-pages"/);
  assert.match(page.corps, /Résultat produit par MyClassFlow, sans retouche/);
  assert.match(script, /image\.loading = 'lazy'/);
  assert.match(script, /Version adaptée « \$\{groupe\.nom\} » de « \$\{document\.titre\} », page \$\{index \+ 1\}/);
});
