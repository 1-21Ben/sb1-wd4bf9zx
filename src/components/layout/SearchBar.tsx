import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';
import { PRODUCT_CATEGORIES } from '../../config/categories';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  const { isDarkMode } = useThemeStore();
  const [selectedCategory, setSelectedCategory] = useState({ id: 'all', name: 'Toutes catégories' });
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const categories = [
    { id: 'all', name: 'Toutes catégories' },
    ...PRODUCT_CATEGORIES.map(cat => ({
      id: cat.id,
      name: cat.name,
    }))
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        buttonRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseLeave = () => {
    setIsCategoryOpen(false);
  };

  const textGradientStyle = {
    backgroundImage: 'linear-gradient(45deg, #2563eb, #ef4444, #2563eb)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% auto',
    animation: 'gradient 3s linear infinite',
  };

  return (
    <div className="relative flex w-full rounded-full overflow-hidden shadow-lg">
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          
          @keyframes arrowGradient {
            0% { stroke: #2563eb; }
            50% { stroke: #ef4444; }
            100% { stroke: #2563eb; }
          }
          
          .gradient-arrow {
            animation: arrowGradient 3s linear infinite;
          }
          
          .gradient-arrow path {
            stroke-width: 2;
          }

          .category-gradient {
            background: linear-gradient(to right, #f3f4f6, #ffffff);
          }
        `}
      </style>

      {/* Category Filter Section */}
      <div className="relative category-gradient border-r border-gray-200">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="h-full px-4 flex items-center space-x-2 hover:bg-gray-50/50 transition-colors"
        >
          <span className="text-sm whitespace-nowrap" style={textGradientStyle}>
            {selectedCategory.name}
          </span>
          <ChevronDown 
            className={`h-4 w-4 transition-transform gradient-arrow ${
              isCategoryOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isCategoryOpen && (
          <div
            ref={dropdownRef}
            onMouseLeave={handleMouseLeave}
            className="absolute left-0 top-full mt-2 w-72 rounded-lg shadow-lg z-20 bg-white"
            style={{
              maxHeight: '60vh',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: '#E5E7EB #FFFFFF'
            }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsCategoryOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                style={textGradientStyle}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search Input Section */}
      <div className="relative flex-1 bg-white">
        <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Rechercher des produits..."
          className="w-full h-full pl-12 pr-12 py-3 bg-transparent placeholder-gray-400 focus:outline-none"
          style={textGradientStyle}
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}