import React from 'react';
import { MapPin } from 'lucide-react';
import { useLocationStore } from '../../stores/locationStore';
import { useThemeStore } from '../../stores/themeStore';

export function LocationSelector() {
  const { isDarkMode } = useThemeStore();
  const { currentLocation, setLocation, getAvailableLocations } = useLocationStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const locations = getAvailableLocations();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          isDarkMode
            ? 'hover:bg-deep-700 text-white'
            : 'hover:bg-white/10 text-white'
        }`}
      >
        <MapPin className="h-5 w-5" />
        <span>{currentLocation.name}</span>
        <span>{currentLocation.flag}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg z-20 ${
            isDarkMode ? 'bg-deep-700' : 'bg-white'
          }`}>
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => {
                  setLocation(location.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 flex items-center justify-between first:rounded-t-lg last:rounded-b-lg ${
                  isDarkMode
                    ? 'hover:bg-deep-600 text-white'
                    : 'hover:bg-gray-50 text-gray-900'
                } ${location.id === currentLocation.id ? 'font-semibold' : ''}`}
              >
                <span>{location.name}</span>
                <span>{location.flag}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}