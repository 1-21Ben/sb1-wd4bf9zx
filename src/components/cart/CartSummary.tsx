import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';

export function CartSummary() {
  const { items, total } = useCartStore();
  const subtotal = total;
  const shipping = 0; // Free shipping for now

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <h2 className="font-medium text-lg">Order Summary</h2>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal ({items.length} items)</span>
          <span>{subtotal.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `${shipping.toFixed(2)} €`}</span>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>{(subtotal + shipping).toFixed(2)} €</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}