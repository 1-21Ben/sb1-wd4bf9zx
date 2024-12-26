import React from 'react';
import { Circle, CircleDot, Sun, ShoppingBag, MapPinned } from 'lucide-react';
import { useCartStore } from '../../../stores/cartStore';
import { useThemeStore } from '../../../stores/themeStore';
import { useAuthStore } from '../../../stores/authStore';

interface HeaderActionsProps {
  onStoreLocatorOpen: () => void;
  onUserMenuOpen: () => void;
  onCartOpen: () => void;
}

export function HeaderActions({ onStoreLocatorOpen, onUserMenuOpen, onCartOpen }: HeaderActionsProps) {
  const { items } = useCartStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { isLoggedIn } = useAuthStore();

  return (
    <div className="flex items-center space-x-6">
      <button
        onClick={onStoreLocatorOpen}
        className="p-2 rounded-full transition-colors hover:bg-white/10"
        aria-label="Trouver un magasin"
      >
        <MapPinned className="h-5 w-5 text-white stroke-[1.5]" />
      </button>

      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full transition-colors hover:bg-white/10"
        aria-label={isDarkMode ? "Mode clair" : "Mode sombre"}
      >
        <Sun className="h-5 w-5 text-white stroke-[1.5]" />
      </button>

      <button 
        onClick={onUserMenuOpen}
        className="relative group p-2 rounded-full transition-colors hover:bg-white/10"
        aria-label="Mon compte"
      >
        {isLoggedIn ? (
          <CircleDot className="h-5 w-5 text-white stroke-[1.5]" />
        ) : (
          <Circle className="h-5 w-5 text-white stroke-[1.5]" />
        )}
      </button>

      <button
        onClick={onCartOpen}
        className="relative p-2 rounded-full transition-colors hover:bg-white/10"
        aria-label="Mon panier"
      >
        <ShoppingBag className="h-5 w-5 text-white stroke-[1.5]" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-blue-600 text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
            {items.length}
          </span>
        )}
      </button>
    </div>
  );
}