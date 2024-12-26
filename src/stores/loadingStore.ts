import { create } from 'zustand';

interface LoadingStore {
  isLoading: boolean;
  progress: number;
  startLoading: () => void;
  setProgress: (progress: number) => void;
  completeLoading: () => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  progress: 0,
  startLoading: () => set({ isLoading: true, progress: 0 }),
  setProgress: (progress) => set({ progress }),
  completeLoading: () => {
    set({ progress: 100 });
    setTimeout(() => {
      set({ isLoading: false, progress: 0 });
    }, 400);
  },
}));