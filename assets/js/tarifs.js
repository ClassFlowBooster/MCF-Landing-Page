// Règles de prix du site. Module pur, sans DOM : utilisé par les pages Tarifs
// et les aperçus, testé par tests/tarifs.test.mjs.

export const PLEIN_TARIF_ECOLE = 14.99;
export const PLANCHER_ECOLE = 9.99;
export const TVA = 0.2;

const PROF = { plein: 14.99, promo: 9.99, moisPromo: 6 };
const ADAPTER = {
  essentiel: { plein: 4.99, promo: 2.49 },
  illimite: { plein: 9.99, promo: 4.99 },
  moisPromo: 3,
};

export function indexPalier(n) {
  return Math.min(Math.floor(n / 5), 4);
}

export function palierEcole(n) {
  return Math.max(PLANCHER_ECOLE, PLEIN_TARIF_ECOLE * Math.pow(0.9, Math.floor(n / 5)));
}

export function offreEcole(n, engagement) {
  const palier = palierEcole(n);
  const prixUnitaire = engagement ? PLANCHER_ECOLE : palier;
  const totalMensuel = prixUnitaire * n;
  const reference = (engagement ? palier : PLEIN_TARIF_ECOLE) * n;
  const remisePct = Math.round((1 - totalMensuel / reference) * 100);
  return {
    prixUnitaire,
    totalMensuel,
    barreMensuel: remisePct > 0 ? reference : null,
    remisePct: Math.max(remisePct, 0),
    anneeDeux: engagement ? palier * n : null,
  };
}

const format = (v) => v.toFixed(2).replace(".", ",");

export function offreEnseignant(engagement) {
  if (!engagement) return { prix: PROF.plein, barre: null, renvoi: null };
  return {
    prix: PROF.promo,
    barre: PROF.plein,
    renvoi: `Pendant ${PROF.moisPromo} mois avec un engagement d’un an, puis ${format(PROF.plein)} €/mois TTC.`,
  };
}

export function offreAdapter(formule, engagement) {
  const f = ADAPTER[formule];
  if (!engagement) return { prix: f.plein, barre: null, renvoi: null };
  return {
    prix: f.promo,
    barre: f.plein,
    renvoi: `Pendant ${ADAPTER.moisPromo} mois avec un engagement de 6 mois, puis ${format(f.plein)} €/mois TTC.`,
  };
}

export function parAn(mensuel, moisPromo = 0, prixPromo = mensuel) {
  return moisPromo * prixPromo + (12 - moisPromo) * mensuel;
}

export const ttc = (ht) => ht * (1 + TVA);

// Format « 1 234,56 € » : les espaces insécables de toLocaleString deviennent
// des espaces simples.
export function euros(v) {
  return v.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\s/g, " ") + " €";
}
