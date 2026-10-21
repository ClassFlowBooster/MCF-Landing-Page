# Relevé IA

Le relevé pose les dix questions à Claude et ChatGPT via les abonnements existants. Il écrit un CSV UTF-8 avec BOM et séparateur `;`, un résumé Markdown et `reponses-AAAA-MM-JJ.json`, par défaut dans `../MCF-Pilotage/docs/suivi-ia/`. Il ne commite ni ne pousse rien dans MCF-Pilotage.

Chaque question est une session neuve dans un dossier temporaire vide hors dépôt, supprimé à la fin : ni dépôt, ni `CLAUDE.md`, ni mémoire. Claude est en mode sûr, sans persistance ni configuration/MCP, et ses outils sont limités à `WebSearch,WebFetch`. Codex est éphémère, en lecture seule dans ce dossier vide, sans configuration ni règles utilisateur; shell, applications, plugins, navigateur et ordinateur sont désactivés. Seule la recherche web `live` reste permise. La consigne impose une recherche et une ligne de sources. Les flux JSON vérifient recherche et absence d'outil local.

Colonnes : `date`, `ia`, `modele`, `n`, `question`, `cite`, `rang`, `concurrents`, `lien`, `sources`, `erreur`. Une réponse sans recherche reste analysée mais porte l'erreur. `rang` est la place de première mention de MyClassFlow parmi les outils reconnus. Les modèles sont `claude -p` et `codex exec`.

Essai, sans processus ni réseau :

    node outils/suivi-ia/releve.mjs --essai --sortie /tmp/x

Lancement réel :

    node outils/suivi-ia/releve.mjs

Les fichiers sont réécrits après chaque question : un relevé interrompu garde ce qu'il a déjà obtenu.

Consommation : 20 questions par semaine sur les abonnements existants.

## Planification macOS

Seulement sur go de Joseph. Le relevé tourne depuis un worktree dédié sur `main` (le checkout principal peut être sur une autre branche) ; ses résultats vont alors dans `~/Documents/ClassFlowBooster/MCF-Pilotage/docs/suivi-ia/`, sans commit.

    D=~/Documents/ClassFlowBooster/MCF-Landing-Page-suivi-ia
    git -C ~/Documents/ClassFlowBooster/MCF-Landing-Page fetch origin
    git -C ~/Documents/ClassFlowBooster/MCF-Landing-Page worktree add --detach "$D" origin/main
    sed -e "s#__DEPOT__#$D#g" -e "s#__HOME__#$HOME#g" "$D/outils/suivi-ia/fr.myclassflow.suivi-ia.plist" > ~/Library/LaunchAgents/fr.myclassflow.suivi-ia.plist
    plutil -lint ~/Library/LaunchAgents/fr.myclassflow.suivi-ia.plist
    launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/fr.myclassflow.suivi-ia.plist
    launchctl print gui/$(id -u)/fr.myclassflow.suivi-ia | head -20

Chaque lundi à 8 h (au réveil du Mac s'il dormait), hors de la file `lourd.sh` : le relevé attend surtout le réseau et ne charge pas le Mac ; journal : `~/Library/Logs/mcf-suivi-ia.log`. Lancer tout de suite pour essayer : `launchctl kickstart gui/$(id -u)/fr.myclassflow.suivi-ia`. Mettre le relevé à jour après un merge : `git -C "$D" checkout --detach origin/main` après un `fetch`.

Retour arrière :

    launchctl bootout gui/$(id -u)/fr.myclassflow.suivi-ia
    rm ~/Library/LaunchAgents/fr.myclassflow.suivi-ia.plist
    git -C ~/Documents/ClassFlowBooster/MCF-Landing-Page worktree remove ~/Documents/ClassFlowBooster/MCF-Landing-Page-suivi-ia

## Limite honnête

C'est un indicateur proche de ChatGPT et de Claude, pas l'app grand public exacte : autre interface, modèle et réglages par défaut de Claude Code et de Codex, consigne de recherche web ajoutée, pas d'historique ni de personnalisation. « ChatGPT » désigne ici Codex connecté au compte ChatGPT, pas l'application ChatGPT. Le repérage est textuel : une mention négative ou dans une comparaison compte aussi. Les assistants reçoivent un environnement minimal. Le plist exige que `node`, `claude` et `codex` soient disponibles dans son `PATH`. On suit une tendance d'une semaine à l'autre, pas une mesure exacte.
