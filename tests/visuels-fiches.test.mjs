import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { illustrations } from '../outils/corps/fiches/illustrations.mjs';
import { JOURNAL, EDT, MATIERES, duree, minutes, PHASES_MESURE, IMPORT, TACHES, CRITERES_INES } from '../outils/corps/fiches/visuels-donnees.mjs';
test('semaines : cinq jours gardés, créneaux valides sans chevauchement', () => {
  for (const semaine of [JOURNAL, EDT]) {
    assert.equal(semaine.length, 5);
    for (const jour of semaine) {
      assert.ok(jour.some(s=>s.code), 'chaque jour pertinent contient des cours');
      for (const [i,s] of jour.entries()) {
        assert.ok(duree(s)>0);
        if (s.code) assert.ok(MATIERES[s.code]);
        if (i) assert.ok(minutes(jour[i-1].fin)<=minutes(s.debut), 'pas de chevauchement');
      }
    }
  }
  assert.equal((illustrations['cahier-journal'].match(/class="appv-week-day/g)||[]).length,5);
  assert.equal((illustrations['emploi-du-temps'].match(/class="appv-edt-column/g)||[]).length,5);
});
test('CM2 : les créneaux affichés produisent exactement les sept volumes éditoriaux', () => {
  const totaux={};
  for (const s of EDT.flat()) if(s.code){const token=MATIERES[s.code].token;totaux[token]=(totaux[token]||0)+duree(s);}
  assert.deepEqual(totaux, {'subj-fr':435,'subj-other':150,'subj-math':270,'subj-eps':165,'subj-quest':105,'subj-art':105,'subj-ang':75});
  assert.equal(Object.values(totaux).reduce((a,b)=>a+b,0),1305);
  assert.equal(EDT.flat().filter(s=>!s.code).length,9);
  assert.equal(EDT[2].at(-1).fin,'10:30');
  for (const i of [0,1,3,4]) assert.equal(EDT[i].at(-1).fin,'15:45');
});
test('continuité métier : mesure de 40 min et mêmes trois critères, liste de huit élèves', () => {
  const mesure=JOURNAL[1].find(s=>s.debut==='09:45');
  assert.equal(duree(mesure),40);
  assert.equal(PHASES_MESURE.reduce((n,p)=>n+p[1],0),40);
  assert.equal(mesure.titre,'Mesurer un segment avec la règle');
  for(const texte of CRITERES_INES){assert.ok(illustrations['fiches-eleves'].includes(texte));assert.ok(illustrations['adaptation-des-supports'].includes(texte));}
  assert.equal(IMPORT.length,8);
  assert.equal(IMPORT.filter(r=>!['Déjà dans la classe','En double dans la liste'].includes(r[2])).length,6);
  assert.equal(IMPORT.filter(r=>r[2]==='À vérifier').length,1);
  assert.equal(TACHES.length,5);
  assert.ok(illustrations.lia.includes('Maël et Nour'));
});
test('marketing : aucune navigation Base commune/Éditeur, aucun moteur ni contrôle actif', () => {
  assert.equal(Object.keys(illustrations).length,8);
  for(const [slug,html] of Object.entries(illustrations)) {
    assert.doesNotMatch(html,/Base commune|Éditeur/i,slug);
    assert.doesNotMatch(html,/<script|<button|<input|onclick=|contenteditable/i,slug);
    assert.match(html,/données fictives/);
    assert.match(html,/aria-hidden="true"/);
  }
});
test('tokens : palette App exacte, mêmes formules de teinte et échelle EDT', () => {
  const css=readFileSync(new URL('../assets/css/visuels-app.css',import.meta.url),'utf8');
  for(const v of ['--av-coral500: #F0552B','--av-ink: #1F1A14','--av-line: #E6DFCF','--av-subj-fr: #6366F1','--av-subj-math: #06B6D4','--av-subj-other: #8A8278']) assert.ok(css.includes(v),v);
  assert.match(css,/var\(--subject\) 12%,white/);
  assert.match(css,/var\(--subject\) 40%,white/);
  assert.match(css,/grid-template-columns:60px repeat\(5/);
  assert.match(css,/transparent 55px,var\(--av-line\) 55px,var\(--av-line\) 56px/);
});
