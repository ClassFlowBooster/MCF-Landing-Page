// Contrôle visuel manuel : serveur de la branche déjà servi sur VISUELS_URL.
// node tests/visuels-navigateur.mjs ; PNG/rapport hors dépôt, VISUELS_OUT configurable.
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
const base = process.env.VISUELS_URL || 'http://127.0.0.1:8789';
const out = process.env.VISUELS_OUT || '/tmp/mcf-visuels-53-apres';
mkdirSync(out, { recursive: true });
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=9347', '--user-data-dir=/tmp/mcf-visuels-chrome-53', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0;
const pending = new Map(), errors = [], report = [];
const send = (method, params = {}) => new Promise((res, rej) => { const n = ++id; pending.set(n, { res, rej }); ws.send(JSON.stringify({ id: n, method, params })); });
const ev = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
};
async function capture(name) {
  const clip = await ev(`(()=>{const e=document.querySelector('.appv-figure'); e.scrollIntoView({block:'start'});const r=e.getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height,scale:1}})()`);
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip });
  writeFileSync(`${out}/${name}.png`, Buffer.from(shot.data, 'base64'));
}
try {
  for (let n = 0; n < 50; n++) {
    try { const tabs = await (await fetch('http://127.0.0.1:9347/json')).json(); ws = new WebSocket(tabs.find((t) => t.type === 'page').webSocketDebuggerUrl); await new Promise((r) => { ws.onopen = r; }); break; }
    catch { await sleep(100); }
  }
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(m.error) : p.res(m.result); } else if (m.method === 'Runtime.exceptionThrown') errors.push(m.params); };
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true });
  for (const width of [1440, 390, 320]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false });
    for (const slug of ['fiche-de-preparation', 'cahier-journal', 'emploi-du-temps', 'adaptation-des-supports', 'fiches-eleves', 'import-eleves-photo', 'taches', 'lia']) {
      await send('Page.navigate', { url: `${base}/enseignants/fonctionnalites/${slug}/` });
      for (let n = 0; n < 60; n++) { if (await ev('document.readyState==="complete" && !!document.querySelector(".appv-proto")')) break; await sleep(100); }
      await ev('Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,8000))])');
      const result = await ev(`(()=>{const f=document.querySelector('.appv-figure'),a=f.querySelector('.appv-proto'),r=f.querySelector('.appv-proto-viewport');const h=a.querySelector('h1,.sh-title,.sp-title');return {width:${width},slug:'${slug}',pageWidth:document.documentElement.scrollWidth,viewportWidth:r.clientWidth,forbidden:/Base commune|Éditeur|(?<!My)ClassFlow/.test(a.textContent),titleFont:h?{family:getComputedStyle(h).fontFamily,size:getComputedStyle(h).fontSize,weight:getComputedStyle(h).fontWeight}:null}})()`);
      await capture(`${slug}-${width}`);
      report.push(result);
    }
  }
  writeFileSync(`${out}/rapport.json`, JSON.stringify({ report, errors }, null, 2));
  const failed = report.filter((r) => r.forbidden || r.pageWidth > r.width + 1);
  console.log(JSON.stringify({ captures: report.length, errors, failed }, null, 2));
  if (failed.length || errors.length) process.exitCode = 1;
} finally { ws?.close(); chrome.kill(); }
