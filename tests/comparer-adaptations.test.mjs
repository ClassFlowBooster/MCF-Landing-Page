import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { PAGES } from '../outils/pages.mjs';
const manifeste = JSON.parse(readFileSync('assets/exemples/adaptation/manifeste.json', 'utf8'));
test('le comparateur expose trois documents originaux et les cinq familles du catalogue', () => {
  assert.equal(manifeste.documents.length, 3);
  assert.deepEqual(manifeste.groupes.map(x => x.nom), ['Lisibilité','Consignes','Structure','Exercices','Supports visuels']);
  for (const doc of manifeste.documents) assert.ok(existsSync(`assets/exemples/adaptation/originaux/${doc.slug}.html`));
  const page = PAGES.find(x => x.chemin === '/enseignants/outils/comparer-adaptations/');
  assert.ok(page.scripts.includes('comparer-adaptations.js'));
  assert.match(page.corps, /role="status"/);
  assert.match(page.corps, /for="oa-document"/);
  assert.match(page.corps, /for="oa-groupe"/);
});
test('chaque résultat publié a une source réelle et un fichier local, sans PDF proposé', () => {
  for (const [cle, resultat] of Object.entries(manifeste.resultats)) {
    const [doc, groupe] = cle.split('/');
    assert.ok(manifeste.documents.some(x => x.slug === doc));
    assert.ok(manifeste.groupes.some(x => x.id === groupe));
    assert.ok(resultat.date);
    assert.equal(resultat.provenance, 'adaptation-fiche');
    assert.match(resultat.chemin, /^\/assets\/exemples\/adaptation\/rendus\/[a-z-]+\.html$/);
    assert.ok(existsSync(`.${resultat.chemin}`));
  }
  const page = PAGES.find(x => x.chemin === '/enseignants/outils/comparer-adaptations/');
  assert.doesNotMatch(page.corps, /href="[^"]*\.pdf|download=/);
});
