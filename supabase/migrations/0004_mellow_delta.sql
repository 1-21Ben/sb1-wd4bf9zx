/*
  # Product Assets Storage Configuration

  1. New Tables
    - `product_assets` - Stores metadata for all product-related files
    - `product_documents` - Stores technical documentation
    - `product_videos` - Stores video content metadata

  2. Asset Categories
    - Images (product photos, thumbnails)
    - Documents (technical sheets, manuals)
    - Videos (product demonstrations)

  3. Security
    - RLS policies for public read access
    - Write access restricted to authenticated users
*/

-- Product Assets Table
CREATE TABLE IF NOT EXISTS product_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  bucket_path text NOT NULL,
  filename text NOT NULL,
  file_type text NOT NULL,
  mime_type text NOT NULL,
  size_bytes bigint NOT NULL,
  category text NOT NULL CHECK (category IN ('image', 'document', 'video')),
  purpose text NOT NULL CHECK (purpose IN ('primary', 'gallery', 'thumbnail', 'technical')),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_product_assets_product ON product_assets(product_id);
CREATE INDEX idx_product_assets_category ON product_assets(category);

-- Technical Documents
CREATE TABLE IF NOT EXISTS product_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  asset_id uuid REFERENCES product_assets(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  language text NOT NULL DEFAULT 'en',
  version text,
  is_current boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_product_docs_product ON product_documents(product_id);

-- Product Videos
CREATE TABLE IF NOT EXISTS product_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  asset_id uuid REFERENCES product_assets(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  duration_seconds int,
  thumbnail_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_product_videos_product ON product_videos(product_id);

-- Enable RLS
ALTER TABLE product_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_videos ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to product assets"
  ON product_assets
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public read access to product documents"
  ON product_documents
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public read access to product videos"
  ON product_videos
  FOR SELECT
  TO public
  USING (true);

-- Update Triggers
CREATE TRIGGER update_product_assets_updated_at
  BEFORE UPDATE ON product_assets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_product_documents_updated_at
  BEFORE UPDATE ON product_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_product_videos_updated_at
  BEFORE UPDATE ON product_videos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Helper Functions
CREATE OR REPLACE FUNCTION get_product_assets(p_product_id uuid, p_category text DEFAULT NULL)
RETURNS TABLE (
  id uuid,
  bucket_path text,
  filename text,
  category text,
  purpose text,
  metadata jsonb
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pa.id,
    pa.bucket_path,
    pa.filename,
    pa.category,
    pa.purpose,
    pa.metadata
  FROM product_assets pa
  WHERE pa.product_id = p_product_id
  AND (p_category IS NULL OR pa.category = p_category)
  ORDER BY pa.created_at;
END;
$$ LANGUAGE plpgsql;