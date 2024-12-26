import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';
import { useCartStore } from '../../stores/cartStore';
import { Product } from '../../types/product';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
}

export function ProductList({ products, loading }: ProductListProps) {
  const { isDarkMode } = useThemeStore();
  const addToCart = useCartStore((state) => state.addItem);

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
        <div
          key={product.id}
          className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${
            isDarkMode ? 'bg-deep-700' : 'bg-white'
          }`}
        >
          <Link to={`/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          </Link>
          
          <div className="p-4">
            <Link
              to={`/products/${product.id}`}
              className={`block font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {product.name}
            </Link>
            
            <p className={`mt-1 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {product.description}
            </p>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold text-primary-500">
                {product.prices[0]?.basePrice.toFixed(2)}€
              </span>
              
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Ajouter aux favoris"
                >
                  <Heart className="h-5 w-5 text-gray-400" />
                </button>
                
                <button
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.prices[0]?.basePrice,
                    image: product.image,
                    quantity: 1,
                  })}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Ajouter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}