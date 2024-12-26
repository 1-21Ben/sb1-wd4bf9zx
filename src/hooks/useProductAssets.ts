import { useState } from 'react';
import { uploadProductAsset, getProductAssets, deleteProductAsset } from '../lib/supabase/storage';
import toast from 'react-hot-toast';

export function useProductAssets(productId: string) {
  const [loading, setLoading] = useState(false);

  const uploadAsset = async (
    file: File,
    category: 'image' | 'document' | 'video',
    purpose: 'primary' | 'gallery' | 'thumbnail' | 'technical'
  ) => {
    setLoading(true);
    try {
      const asset = await uploadProductAsset(productId, file, category, purpose);
      toast.success('Asset uploaded successfully');
      return asset;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload asset');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadAssets = async (category?: string) => {
    setLoading(true);
    try {
      return await getProductAssets(productId, category);
    } catch (error) {
      toast.error('Failed to load assets');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAsset = async (assetId: string) => {
    setLoading(true);
    try {
      await deleteProductAsset(assetId);
      toast.success('Asset deleted successfully');
    } catch (error) {
      toast.error('Failed to delete asset');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadAsset,
    loadAssets,
    deleteAsset,
    loading,
  };
}