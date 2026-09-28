import { test } from "node:test";
import assert from "node:assert/strict";
import { decider } from "../assets/js/entree.js";

test("premier passage : fenêtre", () => assert.deepEqual(decider(null), { afficherFenetre: true, redirection: null }));
test("choix mémorisé : redirection sans fenêtre", () => assert.deepEqual(decider("ecoles"), { afficherFenetre: false, redirection: "/ecoles/" }));
test("valeur inconnue dans le stockage : fenêtre", () => assert.deepEqual(decider("admin"), { afficherFenetre: true, redirection: null }));
