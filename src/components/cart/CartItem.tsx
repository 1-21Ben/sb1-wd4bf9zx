import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import type { CartItem as CartItemType } from '../../types/product';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-20 h-20 object-cover rounded-md"
      />
      
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.category}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="text-right">
        <p className="font-medium">{(item.price * item.quantity).toFixed(2)} €</p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}