import React from 'react';
import { ProductCard } from '../products/ProductCard';
import { useThemeStore } from '../../stores/themeStore';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  const { isDarkMode } = useThemeStore();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`animate-pulse rounded-lg overflow-hidden ${
              isDarkMode ? 'bg-deep-700' : 'bg-gray-100'
            }`}
          >
            <div className="h-48 bg-gray-300" />
            <div className="p-4 space-y-3">
              <div className={`h-4 rounded ${
                isDarkMode ? 'bg-deep-600' : 'bg-gray-200'
              }`} />
              <div className={`h-4 w-2/3 rounded ${
                isDarkMode ? 'bg-deep-600' : 'bg-gray-200'
              }`} />
              <div className="flex justify-between items-center pt-2">
                <div className={`h-6 w-20 rounded ${
                  isDarkMode ? 'bg-deep-600' : 'bg-gray-200'
                }`} />
                <div className={`h-10 w-32 rounded ${
                  isDarkMode ? 'bg-deep-600' : 'bg-gray-200'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}