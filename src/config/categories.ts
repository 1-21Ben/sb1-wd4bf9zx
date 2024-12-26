export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface MainCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  subcategories: SubCategory[];
}

export const PRODUCT_CATEGORIES: MainCategory[] = [
  {
    id: 'interior-paints',
    name: 'PEINTURES INTÉRIEURES',
    slug: 'peintures-interieures',
    description: 'Gamme complète de peintures pour tous vos projets intérieurs',
    icon: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f',
    subcategories: [
      { id: 'walls', name: 'Murs', slug: 'murs', description: 'Peintures pour murs intérieurs' },
      { id: 'ceilings', name: 'Plafonds', slug: 'plafonds', description: 'Peintures spéciales plafonds' },
      { id: 'kitchen-bath', name: 'Cuisine & Salle de bain', slug: 'cuisine-salle-de-bain', description: 'Solutions spécifiques pour pièces humides' },
    ]
  },
  {
    id: 'facades',
    name: 'FAÇADES',
    slug: 'facades',
    description: 'Solutions durables pour la protection et décoration des façades',
    icon: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343',
    subcategories: [
      { id: 'exterior-paints', name: 'Peintures façades', slug: 'peintures-facades', description: 'Peintures pour façades extérieures' },
      { id: 'waterproofing', name: 'Imperméabilisation', slug: 'impermeabilisation', description: 'Produits d\'étanchéité' },
      { id: 'decorative', name: 'Revêtements décoratifs', slug: 'revetements-decoratifs', description: 'Finitions décoratives pour façades' },
    ]
  },
  {
    id: 'etics',
    name: 'I.T.E.',
    slug: 'isolation-thermique-exterieure',
    description: 'Systèmes complets d\'isolation thermique par l\'extérieur',
    icon: 'https://images.unsplash.com/photo-1621189406926-9de4a703f41c',
    subcategories: [
      { id: 'insulation', name: 'Isolation', slug: 'isolation', description: 'Panneaux et systèmes isolants' },
      { id: 'reinforcement', name: 'Armatures', slug: 'armatures', description: 'Systèmes de renforcement' },
      { id: 'finishing', name: 'Finitions', slug: 'finitions', description: 'Enduits de finition' },
    ]
  },
  {
    id: 'wood',
    name: 'BOIS',
    slug: 'bois',
    description: 'Protection et décoration des surfaces en bois',
    icon: 'https://images.unsplash.com/photo-1533327325824-76bc4e62d560',
    subcategories: [
      { id: 'lasures', name: 'Lasures', slug: 'lasures', description: 'Lasures protectrices' },
      { id: 'varnishes', name: 'Vernis', slug: 'vernis', description: 'Vernis décoratifs' },
      { id: 'oils', name: 'Huiles', slug: 'huiles', description: 'Huiles de protection' },
    ]
  },
  {
    id: 'metals',
    name: 'MÉTAUX',
    slug: 'metaux',
    description: 'Solutions anticorrosion et décoratives pour métaux',
    icon: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a',
    subcategories: [
      { id: 'primers', name: 'Primaires', slug: 'primaires', description: 'Primaires anticorrosion' },
      { id: 'finishes', name: 'Finitions', slug: 'finitions-metal', description: 'Peintures de finition' },
      { id: 'special', name: 'Spécialités', slug: 'specialites', description: 'Traitements spéciaux' },
    ]
  },
  {
    id: 'floors',
    name: 'SOLS',
    slug: 'sols',
    description: 'Revêtements et peintures pour tous types de sols',
    icon: 'https://images.unsplash.com/photo-1581094794329-c8112c4e5190',
    subcategories: [
      { id: 'concrete', name: 'Béton', slug: 'beton', description: 'Peintures pour sols en béton' },
      { id: 'epoxy', name: 'Époxy', slug: 'epoxy', description: 'Revêtements époxy' },
      { id: 'marking', name: 'Marquage', slug: 'marquage', description: 'Peintures de marquage' },
    ]
  },
  {
    id: 'preparation',
    name: 'PRODUITS DE MISE EN ŒUVRE',
    slug: 'produits-mise-en-oeuvre',
    description: 'Produits pour la préparation et l\'application',
    icon: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837',
    subcategories: [
      { id: 'primers', name: 'Primaires', slug: 'primaires-preparation', description: 'Primaires d\'accrochage' },
      { id: 'fillers', name: 'Enduits', slug: 'enduits', description: 'Enduits de préparation' },
      { id: 'cleaners', name: 'Nettoyants', slug: 'nettoyants', description: 'Produits de nettoyage' },
    ]
  },
  {
    id: 'tools',
    name: 'OUTILLAGE ET MATÉRIEL',
    slug: 'outillage-materiel',
    description: 'Outils professionnels pour l\'application',
    icon: 'https://images.unsplash.com/photo-1581092160607-7bodq5qCPH',
    subcategories: [
      { id: 'brushes', name: 'Brosses & Rouleaux', slug: 'brosses-rouleaux', description: 'Outils d\'application' },
      { id: 'sprayers', name: 'Pulvérisateurs', slug: 'pulverisateurs', description: 'Équipement de pulvérisation' },
      { id: 'accessories', name: 'Accessoires', slug: 'accessoires', description: 'Accessoires divers' },
    ]
  },
  {
    id: 'safety',
    name: 'PROTECTION INDIVIDUELLE ET SÉCURITÉ',
    slug: 'protection-securite',
    description: 'Équipements de protection individuelle',
    icon: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837',
    subcategories: [
      { id: 'clothing', name: 'Vêtements', slug: 'vetements', description: 'Vêtements de protection' },
      { id: 'masks', name: 'Masques', slug: 'masques', description: 'Protection respiratoire' },
      { id: 'equipment', name: 'Équipements', slug: 'equipements', description: 'Équipements de sécurité' },
    ]
  },
  {
    id: 'flooring',
    name: 'REVÊTEMENTS DE SOLS & ACCESSOIRES',
    slug: 'revetements-sols-accessoires',
    description: 'Solutions complètes pour les sols',
    icon: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837',
    subcategories: [
      { id: 'coverings', name: 'Revêtements', slug: 'revetements', description: 'Revêtements de sol' },
      { id: 'profiles', name: 'Profilés', slug: 'profiles', description: 'Profilés de finition' },
      { id: 'underlays', name: 'Sous-couches', slug: 'sous-couches', description: 'Sous-couches techniques' },
    ]
  },
];

export function getCategoryBySlug(slug: string): MainCategory | undefined {
  return PRODUCT_CATEGORIES.find(category => category.slug === slug);
}

export function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string): SubCategory | undefined {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find(sub => sub.slug === subcategorySlug);
}

export function getAllCategories(): MainCategory[] {
  return PRODUCT_CATEGORIES;
}

export function getAllSubcategories(): SubCategory[] {
  return PRODUCT_CATEGORIES.flatMap(category => category.subcategories);
}