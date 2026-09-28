// Sections partagées par les pages d'accueil des trois espaces.

export const COCHE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-9"/></svg>`;
export const FLECHE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const CHEVRON = `<svg class="chev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;

/** Exemple avant / après (exercice adapté pour une élève dyslexique). */
export function demo({ original = "Original", titre = "Les fractions — exercice 3", annotation = true } = {}) {
  return `<div class="demo" role="img" aria-label="Aperçu : un exercice adapté automatiquement pour un élève dyslexique">
          <div class="demo-bar">
            <span class="demo-select"><span class="dot" style="background:var(--coral-500)"></span>Léa M.${CHEVRON}</span>
            <span class="demo-select"><span class="dot" style="background:var(--t-dys)"></span>Dyslexie${CHEVRON}</span>
            <span class="demo-go" aria-hidden="true"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/></svg>Adapter</span>
          </div>
          <div class="demo-panes">
            <div class="doc">
              <span class="doc-tag ref">${original}</span>
              <h5>${titre}</h5>
              <div class="tline l"></div><div class="tline m"></div><div class="tline l"></div><div class="tline s"></div><div class="tline m"></div>
              <div class="doc-q">Colorie ¾ de chaque figure puis compare les deux résultats.</div>
            </div>
            <div class="doc is-adapt">
              <span class="doc-tag adapt">Adapté · Dyslexie</span>
              <h5>Les fractions</h5>
              <p class="aline"><span class="syll">Co</span>lo<span class="syll">rie</span> trois quarts.</p>
              <p class="aline">Re<span class="syll">garde</span> les deux <span class="syll">fi</span>gures.</p>
              <div class="doc-q">1 consigne à la fois. Police lisible, lignes espacées.</div>
            </div>
            <div class="doc-arrow" aria-hidden="true"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
          </div>${annotation ? `
          <div class="demo-pin demo-pin--br">un clic = un doc adapté</div>` : ""}
        </div>`;
}

/**
 * Visuel du header : une seule feuille, un curseur qui passe de la copie
 * d'origine à la copie adaptée (piloté par le défilement et déplaçable, assets/js/comparateur.js).
 * Sans JavaScript, le curseur reste au milieu.
 */
export function comparateur() {
  return `<div class="ba" data-comparateur>
          <div class="ba-feuille">
            <div class="ba-couche ba-orig" aria-hidden="true">
              <div class="ba-meta"><span>Prénom : ..............</span><span>CM1 · Mathématiques</span></div>
              <h6>Les fractions — exercice 3</h6>
              <p class="ba-ex">Colorie les trois quarts de chaque figure puis compare les deux résultats obtenus en expliquant ta réponse par une phrase complète, puis range les fractions suivantes dans l'ordre croissant : 3/4 ; 1/2 ; 2/8 ; 5/4.</p>
              <div class="ba-figs">
                <svg viewBox="0 0 52 52"><rect x="2" y="2" width="48" height="48" fill="none" stroke="#333"/><path d="M26 2v48M2 26h48" stroke="#333"/></svg>
                <svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="none" stroke="#333"/><path d="M26 2v48M2 26h48" stroke="#333"/></svg>
              </div>
              <p>Rappel : une fraction représente une partie d'un tout partagé en parts égales ; le dénominateur indique en combien de parts on a partagé, le numérateur combien de parts on prend.</p>
              <div class="ba-lignes"><i></i><i></i><i></i></div>
            </div>
            <div class="ba-couche ba-adap" aria-hidden="true">
              <div class="ba-meta"><span>Prénom : Léa</span><span>CM1 · Maths</span></div>
              <h6>Les fractions</h6>
              <div class="ba-etape"><b>1</b><p><span class="s1">Co</span><span class="s2">lo</span><span class="s1">rie</span> <strong>trois quarts</strong> du carré.</p></div>
              <div class="ba-figs">
                <svg viewBox="0 0 58 58"><rect x="2" y="2" width="54" height="54" rx="4" fill="#fff" stroke="#1F1A14" stroke-width="2.5"/><path d="M29 2v54M2 29h54" stroke="#1F1A14" stroke-width="2.5"/></svg>
              </div>
              <div class="ba-etape"><b>2</b><p><span class="s1">Fais</span> <span class="s2">pa</span><span class="s1">reil</span> a<span class="s2">vec</span> le <span class="s1">rond</span>.</p></div>
              <p class="ba-astuce">Une consigne à la fois. Coche quand c'est fait.</p>
            </div>
            <span class="ba-etiq ba-etiq-o" aria-hidden="true">Original</span><span class="ba-etiq ba-etiq-a" aria-hidden="true">Adapté · Dyslexie</span>
            <div class="ba-poignee" aria-hidden="true"><span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/></svg></span></div>
            <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="Comparer l'exercice d'origine et sa version adaptée pour un élève dyslexique">
          </div>
          <div class="ba-aide" aria-hidden="true">glissez pour voir la différence</div>
        </div>`;
}

export const TROUBLES =`<section class="troubles" aria-label="Troubles pris en charge">
    <div class="wrap troubles-row">
      <span class="troubles-lead">12 troubles pris en charge —</span>
      <span class="tchip"><span class="dot" style="background:var(--t-dys)"></span>Dyslexie</span>
      <span class="tchip"><span class="dot" style="background:var(--t-dyspraxie)"></span>Dyspraxie</span>
      <span class="tchip"><span class="dot" style="background:var(--t-dys)"></span>Dysgraphie</span>
      <span class="tchip"><span class="dot" style="background:var(--t-tdah)"></span>Dyscalculie</span>
      <span class="tchip"><span class="dot" style="background:var(--t-tdah)"></span>TDAH</span>
      <span class="tchip"><span class="dot" style="background:var(--t-tsa)"></span>TSA</span>
      <span class="tchip"><span class="dot" style="background:var(--t-eana)"></span>EANA</span>
      <span class="tchip"><span class="dot" style="background:var(--t-visuel)"></span>Déf. visuelle</span>
      <span class="tchip" style="color:var(--ink-3)">+ 4 autres</span>
    </div>
  </section>`;

export const ICONES = {
  horloge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  alerte: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17h.01"/></svg>`,
  lignes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 12h16M4 19h10"/></svg>`,
  bouclier: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/><path d="M9 12l2 2 4-4"/></svg>`,
  cadenas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`,
  equipe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 11a4 4 0 1 0-8 0M3 21c1-4 17-4 18 0M19 8l1.5 1.5L23 7"/></svg>`,
  personne: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 16-4 16 0"/></svg>`,
  ecole: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6"/></svg>`,
  diplome: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11v5c0 2 10 2 10 0v-5"/></svg>`,
  facture: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 13h5M10 17h3"/></svg>`,
  cible: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>`,
  photo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>`,
};

export const douleur = (ic, titre, texte) =>
  `<div class="pain"><span class="pain-ic">${ICONES[ic]}</span><div><h4>${titre}</h4><p>${texte}</p></div></div>`;

export const carteConfiance = (ic, titre, texte) =>
  `<div class="trust-card"><div class="trust-ic">${ICONES[ic]}</div><h3>${titre}</h3><p>${texte}</p></div>`;

export const HEBERGE = carteConfiance("bouclier", "Hébergé en France",
  "Les données sont stockées sur une infrastructure située en France, pour rester au plus près du cadre scolaire et de la réglementation nationale.");
export const RGPD = carteConfiance("cadenas", "Conforme RGPD",
  "Collecte minimale, finalités claires et maîtrise de vos données : ClassFlow est pensé dès la conception pour respecter le RGPD.");

// Section « confiance » (hébergement, RGPD) masquée dans les trois espaces.
// Repasser à true pour la réafficher : les appels et les textes sont gardés.
export const AFFICHER_CONFIANCE = false;

export function confiance(cartes, { titre = "Des données d'élèves traitées avec sérieux", texte, note } = {}) {
  if (!AFFICHER_CONFIANCE) return "";
  return `<section class="section trust" id="confiance">
    <div class="wrap">
      <div class="sec-head center">
        <span class="eyebrow center">La confiance avant tout</span>
        <h2 class="h-section">${titre}</h2>
        <p class="llede">${texte}</p>
      </div>
      <div class="trust-grid">
        ${cartes.join("\n        ")}
      </div>${note ? `
      <p class="trust-note">${note}</p>` : ""}
    </div>
  </section>`;
}

export function etapes({ titre, texte, liste, id = "etapes" }) {
  return `<section class="section how" id="${id}">
    <div class="wrap">
      <div class="sec-head center">
        <span class="eyebrow center">Comment ça marche</span>
        <h2 class="h-section">${titre}</h2>
        <p class="llede">${texte}</p>
      </div>
      <div class="how-steps">
        ${liste.map(([n, court, h, p], i) => `<div class="step">
          <div class="step-n"><b>${n}</b> ${court}</div>
          <h3>${h}</h3>
          <p>${p}</p>${i < liste.length - 1 ? `
          <svg class="step-arrow" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>` : ""}
        </div>`).join("\n        ")}
      </div>
    </div>
  </section>`;
}

/** Formulaire de contact (envoyé par assets/js/formulaire.js). */
export function formulaireContact({ titre, sous, message = "Votre message" }) {
  return `<form class="form" data-contact novalidate>
          <h3>${titre}</h3>
          <p class="form-sub">${sous}</p>
          <input class="in" name="nom" required maxlength="120" autocomplete="name" placeholder="Votre nom" aria-label="Votre nom">
          <input class="in" type="email" name="email" required maxlength="254" autocomplete="email" placeholder="Votre e-mail" aria-label="Votre e-mail">
          <input class="in" name="etablissement" maxlength="200" placeholder="Votre école (facultatif)" aria-label="Votre école">
          <textarea class="in" name="message" required maxlength="4000" placeholder="${message}" aria-label="Votre message"></textarea>
          <input class="piege" name="site_web" tabindex="-1" autocomplete="off" aria-hidden="true">
          <p class="form-erreur" role="alert" hidden></p>
          <button class="lbtn lbtn-primary lbtn-lg lbtn-block" type="submit">Envoyer</button>
          <p class="form-rgpd">Vos coordonnées servent uniquement à vous répondre au sujet de votre message. Elles sont conservées 3 ans après notre dernier échange.</p>
        </form>
        <div class="form-merci" hidden role="status"><b>Merci, votre message est bien reçu.</b> Nous vous répondons rapidement.</div>`;
}

/** Bandeau pointillé ; `visuel` : un émoji, ou une balise (castor). */
export const bandeau = (visuel, titre, texte, bouton, href, attr = "") =>
  `<section class="section bandeau apercu" aria-label="${titre.replace(/"/g, "&quot;")}">
    <div class="wrap">
      <div class="band">${visuel.startsWith("<") ? visuel : `<div style="font-size:30px" aria-hidden="true">${visuel}</div>`}<div style="flex:1"><b>${titre}</b><p>${texte}</p></div><a class="btn" ${attr}href="${href}">${bouton}</a></div>
    </div>
  </section>`;
