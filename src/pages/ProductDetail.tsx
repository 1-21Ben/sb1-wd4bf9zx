import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocationStore } from '../stores/locationStore';
import { useCartStore } from '../stores/cartStore';
import { Info, ShoppingCart, Truck } from 'lucide-react';

const MOCK_PRODUCT = {
  id: '1',
  name: 'Ocean Guard Premium',
  description: 'Peinture marine haute performance pour environnements salins',
  image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
  category: 'Marine',
  brand: 'GPP Ocean',
  technicalDetails: 'Résistance aux UV, Protection anticorrosion',
  coverage: '12-14 m²/L',
  application: 'Brosse, Rouleau, Pistolet',
  skus: [
    { id: 'sku1', code: 'OGP-5L-BL', size: '5L', color: 'Blanc', price: 89.99, stock: 15, location: 'La Réunion' },
    { id: 'sku2', code: 'OGP-20L-BL', size: '20L', color: 'Blanc', price: 299.99, stock: 8, location: 'La Réunion' },
  ],
};

export function ProductDetail() {
  const { id } = useParams();
  const { currentLocation } = useLocationStore();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSku, setSelectedSku] = useState(MOCK_PRODUCT.skus[0]);

  const filteredSkus = MOCK_PRODUCT.skus.filter(sku => sku.location === currentLocation);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={MOCK_PRODUCT.image}
            alt={MOCK_PRODUCT.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-sky-800">{MOCK_PRODUCT.name}</h1>
            <p className="text-gray-600 mt-2">{MOCK_PRODUCT.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sky-700">
              <Info className="h-5 w-5" />
              <span className="font-medium">Spécifications techniques</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Rendement:</span>
                <p>{MOCK_PRODUCT.coverage}</p>
              </div>
              <div>
                <span className="font-medium">Application:</span>
                <p>{MOCK_PRODUCT.application}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <select
              value={selectedSku.id}
              onChange={(e) => setSelectedSku(MOCK_PRODUCT.skus.find(sku => sku.id === e.target.value)!)}
              className="w-full rounded-lg border-sky-200 text-sky-700 focus:ring-sky-300"
            >
              {filteredSkus.map((sku) => (
                <option key={sku.id} value={sku.id}>
                  {sku.size} - {sku.color} - {sku.price.toFixed(2)}€
                </option>
              ))}
            </select>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-sky-700">
                  {selectedSku.price.toFixed(2)}€
                </span>
                <p className="text-sm text-gray-500">Prix TTC</p>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <Truck className="h-5 w-5" />
                <span className="text-sm">
                  {selectedSku.stock > 0 ? 'En stock' : 'Rupture de stock'}
                </span>
              </div>
            </div>

            <button
              onClick={() => addItem({
                id: selectedSku.id,
                name: `${MOCK_PRODUCT.name} - ${selectedSku.size}`,
                price: selectedSku.price,
                image: MOCK_PRODUCT.image,
                quantity: 1
              })}
              className="w-full bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Ajouter au panier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}