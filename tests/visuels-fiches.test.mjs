import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { illustrations } from '../outils/corps/fiches/illustrations.mjs';

const racine = new URL('../outils/corps/fiches/visuels-proto/', import.meta.url);
const slugs = ['fiche-de-preparation', 'cahier-journal', 'emploi-du-temps', 'adaptation-des-supports', 'fiches-eleves', 'lia'];

test('les six fiches illustrées utilisent chacune son fragment extrait du proto', () => {
  assert.deepEqual(Object.keys(illustrations), slugs);
  for (const slug of slugs) {
    const source = readFileSync(new URL(`${slug}.html`, racine), 'utf8');
    const html = illustrations[slug];
    assert.match(source, /class="appv-proto appv-proto--bureau"/);
    assert.match(html, /class="appv-proto appv-proto--bureau"/, slug);
    assert.doesNotMatch(source, /appv-proto--tel/, slug);
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

test('le cadre met les six extraits bureau à l\'échelle sans JavaScript, avec une découpe', () => {
  const css = readFileSync(new URL('../assets/css/visuels-fiches.css', import.meta.url), 'utf8');
  assert.match(css, /container-type:\s*inline-size/);
  assert.match(css, /overflow:\s*hidden/);
  // Safari ignore un zoom calculé : l'échelle passe par transform, avec tan(atan2()) puis la division
  // de deux longueurs là où elle est comprise (Safari calcule mal atan2 avec cqw).
  assert.doesNotMatch(css, /zoom:/);
  assert.match(css, /transform:\s*scale\(tan\(atan2\(100cqw,\s*calc\(var\(--appv-w\) \* 1px\)\)\)\)/);
  assert.match(css, /@supports \(scale: calc\(1px \/ 1px\)\)[\s\S]*scale\(calc\(100cqw \/ \(var\(--appv-w\) \* 1px\)\)\)/);
  assert.match(css, /aspect-ratio:\s*var\(--appv-w\) \/ var\(--appv-ht\)/);
  assert.doesNotMatch(css, /appv-figure--tel|390px|--tel/);
});

test('chaque figure porte sa taille de rendu et son cadrage, sans unité de fenêtre dans les extraits', () => {
  for (const [slug, html] of Object.entries(illustrations)) {
    const style = html.match(/<figure[^>]*style="([^"]*)"/)?.[1] || '';
    for (const v of ['--appv-l', '--appv-h', '--appv-x', '--appv-y', '--appv-w', '--appv-ht']) assert.match(style, new RegExp(`${v}:\\d+`), `${slug} : ${v}`);
    assert.doesNotMatch(html.replace(/<figure[^>]*>/, ''), /style="[^"]*\d(?:vw|vh)\b/, `${slug} : vw/vh en ligne`);
  }
  for (const slug of ['adaptation-des-supports', 'fiches-eleves', 'lia']) assert.match(illustrations[slug], /--appv-max:680px/, slug);
});
