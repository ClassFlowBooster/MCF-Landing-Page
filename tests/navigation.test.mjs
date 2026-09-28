import { test } from "node:test";
import assert from "node:assert/strict";
import { basculer } from "../assets/js/navigation.js";
import { megaMenu } from "../outils/corps/mega-menu.mjs";

test("basculer : clic ouvre / ferme, Échap ferme toujours", () => {
  assert.equal(basculer(false), true);
  assert.equal(basculer(true), false);
  assert.equal(basculer(true, "Escape"), false);
  assert.equal(basculer(false, "Escape"), false);
});

test("méga-menu enseignants : 10 fonctionnalités, badges conformes", () => {
  const html = megaMenu("enseignants");
  assert.equal((html.match(/class="mi"/g) ?? []).length, 10);
  assert.equal((html.match(/tg pay/g) ?? []).length, 3);
  assert.equal((html.match(/tg free/g) ?? []).length, 7);
  assert.ok(html.includes("Import des élèves par photo <span class=\"tg free\">Gratuit</span>"));
});

test("méga-menu : liens vers la page Fonctionnalités de l'espace", () => {
  assert.ok(megaMenu("ecoles").includes('href="/ecoles/fonctionnalites/"'));
  assert.ok(!megaMenu("ecoles").includes('href="/enseignants/'));
  const parents = megaMenu("parents-enfants");
  assert.equal((parents.match(/class="mi"/g) ?? []).length, 4);
  assert.ok(parents.includes('href="/parents-enfants/fonctionnalites/"'));
});

// Fausse page minimale : éléments imbriqués, écouteurs, focus.
class El {
  constructor(nom, parent = null) { this.nom = nom; this.enfants = []; this.ecouteurs = {}; this.attrs = {}; this.hidden = false; this.parentElement = parent; parent?.enfants.push(this); }
  addEventListener(t, f) { (this.ecouteurs[t] ??= []).push(f); }
  emettre(t, e = {}) { let n = this; const ev = { type: t, target: e.target ?? this, stopPropagation() { this.stop = true; }, ...e }; while (n) { (n.ecouteurs[t] ?? []).forEach((f) => f(ev)); if (ev.stop) break; n = n.parentElement; } }
  contains(x) { for (let n = x; n; n = n.parentElement) if (n === this) return true; return false; }
  setAttribute(k, v) { this.attrs[k] = v; } getAttribute(k) { return this.attrs[k] ?? null; }
  focus() { page.actif = this; }
}
let page;
function fausseBarre() {
  const doc = new El("document"); page = doc;
  const header = new El("header", doc);
  const nav = new El("nav", header);
  const burger = new El("burger", nav); burger.setAttribute("aria-expanded", "false");
  const menu = new El("menuMobile", header); menu.hidden = true;           // frère de la barre, pas enfant du bouton
  const liens = [new El("lien1", menu), new El("lien2", menu)];
  const apres = new El("main", doc);
  return { doc, burger, menu, liens, apres };
}

test("burger : Tab au-delà du dernier lien ferme le menu et rend le focus au bouton", async () => {
  const { lier } = await import("../assets/js/navigation.js");
  const { doc, burger, menu, liens, apres } = fausseBarre();
  lier(burger, menu, { doc, retourFocus: true });
  burger.emettre("click", { detail: 0 });
  assert.equal(menu.hidden, false, "ouvert au clavier (Entrée)");
  liens[0].emettre("focusout", { relatedTarget: liens[1] });
  assert.equal(menu.hidden, false, "Tab d'un lien au suivant : reste ouvert");
  burger.emettre("focusout", { relatedTarget: liens[0] });
  assert.equal(menu.hidden, false, "du bouton vers le premier lien : reste ouvert");
  liens[1].emettre("focusout", { relatedTarget: apres });
  assert.equal(menu.hidden, true, "focus sorti du menu : fermé");
  assert.equal(burger.getAttribute("aria-expanded"), "false");
  assert.equal(page.actif, burger, "focus rendu au bouton burger");
});

test("burger : Échap ferme le menu et rend le focus au bouton", async () => {
  const { lier } = await import("../assets/js/navigation.js");
  const { doc, burger, menu, liens } = fausseBarre();
  lier(burger, menu, { doc, retourFocus: true });
  burger.emettre("click", { detail: 0 });
  liens[0].focus();
  doc.emettre("keydown", { key: "Escape" });
  assert.equal(menu.hidden, true);
  assert.equal(page.actif, burger);
});

test("méga-menu et pastille : quitter le menu au clavier le ferme sans déplacer le focus", async () => {
  const { lier } = await import("../assets/js/navigation.js");
  const { doc, burger: bouton, menu, liens, apres } = fausseBarre();
  lier(bouton, menu, { doc });
  bouton.emettre("click", { detail: 0 });
  liens[1].emettre("focusout", { relatedTarget: apres });
  assert.equal(menu.hidden, true);
  assert.notEqual(page.actif, bouton, "le focus suit la tabulation");
});
