import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterSidebar } from '../components/catalog/FilterSidebar';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { SortDropdown } from '../components/catalog/SortDropdown';
import { useLocationStore } from '../stores/locationStore';
import { useLoadingStore } from '../stores/loadingStore';
import { useThemeStore } from '../stores/themeStore';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Ocean Guard Premium',
    description: 'Peinture marine haute performance',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    category: 'Marine',
  },
  {
    id: '2',
    name: 'Tropical Shield Pro',
    description: 'Protection maximale contre les UV',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    category: 'Extérieur',
  },
  // Add more mock products...
];

const SORT_OPTIONS = [
  { id: 'popular', label: 'Popularité' },
  { id: 'price_asc', label: 'Prix croissant' },
  { id: 'price_desc', label: 'Prix décroissant' },
  { id: 'name_asc', label: 'Nom A-Z' },
  { id: 'name_desc', label: 'Nom Z-A' },
];

const FILTERS = [
  {
    id: 'category',
    title: 'Catégories',
    options: [
      { id: 'interior', label: 'Intérieur', count: 45 },
      { id: 'exterior', label: 'Extérieur', count: 32 },
      { id: 'wood', label: 'Bois', count: 28 },
      { id: 'covering', label: 'Revêtements', count: 15 },
      { id: 'etics', label: 'ETICS', count: 12 },
    ],
  },
  {
    id: 'brand',
    title: 'Marques',
    options: [
      { id: 'gpp', label: 'GPP Ocean', count: 56 },
      { id: 'sikkens', label: 'Sikkens', count: 43 },
      { id: 'sigma', label: 'Sigma', count: 38 },
      { id: 'zolpan', label: 'Zolpan', count: 25 },
    ],
  },
  {
    id: 'finish',
    title: 'Finitions',
    options: [
      { id: 'mat', label: 'Mat', count: 34 },
      { id: 'satin', label: 'Satin', count: 28 },
      { id: 'brillant', label: 'Brillant', count: 22 },
    ],
  },
];

export function ProductCatalog() {
  const { isDarkMode } = useThemeStore();
  const { currentLocation } = useLocationStore();
  const { startLoading, setProgress, completeLoading } = useLoadingStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sortOption, setSortOption] = useState('popular');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      startLoading();
      // Simulate loading progress
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }
      completeLoading();
      setLoading(false);
    };

    loadProducts();
  }, [currentLocation, selectedFilters, sortOption]);

  const handleFilterChange = (sectionId: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[sectionId] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      
      return {
        ...prev,
        [sectionId]: updated,
      };
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Catalogue des Produits - {currentLocation}
        </h1>
        <SortDropdown
          options={SORT_OPTIONS}
          selectedOption={sortOption}
          onSelect={setSortOption}
        />
      </div>

      <div className="flex gap-8">
        <FilterSidebar
          filters={FILTERS}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
        <div className="flex-1">
          <ProductGrid products={MOCK_PRODUCTS} loading={loading} />
        </div>
      </div>
    </div>
  );
}