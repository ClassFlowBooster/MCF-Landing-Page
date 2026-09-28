// Accueil Enseignants (provisoire : contenu de l'ancienne page unique).
export default `
  <!-- ==================================================== -->
  <!-- HERO — le différenciateur mis en avant               -->
  <!-- ==================================================== -->
  <section class="section hero">
    <div class="wrap hero-grid">
      <!-- Colonne texte -->
      <div class="hero-copy">
        <div class="hero-badge" data-reveal>
          <span class="pill">Nouveau</span>
          <span>L'inclusion scolaire, <b>sans la charge de travail</b></span>
        </div>

        <h1 class="h-display" data-reveal data-delay="1">
          Adaptez chaque support <br class="br-md" />aux besoins de <em>chaque élève.</em> <br class="br-md" />En un clic.
        </h1>

        <p class="lede" data-reveal data-delay="2">
          ClassFlow régénère vos exercices et vos leçons pour les élèves DYS, TDAH,
          TSA, EANA… grâce à l'IA. Vous gagnez des heures&nbsp;; chaque enfant reçoit
          immédiatement un document fait pour lui.
        </p>

        <div class="hero-actions" data-reveal data-delay="3">
          <a class="btn btn-primary btn-lg" href="https://app.myclassflow.fr">
            Lancer l'app
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <a class="btn btn-ghost btn-lg" href="#etapes">Voir comment ça marche</a>
        </div>

        <div class="hero-reassure" data-reveal data-delay="3">
          <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-9"/></svg> Hébergé en France</span>
          <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-9"/></svg> Conforme RGPD</span>
          <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-9"/></svg> Conçu avec des enseignants</span>
        </div>
      </div>

      <!-- Colonne mock produit : adaptation avant/après -->
      <div class="hero-demo" data-reveal data-delay="2">
        <div class="demo" role="img" aria-label="Aperçu : un exercice adapté automatiquement pour un élève dyslexique">
          <!-- Barre de contrôle -->
          <div class="demo-bar">
            <span class="demo-select">
              <span class="dot" style="background:var(--coral-500)"></span>
              Léa M.
              <svg class="chev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </span>
            <span class="demo-select">
              <span class="dot" style="background:var(--t-dys)"></span>
              Dyslexie
              <svg class="chev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </span>
            <button class="demo-go" type="button" tabindex="-1" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/></svg>
              Adapter
            </button>
          </div>

          <!-- Avant / après -->
          <div class="demo-panes">
            <!-- Document de référence -->
            <div class="doc">
              <span class="doc-tag ref">Original</span>
              <h5>Les fractions — exercice 3</h5>
              <div class="tline l"></div>
              <div class="tline m"></div>
              <div class="tline l"></div>
              <div class="tline s"></div>
              <div class="tline m"></div>
              <div class="doc-q">Colorie ¾ de chaque figure puis compare les deux résultats.</div>
            </div>

            <!-- Document adapté -->
            <div class="doc is-adapt">
              <span class="doc-tag adapt">Adapté · Dyslexie</span>
              <h5>Les fractions</h5>
              <p class="aline"><span class="syll">Co</span>lo<span class="syll">rie</span> trois quarts.</p>
              <p class="aline">Re<span class="syll">garde</span> les deux <span class="syll">fi</span>gures.</p>
              <div class="doc-q">1 consigne à la fois. Police lisible, lignes espacées.</div>
            </div>

            <!-- Flèche de transformation -->
            <div class="doc-arrow" aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </div>
          </div>

          <!-- Annotation manuscrite (rappel de la patte produit) -->
          <div class="demo-pin demo-pin--br">
            un clic = un doc adapté
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==================================================== -->
  <!-- BANDEAU TROUBLES                                      -->
  <!-- ==================================================== -->
  <section class="troubles" aria-label="Troubles pris en charge">
    <div class="wrap troubles-row" data-reveal>
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
  </section>

  <!-- ==================================================== -->
  <!-- PROBLÈME — empathie, court                            -->
  <!-- ==================================================== -->
  <section class="section problem">
    <div class="wrap problem-grid">
      <div data-reveal>
        <span class="eyebrow">Le constat</span>
        <h2 class="h-section" style="margin:16px 0 18px;">
          Différencier est essentiel.<br />
          <span class="serif-em text-coral">Mais ça vous prend vos soirées.</span>
        </h2>
        <p class="lede" style="margin-bottom:14px;">
          Adapter un exercice pour un élève dyslexique, un autre pour un élève TDAH,
          rédiger un PPRE, suivre chaque progrès… L'école inclusive est une mission
          que vous portez tous les jours.
        </p>
        <p style="color:var(--ink-2); font-size:16px;">
          Mais aujourd'hui, elle repose sur des heures de remise en forme manuelle,
          des documents refaits un par un, et une charge mentale qui s'accumule. Le
          temps passé sur la mise en page, c'est du temps en moins pour vos élèves.
        </p>
      </div>

      <div class="pain-list">
        <div class="pain" data-reveal data-delay="1">
          <span class="pain-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>
          <div><h4>Chronophage</h4><p>Reformer un même support pour trois profils différents, à la main, chaque semaine.</p></div>
        </div>
        <div class="pain" data-reveal data-delay="2">
          <span class="pain-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17h.01"/></svg></span>
          <div><h4>Complexe</h4><p>Connaître les bons aménagements pour chaque trouble demande une expertise que personne n'a le temps d'acquérir seul.</p></div>
        </div>
        <div class="pain" data-reveal data-delay="3">
          <span class="pain-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 12h16M4 19h10"/></svg></span>
          <div><h4>Éparpillé</h4><p>Cahier journal, dispositifs, suivi, agenda : autant d'outils séparés, aucune vue d'ensemble.</p></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==================================================== -->
  <!-- SOLUTION / FONCTIONNALITÉS                            -->
  <!-- ==================================================== -->
  <section class="section features" id="solution">
    <div class="wrap">
      <div class="sec-head center" data-reveal>
        <span class="eyebrow center">La solution</span>
        <h2 class="h-section">Un seul outil, pensé pour les profs</h2>
        <p class="lede">ClassFlow réunit l'adaptation pédagogique par l'IA et toute votre
        gestion de classe. Simple à prendre en main, conçu pour le quotidien du primaire.</p>
      </div>

      <div class="feat-grid" id="fonctionnalites">
        <!-- Carte phare : adaptation auto -->
        <article class="feat hero-feat" data-reveal>
          <div>
            <span class="feat-tag">Fonction phare</span>
            <div class="feat-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8z"/><path d="M19 4l.6 1.8L21 6.4l-1.4.6L19 9l-.6-1.8L17 6.4l1.4-.6z"/></svg></div>
            <h3>Adaptation automatique des supports</h3>
            <p>Choisissez un élève ou un trouble&nbsp;: l'IA régénère votre exercice ou
            votre leçon avec la bonne police, une mise en page aérée et des consignes
            simplifiées — accompagné d'une version de référence pour la classe.</p>
            <ul>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-9"/></svg> 12 troubles gérés (DYS, TDAH, TSA, EANA…)</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-9"/></svg> Police, espacement, syllabes, consignes pas à pas</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-9"/></svg> Prêt à imprimer ou à partager en quelques secondes</li>
            </ul>
          </div>
          <!-- Mini-mock liste d'élèves -->
          <div class="feat-mock" aria-hidden="true">
            <div class="row">
              <span class="av" style="background:var(--coral-500)">L</span>
              <span class="nm">Léa M.</span>
              <span class="badge" style="background:#EDE9FE;color:#5B21B6">Dyslexie</span>
              <span class="go">Adapter ›</span>
            </div>
            <div class="row">
              <span class="av" style="background:var(--t-tdah)">Y</span>
              <span class="nm">Yanis B.</span>
              <span class="badge" style="background:#CFFAFE;color:#0E7490">TDAH</span>
              <span class="go">Adapter ›</span>
            </div>
            <div class="row">
              <span class="av" style="background:var(--t-eana)">N</span>
              <span class="nm">Nadia K.</span>
              <span class="badge" style="background:#EDE9FE;color:#6D28D9">EANA</span>
              <span class="go">Adapter ›</span>
            </div>
            <div class="row">
              <span class="av" style="background:var(--t-tsa)">T</span>
              <span class="nm">Tom R.</span>
              <span class="badge" style="background:#D1FAE5;color:#065F46">TSA</span>
              <span class="go">Adapter ›</span>
            </div>
          </div>
        </article>

        <!-- Dispositifs PPRE/PAI -->
        <article class="feat" data-reveal data-delay="1">
          <div class="feat-ic amber"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 13h5M10 17h3"/></svg></div>
          <h3>Dispositifs PPRE &amp; PAI assistés par IA</h3>
          <p>Rédigez et suivez vos PPRE, PAI et GEVA-Sco plus vite&nbsp;: l'IA propose un
          constat à partir des évaluations de l'élève, vous validez et ajustez. Dans
          l'esprit de l'école inclusive et du Livret de Parcours Inclusif.</p>
        </article>

        <!-- Gestion de classe tout-en-un -->
        <article class="feat" data-reveal data-delay="2">
          <div class="feat-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg></div>
          <h3>La gestion de classe, tout-en-un</h3>
          <p>Cahier journal, emploi du temps, fiches de préparation, agenda et tâches&nbsp;:
          tout est réuni et cohérent. C'est la fluidité retrouvée — d'où le nom.</p>
        </article>

        <!-- Suivi des besoins -->
        <article class="feat" data-reveal data-delay="1">
          <div class="feat-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h17M7 17V10M12 17V5M17 17V8"/></svg></div>
          <h3>Suivi des besoins des élèves</h3>
          <p>Une fiche claire par élève&nbsp;: évaluations, progression par matière,
          observations et dispositifs en cours. Vous repérez d'un coup d'œil qui a
          besoin de quoi.</p>
        </article>

        <!-- Simplicité radicale -->
        <article class="feat" data-reveal data-delay="2">
          <div class="feat-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg></div>
          <h3>Une simplicité radicale</h3>
          <p>Pensé pour des enseignants, pas pour des informaticiens. Prise en main
          immédiate, zéro usine à gaz&nbsp;: vous êtes opérationnel dès la première séance.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- ==================================================== -->
  <!-- COMMENT ÇA MARCHE — 3 étapes                          -->
  <!-- ==================================================== -->
  <section class="section how" id="etapes">
    <div class="wrap">
      <div class="sec-head center" data-reveal>
        <span class="eyebrow center">Comment ça marche</span>
        <h2 class="h-section">Trois étapes, quelques secondes</h2>
        <p class="lede">De votre support habituel à un document adapté, sans rien réapprendre.</p>
      </div>

      <div class="steps">
        <div class="step" data-reveal data-delay="1">
          <div class="step-n"><b>1</b> Choisir</div>
          <h3>L'élève ou le trouble</h3>
          <p>Sélectionnez un élève de votre classe — son profil est déjà connu — ou
          directement un trouble. Importez ou collez le support à adapter.</p>
          <svg class="step-arrow" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </div>
        <div class="step" data-reveal data-delay="2">
          <div class="step-n"><b>2</b> Adapter</div>
          <h3>L'IA fait le travail</h3>
          <p>Police lisible, mise en page aérée, consignes reformulées pas à pas&nbsp;:
          le document est régénéré selon les aménagements adaptés au profil.</p>
          <svg class="step-arrow" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </div>
        <div class="step" data-reveal data-delay="3">
          <div class="step-n"><b>3</b> Partager</div>
          <h3>Imprimer ou envoyer</h3>
          <p>Récupérez la version adaptée et la version de référence. À imprimer pour
          l'élève, à archiver dans son suivi, ou à partager en un lien.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ==================================================== -->
  <!-- POUR QUI                                              -->
  <!-- ==================================================== -->
  <section class="section who" id="pour-qui">
    <div class="wrap">
      <div class="sec-head center" data-reveal>
        <span class="eyebrow center">Pour qui</span>
        <h2 class="h-section">Au service de l'école inclusive</h2>
        <p class="lede">De la salle de classe à l'institution, ClassFlow accompagne tous
        ceux qui font vivre l'inclusion au quotidien.</p>
      </div>

      <div class="who-grid">
        <article class="persona" data-reveal data-delay="1">
          <span class="persona-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 16-4 16 0"/></svg></span>
          <h3>Professeurs des écoles</h3>
          <p>Cycles 2 et 3. Un gain de temps concret chaque semaine et des supports
          adaptés sans expertise préalable — pour enseigner à toute la classe, vraiment.</p>
          <div class="persona-foot"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-9"/></svg> Gain de temps au quotidien</div>
        </article>

        <article class="persona" data-reveal data-delay="2">
          <span class="persona-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6"/></svg></span>
          <h3>Écoles &amp; réseaux inclusifs</h3>
          <p>Une démarche d'inclusion homogène et outillée sur tout l'établissement,
          des dispositifs mieux suivis et des pratiques partagées entre collègues.</p>
          <div class="persona-foot"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-9"/></svg> Une politique inclusive concrète</div>
        </article>

        <article class="persona" data-reveal data-delay="3">
          <span class="persona-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11v5c0 2 10 2 10 0v-5"/></svg></span>
          <h3>Instituts de formation &amp; rectorats</h3>
          <p>Un appui à la formation des enseignants (INSPÉ) et à la mission
          d'inclusion&nbsp;: un outil aligné sur le cadre de l'école inclusive,
          pour passer de la théorie à la pratique en classe.</p>
          <div class="persona-foot"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-9"/></svg> Aligné sur la mission d'inclusion</div>
        </article>
      </div>
    </div>
  </section>

  <!-- ==================================================== -->
  <!-- CONFIANCE / DONNÉES                                   -->
  <!-- ==================================================== -->
  <section class="section trust" id="confiance">
    <div class="wrap">
      <div class="sec-head center" data-reveal>
        <span class="eyebrow center">La confiance avant tout</span>
        <h2 class="h-section">Des données d'élèves traitées avec sérieux</h2>
        <p class="lede">Les informations sur vos élèves sont sensibles. ClassFlow est
        conçu pour les protéger, dès le premier jour.</p>
      </div>

      <div class="trust-grid">
        <div class="trust-card" data-reveal data-delay="1">
          <div class="trust-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/><path d="M9 12l2 2 4-4"/></svg></div>
          <h3>Hébergé en France</h3>
          <p>Les données sont stockées sur une infrastructure située en France, pour
          rester au plus près du cadre scolaire et de la réglementation nationale.</p>
        </div>
        <div class="trust-card" data-reveal data-delay="2">
          <div class="trust-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></div>
          <h3>Conforme RGPD</h3>
          <p>Collecte minimale, finalités claires et maîtrise de vos données&nbsp;:
          ClassFlow est pensé dès la conception pour respecter le RGPD.</p>
        </div>
        <div class="trust-card" data-reveal data-delay="3">
          <div class="trust-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 11a4 4 0 1 0-8 0M3 21c1-4 17-4 18 0M19 8l1.5 1.5L23 7"/></svg></div>
          <h3>Conçu avec des enseignants</h3>
          <p>Chaque fonctionnalité est imaginée et testée avec des professeurs des
          écoles. L'outil suit vos pratiques réelles, pas l'inverse.</p>
        </div>
      </div>

      <p class="trust-note" data-reveal>
        ClassFlow se construit avec les premiers établissements partenaires.
      </p>
    </div>
  </section>

  <!-- ==================================================== -->
  <!-- VISION                                                -->
  <!-- ==================================================== -->
  <section class="section vision">
    <div class="wrap vision-inner">
      <div data-reveal>
        <span class="eyebrow">La vision</span>
        <h2 class="h-section" style="margin:16px 0 18px;">D'un outil du prof<br />à l'écosystème de l'école</h2>
        <p class="lede" style="margin-bottom:14px;">ClassFlow commence dans les mains du
        professeur. Demain, l'inclusion se joue aussi avec les familles et toute l'équipe
        de l'école.</p>
        <p style="color:var(--ink-2); font-size:16px;">Notre cap&nbsp;: faire grandir un
        écosystème cohérent autour de l'élève — du quotidien de la classe jusqu'au lien
        avec les parents.</p>
      </div>

      <div class="timeline" data-reveal data-delay="1">
        <div class="tl-item is-now">
          <div class="tl-rail"><span class="tl-dot"></span><span class="tl-line"></span></div>
          <div class="tl-body">
            <div class="tl-when">Aujourd'hui</div>
            <h4>L'outil du professeur</h4>
            <p>Adaptation des supports, dispositifs et gestion de classe tout-en-un.</p>
          </div>
        </div>
        <div class="tl-item">
          <div class="tl-rail"><span class="tl-dot"></span><span class="tl-line"></span></div>
          <div class="tl-body">
            <div class="tl-when">Prochaine étape</div>
            <h4>Le portail parent</h4>
            <p>Un lien clair avec les familles autour des progrès et des aménagements.</p>
          </div>
        </div>
        <div class="tl-item">
          <div class="tl-rail"><span class="tl-dot"></span></div>
          <div class="tl-body">
            <div class="tl-when">À terme</div>
            <h4>La suite école</h4>
            <p>Une cohérence à l'échelle de l'établissement, pour toute l'équipe éducative.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==================================================== -->
  <!-- CTA FINAL / FORMULAIRE                                -->
  <!-- ==================================================== -->
  <section class="section cta" id="contact">
    <div class="wrap cta-grid">
      <div data-reveal>
        <span class="eyebrow center" style="color:var(--coral-300)">Demander une démo</span>
        <h2 style="margin-top:16px;">Découvrez ClassFlow avec votre classe</h2>
        <p class="lede">Présentez-nous votre contexte&nbsp;: nous vous montrons l'adaptation
        des supports en direct et répondons à vos questions sur les données et le déploiement.</p>
        <ul class="cta-points">
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-9"/></svg> Démonstration adaptée à votre cycle (2 ou 3)</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-9"/></svg> Échange sur l'hébergement et le RGPD</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-9"/></svg> Conditions « premiers établissements »</li>
        </ul>
      </div>

      <!-- Formulaire de contact -->
      <div data-reveal data-delay="1">
        <form class="form" id="demoForm" novalidate>
          <h3>Parlons de votre établissement</h3>
          <p class="form-sub">Réponse sous 48&nbsp;h ouvrées.</p>

          <div class="field">
            <label for="f-nom">Nom et prénom <span class="req">*</span></label>
            <input id="f-nom" name="nom" type="text" autocomplete="name" placeholder="Camille Durand" required />
          </div>

          <div class="form-row">
            <div class="field">
              <label for="f-email">E-mail <span class="req">*</span></label>
              <input id="f-email" name="email" type="email" autocomplete="email" placeholder="camille.durand@ac-…" required />
            </div>
            <div class="field">
              <label for="f-etab">Établissement</label>
              <input id="f-etab" name="etablissement" type="text" placeholder="École, INSPÉ, rectorat…" />
            </div>
          </div>

          <div class="field">
            <label for="f-msg">Votre message</label>
            <textarea id="f-msg" name="message" placeholder="Votre contexte, votre cycle, vos besoins…"></textarea>
          </div>

          <button class="btn btn-primary btn-lg btn-block" type="submit">Demander une démo</button>

          <p class="form-legal">
            En envoyant ce formulaire, vous acceptez d'être recontacté·e au sujet de ClassFlow.
            Vos données ne sont utilisées que pour cet échange — voir notre
            <a href="#confiance">politique de confidentialité</a>.
          </p>
        </form>

        <!-- État de succès (affiché après envoi) -->
        <div class="form form-success" id="formSuccess" role="status" aria-live="polite">
          <span class="check"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-9"/></svg></span>
          <h3>Merci, c'est noté&nbsp;!</h3>
          <p>Nous revenons vers vous très vite pour organiser votre démonstration.</p>
        </div>
      </div>
    </div>
  </section>
`;
