import React from 'react';
import { Store, X, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';
import { useLocationStore } from '../../stores/locationStore';

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: {
    days: string;
    hours: string;
  }[];
}

interface StoreLocatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_STORES: Record<string, Store[]> = {
  'martinique': [
    {
      id: 'mtq-1',
      name: 'GPP Ocean Fort-de-France',
      address: '123 Rue de la République',
      city: 'Fort-de-France',
      postalCode: '97200',
      phone: '+596 596 12 34 56',
      email: 'fdf@gppocean.com',
      coordinates: { lat: 14.6161, lng: -61.0588 },
      openingHours: [
        { days: 'Lundi - Vendredi', hours: '7h30 - 16h30' },
        { days: 'Samedi', hours: '8h00 - 12h00' },
      ],
    },
  ],
  'guadeloupe': [
    {
      id: 'glp-1',
      name: 'GPP Ocean Pointe-à-Pitre',
      address: '456 Boulevard Commercial',
      city: 'Pointe-à-Pitre',
      postalCode: '97110',
      phone: '+590 590 12 34 56',
      email: 'pap@gppocean.com',
      coordinates: { lat: 16.2410, lng: -61.5340 },
      openingHours: [
        { days: 'Lundi - Vendredi', hours: '7h30 - 16h30' },
        { days: 'Samedi', hours: '8h00 - 12h00' },
      ],
    },
  ],
  'reunion': [
    {
      id: 'run-1',
      name: 'GPP Ocean Saint-Denis',
      address: '789 Avenue des Mascareignes',
      city: 'Saint-Denis',
      postalCode: '97400',
      phone: '+262 262 12 34 56',
      email: 'saintdenis@gppocean.com',
      coordinates: { lat: -20.8789, lng: 55.4481 },
      openingHours: [
        { days: 'Lundi - Vendredi', hours: '7h30 - 16h30' },
        { days: 'Samedi', hours: '8h00 - 12h00' },
      ],
    },
  ],
};

export function StoreLocator({ isOpen, onClose }: StoreLocatorProps) {
  const { isDarkMode } = useThemeStore();
  const { currentLocation } = useLocationStore();
  const stores = MOCK_STORES[currentLocation.id.toLowerCase()] || [];

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
        } ${isDarkMode ? 'bg-deep-800' : 'bg-gray-50'}`}
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
              <Store className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Nos Magasins
              </h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className={`rounded-lg p-4 ${
                    isDarkMode ? 'bg-deep-700' : 'bg-white'
                  } shadow-md`}
                >
                  <h3 className={`font-semibold text-lg mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {store.name}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary-500 mt-1" />
                      <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <p>{store.address}</p>
                        <p>{store.postalCode} {store.city}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-primary-500" />
                      <a
                        href={`tel:${store.phone}`}
                        className="text-primary-500 hover:text-primary-600"
                      >
                        {store.phone}
                      </a>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary-500" />
                      <a
                        href={`mailto:${store.email}`}
                        className="text-primary-500 hover:text-primary-600"
                      >
                        {store.email}
                      </a>
                    </div>

                    <div className={`border-t border-gray-200 pt-3 mt-3 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <h4 className="font-medium mb-2">Horaires d'ouverture</h4>
                      {store.openingHours.map((hours, index) => (
                        <p key={index} className="flex justify-between text-sm">
                          <span>{hours.days}</span>
                          <span>{hours.hours}</span>
                        </p>
                      ))}
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${store.coordinates.lat},${store.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 w-full mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <MapPin className="h-5 w-5" />
                      <span>Voir sur la carte</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}