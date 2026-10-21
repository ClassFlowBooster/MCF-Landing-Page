#!/usr/bin/env node
// Rend le proto dans une copie jetable puis en extrait un DOM sans JavaScript.
import { createServer } from 'node:http';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, extname, join, normalize, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { VUES, vueNoms } from './vues.mjs';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sortieHtml = resolve('outils/corps/fiches/visuels-proto');
const sortieCss = resolve('assets/css/visuels-proto.css');
const pause = (ms) => new Promise((done) => setTimeout(done, ms));
const json = (value) => JSON.stringify(value, null, 2);

function usage(message) {
  if (message) console.error(`Erreur : ${message}`);
  console.error(`Usage : node outils/proto/extraire.mjs <dossier-site-proto> [${vueNoms.join('|')}]`);
  process.exitCode = 2;
}

// Trouve la fin de l'initialiseur d'une constante, sans supposer que les objets JSX
// ou les chaînes des données soient plats.
function finInitialiseur(source, debut) {
  let quote = '', escape = false, profondeur = 0;
  for (let index = debut; index < source.length; index++) {
    const char = source[index];
    if (quote) { if (escape) escape = false; else if (char === '\\') escape = true; else if (char === quote) quote = ''; continue; }
    if (char === '/' && source[index + 1] === '/') { index = source.indexOf('\n', index); if (index < 0) break; continue; }
    if (char === '/' && source[index + 1] === '*') { index = source.indexOf('*/', index + 2) + 1; if (index <= 0) break; continue; }
    if (char === '"' || char === "'" || char === '`') { quote = char; continue; }
    if ('{[('.includes(char)) profondeur++;
    else if ('}])'.includes(char)) profondeur--;
    else if (char === ';' && profondeur === 0) return index + 1;
  }
  throw new Error('Initialiseur non terminé');
}

function remplaceConstante(source, constante, valeur, fichier) {
  const marque = new RegExp(`\\b(?:const|let)\\s+${constante}\\s*=`);
  const trouve = marque.exec(source);
  if (!trouve) throw new Error(`${fichier} : constante ${constante} introuvable`);
  const debutValeur = source.indexOf('=', trouve.index) + 1;
  const fin = finInitialiseur(source, debutValeur);
  return source.slice(0, trouve.index) + `const ${constante} = ${json(valeur)};` + source.slice(fin);
}

function appliquePatch(racine, patch) {
  const chemin = join(racine, patch.fichier);
  let source = readFileSync(chemin, 'utf8');
  if (patch.constante) source = remplaceConstante(source, patch.constante, patch.valeur, patch.fichier);
  if (patch.apres) {
    const index = source.indexOf(patch.apres);
    if (index < 0) throw new Error(`${patch.fichier} : ancre introuvable (${patch.apres})`);
    source = source.slice(0, index) + patch.texte + source.slice(index);
  }
  if (patch.remplacements) for (const remplacement of patch.remplacements) {
    const occurrences = source.split(remplacement.avant).length - 1;
    if (!occurrences) throw new Error(`${patch.fichier} : texte à remplacer introuvable (${remplacement.avant})`);
    source = remplacement.toutes
      ? source.split(remplacement.avant).join(remplacement.apres)
      : source.replace(remplacement.avant, remplacement.apres);
  }
  // Un fichier vide est plus sûr qu'un composant de lancement : les appels sont
  // optionnels dans les shells des deux proto-types.
  if (patch.retrait) source = '// Retiré pour l’export éditorial statique.\n';
  writeFileSync(chemin, source);
}

function mime(chemin) {
  return ({ '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jsx': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml' })[extname(chemin)] || 'application/octet-stream';
}
function sert(racine) {
  const serveur = createServer((requete, reponse) => {
    const url = new URL(requete.url, 'http://127.0.0.1');
    const relatif = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname).replace(/^[/\\]+/, '');
    const chemin = resolve(racine, relatif);
    if (!chemin.startsWith(`${resolve(racine)}/`) || !existsSync(chemin) || !statSync(chemin).isFile()) { reponse.writeHead(404); reponse.end('Not found'); return; }
    reponse.writeHead(200, { 'content-type': mime(chemin), 'cache-control': 'no-store' });
    reponse.end(readFileSync(chemin));
  });
  return new Promise((done) => serveur.listen(0, '127.0.0.1', () => done(serveur)));
}

async function cdp(port) {
  let ws;
  for (let essai = 0; essai < 60; essai++) {
    try {
      const onglets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      ws = new WebSocket(onglets.find((onglet) => onglet.type === 'page').webSocketDebuggerUrl);
      await new Promise((done, echec) => { ws.onopen = done; ws.onerror = echec; });
      break;
    } catch { await pause(100); }
  }
  if (!ws) throw new Error('Chrome CDP indisponible');
  let id = 0; const attente = new Map();
  const erreurs = [];
  ws.onmessage = ({ data }) => { const message = JSON.parse(data); if (message.method === 'Runtime.exceptionThrown') erreurs.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text); if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') erreurs.push(message.params.args.map((a) => a.value ?? a.description).join(' ')); if (!message.id) return; const demande = attente.get(message.id); attente.delete(message.id); message.error ? demande.reject(new Error(message.error.message)) : demande.resolve(message.result); };
  const envoie = (method, params = {}) => new Promise((resolve, reject) => { const numero = ++id; attente.set(numero, { resolve, reject }); ws.send(JSON.stringify({ id: numero, method, params })); });
  const evaluer = async (expression) => { const resultat = await envoie('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (resultat.exceptionDetails) throw new Error(resultat.exceptionDetails.exception?.description || resultat.exceptionDetails.text); return resultat.result.value; };
  return { ws, envoie, evaluer, erreurs };
}

function splitTopLevel(css) {
  const morceaux = []; let debut = 0, profondeur = 0, quote = '', escape = false;
  for (let i = 0; i < css.length; i++) { const c = css[i]; if (quote) { if (escape) escape = false; else if (c === '\\') escape = true; else if (c === quote) quote = ''; continue; } if ('"\'`'.includes(c)) { quote = c; continue; } if (c === '{') profondeur++; else if (c === '}') profondeur--; else if (c === '}' && profondeur < 0) profondeur = 0; if (profondeur === 0 && c === '}') { morceaux.push(css.slice(debut, i + 1)); debut = i + 1; } }
  if (css.slice(debut).trim()) morceaux.push(css.slice(debut)); return morceaux;
}
function scopeSelectors(selecteurs, scope) {
  return selecteurs.split(',').map((selecteur) => {
    let s = selecteur.trim();
    if (!s) return s;
    s = s.replace(/:root\b|\bhtml\b|\bbody\b|^\*$/g, scope);
    return s.startsWith(scope) ? s : `${scope} ${s}`;
  }).join(',');
}
function scopeCss(css, scope, keyframes) {
  return splitTopLevel(css).map((regle) => {
    const ouvre = regle.indexOf('{');
    if (ouvre < 0) return regle.trim().startsWith('@import') ? '' : regle;
    const entete = regle.slice(0, ouvre).trim(); const corps = regle.slice(ouvre + 1, -1);
    if (/^@import|^@font-face/i.test(entete)) return '';
    if (/^@(?:media|supports|container|layer|document)/i.test(entete)) return `${entete}{${scopeCss(corps, scope, keyframes)}}`;
    if (/^@(?:-webkit-)?keyframes/i.test(entete)) { const nom = entete.split(/\s+/).pop(); return `@keyframes ${keyframes[nom] || `appvp-${nom}`}{${corps}}`; }
    if (entete.startsWith('@')) return `${entete}{${corps}}`;
    let contenu = corps;
    for (const [avant, apres] of Object.entries(keyframes)) contenu = contenu.replace(new RegExp(`\\b${avant}\\b`, 'g'), apres);
    return `${scopeSelectors(entete, scope)}{${contenu}}`;
  }).join('\n');
}
function nomsKeyframes(css) {
  return Object.fromEntries([...css.matchAll(/@(?:-webkit-)?keyframes\s+([\w-]+)/g)].map(([, nom]) => [nom, `appvp-${nom}`]));
}

const serialise = `(root, kind) => {
  const clone = root.cloneNode(true);
  clone.querySelectorAll('.lc-banner,.lc-m,[data-lancement],.feedback-fab,.lia-fab,script').forEach((e) => e.remove());
  clone.querySelectorAll('*').forEach((e) => {
    [...e.attributes].filter((a) => /^on/i.test(a.name)).forEach((a) => e.removeAttribute(a.name));
    // Le libellé de rail porte une icône enfant : retirer le nœud de navigation,
    // pas seulement son texte, afin de ne laisser ni icône ni zone cliquable vide.
    if (/^(Base commune|Éditeur)$/.test(e.textContent.trim())) {
      const nav = e.closest('.rail-item,.nav-item,.side-link,[role="navigation"] > *');
      if (nav) nav.remove(); else if (!e.children.length) e.remove();
    }
  });
  clone.querySelectorAll('.rail-wordmark').forEach((e) => { e.textContent = 'MyClassFlow'; });
  const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) node.nodeValue = node.nodeValue.replace(/ClassFlow|SuperProf/g, 'MyClassFlow');
  clone.querySelectorAll('button,input,select,textarea,a').forEach((old) => {
    const tag = old.tagName === 'TEXTAREA' ? 'div' : 'span'; const replacement = document.createElement(tag);
    [...old.attributes].forEach((a) => { if (!/^(href|target|type|name|value|checked|selected|autofocus|tabindex|on)/i.test(a.name)) replacement.setAttribute(a.name, a.value); });
    replacement.setAttribute('tabindex', '-1');
    if (old.tagName === 'INPUT' || old.tagName === 'TEXTAREA') replacement.textContent = old.value || old.placeholder || '';
    else if (old.tagName === 'SELECT') replacement.textContent = old.selectedOptions[0]?.textContent || '';
    else replacement.innerHTML = old.innerHTML;
    old.replaceWith(replacement);
  });
  return '<div class="appv-proto appv-proto--' + kind + '">' + clone.outerHTML + '</div>';
}`;

const extraitCss = `(fichier, kind) => {
  const wanted = kind === 'bureau' ? 'hifi-styles.css' : 'mobile/sp.css';
  return [...document.styleSheets].filter((sheet) => !sheet.href || sheet.href.endsWith(wanted)).flatMap((sheet) => { try { return [...sheet.cssRules].filter((rule) => !(rule instanceof CSSImportRule)).map((rule) => rule.cssText); } catch (_) { return []; } }).join('\\n');
}`;

async function rendUneVue(nom, vue, origine, navigateur) {
  await navigateur.envoie('Emulation.setDeviceMetricsOverride', { width: vue.taille.width, height: vue.taille.height, deviceScaleFactor: 1, mobile: false });
  await navigateur.envoie('Page.navigate', { url: origine + vue.url });
  for (let essai = 0; essai < 100; essai++) { if (await navigateur.evaluer(`document.readyState === 'complete' && !!document.querySelector(${json(vue.root)})`)) break; await pause(100); }
  if (!await navigateur.evaluer(`!!document.querySelector(${json(vue.root)})`)) throw new Error(`${nom} : racine ${vue.root} absente après 10 s\n${navigateur.erreurs.slice(-5).join('\n').slice(0, 1500)}`);
  for (const etape of vue.sequence || []) {
    if (etape.evenement) {
      await navigateur.evaluer(`window.dispatchEvent(new CustomEvent(${json(etape.evenement)}))`);
      continue;
    }
    const clique = await navigateur.evaluer(`(() => { const wanted = ${json(etape.texte)}; const candidates = [...document.querySelectorAll(${json(etape.selecteur || '*')})]; const e = candidates.find((x) => x.textContent.trim() === wanted || x.getAttribute('aria-label') === wanted); if (e) { e.click(); return true; } return false; })()`);
    if (!clique) throw new Error(`${nom} : contrôle « ${etape.texte} » introuvable`);
    await pause(250);
  }
  await pause(vue.attente);
  const html = await navigateur.evaluer(`(${serialise})(document.querySelector(${json(vue.root)}), ${json(vue.type)})`);
  const css = await navigateur.evaluer(`(${extraitCss})('', ${json(vue.type)})`);
  mkdirSync(sortieHtml, { recursive: true });
  writeFileSync(join(sortieHtml, `${nom}.html`), `${html}\n`);
  return css;
}

async function main() {
  const [site, ...demandes] = process.argv.slice(2);
  if (!site) return usage('dossier du proto manquant');
  const source = resolve(site); if (!existsSync(join(source, 'index.html')) || !existsSync(join(source, 'mobile', 'index.html'))) return usage('le dossier ne ressemble pas au site MCF-Design');
  const noms = demandes.length ? demandes : vueNoms; const inconnues = noms.filter((nom) => !VUES[nom]); if (inconnues.length) return usage(`vue inconnue : ${inconnues.join(', ')}`);
  if (!existsSync(chromePath)) throw new Error(`Chrome introuvable : ${chromePath}`);
  const temporaire = mkdtempSync(join(tmpdir(), 'mcf-proto-'));
  const profil = mkdtempSync(join(tmpdir(), 'mcf-proto-chrome-'));
  let chrome; let navigateur; let serveur;
  try {
    // Chaque vue a sa propre copie : deux vues peuvent légitimement remplacer la même
    // constante (par exemple la classe CE1 puis la classe CM2) sans se contaminer.
    for (const nom of noms) {
      const racineVue = join(temporaire, 'vues', nom);
      cpSync(source, racineVue, { recursive: true });
      for (const patch of VUES[nom].patches) appliquePatch(racineVue, patch);
    }
    serveur = await sert(temporaire); const port = serveur.address().port;
    const cdpPort = 9358;
    chrome = spawn(chromePath, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${cdpPort}`, `--user-data-dir=${profil}`, 'about:blank'], { stdio: 'ignore' });
    navigateur = await cdp(cdpPort); await navigateur.envoie('Page.enable'); await navigateur.envoie('Runtime.enable');
    const etats = noms.map((nom) => VUES[nom].etatInitial).filter(Boolean).join('\n');
    if (etats) await navigateur.envoie('Page.addScriptToEvaluateOnNewDocument', { source: etats });
    const css = [];
    for (const nom of noms) {
      const brut = await rendUneVue(nom, VUES[nom], `http://127.0.0.1:${port}/vues/${nom}`, navigateur);
      css.push(scopeCss(brut, `.appv-proto.appv-proto--${VUES[nom].type}`, nomsKeyframes(brut)));
      if (VUES[nom].css) css.push(scopeCss(VUES[nom].css, `.appv-proto.appv-proto--${VUES[nom].type}`, {}));
    }
    writeFileSync(sortieCss, `/* Généré depuis le proto MCF-Design — ne pas éditer à la main. */\n${css.join('\n\n')}`);
    console.log(`Extrait : ${noms.join(', ')}`);
  } finally {
    navigateur?.ws.close(); serveur?.close();
    if (chrome && chrome.exitCode === null) { const fin = new Promise((r) => chrome.once('exit', r)); chrome.kill(); await fin; }
    for (const d of [temporaire, profil]) { try { rmSync(d, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 }); } catch (e) { console.warn(`nettoyage incomplet : ${d}`); } }
  }
}

main().catch((erreur) => { console.error(erreur.stack || erreur.message); process.exitCode = 1; });
