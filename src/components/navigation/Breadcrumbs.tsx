import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';
import { PRODUCT_CATEGORIES } from '../../config/categories';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export function Breadcrumbs() {
  const location = useLocation();
  const { isDarkMode } = useThemeStore();
  const [items, setItems] = React.useState<BreadcrumbItem[]>([]);

  React.useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Handle product categories
      if (segment === 'products' && pathSegments[index + 1]) {
        const categorySlug = pathSegments[index + 1];
        const category = PRODUCT_CATEGORIES.find(cat => cat.slug === categorySlug);
        if (category) {
          breadcrumbs.push({
            label: category.name,
            path: currentPath + '/' + categorySlug,
          });
          
          // Handle subcategories
          if (pathSegments[index + 2]) {
            const subcategorySlug = pathSegments[index + 2];
            const subcategory = category.subcategories.find(sub => sub.slug === subcategorySlug);
            if (subcategory) {
              breadcrumbs.push({
                label: subcategory.name,
                path: currentPath + '/' + categorySlug + '/' + subcategorySlug,
              });
            }
          }
          return;
        }
      }

      // Handle other pages
      switch (segment) {
        case 'products':
          breadcrumbs.push({ label: 'Produits', path: currentPath });
          break;
        case 'connexion':
          breadcrumbs.push({ label: 'Connexion', path: currentPath });
          break;
        case 'inscription':
          breadcrumbs.push({ label: 'Inscription', path: currentPath });
          break;
        case 'panier':
          breadcrumbs.push({ label: 'Panier', path: currentPath });
          break;
        case 'checkout':
          breadcrumbs.push({ label: 'Paiement', path: currentPath });
          break;
        case 'account':
          breadcrumbs.push({ label: 'Mon compte', path: currentPath });
          break;
      }
    });

    setItems(breadcrumbs);
  }, [location]);

  if (location.pathname === '/') return null;

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/"
            className={`flex items-center transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        
        {items.map((item, index) => (
          <React.Fragment key={item.path}>
            <li>
              <ChevronRight className={`h-4 w-4 ${
                isDarkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
            </li>
            <li>
              {index === items.length - 1 ? (
                <span className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className={`transition-colors ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}