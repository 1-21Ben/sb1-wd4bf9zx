import { useState, useEffect } from 'react';
import { MainCategory, PRODUCT_CATEGORIES } from '../config/categories';
import { getCategories } from '../services/categoryService';
import toast from 'react-hot-toast';

export function useCategories() {
  const [categories, setCategories] = useState<MainCategory[]>(PRODUCT_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        // Merge static category data with dynamic data from the database
        const mergedCategories = PRODUCT_CATEGORIES.map(staticCat => {
          const dynamicCat = data.find(d => d.slug === staticCat.slug);
          return {
            ...staticCat,
            ...dynamicCat,
          };
        });
        setCategories(mergedCategories);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load categories'));
        toast.error('Erreur lors du chargement des catégories');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
  };
}