import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, FileText, Leaf } from 'lucide-react';
import { PaintProductGallery } from '../../components/products/paint/PaintProductGallery';
import { PaintProductInfo } from '../../components/products/paint/PaintProductInfo';
import { PaintProductVariants } from '../../components/products/paint/PaintProductVariants';
import { PaintProductDocuments } from '../../components/products/paint/PaintProductDocuments';
import { useCartStore } from '../../stores/cartStore';
import { useThemeStore } from '../../stores/themeStore';

// Mock data - replace with actual API call
const MOCK_PRODUCT = {
  id: 'ocean-guard-premium',
  name: 'Ocean Guard Premium',
  description: 'Peinture marine haute performance pour environnements salins extrêmes',
  shortDescription: 'Protection maximale contre la corrosion et les UV',
  brand: 'GPP Ocean',
  category: 'Marine',
  subcategory: 'Protection Anticorrosion',
  images: [
    { url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f', alt: 'Ocean Guard Premium - Vue principale' },
    { url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828', alt: 'Ocean Guard Premium - Application' },
    { url: 'https://images.unsplash.com/photo-1572297794908-f2ee5a2930d6', alt: 'Ocean Guard Premium - Résultat' },
  ],
  variants: [
    // White base
    { id: 'ogp-1l-white', size: '1L', type: 'white', price: 29.99, stock: 45 },
    { id: 'ogp-5l-white', size: '5L', type: 'white', price: 129.99, stock: 32 },
    { id: 'ogp-15l-white', size: '15L', type: 'white', price: 349.99, stock: 18 },
    // Tinted base
    { id: 'ogp-1l-tinted', size: '1L', type: 'tinted', price: 32.99, stock: 40 },
    { id: 'ogp-5l-tinted', size: '5L', type: 'tinted', price: 139.99, stock: 28 },
    { id: 'ogp-15l-tinted', size: '15L', type: 'tinted', price: 369.99, stock: 15 },
    // Base to tint
    { id: 'ogp-1l-base', size: '1L', type: 'base', price: 27.99, stock: 50 },
    { id: 'ogp-5l-base', size: '5L', type: 'base', price: 124.99, stock: 35 },
    { id: 'ogp-15l-base', size: '15L', type: 'base', price: 339.99, stock: 20 },
  ],
  technical: {
    coverage: '12-14 m²/L par couche',
    application: ['Brosse', 'Rouleau', 'Pistolet airless'],
    finish: 'Satiné',
    dryingTime: '30 minutes au toucher',
    recoatTime: '6 heures',
    dilution: 'Prêt à l\'emploi. Dilution possible jusqu\'à 5% avec de l\'eau',
    cleaning: 'Eau et savon immédiatement après usage',
    environment: [
      'COV < 30g/L',
      'Label écologique',
      'Sans solvants nocifs',
    ],
  },
  documents: [
    { 
      id: 'tech-sheet',
      name: 'Fiche technique',
      type: 'PDF',
      url: '#',
      size: '2.4 MB',
      icon: FileText,
      category: 'technical'
    },
    { 
      id: 'env-sheet',
      name: 'Fiche environnementale',
      type: 'PDF',
      url: '#',
      size: '1.8 MB',
      icon: Leaf,
      category: 'environmental'
    },
    { 
      id: 'safety-sheet',
      name: 'Fiche de sécurité',
      type: 'PDF',
      url: '#',
      size: '3.1 MB',
      icon: FileText,
      category: 'safety'
    },
  ],
};

export function PaintProductDetail() {
  const { id } = useParams();
  const { isDarkMode } = useThemeStore();
  const addToCart = useCartStore((state) => state.addItem);
  const [selectedVariant, setSelectedVariant] = useState(MOCK_PRODUCT.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState('white');

  const filteredVariants = MOCK_PRODUCT.variants.filter(v => v.type === selectedType);
  const currentVariant = filteredVariants.find(v => v.id === selectedVariant);

  const handleAddToCart = () => {
    if (currentVariant) {
      addToCart({
        id: currentVariant.id,
        name: `${MOCK_PRODUCT.name} - ${currentVariant.size} (${currentVariant.type})`,
        price: currentVariant.price,
        image: MOCK_PRODUCT.images[0].url,
        quantity,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <PaintProductGallery images={MOCK_PRODUCT.images} />
          
          {/* Quick Download CTAs */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {MOCK_PRODUCT.documents.map((doc) => {
              const Icon = doc.icon;
              return (
                <a
                  key={doc.id}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 p-3 rounded-lg border-2 border-gray-200 hover:border-primary-500 transition-colors group"
                >
                  <Icon className="h-5 w-5 text-gray-400 group-hover:text-primary-500" />
                  <span className="font-medium text-gray-600 group-hover:text-primary-500">
                    {doc.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {MOCK_PRODUCT.name}
                </h1>
                <p className="text-primary-500">{MOCK_PRODUCT.brand}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Heart className="h-6 w-6 text-gray-400" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Share2 className="h-6 w-6 text-gray-400" />
                </button>
              </div>
            </div>
            <p className={`mt-4 text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {MOCK_PRODUCT.shortDescription}
            </p>
          </div>

          {/* Color Type Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Type de base</h3>
            <div className="grid grid-cols-3 gap-4">
              {['white', 'tinted', 'base'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setSelectedVariant(MOCK_PRODUCT.variants.find(v => v.type === type)?.id || '');
                  }}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selectedType === type
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                >
                  <span className="block font-medium capitalize">
                    {type === 'white' ? 'Blanc' : type === 'tinted' ? 'Teinté' : 'Base à teinter'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <PaintProductVariants
            variants={filteredVariants}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
          />

          <div className="flex items-end justify-between">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantité
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                {[1, 2, 3, 4, 5, 10, 15, 20].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-2 px-8 py-3 rounded-lg text-white transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(45deg, #2563eb, #ef4444)',
                backgroundSize: '200% 200%',
                animation: 'gradient 5s ease infinite',
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Ajouter au panier</span>
            </button>
          </div>

          <style>
            {`
              @keyframes gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}
          </style>

          <PaintProductInfo {...MOCK_PRODUCT.technical} />
          <PaintProductDocuments documents={MOCK_PRODUCT.documents} />
        </div>
      </div>
    </div>
  );
}