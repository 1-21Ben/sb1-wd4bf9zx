import React from 'react';
import { Link } from 'react-router-dom';
import {
  Store,
  UserCheck,
  Receipt,
  Heart,
  ListChecks,
  ChevronRight,
  X,
  Building2,
  LogIn,
  Check,
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface UserSliderMenuProps {
  isOpen: boolean;
  onClose: () => void;
  hasCommercial?: boolean;
}

const MENU_ITEMS = [
  { icon: Store, label: 'Mon magasin', path: '/mon-magasin' },
  { icon: Building2, label: 'Mes chantiers', path: '/mes-chantiers' },
  { icon: Receipt, label: 'Mes factures', path: '/mes-factures' },
  { icon: Heart, label: 'Mes produits favoris', path: '/mes-favoris' },
  { icon: ListChecks, label: 'Mes listes', path: '/mes-listes' },
];

export function UserSliderMenu({ isOpen, onClose, hasCommercial = false }: UserSliderMenuProps) {
  const { isLoggedIn } = useAuthStore();
  
  const allMenuItems = hasCommercial 
    ? [
        MENU_ITEMS[0],
        { icon: UserCheck, label: 'Mon commercial', path: '/mon-commercial' },
        ...MENU_ITEMS.slice(1)
      ]
    : MENU_ITEMS;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out ${
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
            <h2 className="text-xl font-bold text-gray-900">
              Mon Compte
            </h2>
          </div>

          <div className="p-6 border-b border-gray-200">
            {isLoggedIn ? (
              <div className="flex items-center justify-center space-x-2 w-full py-3 px-4 bg-green-500 text-white rounded-lg">
                <Check className="h-5 w-5" />
                <span>Connecté</span>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {allMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center px-6 py-3 space-x-4 transition-colors hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {isLoggedIn ? 'Connecté en tant que client professionnel' : 'Connectez-vous pour accéder à votre espace client'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}