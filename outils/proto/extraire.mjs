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

const serialise = `(root, kind, vue) => {
  // Les contrôles deviennent des span : on fige d'abord leur style calculé, pour garder le rendu du proto.
  const PROPRIETES = ['display', 'box-sizing', 'width', 'height', 'min-width', 'min-height', 'padding', 'margin', 'border', 'border-radius', 'background', 'color', 'font', 'line-height', 'letter-spacing', 'text-align', 'align-items', 'justify-content', 'gap', 'flex', 'flex-direction', 'white-space', 'box-shadow', 'opacity', 'vertical-align'];
  const styles = new Map();
  root.querySelectorAll('button,input,select,textarea,a').forEach((e, i) => { e.setAttribute('data-appvp-i', i); const c = getComputedStyle(e); styles.set(String(i), PROPRIETES.map((p) => p + ':' + c.getPropertyValue(p)).join(';')); });
  const clone = root.cloneNode(true);
  const texte = (avant, apres) => {
    const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (node.nodeValue.includes(avant)) node.nodeValue = node.nodeValue.split(avant).join(apres);
    }
  };
  const exact = (value) => [...clone.querySelectorAll('*')].find((e) => e.children.length === 0 && e.textContent.trim() === value);
  const carte = (titre) => exact(titre)?.closest('.card');
  const retireAction = (libelle) => {
    [...clone.querySelectorAll('button,span,a')].filter((e) => e.textContent.trim() === libelle).forEach((e) => e.remove());
  };
  // Correctifs éditoriaux : ils ne visent que le fragment statique exporté, après le
  // rendu des vrais composants du proto. Ainsi ni le proto source ni son CSS ne sont modifiés.
  if (vue === 'adaptation-des-supports') {
    const classe = carte('1 · Classe concernée');
    if (classe) classe.innerHTML = '<div class="card-h"><h3>1 · Classe concernée</h3></div><span class="inp" style="display:flex;align-items:center;justify-content:space-between">CE1 · Les Tilleuls <span>⌄</span></span><div style="font-size:12px;font-weight:600;color:var(--ink-2);margin-top:14px">Pour qui adapter ?</div><div style="display:flex;gap:8px;margin-top:8px"><span class="btn btn-primary">Selon mes élèves</span><span class="btn btn-ghost">Pour toute la classe</span><span class="btn btn-ghost">Pour des groupes</span></div>';
    const resultat = carte('3 · Ce que vous allez obtenir') || carte('3 · Ce que tu vas obtenir');
    if (resultat) resultat.innerHTML = '<div class="card-h"><h3>3 · Ce que tu vas obtenir</h3></div><div style="font-size:13px;color:var(--ink-2)">1 élève a des critères pédagogiques : 1 support adapté sera préparé.</div><div style="font-size:12px;color:var(--ink-3);margin-top:4px">Les critères se choisissent sur la fiche de chaque élève.</div><div class="support-target active" style="margin-top:12px"><b>Inès Martin</b><div class="criteria-family">Lisibilité<br><span class="chip">Espacer les lettres · Moyen</span><span class="chip">Augmenter l’interligne · 1,5</span></div><div class="criteria-family">Consignes<br><span class="chip">Consignes courtes et directes</span></div></div><div style="display:flex;justify-content:flex-end;margin-top:14px"><span class="btn btn-primary">Lancer l’adaptation</span></div>';
    [...clone.querySelectorAll('.side-section')].filter((e) => e.textContent.trim() === "Dispositif d'accompagnement").forEach((e) => { let n = e; while ((n = n.nextElementSibling) && !n.matches('hr,.side-section')) n.remove(); e.remove(); });
  }
  if (vue === 'fiches-eleves') {
    texte('PPRE en cours', '');
    clone.querySelectorAll('.lia-banner').forEach((e) => e.remove());
    ['Documents', 'Notes', 'Présence'].forEach((label) => {
      [...clone.querySelectorAll('.side-link')].filter((e) => e.textContent.trim() === label).forEach((e) => e.remove());
    });
    [...clone.querySelectorAll('.side-link')].filter((e) => e.textContent.includes('Camille D.')).forEach((e) => e.remove());
    const actifs = carte('Dispositifs actifs'); if (actifs) actifs.remove();
    const notes = carte('Mes notes');
    if (notes) notes.innerHTML = '<div class="card-h"><h3>Fil de suivi</h3><span class="btn btn-sm btn-ghost">+ Ajouter</span></div><div style="padding:10px 0;border-bottom:1px solid var(--line)"><span class="chip" style="font-size:10px">Progression</span> <span style="font-size:11px;color:var(--ink-3)">6 novembre</span><div style="font-size:13px;color:var(--ink-2);margin-top:5px">Inès mesure correctement quatre segments en partant du zéro.</div></div><div style="padding:10px 0"><span class="chip chip-amber" style="font-size:10px">Académique</span> <span style="font-size:11px;color:var(--ink-3)">4 novembre</span><div style="font-size:13px;color:var(--ink-2);margin-top:5px">La règle est mieux positionnée ; poursuivre le repérage du zéro.</div></div>';
    ['Documents', 'Présence'].forEach((titre) => { const c = carte(titre); if (c) c.remove(); });
    const grille = [...clone.querySelectorAll('div')].find((e) => (e.getAttribute('style') || '').includes('grid-template-columns: 1.5fr 1fr'));
    if (grille) {
      const suivi = notes?.outerHTML || '';
      grille.innerHTML = '<div style="display:flex;flex-direction:column;gap:16px"><div class="card card-pad"><div class="card-h"><h3>Critères pédagogiques</h3></div><div class="criteria-family">Lisibilité<br><span class="chip">Espacer les lettres</span><span class="chip">Augmenter l’interligne</span></div><div class="criteria-family">Consignes<br><span class="chip">Consignes courtes et directes</span></div></div><div class="card card-pad"><div class="card-h"><h3>Tâches liées</h3><span class="chip">1</span></div><div style="font-size:13px;color:var(--ink-2)">Photocopier la fiche de mesure, version adaptée</div><div style="font-size:11px;color:var(--ink-3);margin-top:4px">Pour Inès · 5 novembre</div></div></div><div style="display:flex;flex-direction:column;gap:16px">' + suivi + '</div>';
    }
    // La capture de référence est la feuille desktop actuelle : elle reste une
    // fenêtre au-dessus de « Ma classe », pas une carte dans la page du proto.
    clone.insertAdjacentHTML('beforeend', '<div class="appv-pupil-overlay" style="position:fixed;inset:0;background:rgba(31,26,20,.16);z-index:80;display:flex;align-items:stretch;justify-content:center"><div style="width:calc(100% - 42px);background:#fff;box-shadow:0 10px 30px rgba(31,26,20,.18);display:flex;flex-direction:column"><div style="height:78px;padding:0 20px;display:flex;align-items:center;gap:13px;border-bottom:1px solid var(--line);background:var(--paper)"><span style="width:43px;height:43px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:#665ff2;color:#fff;font-weight:700;font-size:17px">I</span><div style="flex:1"><div style="font-family:var(--serif);font-size:20px;font-weight:600">Inès Martin</div><div style="font-size:12px;color:var(--ink-3);margin-top:2px">CE1 · 8 ans</div></div><span class="btn btn-ghost">✎</span><span style="font-weight:700;color:var(--ink-3)">•••</span><span style="padding:9px 13px;border-radius:20px;background:var(--paper-2);font-size:12px">‹&nbsp; 3/24 &nbsp;›</span><span class="btn btn-ghost">↗</span><span style="font-size:25px;color:var(--ink-3)">×</span></div><div style="padding:16px 20px;overflow:hidden;flex:1"><div class="card card-pad" style="margin-bottom:26px"><div class="card-h"><h3>Critères pédagogiques</h3></div><div style="font-size:13px;color:var(--ink-3);margin-bottom:14px">Coche ce qui aide Inès : ses supports adaptés en tiennent compte.</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:18px"><div><div style="font-size:12px;font-weight:700;color:var(--ink-2);margin-bottom:8px">Lisibilité</div><div style="display:flex;gap:8px;align-items:center;margin:8px 0"><span style="color:var(--coral-600)">☑</span><span style="font-size:13px">Espacer les lettres</span><span class="chip">Moyen</span></div><div style="display:flex;gap:8px;align-items:center"><span style="color:var(--coral-600)">☑</span><span style="font-size:13px">Augmenter l’interligne</span><span class="chip">1,5</span></div></div><div><div style="font-size:12px;font-weight:700;color:var(--ink-2);margin-bottom:8px">Consignes</div><div style="display:flex;gap:8px;align-items:center"><span style="color:var(--coral-600)">☑</span><span style="font-size:13px">Consignes courtes et directes</span></div></div></div></div><div style="display:flex;align-items:center;margin-bottom:16px"><h3 style="font-family:var(--serif);font-size:15px;margin:0;flex:1">Tâches de Inès</h3><span class="btn btn-primary">+&nbsp; Ajouter</span></div><div class="card" style="padding:12px 14px;margin-bottom:26px;display:flex;gap:10px;align-items:center"><span style="color:var(--coral-600)">☐</span><div style="flex:1;font-size:13px">Photocopier la fiche de mesure</div><span class="chip">5 nov.</span></div><h3 style="font-family:var(--serif);font-size:15px;margin:0 0 10px">Le fil de Inès</h3><div style="padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--paper);display:flex;align-items:center;gap:8px"><span style="font-size:11px;color:var(--ink-3);font-weight:600">Catégorie :</span><span class="inp" style="font-size:12px;padding:8px 10px">Comportement&nbsp;⌄</span><span style="flex:1;font-size:13px;color:var(--ink-3)">Ajouter un commentaire sur Inès…</span><span class="btn btn-ghost">♩</span><span class="btn btn-primary">Ajouter</span></div><div style="margin-top:12px"><div style="padding:0 0 12px 32px;position:relative"><span style="position:absolute;left:0;width:22px;height:22px;border-radius:50%;background:#14b87a;color:#fff;text-align:center;line-height:22px">↗</span><b style="font-size:12px;color:#0baf72">Progression</b> <span style="font-size:11px;color:var(--ink-3)">6 nov.</span><div style="font-size:13px;margin-top:5px">Mesure correctement quatre segments en partant du zéro.</div></div><div style="padding:0 0 12px 32px;position:relative"><span style="position:absolute;left:0;width:22px;height:22px;border-radius:50%;background:#4084f5;color:#fff;text-align:center;line-height:22px">●</span><b style="font-size:12px;color:#3478e9">Comportement</b> <span style="font-size:11px;color:var(--ink-3)">4 nov.</span><div style="font-size:13px;margin-top:5px">Attend son tour et reformule la consigne avant de commencer.</div></div><div style="padding:0 0 12px 32px;position:relative"><span style="position:absolute;left:0;width:22px;height:22px;border-radius:50%;background:#8b5cf6;color:#fff;text-align:center;line-height:22px">✦</span><b style="font-size:12px;color:#7c4ff0">Académique</b> <span style="font-size:11px;color:var(--ink-3)">30 oct.</span><div style="font-size:13px;margin-top:5px">En lecture, relit la consigne courte avant de répondre.</div></div><div style="padding-left:32px;position:relative"><span style="position:absolute;left:0;width:22px;height:22px;border-radius:50%;background:#14b87a;color:#fff;text-align:center;line-height:22px">↗</span><b style="font-size:12px;color:#0baf72">Progression</b> <span style="font-size:11px;color:var(--ink-3)">27 oct.</span><div style="font-size:13px;margin-top:5px">La règle reste posée sur le zéro : progrès à consolider.</div></div></div></div><div style="padding:10px 18px;border-top:1px solid var(--line);background:var(--paper);font-size:11px;color:var(--ink-3)">← → changer d’élève · Échap fermer</div></div></div>');
  }
  if (vue === 'lia') {
    texte('24 élèves', '4 élèves'); texte('8 à besoins', '1 élève avec critères'); texte('3 dispositifs en cours', '5 tâches à faire');
    [...clone.querySelectorAll('span,div')].filter((e) => !e.children.length && /^(8|3)$/.test(e.textContent.trim())).forEach((e) => e.remove());
  }
  if (vue === 'fiche-de-preparation') {
    retireAction('Partager dans la base');
  }
  // Notions absentes de l'app actuelle (arrière-plans des surimpressions compris) : on retire le bloc entier.
  const absent = /PPRE|\bPAI\b|GEVA|dispositif|besoins? (déclarés|particuliers?)|à besoins|Dyslexie|Dyscalculie|Dysorthographie|Dyspraxie|TDAH|Haut potentiel|Allophone|troubles?\b|évaluations?\b|base commune|Bonjour Anne|Durand|Lilas/i;
  const bloc = '.card,.dash-card,.task-line,.side-link,.nav-item,li,tr,[class*="row"],[class*="item"]';
  const textes = []; const parcours = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
  for (let n = parcours.nextNode(); n; n = parcours.nextNode()) if (absent.test(n.nodeValue)) textes.push(n);
  textes.forEach((n) => { const e = n.parentElement; if (!e || !clone.contains(e)) return; (e.closest(bloc) || e).remove(); });
  if (vue === 'adaptation-des-supports') { const h = [...clone.querySelectorAll('*')].filter((e) => e.children.length <= 1 && e.textContent.trim() === 'Historique'); h.slice(1).forEach((e) => (e.closest('.side-link,.nav-item,[class*="item"]') || e).remove()); }
  if (vue === 'fiches-eleves') {
    clone.querySelectorAll('span,div').forEach((e) => { if (!e.textContent.trim() && !e.children.length && /pill|chip|badge|tag/.test(e.className)) e.remove(); });
    [...clone.querySelectorAll('button,a,span')].filter((e) => e.textContent.trim() === 'Documents').forEach((e) => e.remove());
  }
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
  clone.querySelectorAll('.rail-logo').forEach((e) => { e.innerHTML = '<img src="/assets/img/castors/professeur.svg" alt="" width="28" height="28" decoding="async" style="display:block">'; });
  const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) node.nodeValue = node.nodeValue.replace(/ClassFlow|SuperProf/g, 'MyClassFlow');
  clone.querySelectorAll('.ocr-check input[type="checkbox"]').forEach((old) => {
    const visuel = old.nextElementSibling;
    if (visuel) { visuel.className = 'ocr-check-static'; visuel.textContent = old.checked ? '✓' : ''; }
    old.remove();
  });
  clone.querySelectorAll('button,input,select,textarea,a').forEach((old) => {
    const tag = old.tagName === 'TEXTAREA' ? 'div' : 'span'; const replacement = document.createElement(tag);
    [...old.attributes].forEach((a) => { if (!/^(href|target|type|name|value|checked|selected|autofocus|tabindex|on)/i.test(a.name)) replacement.setAttribute(a.name, a.value); });
    const fige = styles.get(old.getAttribute('data-appvp-i'));
    if (fige) replacement.setAttribute('style', fige + ';' + (old.getAttribute('style') || ''));
    replacement.removeAttribute('data-appvp-i');
    replacement.setAttribute('tabindex', '-1');
    if (old.tagName === 'INPUT' || old.tagName === 'TEXTAREA') replacement.textContent = old.value || old.placeholder || '';
    else if (old.tagName === 'SELECT') replacement.textContent = old.selectedOptions[0]?.textContent || '';
    else replacement.innerHTML = old.innerHTML;
    old.replaceWith(replacement);
  });
  if (vue === 'import-eleves-photo') {
    clone.querySelectorAll('.ocr-field span').forEach((e) => e.classList.add('ocr-field-static'));
    [...clone.querySelectorAll('*')].filter((e) => e.textContent.trim() === 'Corriger les évaluations').forEach((e) => e.closest('.card,.todo-row,[class*="task"]')?.remove());
  }
  if (vue === 'import-eleves-photo') {
    // La modale bureau marque le second Lucas de la liste fictive : le proto
    // ne déduplique autrement que contre le roster existant.
    const lucas = [...clone.querySelectorAll('*')].filter((e) => !e.children.length && e.textContent.trim() === 'Lucas');
    if (lucas[1]) lucas[1].parentElement?.insertAdjacentHTML('beforeend', '<span class="chip chip-amber" style="margin-left:8px">En double dans la liste</span>');
  }
  return '<div class="appv-proto appv-proto--' + kind + '">' + clone.outerHTML + '</div>';
}`;

const extraitCss = `(fichier, kind) => {
  const wanted = kind === 'bureau' ? 'hifi-styles.css' : 'mobile/sp.css';
  return [...document.styleSheets].filter((sheet) => !sheet.href || sheet.href.endsWith(wanted)).flatMap((sheet) => { try { return [...sheet.cssRules].filter((rule) => !(rule instanceof CSSImportRule)).map((rule) => rule.cssText); } catch (_) { return []; } }).join('\\n');
}`;

async function rendUneVue(nom, vue, origine, navigateur) {
  await navigateur.envoie('Emulation.setDeviceMetricsOverride', { width: vue.taille.width, height: vue.taille.height, deviceScaleFactor: 1, mobile: false });
  await navigateur.envoie('Page.navigate', { url: origine + vue.url });
  const pret = vue.pret || vue.root;
  for (let essai = 0; essai < 100; essai++) { if (await navigateur.evaluer(`document.readyState === 'complete' && !!document.querySelector(${json(pret)})`)) break; await pause(100); }
  if (!await navigateur.evaluer(`!!document.querySelector(${json(pret)})`)) throw new Error(`${nom} : ${pret} absent après 10 s\n${navigateur.erreurs.slice(-5).join('\n').slice(0, 1500)}`);
  for (const etape of vue.sequence || []) {
    if (etape.evenement) {
      await navigateur.evaluer(`window.dispatchEvent(new CustomEvent(${json(etape.evenement)}, { detail: ${json(etape.detail || null)} }))`);
      continue;
    }
    const clique = await navigateur.evaluer(`(() => { const wanted = ${json(etape.texte)}; const candidates = [...document.querySelectorAll(${json(etape.selecteur || '*')})]; const e = candidates.find((x) => x.textContent.trim() === wanted || x.getAttribute('aria-label') === wanted); if (e) { e.click(); return true; } return false; })()`);
    if (!clique) throw new Error(`${nom} : contrôle « ${etape.texte} » introuvable`);
    await pause(250);
  }
  await pause(vue.attente);
  for (let essai = 0; essai < 50 && !await navigateur.evaluer(`!!document.querySelector(${json(vue.root)})`); essai++) await pause(100);
  if (!await navigateur.evaluer(`!!document.querySelector(${json(vue.root)})`)) throw new Error(`${nom} : racine ${vue.root} absente après la séquence`);
  const html = await navigateur.evaluer(`(${serialise})(document.querySelector(${json(vue.root)}), ${json(vue.type)}, ${json(nom)})`);
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
