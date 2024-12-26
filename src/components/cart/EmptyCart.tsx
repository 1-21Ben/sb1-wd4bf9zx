import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export function EmptyCart() {
  return (
    <div className="text-center py-16">
      <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-8">Add some products to start shopping</p>
      <Link
        to="/"
        className="inline-block py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}