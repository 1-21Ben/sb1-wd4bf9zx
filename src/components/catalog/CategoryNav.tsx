import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';
import { useThemeStore } from '../../stores/themeStore';

export function CategoryNav() {
  const { categories, loading } = useCategories();
  const { isDarkMode } = useThemeStore();
  const location = useLocation();

  if (loading) return null;

  return (
    <nav className={`space-y-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {categories.map((category) => {
        const isActive = location.pathname.includes(category.slug);
        return (
          <div key={category.id} className="space-y-1">
            <Link
              to={`/products/${category.slug}`}
              className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-500 text-white'
                  : isDarkMode
                  ? 'hover:bg-deep-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <span className="font-medium">{category.name}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
            
            {isActive && (
              <div className="ml-4 space-y-1">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    to={`/products/${category.slug}/${sub.slug}`}
                    className={`block p-2 rounded-lg text-sm transition-colors ${
                      location.pathname.includes(sub.slug)
                        ? 'bg-primary-100 text-primary-700'
                        : isDarkMode
                        ? 'hover:bg-deep-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}