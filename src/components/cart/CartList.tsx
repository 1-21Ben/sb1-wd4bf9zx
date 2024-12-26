import React from 'react';
import { CartItem } from './CartItem';
import { useCartStore } from '../../stores/cartStore';

export function CartList() {
  const { items } = useCartStore();

  return (
    <div className="space-y-4">
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}