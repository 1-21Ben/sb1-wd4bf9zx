import { useState } from 'react';
import { productSyncService } from '../services/productSyncService';
import toast from 'react-hot-toast';

export function useProductSync() {
  const [syncing, setSyncing] = useState(false);

  const syncProduct = async (itemCode: string) => {
    setSyncing(true);
    try {
      await productSyncService.syncProduct(itemCode);
      toast.success('Produit synchronisé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la synchronisation du produit');
      throw error;
    } finally {
      setSyncing(false);
    }
  };

  const syncBulkProducts = async (itemCodes: string[]) => {
    setSyncing(true);
    try {
      await productSyncService.syncBulkProducts(itemCodes);
      toast.success('Produits synchronisés avec succès');
    } catch (error) {
      toast.error('Erreur lors de la synchronisation des produits');
      throw error;
    } finally {
      setSyncing(false);
    }
  };

  return {
    syncing,
    syncProduct,
    syncBulkProducts,
  };
}