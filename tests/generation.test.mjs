import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { PAGES, PAGE_404 } from "../outils/pages.mjs";
import { page, ESPACES } from "../outils/gabarits.mjs";
import { CASTOR_DE } from "../outils/corps/castors.mjs";
import { THEMES, lienFiche } from "../outils/corps/catalogue.mjs";
import { FICHES } from "../outils/corps/fiches/index.mjs";
import { adresseFiche, arianeFiche } from "../outils/corps/fiche.mjs";

test("chaque page a un titre, une description, un canonical et la barre de son espace", () => {
  for (const p of PAGES) {
    const html = page(p);
    assert.match(html, /<title>[^<]*ClassFlow[^<]*<\/title>/, p.chemin);
    assert.match(html, /<meta name="description" content="[^"]{50,}"/, p.chemin);
    assert.ok(html.includes(`<link rel="canonical" href="https://myclassflow.fr${p.chemin}"`), p.chemin);
    if (p.espace) assert.ok(html.includes(ESPACES[p.espace].libelle), p.chemin);
  }
});

test("référencement : titre, description et grand titre distincts sur chaque page", () => {
  const vus = { titre: new Map(), description: new Map(), h1: new Map() };
  for (const p of PAGES) {
    const html = page(p);
    const h1s = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gs)];
    assert.equal(h1s.length, 1, `${p.chemin} : ${h1s.length} grands titres`);
    const valeurs = { titre: p.titre, description: p.description, h1: h1s[0][1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() };
    for (const [cle, v] of Object.entries(valeurs)) {
      assert.ok(!vus[cle].has(v), `${cle} identique : ${vus[cle].get(v)} et ${p.chemin}`);
      vus[cle].set(v, p.chemin);
    }
  }
});

test("le nom « Class Flow » en deux mots n'apparaît plus", () => {
  for (const p of PAGES) assert.ok(!page(p).includes("Class Flow "), p.chemin);
});

test("les fichiers générés sont à jour (lancer npm run generer)", () => {
  for (const p of PAGES) {
    const fichier = `.${p.chemin}index.html`;
    assert.ok(existsSync(fichier), `${fichier} absent`);
    // Fins de ligne normalisées : un clone Windows peut les écrire en CRLF.
    assert.equal(readFileSync(fichier, "utf8").replace(/\r\n/g, "\n"), page(p), `${fichier} n'est pas à jour`);
  }
});

test("tous les liens internes pointent vers une page existante", () => {
  const chemins = new Set(PAGES.map((p) => p.chemin));
  for (const p of PAGES) {
    for (const [, href] of page(p).matchAll(/href="(\/[^"#?]*)/g)) {
      if (href.startsWith("/assets/") || href.startsWith("/presentation/") || href === "/sitemap.xml") continue;
      assert.ok(chemins.has(href), `${p.chemin} → ${href} introuvable`);
    }
  }
});

test("sitemap.xml et robots.txt à jour", () => {
  const sitemap = readFileSync("sitemap.xml", "utf8");
  for (const p of PAGES) assert.ok(sitemap.includes(`<loc>https://myclassflow.fr${p.chemin}</loc>`), p.chemin);
  assert.match(readFileSync("robots.txt", "utf8"), /Sitemap: https:\/\/myclassflow\.fr\/sitemap\.xml/);
});

test("13 pages plus les fiches : l'entrée, quatre pages par espace, une page par fiche", () => {
  assert.equal(PAGES.length, 13 + FICHES.length);
  assert.equal(new Set(PAGES.map((p) => p.chemin)).size, 13 + FICHES.length);
});

test("prix des écoles en TTC : aucun « HT » sur les pages tarifs, hors la ligne « Montant HT »", () => {
  for (const chemin of ["/enseignants/tarifs/", "/ecoles/tarifs/", "/ecoles/"]) {
    const p = PAGES.find((x) => x.chemin === chemin);
    const texte = page(p).replace(/<[^>]+>/g, " ").replace("Montant HT", "");
    assert.ok(!/\bHT\b/.test(texte), chemin);
  }
});

test("mascottes castor : chaque page référence ses castors, en <img> décoratif, et les fichiers existent", () => {
  const ATTENDUS = {
    "/": ["professeur", "direction", "eleve"],
    "/enseignants/": ["professeur", "direction"],
    "/ecoles/": ["direction"],
    "/parents-enfants/": ["eleve", "direction"],
    "/enseignants/tarifs/": ["professeur", "direction"],
    "/parents-enfants/tarifs/": ["eleve", "direction"],
  };
  for (const nom of ["professeur", "direction", "eleve"]) assert.ok(existsSync(`./assets/img/castors/${nom}.svg`), nom);
  for (const [chemin, noms] of Object.entries(ATTENDUS)) {
    const html = page(PAGES.find((p) => p.chemin === chemin));
    for (const nom of noms) assert.ok(html.includes(`src="/assets/img/castors/${nom}.svg"`), `${chemin} : castor ${nom} absent`);
  }
  for (const p of PAGES) {
    const html = page(p);
    assert.ok(!html.includes("<svg version"), `${p.chemin} : castor intégré au HTML`);
    for (const [img] of html.matchAll(/<img [^>]*castors\/[^>]*>/g)) {
      assert.match(img, /alt=""/, p.chemin);
      assert.match(img, /width="\d+" height="\d+"/, p.chemin);
      assert.match(img, /decoding="async"/, p.chemin);
    }
  }
});

test("badges de remise : toujours le pourcentage calculé à partir des prix", async () => {
  const { remiseEnseignant, remiseAdapter } = await import("../assets/js/tarifs.js");
  const attendu = { enseignants: [remiseEnseignant()], "parents-enfants": [remiseAdapter("essentiel"), remiseAdapter("illimite")] };
  for (const p of PAGES.filter((x) => attendu[x.espace] && ["tarifs", ""].includes(x.rubrique))) {
    const trouves = [...page(p).matchAll(/−(\d+) %/g)].map((m) => Number(m[1]));
    for (const v of trouves) assert.ok(attendu[p.espace].includes(v), `${p.chemin} : −${v} % ne correspond pas aux prix`);
  }
});

test("carte de partage : og:image absolue, dimensions, texte alternatif, fichier PNG 1200 × 630 de moins de 200 Ko", () => {
  for (const p of PAGES) {
    const html = page(p);
    const m = html.match(/<meta property="og:image" content="https:\/\/myclassflow\.fr\/(assets\/img\/og-[\w-]+\.png)" \/>/);
    assert.ok(m, `${p.chemin} : og:image absent`);
    for (const balise of ['<meta property="og:image:width" content="1200" />', '<meta property="og:image:height" content="630" />', '<meta name="twitter:card" content="summary_large_image" />'])
      assert.ok(html.includes(balise), `${p.chemin} : ${balise}`);
    assert.match(html, /<meta property="og:image:alt" content="[^"]{20,}" \/>/, p.chemin);
    const png = readFileSync(`./${m[1]}`);
    assert.equal(png.subarray(1, 4).toString(), "PNG", m[1]);
    assert.equal(png.readUInt32BE(16), 1200, m[1]);
    assert.equal(png.readUInt32BE(20), 630, m[1]);
    assert.ok(png.length < 200 * 1024, `${m[1]} : ${png.length} octets`);
  }
});

test("formule Essentiel : le nombre d'adaptations vient de tarifs.js, partout où il est affiché", async () => {
  const { ADAPTATIONS_ESSENTIEL } = await import("../assets/js/tarifs.js");
  assert.equal(ADAPTATIONS_ESSENTIEL, 70);
  for (const chemin of ["/parents-enfants/tarifs/", "/parents-enfants/"]) {
    const html = page(PAGES.find((p) => p.chemin === chemin));
    assert.ok(html.includes(`<span class="quota"><i>${ADAPTATIONS_ESSENTIEL}</i> adaptations par mois</span>`), chemin);
    assert.ok(!/(?<!il)limitées/i.test(html), `${chemin} : « limitées » encore présent`);
  }
});

test("bloc équipe : sur l'accueil des trois espaces, photos en fichiers sans métadonnées EXIF", () => {
  const avant = { "/enseignants/": 'id="contact"', "/ecoles/": 'id="contact"', "/parents-enfants/": "Et si l'école de votre enfant" };
  for (const [chemin, suivant] of Object.entries(avant)) {
    const html = page(PAGES.find((p) => p.chemin === chemin));
    const bloc = html.indexOf('<section class="section equipe" id="equipe">');
    assert.ok(bloc > 0, `${chemin} : bloc équipe absent`);
    assert.ok(bloc < html.indexOf(suivant), `${chemin} : le bloc équipe doit précéder ${suivant}`);
    assert.ok(html.includes("Qui est derrière MyClassFlow"), chemin);
    for (const nom of ["Benoist de Montgrand", "Joseph Solier"]) assert.ok(html.includes(`alt="Portrait de ${nom}"`), `${chemin} : ${nom}`);
  }
  for (const p of PAGES) assert.ok(!page(p).includes("data:image/"), `${p.chemin} : image en base64`);
  for (const fichier of ["benoist-de-montgrand", "joseph-solier"]) {
    const jpg = readFileSync(`./assets/img/equipe/${fichier}.jpg`);
    assert.equal(jpg.readUInt16BE(0), 0xffd8, fichier);
    assert.ok(!jpg.includes("Exif\0"), `${fichier} : métadonnées EXIF présentes`);
    assert.ok(jpg.length < 20 * 1024, `${fichier} : ${jpg.length} octets`);
  }
});

test("favicon et icône iPhone : castor professeur, PNG aux bonnes dimensions, moins de 10 ko, déclarés sur chaque page", () => {
  const ICONES = [
    ['<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png" />', "favicon-32.png", 32],
    ['<link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16.png" />', "favicon-16.png", 16],
    ['<link rel="apple-touch-icon" sizes="180x180" href="/assets/img/apple-touch-icon.png" />', "apple-touch-icon.png", 180],
  ];
  for (const [, fichier, taille] of ICONES) {
    const png = readFileSync(`./assets/img/${fichier}`);
    assert.equal(png.subarray(1, 4).toString(), "PNG", fichier);
    assert.equal(png.readUInt32BE(16), taille, fichier);
    assert.equal(png.readUInt32BE(20), taille, fichier);
    assert.ok(png.length < 10 * 1000, `${fichier} : ${png.length} octets`);
  }
  for (const p of PAGES) for (const [balise] of ICONES) assert.ok(page(p).includes(balise), `${p.chemin} : ${balise}`);
});

test("logo de l'en-tête : le castor professeur devant « MyClassFlow », sur chaque page", () => {
  for (const p of PAGES.filter((x) => x.espace)) {
    const marque = page(p).match(/<a class="brand"[^>]*>(.*?)<\/a>/)[1];
    assert.match(marque, /^<img class="castor castor-logo" src="\/assets\/img\/castors\/professeur\.svg" alt="" width="32" height="32" decoding="async">MyClassFlow$/, p.chemin);
  }
});

test("sélecteur d'espace : le castor de chaque espace, sans emoji", () => {
  for (const p of PAGES.filter((x) => x.espace)) {
    const html = page(p);
    const pastille = html.match(/<button class="pill"[^>]*>(.*?)<\/button>/)[1];
    assert.ok(pastille.includes(`src="/assets/img/castors/${CASTOR_DE[p.espace]}.svg"`), `${p.chemin} : castor de la pastille`);
    const menu = html.match(/<div class="espace-menu"[^>]*>(.*?)<\/div>/)[1];
    for (const [cle, nom] of Object.entries(CASTOR_DE))
      assert.match(menu, new RegExp(`href="/${cle}/" data-espace="${cle}"><img [^>]*src="/assets/img/castors/${nom}.svg"[^>]*loading="lazy"`), `${p.chemin} : ${cle}`);
    const liensEspace = [...html.matchAll(/<a [^>]*data-espace="[^"]+">.*?<\/a>/g)].map((m) => m[0]).join("");
    for (const texte of [pastille, liensEspace]) assert.ok(!/\p{Extended_Pictographic}/u.test(texte.replace("▾", "")), `${p.chemin} : emoji dans le sélecteur`);
  }
});

test("vocabulaire : les pages décrivent des adaptations, sans catégorie d'élèves", () => {
  // « aménagement » autorisé depuis la phrase de la page écoles choisie par Joseph (14 oct. 2026, 13 h 35)
  const INTERDITS = /troubl|dys|tdah|\btsa\b|\beana\b|diagnost|\bppre\b|\bpai\b|geva|handicap|besoins? (?:particulier|spécifique|éducatif)|livret de parcours|\blpi\b|neuro|déficien|patholog|dispositif|\bprofils?\b/i;
  const sansImages = (t) => t.replace(/data:[a-z/+-]+;base64,[A-Za-z0-9+/=]+/g, "");
  for (const p of PAGES) {
    const m = page(p).match(INTERDITS);
    assert.ok(!m, `${p.chemin} : « ${m?.[0]} »`);
  }
  for (const fichier of ["presentation/content.html", "assets/js/formulaire.js", "assets/css/base.css", "outils/modeles/fiche-de-preparation.html"]) {
    const m = sansImages(readFileSync(fichier, "utf8")).match(INTERDITS);
    assert.ok(!m, `${fichier} : « ${m?.[0]} »`);
  }
});

test("données structurées : JSON valide, prix affichés sur la page même, questions identiques à la page", () => {
  const html = Object.fromEntries(PAGES.map((p) => [p.chemin, page(p)]));
  const graphes = {};
  for (const [chemin, h] of Object.entries(html)) {
    const blocs = [...h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
    assert.ok(blocs.length <= 1, chemin);
    if (blocs.length) graphes[chemin] = JSON.parse(blocs[0][1])["@graph"];
  }
  for (const chemin of ["/", "/enseignants/", "/enseignants/tarifs/", "/ecoles/tarifs/", "/parents-enfants/", "/parents-enfants/tarifs/"])
    assert.ok(graphes[chemin]?.some((o) => o["@type"] === "SoftwareApplication"), `${chemin} : application absente`);
  assert.ok(graphes["/"].some((o) => o["@type"] === "Organization"), "organisation absente de /");
  for (const [chemin, objets] of Object.entries(graphes))
    for (const app of objets.filter((o) => o["@type"] === "SoftwareApplication"))
      for (const o of app.offers)
        for (const v of [o.price, o.lowPrice, o.highPrice].filter((x) => x && x !== "0.00"))
          assert.ok(html[chemin].replace(/<script type="application\/ld\+json">.*?<\/script>/s, "").includes(v.replace(".", ",")), `${chemin} : ${app.name} à ${v} € n'est pas affiché sur la page`);
  const faq = graphes["/parents-enfants/"].find((o) => o["@type"] === "FAQPage");
  const visibles = [...html["/parents-enfants/"].matchAll(/<summary>(.*?)<\/summary>/g)].map((m) => m[1]);
  assert.deepEqual(faq.mainEntity.map((q) => q.name), visibles);
});

test("fiches explicatives : fil d'Ariane et questions balisés, identiques à la page", () => {
  for (const f of FICHES) {
    const chemin = adresseFiche(f);
    const html = page(PAGES.find((p) => p.chemin === chemin));
    const graphe = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])["@graph"];
    const ariane = graphe.find((o) => o["@type"] === "BreadcrumbList").itemListElement;
    assert.deepEqual(ariane.map((e) => e.name), arianeFiche(f).map(([nom]) => nom), chemin);
    assert.equal(ariane.at(-1).item, `https://myclassflow.fr${chemin}`, chemin);
    const visibles = [...html.matchAll(/<summary>(.*?)<\/summary>/g)].map((m) => m[1]);
    assert.deepEqual(graphe.find((o) => o["@type"] === "FAQPage").mainEntity.map((q) => q.name), visibles, chemin);
    assert.ok(visibles.length >= 4 && visibles.length <= 6, `${chemin} : ${visibles.length} questions`);
    for (const [, href] of html.matchAll(/href="(\/assets\/[^"]+)"/g)) assert.ok(existsSync(`.${href}`), `${chemin} → ${href} absent`);
  }
});

test("fiches explicatives : chaque outil relié a sa page, les tarifs Enseignants y renvoient, pas l'espace Écoles", () => {
  const chemins = new Set(PAGES.map((p) => p.chemin));
  const relies = THEMES.flatMap((t) => t.outils).filter((o) => o.fiche);
  assert.ok(relies.length > 0);
  for (const o of relies) assert.ok(chemins.has(lienFiche(o)), `${o.nom} → ${lienFiche(o)} sans page`);
  const html = (chemin) => page(PAGES.find((p) => p.chemin === chemin));
  for (const o of relies) {
    assert.ok(html("/enseignants/tarifs/").includes(`<a class="lien-fiche" href="${lienFiche(o)}">`), `tarifs → ${o.nom}`);
    assert.ok(html("/enseignants/fonctionnalites/").includes(`href="${lienFiche(o)}"`), `fonctionnalités → ${o.nom}`);
  }
  // Q7 (MCF-Pilotage#53) : l'espace Écoles ne renvoie pas encore vers les fiches.
  for (const p of PAGES.filter((x) => x.espace === "ecoles"))
    assert.ok(!/href="\/enseignants\/fonctionnalites\/[^"]+\/"/.test(page(p)), `${p.chemin} renvoie vers une fiche`);
});

test("page 404 : fichier à jour, non indexée, hors du plan du site, liens absolus vers des pages existantes", () => {
  const html = page(PAGE_404);
  assert.equal(readFileSync("404.html", "utf8").replace(/\r\n/g, "\n"), html, "404.html n'est pas à jour (npm run generer)");
  assert.ok(html.includes('<meta name="robots" content="noindex" />'));
  assert.ok(!html.includes('rel="canonical"') && !html.includes("og:url"));
  assert.ok(!readFileSync("sitemap.xml", "utf8").includes("404"));
  const chemins = new Set(PAGES.map((p) => p.chemin));
  for (const [, href] of html.matchAll(/href="([^"#?]*)"/g)) {
    if (href.startsWith("http") || href.startsWith("/assets/") || href.startsWith("/presentation/")) continue;
    assert.ok(chemins.has(href), `404 → ${href} introuvable ou relatif`);
  }
});
