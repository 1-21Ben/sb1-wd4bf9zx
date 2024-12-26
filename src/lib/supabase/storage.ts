import { supabase } from './client';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_DOC_TYPES = ['application/pdf'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm'];
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export async function uploadProductAsset(
  productId: string,
  file: File,
  category: 'image' | 'document' | 'video',
  purpose: 'primary' | 'gallery' | 'thumbnail' | 'technical'
) {
  // Validate file type
  const allowedTypes = {
    image: ALLOWED_IMAGE_TYPES,
    document: ALLOWED_DOC_TYPES,
    video: ALLOWED_VIDEO_TYPES,
  }[category];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }

  // Generate unique filename
  const extension = file.name.split('.').pop();
  const filename = `${productId}/${category}/${Date.now()}.${extension}`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('product-assets')
    .upload(filename, file);

  if (error) throw error;

  // Create asset record
  const { data: asset, error: assetError } = await supabase
    .from('product_assets')
    .insert({
      product_id: productId,
      bucket_path: data.path,
      filename: file.name,
      file_type: extension,
      mime_type: file.type,
      size_bytes: file.size,
      category,
      purpose,
      metadata: {
        originalName: file.name,
        lastModified: file.lastModified,
      },
    })
    .select()
    .single();

  if (assetError) throw assetError;

  return asset;
}

export async function getProductAssets(productId: string, category?: string) {
  const { data, error } = await supabase
    .rpc('get_product_assets', { 
      product_id: productId,
      category,
    });

  if (error) throw error;
  return data;
}

export async function deleteProductAsset(assetId: string) {
  // Get asset info
  const { data: asset, error: fetchError } = await supabase
    .from('product_assets')
    .select('bucket_path')
    .eq('id', assetId)
    .single();

  if (fetchError) throw fetchError;

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from('product-assets')
    .remove([asset.bucket_path]);

  if (storageError) throw storageError;

  // Delete record
  const { error: deleteError } = await supabase
    .from('product_assets')
    .delete()
    .eq('id', assetId);

  if (deleteError) throw deleteError;
}