import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Package,
  Users,
  Settings,
  HelpCircle,
  Phone,
  FileText,
  ChevronRight,
  X,
} from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

interface SliderMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { icon: Home, label: 'Accueil', path: '/' },
  { icon: Package, label: 'Produits', path: '/products' },
  { icon: Users, label: 'À Propos', path: '/about' },
  { icon: Phone, label: 'Contact', path: '/contact' },
  { icon: FileText, label: 'Documentation', path: '/docs' },
  { icon: HelpCircle, label: 'Assistance', path: '/support' },
  { icon: Settings, label: 'Paramètres', path: '/settings' },
];

export function SliderMenu({ isOpen, onClose }: SliderMenuProps) {
  const { isDarkMode } = useThemeStore();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-gray-50`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200 relative">
            <div className={`absolute -right-10 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
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
              Menu
            </h2>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {MENU_ITEMS.map((item) => {
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
              © 2024 GPP Ocean Inc. Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </>
  );
}