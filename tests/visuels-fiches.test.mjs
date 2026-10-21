import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { VISUELS, illustrations } from "../outils/corps/fiches/illustrations.mjs";

const racine = new URL("../outils/corps/fiches/visuels-proto/", import.meta.url);
const slugs = ["fiche-de-preparation", "cahier-journal", "emploi-du-temps", "adaptation-des-supports", "fiches-eleves", "lia"];

test("les six fiches illustrées rendent une image responsive avec ses dimensions", () => {
  assert.deepEqual(VISUELS.map((v) => v.slug), slugs);
  assert.deepEqual(Object.keys(illustrations), slugs);
  for (const visuel of VISUELS) {
    const html = illustrations[visuel.slug];
    const image = `/assets/img/visuels/${visuel.slug}`;
    assert.match(html, new RegExp(`<figure id="visuel" class="maquette-fiche appv-figure"`), visuel.slug);
    assert.match(html, new RegExp(`<img src="${image}-1x\\.webp" srcset="${image}-1x\\.webp 1x, ${image}-2x\\.webp 2x" width="${visuel.largeur}" height="${visuel.hauteur}" alt="[^\"]+" loading="lazy" decoding="async">`), visuel.slug);
    assert.match(html, /Écran de MyClassFlow, données fictives\./, visuel.slug);
    for (const densite of ["1x", "2x"])
      assert.ok(existsSync(`assets/img/visuels/${visuel.slug}-${densite}.webp`), `${visuel.slug}-${densite}`);
  }
});

test("les fragments restent des sources inertes, sans vocabulaire écarté", () => {
  const vocabulaire = /Base commune|Éditeur|SuperProf|Dyslexie|TDAH|PPRE|GEVA/i;
  for (const slug of slugs) {
    const source = readFileSync(new URL(`${slug}.html`, racine), "utf8");
    assert.match(source, /class="appv-proto appv-proto--bureau"/, slug);
    assert.doesNotMatch(source, vocabulaire, slug);
  }
});

test("la règle de masquage mobile des figures est conservée", () => {
  const css = readFileSync(new URL("../assets/css/visuels-fiches.css", import.meta.url), "utf8");
  assert.match(css, /@media \(max-width: 600px\) \{ \.maquette-fiche\.appv-figure \{ display: none; \} \}/);
});
