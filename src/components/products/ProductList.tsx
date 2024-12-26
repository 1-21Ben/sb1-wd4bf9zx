import React from 'react';
import { useProductStore } from '../../stores/productStore';
import { ProductCard } from './ProductCard';

export function ProductList() {
  const { filteredProducts, searchQuery } = useProductStore();
  
  if (filteredProducts.length === 0 && searchQuery) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found matching "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}