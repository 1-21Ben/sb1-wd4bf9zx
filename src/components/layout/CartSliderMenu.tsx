import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, AlertCircle, Check, Clock, LogIn } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';

interface CartSliderMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type StockStatus = 'in_stock' | '24h_48h' | '3_weeks';

interface ProductAvailability {
  status: StockStatus;
  label: string;
  icon: React.ComponentType;
  className: string;
}

const AVAILABILITY_CONFIG: Record<StockStatus, ProductAvailability> = {
  in_stock: {
    status: 'in_stock',
    label: 'En stock',
    icon: Check,
    className: 'text-green-500',
  },
  '24h_48h': {
    status: '24h_48h',
    label: '24h-48h',
    icon: Clock,
    className: 'text-orange-500',
  },
  '3_weeks': {
    status: '3_weeks',
    label: '3 semaines',
    icon: AlertCircle,
    className: 'text-red-500',
  },
};

export function CartSliderMenu({ isOpen, onClose }: CartSliderMenuProps) {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const isLoggedIn = false; // This should come from your auth store

  // Simulated stock status - in real app, this would come from the backend
  const getStockStatus = (productId: string): StockStatus => {
    const statuses: StockStatus[] = ['in_stock', '24h_48h', '3_weeks'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-96 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } bg-gray-50`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200 relative">
            <div className={`absolute -left-10 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 shadow-lg transition-all border border-gray-400/20"
                style={{
                  backdropFilter: 'blur(8px)',
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-6 w-6 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-900">
                Mon Panier
              </h2>
            </div>
          </div>

          {!isLoggedIn && items.length > 0 && (
            <div className="p-6 border-b border-gray-200">
              <Link
                to="/connexion"
                onClick={onClose}
                className="flex items-center justify-center space-x-2 w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                <LogIn className="h-5 w-5" />
                <span>Se connecter</span>
              </Link>
              <p className="mt-3 text-sm text-center text-gray-500">
                Pas encore de compte ?{' '}
                <Link
                  to="/inscription"
                  onClick={onClose}
                  className="text-primary-500 hover:text-primary-600 font-medium"
                >
                  S'inscrire
                </Link>
              </p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <ShoppingCart className="h-16 w-16 mb-4 text-gray-400" />
                <p className="text-lg font-medium text-gray-900">
                  Votre panier est vide
                </p>
                <p className="mt-2 text-gray-600">
                  Ajoutez des produits pour commencer vos achats
                </p>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {items.map((item) => {
                  const availability = AVAILABILITY_CONFIG[getStockStatus(item.id)];
                  const StatusIcon = availability.icon;
                  
                  return (
                    <div
                      key={item.id}
                      className="flex space-x-4 p-4 rounded-lg bg-white shadow-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <div className="mt-1 flex items-center space-x-2">
                          <StatusIcon className={`h-4 w-4 ${availability.className}`} />
                          <span className={`text-sm ${availability.className}`}>
                            {availability.label}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <select
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                              className="rounded-md text-sm bg-white text-gray-900 border-gray-200"
                            >
                              {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                            <span className="text-sm text-primary-500">
                              × {item.price.toFixed(2)} €
                            </span>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-gray-900">
                  Total
                </span>
                <span className="text-xl font-bold text-primary-500">
                  {total.toFixed(2)} €
                </span>
              </div>
              <Link
                to={isLoggedIn ? "/checkout" : "/connexion"}
                onClick={onClose}
                className="w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{isLoggedIn ? "Commander" : "Se connecter pour commander"}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}