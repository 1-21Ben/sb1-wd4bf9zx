import React from 'react';
import { Search } from 'lucide-react';
import { useProductStore } from '../../stores/productStore';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useProductStore();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}