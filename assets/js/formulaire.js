// Envoi des demandes de devis et de contact à la fonction demande-contact, et
// liens « Envoyer à ma direction / à l'école ». Le « merci » ne s'affiche
// qu'après la confirmation de l'enregistrement (réponse 201).
import { offreEcole, montantHt } from "./tarifs.js";

export const URL_DEMANDES = "https://xjaixtlxfvnkzvalqvau.supabase.co/functions/v1/demande-contact";
const ECHEC_RESEAU = "Envoi impossible : vérifiez votre connexion et réessayez.";

export function construireDevis(champs, n, engagement) {
  const { totalMensuel } = offreEcole(n, engagement);
  return {
    type: "devis", espace: "ecoles", ...champs,
    nb_enseignants: n, engagement: engagement ? "2_ans" : "sans",
    // Les prix affichés sont TTC : même conversion HT que celle affichée par le calculateur.
    montant_ht_mensuel: montantHt(totalMensuel),
  };
}

export function construireContact(champs, espace) {
  return { type: "contact", espace, ...champs };
}

export async function envoyer(corps, fetchImpl = fetch) {
  let rep;
  try {
    rep = await fetchImpl(URL_DEMANDES, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(corps) });
  } catch {
    return { ok: false, message: ECHEC_RESEAU };
  }
  if (rep.status === 201) return { ok: true };
  try {
    const j = await rep.json();
    return { ok: false, message: j?.error?.message ?? ECHEC_RESEAU };
  } catch {
    return { ok: false, message: ECHEC_RESEAU };
  }
}

const MAILS = {
  direction: {
    sujet: "ClassFlow pour notre école",
    corps: "Bonjour,\n\nJ'utilise ClassFlow pour adapter mes supports aux élèves à besoins particuliers. L'école peut équiper toute l'équipe, avec un prix qui baisse dès 5 enseignants :\nhttps://myclassflow.fr/ecoles/tarifs/\n\nBonne journée,",
  },
  ecole: {
    sujet: "ClassFlow pour adapter les supports en classe",
    corps: "Bonjour,\n\nJ'utilise ClassFlow Adapter à la maison pour adapter les devoirs de mon enfant. L'école pourrait faire ces adaptations directement en classe :\nhttps://myclassflow.fr/ecoles/\n\nBonne journée,",
  },
};

export function lienMailto(cible) {
  const m = MAILS[cible];
  return `mailto:?subject=${encodeURIComponent(m.sujet)}&body=${encodeURIComponent(m.corps)}`;
}

function champsDe(form) {
  return Object.fromEntries([...new FormData(form)].map(([k, v]) => [k, String(v)]));
}

function brancherForm(form, construire) {
  const erreur = form.querySelector(".form-erreur");
  const merci = form.nextElementSibling?.classList.contains("form-merci") ? form.nextElementSibling : null;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const bouton = form.querySelector('[type="submit"]');
    bouton.disabled = true;
    erreur.hidden = true;
    const r = await envoyer(construire(champsDe(form)));
    bouton.disabled = false;
    if (r.ok) { form.hidden = true; if (merci) merci.hidden = false; return; }
    erreur.textContent = r.message;
    erreur.hidden = false;
  });
}

export function brancher(doc = document) {
  const devis = doc.getElementById("formDevis");
  if (devis) {
    brancherForm(devis, (c) => construireDevis(c, Number(doc.getElementById("eR").value),
      doc.querySelector(".dur .on")?.dataset.v === "eng"));
    doc.querySelectorAll('[data-scroll="devis"]').forEach((b) => b.addEventListener("click", () => {
      devis.scrollIntoView({ behavior: "smooth", block: "center" });
      devis.querySelector("input")?.focus({ preventScroll: true });
    }));
  }
  doc.querySelectorAll("form[data-contact]").forEach((f) => brancherForm(f, (c) => construireContact(c, doc.body.dataset.espace)));
  doc.querySelectorAll("[data-mailto]").forEach((a) => { a.href = lienMailto(a.dataset.mailto); });
}

if (typeof document !== "undefined") brancher();
