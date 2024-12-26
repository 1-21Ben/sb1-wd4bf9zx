import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  User, 
  Moon, 
  Sun, 
  MapPin,
  Store,
  Droplets,
  Menu
} from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useLocationStore } from '../../stores/locationStore';
import { useThemeStore } from '../../stores/themeStore';
import { useAuthStore } from '../../stores/authStore';
import { SearchBar } from './SearchBar';
import { SliderMenu } from './SliderMenu';
import { UserSliderMenu } from './UserSliderMenu';
import { CartSliderMenu } from './CartSliderMenu';
import { StoreLocator } from '../stores/StoreLocator';
import { LocationSelector } from './LocationSelector';

export function Header() {
  const { items } = useCartStore();
  const { currentLocation } = useLocationStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { isLoggedIn } = useAuthStore();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isUserSliderOpen, setIsUserSliderOpen] = useState(false);
  const [isCartSliderOpen, setIsCartSliderOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-red-500 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto">
          {/* Top Bar */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <div className="flex-shrink-0 flex items-center space-x-4">
                <button
                  onClick={() => setIsSliderOpen(true)}
                  className="p-2 rounded-lg transition-colors hover:bg-white/10"
                  aria-label="Menu principal"
                >
                  <Menu className="h-6 w-6 text-white" />
                </button>

                <Link 
                  to="/"
                  className="group flex items-center space-x-2 p-2 rounded-lg transition-colors hover:bg-white/10"
                >
                  <Droplets className="h-8 w-8 text-white" />
                  <span className="font-bold text-xl text-white">
                    GPP Ocean
                  </span>
                </Link>
              </div>

              {/* Search bar - Hidden on mobile, visible on desktop */}
              <div className="hidden md:flex flex-1 items-center justify-center px-8">
                <div className="w-full max-w-2xl">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onClear={() => setSearchQuery('')}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <LocationSelector />

                <button
                  onClick={() => setIsStoreLocatorOpen(true)}
                  className="p-2 rounded-full transition-colors hover:bg-white/10"
                  aria-label="Trouver un magasin"
                >
                  <Store className="h-5 w-5 text-white" />
                </button>

                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full transition-colors hover:bg-white/10"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 text-white" />
                  ) : (
                    <Moon className="h-5 w-5 text-white" />
                  )}
                </button>

                <button 
                  onClick={() => setIsUserSliderOpen(true)}
                  className="relative group"
                >
                  <div className="p-2 rounded-full transition-colors hover:bg-white/10">
                    <User className={`h-5 w-5 ${
                      isLoggedIn ? 'text-green-300' : 'text-white'
                    }`} />
                  </div>
                </button>

                <button
                  onClick={() => setIsCartSliderOpen(true)}
                  className="relative p-2 rounded-full transition-colors hover:bg-white/10"
                >
                  <ShoppingCart className="h-5 w-5 text-white" />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-blue-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {items.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden px-4 pb-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />
          </div>
        </div>
      </header>

      <SliderMenu isOpen={isSliderOpen} onClose={() => setIsSliderOpen(false)} />
      <UserSliderMenu 
        isOpen={isUserSliderOpen} 
        onClose={() => setIsUserSliderOpen(false)}
        hasCommercial={true}
      />
      <CartSliderMenu
        isOpen={isCartSliderOpen}
        onClose={() => setIsCartSliderOpen(false)}
      />
      <StoreLocator
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
      />
    </>
  );
}