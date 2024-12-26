import React from 'react';
import { Link } from 'react-router-dom';
import { CartList } from './CartList';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';
import { useCartStore } from '../../stores/cartStore';

export function Cart() {
  const { items } = useCartStore();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CartList />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}