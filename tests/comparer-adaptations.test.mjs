import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { PAGES } from '../outils/pages.mjs';
const manifeste = JSON.parse(readFileSync('assets/exemples/adaptation/manifeste.json', 'utf8'));
const script = readFileSync('assets/js/comparer-adaptations.js', 'utf8');
test('le comparateur expose trois exercices et trois groupes', () => {
  assert.equal(manifeste.documents.length, 3);
  assert.deepEqual(manifeste.groupes.map(x => x.nom), ['Lecture accompagnée', 'Consignes simplifiées', 'Attention courte']);
  for (const doc of manifeste.documents) assert.ok(existsSync(`assets/exemples/adaptation/originaux/${doc.slug}.html`));
  const page = PAGES.find(x => x.chemin === '/enseignants/outils/comparer-adaptations/');
  assert.ok(page.scripts.includes('comparer-adaptations.js'));
  assert.match(page.corps, /role="status" aria-live="polite"/);
  assert.equal((page.corps.match(/class="oa-exercice(?: |")/g) || []).length, 3);
  assert.equal((page.corps.match(/class="oa-groupe(?: |")/g) || []).length, 3);
  assert.equal((page.corps.match(/type="button"[^>]*aria-pressed=/g) || []).length, 6);
});
test('les neuf adaptations publiées sont complètes et sans donnée personnelle', () => {
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
  assert.doesNotMatch(page.corps, /href="[^"]*\.pdf|download=/i);
  assert.doesNotMatch(page.corps, /pour\s+[A-ZÀ-ÖÙ-Ý][a-zà-öù-ý]+/);
  assert.doesNotMatch(page.corps, /d91a67df|\.dart|JPEG/i);
  assert.match(page.corps, /id="oa-pages"/);
  assert.match(page.corps, /Résultat produit par MyClassFlow, sans retouche/);
  assert.match(script, /image\.loading = 'lazy'/);
  assert.match(script, /aria-label/);
  assert.match(script, /oa-exercice/);
  assert.match(script, /oa-groupe/);
});
