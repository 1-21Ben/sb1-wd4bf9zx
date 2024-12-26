import React from 'react';
import { Package } from 'lucide-react';

interface PaintProductVariant {
  id: string;
  size: string;
  color?: string;
  finish?: string;
  price: number;
  stock: number;
}

interface PaintProductVariantsProps {
  variants: PaintProductVariant[];
  selectedVariant: string;
  onVariantChange: (variantId: string) => void;
}

export function PaintProductVariants({
  variants,
  selectedVariant,
  onVariantChange,
}: PaintProductVariantsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Conditionnement</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onVariantChange(variant.id)}
            className={`flex items-center p-4 rounded-lg border-2 transition-colors ${
              selectedVariant === variant.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-200'
            }`}
          >
            <Package className={`h-5 w-5 ${
              selectedVariant === variant.id
                ? 'text-primary-500'
                : 'text-gray-400'
            }`} />
            <div className="ml-3 text-left">
              <span className="block font-medium">{variant.size}</span>
              {variant.color && (
                <span className="text-sm text-gray-500">{variant.color}</span>
              )}
              {variant.finish && (
                <span className="text-sm text-gray-500"> - {variant.finish}</span>
              )}
              <span className="block mt-1 font-semibold text-primary-500">
                {variant.price.toFixed(2)}€
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}