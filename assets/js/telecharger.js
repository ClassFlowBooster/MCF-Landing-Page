// Page Télécharger : détection de l'appareil, étapes d'installation de l'app
// (ClassFlow, ou ClassFlow Adapter dans l'espace Parents / Enfants).
// detecter(), installationDirecte() et etapes() sont purs (testés, et utilisés
// par le générateur pour écrire les étapes par défaut dans le HTML).

// app.myclassflow.fr/installer est en prod depuis MCF-App#100 (PR #133, 2026-09-28).
export const INSTALLEUR_DISPONIBLE = true;

export function detecter(ua, touchPoints, plateforme) {
  if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && touchPoints > 1)) return "ios";
  if (/Android/.test(ua)) return "and";
  if (/Macintosh|Mac OS X/.test(ua) || /^Mac/.test(plateforme)) return "mac";
  return "win";
}

export function installationDirecte(appareil, ua) {
  if (appareil === "ios") return false;
  return /Chrome\/|Edg\/|SamsungBrowser\//.test(ua) && !/OPR\//.test(ua);
}

export function application(espace) {
  return espace === "parents-enfants"
    ? { hote: "adapter.myclassflow.fr", nom: "ClassFlow Adapter" }
    : { hote: "app.myclassflow.fr", nom: "ClassFlow" };
}

export function etapes(appareil, espace) {
  const { hote, nom } = application(espace);
  const D = {
    mac: { t: "Installer sur Mac", s: "Avec Chrome ou Edge (Safari : menu Fichier → « Ajouter au Dock »).", l: [[`Ouvrez ${hote}`, "dans Chrome ou Edge."], ["Cliquez sur l’icône d’installation", "au bout de la barre d’adresse (un écran avec une flèche)."], ["Cliquez sur « Installer »", `${nom} apparaît dans le Launchpad et le Dock.`]], v: [`Installer ${nom} ?`, "Installer", "Annuler"], hl: 1 },
    win: { t: "Installer sur Windows", s: "Avec Chrome ou Edge.", l: [[`Ouvrez ${hote}`, "dans Chrome ou Edge."], ["Cliquez sur l’icône d’installation", "au bout de la barre d’adresse."], ["Cliquez sur « Installer »", `${nom} s’ajoute au menu Démarrer ; vous pouvez l’épingler à la barre des tâches.`]], v: [`Installer ${nom} ?`, "Installer", "Annuler"], hl: 1 },
    and: { t: "Installer sur Android", s: "Le plus souvent, l’app vous le propose d’elle-même.", l: [[`Ouvrez ${hote}`, "dans Chrome, Edge ou Samsung Internet."], ["Touchez « Installer »", "dans la fenêtre proposée par l’app, ou menu <span class=\"kbd\">⋮</span> → « Installer l’application »."], ["C’est prêt", `l’icône ${nom} est sur votre écran d’accueil.`]], v: ["Nouvel onglet", "Favoris", "Installer l’application", "Paramètres"], hl: 2 },
    ios: { t: "Installer sur iPhone et iPad", s: "Apple ne propose pas de bouton « Installer » : deux gestes suffisent.", l: [[`Ouvrez ${hote}`, "dans Safari, Chrome ou Edge."], ["Touchez « Partager »", "l’icône <span class=\"kbd\">⬆︎</span> en bas (Safari) ou en haut (Chrome, Edge)."], ["Touchez « Sur l’écran d’accueil »", `puis « Ajouter » : l’icône ${nom} apparaît.`]], v: ["Copier", "Ajouter aux favoris", "Sur l’écran d’accueil", "Imprimer"], hl: 2 },
  };
  return D[appareil];
}

export const listeHtml = (d) =>
  d.l.map((x, i) => `<div class="st"><span class="num">${i + 1}</span><div><b>${x[0]}</b><span>${x[1]}</span></div></div>`).join("");

// Écran simulé : seule l'option à toucher (index hl) est surlignée.
export const ecranHtml = (d) =>
  d.v.map((x, i) => `<div class="${i === d.hl ? "hl" : ""}">${x}</div>`).join("");

export function brancher(doc = document, nav = navigator) {
  const dl = doc.getElementById("dl");
  if (!dl) return;
  const espace = doc.body.dataset.espace;
  const montrer = (o) => {
    const d = etapes(o, espace);
    doc.getElementById("sT").textContent = d.t;
    doc.getElementById("sS").textContent = d.s;
    doc.getElementById("sL").innerHTML = listeHtml(d);
    doc.getElementById("sV").innerHTML = ecranHtml(d);
  };
  const choisir = (tuile) => {
    for (const x of dl.querySelectorAll(".os")) {
      x.classList.toggle("on", x === tuile);
      x.setAttribute("aria-pressed", String(x === tuile));
    }
    montrer(tuile.dataset.o);
  };
  dl.addEventListener("click", (e) => {
    const tuile = e.target.closest(".os");
    if (!tuile) return;
    choisir(tuile);
    if (INSTALLEUR_DISPONIBLE && tuile.classList.contains("vous") && installationDirecte(tuile.dataset.o, nav.userAgent)) {
      window.open(`https://${application(espace).hote}/installer`, "_blank", "noopener");
    }
  });
  // Présélection de l'appareil du visiteur, avec le tag « ✓ Votre appareil ».
  const appareil = detecter(nav.userAgent, nav.maxTouchPoints ?? 0, nav.platform ?? "");
  const tuile = dl.querySelector(`.os[data-o="${appareil}"]`);
  const tag = dl.querySelector(".you");
  dl.querySelectorAll(".os").forEach((x) => x.classList.toggle("vous", x === tuile));
  if (tag && tuile) tuile.prepend(tag);
  if (tuile) choisir(tuile);
}

if (typeof document !== "undefined") brancher();
