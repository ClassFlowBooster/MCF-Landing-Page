import { test } from "node:test";
import assert from "node:assert/strict";
import { detecter, installationDirecte, etapes } from "../assets/js/telecharger.js";

const UA = {
  win: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
  mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15",
  iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  android: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36",
  firefoxWin: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0",
  chromeMac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
};

test("detecter", () => {
  assert.equal(detecter(UA.win, 0, "Win32"), "win");
  assert.equal(detecter(UA.mac, 0, "MacIntel"), "mac");
  assert.equal(detecter(UA.iphone, 5, "iPhone"), "ios");
  assert.equal(detecter(UA.android, 5, "Linux armv8l"), "and");
  assert.equal(detecter(UA.mac, 5, "MacIntel"), "ios"); // iPad qui se présente comme un Mac
  assert.equal(detecter("", 0, ""), "win");             // inconnu : une tuile tout de même
  assert.equal(detecter(UA.firefoxWin, 0, "Win32"), "win");
});

test("installationDirecte : Chrome / Edge sur Android, Windows, Mac ; jamais iOS ni Safari ni Firefox", () => {
  assert.equal(installationDirecte("and", UA.android), true);
  assert.equal(installationDirecte("win", UA.win), true);
  assert.equal(installationDirecte("mac", UA.chromeMac), true);
  assert.equal(installationDirecte("mac", UA.mac), false);
  assert.equal(installationDirecte("ios", UA.iphone), false);
  assert.equal(installationDirecte("win", UA.firefoxWin), false);
});

test("etapes : l'adresse et le nom de l'app suivent l'espace", () => {
  const prof = etapes("win", "enseignants");
  assert.equal(prof.l.length, 3);
  assert.ok(prof.l[0][0].includes("app.myclassflow.fr"));
  const parents = etapes("ios", "parents-enfants");
  assert.ok(parents.l[0][0].includes("adapter.myclassflow.fr"));
  assert.ok(parents.l[2][1].includes("MyClassFlow Famille"));
  assert.ok(!JSON.stringify(parents).includes("app.myclassflow.fr"));
});

test("écran simulé : une seule ligne surlignée, l'option à toucher, jamais le titre", async () => {
  const { ecranHtml } = await import("../assets/js/telecharger.js");
  const attendu = { mac: "Installer", win: "Installer", and: "Installer l’application", ios: "Sur l’écran d’accueil" };
  for (const espace of ["enseignants", "parents-enfants"]) for (const [appareil, option] of Object.entries(attendu)) {
    const html = ecranHtml(etapes(appareil, espace));
    const surlignees = [...html.matchAll(/<div class="hl">([^<]*)<\/div>/g)].map((m) => m[1]);
    assert.deepEqual(surlignees, [option], `${espace} ${appareil}`);
  }
});
