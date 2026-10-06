/**
 * Produits. Pour en ajouter un : copier un bloc, changer `slug` (= URL /produits/<slug>/).
 * La page, l'accueil, la liste des produits et le sitemap se mettent à jour seuls.
 */
export type Product = {
  slug: string;
  name: string;
  status: 'En développement' | 'À venir' | 'Disponible';
  tagline: string;
  summary: string;
  seoDescription: string;
  spec: { label: string; value: string }[];
  problem: { title: string; paragraphs: string[] };
  solution: { title: string; paragraphs: string[] };
  steps: { title: string; text: string }[];
  benefits: { title: string; text: string }[];
  cta: { title: string; text: string; button: string };
};

export const products: Product[] = [
  {
    slug: 'factually',
    name: 'Factually',
    status: 'En développement',
    tagline: 'Vérifier une information, sources à l’appui.',
    summary:
      'Un outil de vérification des faits assisté par IA. Il repère les affirmations vérifiables d’un texte, recherche des sources et présente, pour chacune, des éléments que l’on peut contrôler.',
    seoDescription:
      'Factually, l’outil de vérification des faits assisté par IA d’Asans6, pour les médias, les entreprises et les particuliers. Des conclusions traçables, sources à l’appui.',
    spec: [
      { label: 'Statut', value: 'En développement' },
      { label: 'Pour qui', value: 'Médias, entreprises, particuliers' },
      { label: 'Entrée', value: 'Un texte, une déclaration, un article' },
      { label: 'Sortie', value: 'Les affirmations, leurs sources, une conclusion nuancée' },
      { label: 'Principe', value: 'L’IA cherche, les sources prouvent, l’humain décide' },
    ],
    problem: {
      title: 'Une erreur circule en quelques minutes. La vérifier prend des heures.',
      paragraphs: [
        'Vérifier sérieusement une affirmation, c’est retrouver sa source d’origine, consulter des données publiques, croiser plusieurs documents. C’est un travail long, et il est souvent fait dans l’urgence.',
        'Les rédactions manquent de temps, les entreprises risquent de relayer une information fausse, et chacun reçoit chaque jour plus d’informations qu’il ne peut en contrôler.',
      ],
    },
    solution: {
      title: 'L’outil fait la recherche. Vous gardez le jugement.',
      paragraphs: [
        'Factually prend en charge la partie la plus longue de la vérification, la recherche et le tri des sources, et laisse la décision à la personne qui vérifie.',
        'Il ne se contente pas d’un verdict. Il montre d’où vient chaque élément, pour que la conclusion puisse être relue, discutée et corrigée.',
      ],
    },
    steps: [
      { title: 'Soumettre', text: 'Vous collez un texte, une déclaration ou le lien d’un article.' },
      {
        title: 'Extraire',
        text: 'Factually isole les affirmations vérifiables qu’il contient, comme des chiffres, des citations ou des faits datés.',
      },
      { title: 'Rechercher', text: 'Pour chaque affirmation, il interroge des sources et retient les passages pertinents.' },
      {
        title: 'Présenter',
        text: 'Vous obtenez, affirmation par affirmation, ce qui la confirme, la nuance ou la contredit, avec le lien vers chaque source.',
      },
    ],
    benefits: [
      { title: 'Du temps rendu à l’analyse', text: 'La collecte des sources est accélérée. Le raisonnement, lui, reste le vôtre.' },
      { title: 'Des conclusions traçables', text: 'Chaque élément renvoie à sa source. On peut vérifier la vérification.' },
      {
        title: 'De la nuance plutôt qu’un verdict binaire',
        text: 'Une affirmation peut être exacte, trompeuse, invérifiable ou fausse. L’outil fait la différence et l’explique.',
      },
      { title: 'L’humain garde la main', text: 'Factually assiste la vérification. Il ne publie rien et ne tranche rien à votre place.' },
    ],
    cta: {
      title: 'Voir Factually sur vos propres cas',
      text: 'Vous travaillez dans une rédaction, une équipe de communication ou de veille ? Demandez une démonstration ou décrivez-nous vos besoins. Vos cas d’usage orientent le développement.',
      button: 'Demander une démonstration',
    },
  },
  {
    slug: 'tixa',
    name: 'Tixa',
    status: 'À venir',
    tagline: 'Les appels et les clients d’un chauffeur de taxi, enfin réunis.',
    summary:
      'Une application pour les chauffeurs de taxi. Elle aide à ne plus perdre d’appels, à reconnaître ses clients réguliers et à organiser les courses réservées.',
    seoDescription:
      'Tixa, la future application d’Asans6 pour les chauffeurs de taxi, pour gérer les appels, les clients réguliers et les courses réservées depuis un seul endroit.',
    spec: [
      { label: 'Statut', value: 'À venir' },
      { label: 'Pour qui', value: 'Chauffeurs de taxi' },
      { label: 'Support', value: 'Application mobile' },
      { label: 'Rôle', value: 'Appels, clients et courses réservées au même endroit' },
    ],
    problem: {
      title: 'Le téléphone sonne pendant la course.',
      paragraphs: [
        'Un chauffeur de taxi reçoit une grande partie de ses réservations par téléphone, souvent en conduisant. Décrocher n’est pas toujours possible, et un appel manqué peut être une course perdue.',
        'Les numéros des clients réguliers, leurs adresses habituelles et les courses prévues finissent dispersés entre le répertoire, des notes et la mémoire.',
      ],
    },
    solution: {
      title: 'Un seul endroit pour les appels, les clients et les courses.',
      paragraphs: [
        'Tixa réunit l’historique des appels, le carnet de clients et les courses à venir dans une même application, pensée pour être utilisée à l’arrêt, en quelques gestes.',
      ],
    },
    steps: [
      { title: 'Un appel arrive', text: 'Si le numéro est déjà connu, Tixa affiche le nom du client et ses informations utiles.' },
      { title: 'Rien ne se perd', text: 'Les appels manqués sont listés, avec ce qu’il faut pour rappeler au bon moment.' },
      { title: 'La course est notée', text: 'Une réservation se crée à partir de l’appel, sans ressaisir le numéro.' },
      {
        title: 'Le carnet se construit',
        text: 'Au fil des courses, chaque client a sa fiche avec ses adresses habituelles et son historique.',
      },
    ],
    benefits: [
      { title: 'Moins de courses perdues', text: 'Chaque appel manqué reste visible jusqu’à ce qu’il soit traité.' },
      { title: 'Des clients reconnus', text: 'Un client régulier est identifié dès son appel, sans chercher dans le répertoire.' },
      { title: 'Une journée organisée', text: 'Les courses réservées sont regroupées et classées dans l’ordre chronologique.' },
    ],
    cta: {
      title: 'Vous êtes chauffeur de taxi ?',
      text: 'Tixa est en préparation. Racontez-nous comment vous gérez vos appels aujourd’hui. Ces échanges nous aident à construire un outil adapté au métier.',
      button: 'Nous écrire',
    },
  },
];
