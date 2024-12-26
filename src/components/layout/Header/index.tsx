import React, { useState } from 'react';
import { HeaderLogo } from './HeaderLogo';
import { HeaderActions } from './HeaderActions';
import { SearchBar } from '../SearchBar';
import { SliderMenu } from '../SliderMenu';
import { UserSliderMenu } from '../UserSliderMenu';
import { CartSliderMenu } from '../CartSliderMenu';
import { StoreLocator } from '../../stores/StoreLocator';
import { LocationSelector } from '../LocationSelector';

export function Header() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isUserSliderOpen, setIsUserSliderOpen] = useState(false);
  const [isCartSliderOpen, setIsCartSliderOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-red-500 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <HeaderLogo onMenuOpen={() => setIsSliderOpen(true)} />

              <div className="hidden md:flex flex-1 items-center justify-center px-8">
                <div className="w-full max-w-2xl">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onClear={() => setSearchQuery('')}
                  />
                </div>
              </div>

              <LocationSelector />

              <HeaderActions
                onStoreLocatorOpen={() => setIsStoreLocatorOpen(true)}
                onUserMenuOpen={() => setIsUserSliderOpen(true)}
                onCartOpen={() => setIsCartSliderOpen(true)}
              />
            </div>
          </div>

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