import { create } from 'zustand';
import { Product } from '../types/product';

interface ProductStore {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProducts: Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  searchQuery: '',
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    const filtered = get().products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    set({ filteredProducts: filtered });
  },
  filteredProducts: []
}));