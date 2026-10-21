// Jeux fictifs éditoriaux ; codes de ref_disciplines et couleurs :
// MCF-App/app/lib/desktop/planning_data.dart::couleurMatiere, d91a67df.
export const MATIERES = {
  francais: { nom: 'Français', token: 'subj-fr' },
  mathematiques: { nom: 'Mathématiques', token: 'subj-math' },
  questionner_monde: { nom: 'Questionner le monde', token: 'subj-quest' },
  sciences_techno: { nom: 'Sciences et technologie', token: 'subj-quest' },
  arts_pl: { nom: 'Arts plastiques', token: 'subj-art' },
  musique: { nom: 'Éducation musicale', token: 'subj-art' },
  eps: { nom: 'EPS', token: 'subj-eps' },
  lv: { nom: 'Langues vivantes', token: 'subj-ang' },
  histoire: { nom: 'Histoire', token: 'subj-other' },
  geographie: { nom: 'Géographie', token: 'subj-other' },
  emc: { nom: 'EMC', token: 'subj-other' },
};
export const CLASSE_CE1 = 'CE1 · Les Tilleuls';
export const CRITERES_INES = ['Espacer les lettres', 'Augmenter l’interligne', 'Consignes courtes et directes'];
export const PHASES_MESURE = [
  ['Le défi', 5, 'Collectif', 'Comparer deux rubans fixés au tableau. Comment savoir lequel est le plus long ?'],
  ['Essais', 10, 'Binômes', 'Mesurer trois bandes de papier. Noter les longueurs et comparer les résultats.'],
  ['On en parle', 8, 'Collectif', 'Placer le zéro au début du segment, lire la graduation et écrire « cm ».'],
  ['À soi', 12, 'Individuel', 'Mesurer quatre segments, puis tracer un segment de 7 cm en partant du zéro.'],
  ['Vérification', 5, 'Collectif', 'Mesurer les rubans du défi et donner une longueur sur l’ardoise.'],
];
const seance = (debut, fin, code, titre, objectif, materiel = 0, pieces = 0) => ({ debut, fin, code, titre, objectif, materiel, pieces });
const pause = (debut, fin, titre = 'Récréation') => seance(debut, fin, null, titre, '');
// Semaine CE1 du 2 au 6 novembre 2026. Le mardi reprend exactement l'exemple de la fiche.
export const JOURNAL = [
  [
    seance('08:30','08:45','mathematiques','Rituel : compter de 2 en 2','Poursuivre une suite numérique jusqu’à 100.'),
    seance('08:45','09:45','francais','Découvrir le texte du hérisson','Identifier le sujet d’un texte documentaire.',2,1),
    seance('09:45','10:25','mathematiques','Comparer des longueurs','Comparer deux objets par report avec une bande.',3),
    pause('10:25','10:40'),
    seance('10:40','11:30','francais','Le nom et son déterminant','Repérer le nom dans un groupe nominal.'),
    seance('13:30','14:30','eps','Lancer vers une cible','Adapter son geste pour atteindre une zone.',2),
    seance('14:30','15:15','arts_pl','Le hérisson en papier','Assembler des formes et varier les textures.',3),
    pause('15:15','15:30'),
    seance('15:30','16:15','questionner_monde','Observer un animal','Décrire les parties du corps du hérisson.',1,1),
  ],
  [
    seance('08:30','08:45','mathematiques','Rituel : les doubles','Donner les doubles des nombres jusqu’à 10.'),
    seance('08:45','09:45','francais','Lecture : « Le hérisson en hiver »','Retrouver deux informations dans un texte documentaire.',2,1),
    seance('09:45','10:25','mathematiques','Mesurer un segment avec la règle','Mesurer au centimètre près en partant du zéro.',5,1),
    pause('10:25','10:40'),
    seance('10:40','11:30','francais','Copie : la phrase du jour','Copier une phrase sans erreur en respectant les lignes.'),
    seance('13:30','14:30','eps','Lancer loin','Lancer d’une main après un élan.',2),
    seance('14:30','15:15','emc','Les règles de la cour','Proposer une règle et dire à quoi elle sert.'),
    pause('15:15','15:30'),
    seance('15:30','16:15','questionner_monde','Ce que mange le hérisson','Classer des aliments et justifier son choix.',2,1),
  ],
  [
    seance('08:30','08:45','mathematiques','Rituel : mesurer à partir du zéro','Repérer la première graduation de la règle.'),
    seance('08:45','09:45','francais','Écrire une phrase documentaire','Écrire une phrase complète sur le hérisson.',1),
    seance('09:45','10:25','mathematiques','Tracer un segment de 7 cm','Utiliser la règle pour tracer une longueur donnée.',2,1),
    pause('10:25','10:40'),
    seance('10:40','11:30','musique','Écouter et reproduire un rythme','Reproduire une courte suite de frappés.'),
  ],
  [
    seance('08:30','08:45','mathematiques','Rituel : les compléments à 10','Associer deux nombres dont la somme vaut 10.'),
    seance('08:45','09:45','francais','Lecture : relire pour comprendre','Justifier une réponse par une phrase du texte.',1,1),
    seance('09:45','10:25','mathematiques','Mesurer quatre segments','Mesurer puis comparer ses résultats à ceux d’un pair.',5,2),
    pause('10:25','10:40'),
    seance('10:40','11:30','francais','Copie et relecture','Relire sa copie mot à mot.'),
    seance('13:30','14:30','lv','The colours','Nommer les couleurs et répondre à une question simple.'),
    seance('14:30','15:15','emc','Nos règles de la cour','Formuler une règle commune et l’illustrer.',1),
    pause('15:15','15:30'),
    seance('15:30','16:15','questionner_monde','Préparer l’hiver','Relier les besoins d’un animal à son milieu.',1),
  ],
  [
    seance('08:30','08:45','mathematiques','Rituel : doubles et compléments','Mobiliser les résultats mémorisés.'),
    seance('08:45','09:45','francais','Présenter notre documentaire','Lire à voix haute une phrase préparée.',1),
    seance('09:45','10:25','mathematiques','La chasse aux longueurs','Mesurer des objets de la classe en centimètres.',3),
    pause('10:25','10:40'),
    seance('10:40','11:30','francais','Écrire la légende d’une image','Associer une phrase précise à une illustration.',1),
    seance('13:30','14:30','eps','Nos défis de lancer','Choisir un geste adapté à la distance.',2),
    seance('14:30','15:15','arts_pl','Terminer le hérisson en papier','Soigner les assemblages et présenter sa production.',3),
    pause('15:15','15:30'),
    seance('15:30','16:15','emc','Conseil de la classe','Écouter une proposition et argumenter son avis.'),
  ],
];
// CM2 : les heures de la fiche EDT, pauses comprises. Chaque créneau a un début/une fin réels.
const c = (debut,fin,code,titre) => ({debut,fin,code,titre});
export const EDT = [
  [c('08:30','09:30','francais','Lecture et compréhension'),c('09:30','10:15','histoire','Se repérer dans le temps'),pause('10:15','10:30'),c('10:30','11:45','mathematiques','Nombres et calcul'),c('13:30','14:30','eps','Jeux collectifs'),pause('14:30','14:45'),c('14:45','15:45','francais','Étude de la langue')],
  [c('08:30','09:30','francais','Lecture et compréhension'),c('09:30','10:15','sciences_techno','Observer et expérimenter'),pause('10:15','10:30'),c('10:30','11:45','francais','Production d’écrits'),c('13:30','14:30','mathematiques','Grandeurs et mesures'),pause('14:30','14:45'),c('14:45','15:45','arts_pl','Pratiques artistiques')],
  [c('08:30','09:30','francais','Lecture à voix haute'),pause('09:30','09:45'),c('09:45','10:30','geographie','Habiter et se déplacer')],
  [c('08:30','09:30','francais','Étude de la langue'),c('09:30','10:15','musique','Écoute et chant'),pause('10:15','10:30'),c('10:30','11:45','mathematiques','Résolution de problèmes'),c('13:30','14:30','sciences_techno','Sciences et technologie'),pause('14:30','14:45'),c('14:45','15:45','eps','Activités athlétiques')],
  [c('08:30','09:30','mathematiques','Espace et géométrie'),c('09:30','10:15','eps','Parcours et motricité'),pause('10:15','10:30'),c('10:30','11:45','lv','Comprendre et s’exprimer'),c('13:30','14:30','francais','Production d’écrits'),pause('14:30','14:45'),c('14:45','15:45','emc','Histoire, géographie et EMC')],
];
export const minutes = (heure) => { const [h,m]=heure.split(':').map(Number); return h*60+m; };
export const duree = (slot) => minutes(slot.fin)-minutes(slot.debut);
export const formatDuree = (n) => `${Math.floor(n/60)} h${n%60 ? ' '+String(n%60).padStart(2,'0') : ''}`;
export const TACHES = [
  { titre:'Rendre les cahiers de lecture',detail:'Les cahiers sont prêts dans le bac de la classe.',quand:'Demain',code:'francais' },
  { titre:'Photocopier la fiche de mesure, version d’origine et version adaptée',detail:'Pour la séance de jeudi : quatre segments à mesurer, puis un segment de 7 cm à tracer.',quand:'5 nov.',code:'mathematiques',eleves:['Inès'] },
  { titre:'Récupérer les autorisations de sortie au musée',detail:'Deux autorisations restent à récupérer.',quand:'6 nov.',eleves:['Maël','Nour'] },
  { titre:'Préparer la réunion avec les familles',detail:'Rassembler les exemples de travaux de la période.',quand:'12 nov.' },
  { titre:'Commander des règles aux graduations agrandies',detail:'Repérer le zéro et conserver une graduation en centimètres.',quand:'Sans échéance' },
];
export const IMPORT = [
 ['Adam','Brunet',''],['Chloé','Duval',''],['Inès','Martin','Déjà dans la classe'],['Lucas','Petit',''],
 ['Maël','R?naud','À vérifier'],['Nour','Saïdi',''],['Lucas','Petit','En double dans la liste'],['Théo','Vidal',''],
];
