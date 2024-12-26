import { useState } from 'react';
import { PIMProduct, ProductStatus } from '../types/pim';
import * as pimProductService from '../services/pimProductService';
import toast from 'react-hot-toast';

export function usePIMProduct() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<PIMProduct[]>([]);

  const loadProducts = async (filters?: {
    status?: ProductStatus;
    categoryId?: string;
    search?: string;
  }) => {
    setLoading(true);
    try {
      const data = await pimProductService.getProducts(filters);
      setProducts(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: Omit<PIMProduct, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      const newProduct = await pimProductService.createProduct(product);
      setProducts(prev => [newProduct, ...prev]);
      toast.success('Produit créé avec succès');
      return newProduct;
    } catch (error) {
      toast.error('Erreur lors de la création du produit');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, updates: Partial<PIMProduct>) => {
    setLoading(true);
    try {
      const updatedProduct = await pimProductService.updateProduct(id, updates);
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      toast.success('Produit mis à jour avec succès');
      return updatedProduct;
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du produit');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const discontinueProduct = async (id: string) => {
    try {
      await pimProductService.discontinueProduct(id);
      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, status: 'discontinued' } : p
      ));
      toast.success('Produit discontinué avec succès');
    } catch (error) {
      toast.error('Erreur lors de la discontinuation du produit');
      throw error;
    }
  };

  return {
    loading,
    products,
    loadProducts,
    createProduct,
    updateProduct,
    discontinueProduct,
  };
}