import React from 'react';
import { useCartStore } from '../../stores/cartStore';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export function ProductCard({ id, name, price, image, description }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({ id, name, price, image, quantity: 1 });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="mt-1 text-gray-600 text-sm line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-primary-500">{price.toFixed(2)} €</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Ajouter au panier</span>
          </button>
        </div>
      </div>
    </div>
  );
}