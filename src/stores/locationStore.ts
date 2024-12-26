import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Location, DEFAULT_LOCATION, LOCATIONS } from '../config/locations';

interface LocationStore {
  currentLocation: Location;
  setLocation: (locationId: string) => void;
  getAvailableLocations: () => Location[];
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set, get) => ({
      currentLocation: DEFAULT_LOCATION,
      setLocation: (locationId) => {
        const location = LOCATIONS.find(loc => loc.id === locationId);
        if (location) {
          set({ currentLocation: location });
        }
      },
      getAvailableLocations: () => LOCATIONS,
    }),
    {
      name: 'location-storage',
    }
  )
);