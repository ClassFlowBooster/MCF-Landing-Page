// Critères pédagogiques actifs de l'app, avec leurs libellés et réglages exacts.
// Source : MCF-App, app/supabase/migrations/072_criteres_pedagogiques.sql ; familles affichées :
// app/lib/models/critere_pedagogique.dart:26 (origin/main d2e47705).
// « Agrandir le texte » (lis.taille_texte) est inactif dans l'app : il n'y figure pas.
// « Changer de police » : les polices proposées ne sont pas listées (le choix a changé depuis
// la migration 079 et la prod peut différer du dépôt).
// Chaque critère : [libellé, ce que fait l'adaptation, réglages proposés, null (case seule) ou
// "polices" (liste de polices non publiée)].
export const CRITERES_APP = [
  ["Lisibilité", [
    ["Changer de police", "Le support est écrit dans une autre police de caractères.", "polices"],
    ["Augmenter l'interligne", "Les lignes sont plus écartées les unes des autres.", ["1,5", "2"]],
    ["Espacer les lettres", "Les lettres d'un même mot sont un peu plus écartées.", ["Léger", "Moyen", "Fort"]],
    ["Raccourcir les lignes", "Le texte tient sur des lignes plus courtes.", ["15 cm", "12 cm"]],
    ["Fond crème", "La page a un fond crème au lieu d'un fond blanc.", null],
    ["Surligner une ligne sur deux", "Dans les textes, une ligne sur deux a un fond légèrement coloré.", null],
    ["Syllabes en couleurs dans les textes à lire", "Dans les textes à lire, les syllabes alternent entre deux couleurs.", null],
    ["Sons complexes en évidence dans les textes à lire", "Dans les textes à lire, les sons écrits avec plusieurs lettres sont mis en évidence.", null],
    ["Lettres muettes en gris dans les textes à lire", "Dans les textes à lire, les lettres qui ne se prononcent pas sont écrites en gris.", null],
    ["Limiter les couleurs", "Le support utilise très peu de couleurs.", null],
    ["Surligner les informations utiles", "Les informations nécessaires pour répondre sont surlignées.", null],
  ]],
  ["Consignes", [
    ["Consignes courtes et directes", "Les consignes sont écrites en phrases courtes.", null],
    ["Vocabulaire simple", "Les mots difficiles des consignes sont remplacés par des mots courants.", ["Définitions entre parenthèses", "Mots courants", "Les deux"]],
    ["Remplacer ou expliquer les expressions imagées", "Les expressions imagées sont remplacées ou expliquées.", ["Dans les consignes", "Dans les consignes et les textes"]],
    ["Formulations positives et directes", "Les consignes disent ce qu'il faut faire plutôt que ce qu'il ne faut pas faire.", ["Dans les questions", "Dans toutes les consignes"]],
    ["Préciser quoi faire, où, combien", "Chaque consigne dit quoi faire, à quel endroit et combien de fois.", null],
    ["Rappel court de la consigne", "Un rappel de la consigne en quelques mots est ajouté à l'exercice.", null],
    ["Lexique des mots difficiles", "Un petit lexique explique les mots difficiles du support.", null],
    ["Glossaire des verbes de consigne", "Un encadré explique les verbes de consigne du support (huit au plus).", null],
    ["Résumé d'une ligne par exercice", "Chaque exercice commence par une ligne qui résume ce qu'il faut faire.", null],
    ["Séparer en sous-exercices les consignes à plusieurs actions", "Un exercice qui demande plusieurs actions est séparé en sous-exercices.", null],
    ["Consignes en étapes numérotées", "Chaque consigne est présentée en étapes numérotées, même si elle paraît simple.", null],
  ]],
  ["Structure", [
    ["Fond de couleur sous chaque consigne", "Chaque consigne est posée sur un fond de couleur pâle.", null],
    ["Textes en paragraphes courts", "Les textes longs sont découpés en paragraphes courts.", ["Sans sous-titres", "Avec sous-titres"]],
    ["Séparations dans les textes longs", "Des séparations visibles découpent les textes longs.", null],
    ["Rappels au fil d'un texte long", "De courts rappels sont ajoutés au fil des textes longs.", null],
    ["Repères de couleur par partie", "Chaque partie du support a sa couleur et son étiquette.", null],
    ["Afficher la progression", "Un repère montre où l'on en est dans le support.", null],
    ["Repère « Commence ici »", "Un repère « Commence ici » montre où démarrer.", null],
    ["« Lis toute la fiche avant de commencer »", "Le support commence par la mention « Lis toute la fiche avant de commencer ».", null],
    ["Case de vérification à la fin de chaque exercice", "Une case à cocher « J'ai vérifié » termine chaque exercice.", null],
    ["Encadré d'annonce", "Un encadré en tête de support annonce la durée, le matériel et le barème.", ["Encadré seul", "Avec la case « J'ai terminé et relu »"]],
  ]],
  ["Exercices", [
    ["Exemple résolu", "Un exemple déjà fait montre ce qui est attendu.", ["Quand le format est ambigu", "À chaque exercice"]],
    ["Aide-mémoire", "Un aide-mémoire rappelle la règle ou la méthode utile à l'exercice.", ["Repères utiles à l'exercice", "Règles d'orthographe", "Les deux"]],
    ["Banque de mots", "Les mots à utiliser sont donnés dans une banque de mots.", ["Sans intrus", "Avec un ou deux intrus"]],
    ["Moins d'écriture : textes à trous, cases, QCM", "Les réponses à rédiger deviennent des textes à trous, des cases à cocher ou des QCM.", ["Textes à trous", "Cases à cocher", "Textes à trous et cases", "Textes à trous, QCM et cases"]],
    ["Moins d'items par exercice", "Chaque exercice garde moins d'items ; ce qui est vérifié reste le même.", ["Un peu moins", "Beaucoup moins, trois items au moins", "Beaucoup moins"]],
    ["Lignes d'écriture", "Les lignes pour écrire changent de réglure.", ["Lignes simples", "Seyès", "Double ligne", "Double ligne haute"]],
    ["Point de départ sur chaque ligne", "Un point marque le début de chaque ligne d'écriture.", null],
    ["Tableaux agrandis", "Les cases des tableaux sont plus grandes.", null],
    ["Fournir le texte à recopier", "Le texte à recopier est déjà écrit dans l'exercice.", null],
    ["Relier par numéros plutôt qu'au trait", "Pour relier, l'élève écrit un numéro au lieu de tracer un trait.", null],
    ["Dictée à trous", "La dictée devient un texte à compléter.", null],
    ["Marche à suivre pour les consignes longues", "Une marche à suivre accompagne les consignes longues.", null],
    ["Mention « le soin de l'écriture n'est pas noté »", "Sur une évaluation, une mention précise que le soin de l'écriture n'est pas noté.", null],
    ["Amorces de réponse", "Le début de chaque réponse à rédiger est déjà écrit.", null],
  ]],
  ["Supports visuels", [
    ["Pictogramme devant les consignes", "Un pictogramme précède les consignes dont le verbe est reconnu.", null],
    ["Émoji devant les mots concrets des banques de mots", "Dans les banques de mots, un émoji précède les mots concrets.", null],
    ["Flèche de sens de lecture", "Une flèche indique le sens de lecture.", null],
  ]],
];
