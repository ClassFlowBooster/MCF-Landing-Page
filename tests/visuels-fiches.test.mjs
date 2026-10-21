import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { illustrations } from '../outils/corps/fiches/illustrations.mjs';

const racine = new URL('../outils/corps/fiches/visuels-proto/', import.meta.url);
const slugs = ['fiche-de-preparation', 'cahier-journal', 'emploi-du-temps', 'adaptation-des-supports', 'fiches-eleves', 'import-eleves-photo', 'taches', 'lia'];

test('les huit fiches utilisent chacune son fragment extrait du proto', () => {
  assert.deepEqual(Object.keys(illustrations), slugs);
  for (const slug of slugs) {
    const source = readFileSync(new URL(`${slug}.html`, racine), 'utf8');
    const html = illustrations[slug];
    assert.match(source, /class="appv-proto appv-proto--(?:bureau|tel)"/);
    assert.match(html, /class="appv-proto appv-proto--(?:bureau|tel)"/, slug);
    assert.match(html, /aria-hidden="true"/, slug);
    assert.match(html, /Écran de MyClassFlow, données fictives\./, slug);
  }
});

test('les fragments sont inertes et ne portent pas de vocabulaire écarté', () => {
  const interdit = /<script\b|<button\b|<input\b|<a\s|\son[a-z]+\s*=/i;
  const vocabulaire = /Base commune|Éditeur|(?<!My)ClassFlow|SuperProf|Dyslexie|TDAH|PPRE|GEVA|évaluation|Agrandir le texte/i;
  for (const [slug, html] of Object.entries(illustrations)) {
    assert.doesNotMatch(html, interdit, slug);
    assert.doesNotMatch(html, vocabulaire, slug);
  }
});

test('le CSS du proto reste entièrement scopé sous .appv-proto', () => {
  const css = readFileSync(new URL('../assets/css/visuels-proto.css', import.meta.url), 'utf8');
  const sansCommentaires = css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/@keyframes[^{}]*\{(?:[^{}]|\{[^{}]*\})*\}/g, '');
  for (const [, selecteur] of sansCommentaires.matchAll(/(?:^|})\s*([^@}{][^{}]*)\{/g)) {
    if (!selecteur.trim() || selecteur.trim().startsWith('@')) continue;
    assert.match(selecteur, /\.appv-proto/, selecteur);
  }
});

test('le cadre met l\'extrait à l\'échelle sans JavaScript, avec une découpe et le format des deux exports', () => {
  const css = readFileSync(new URL('../assets/css/visuels-fiches.css', import.meta.url), 'utf8');
  assert.match(css, /container-type:\s*inline-size/);
  assert.match(css, /overflow:\s*hidden/);
  // tan(atan2(a, b)) donne a / b sans unité ; calc(100cqw / 1440) serait une longueur, invalide dans zoom ou scale().
  assert.match(css, /zoom:\s*min\(1,\s*tan\(atan2\(100cqw,\s*1440px\)\)\)/);
  assert.match(css, /zoom:\s*min\(1,\s*tan\(atan2\(100cqw,\s*390px\)\)\)/);
  assert.doesNotMatch(css, /calc\(100cqw\s*\/\s*\d/);
  assert.match(css, /1440px/);
  assert.match(css, /390px/);
});
