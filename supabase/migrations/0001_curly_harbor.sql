/*
  # Product Management Schema

  1. New Tables
    - products: Core product information
    - product_categories: Product categories
    - product_images: Product images (multiple per product)
    - product_variants: Product variations (size, color, etc.)
    - product_inventory: Stock tracking

  2. Security
    - RLS policies for read access
    - Protected write operations
*/

-- Product Categories
CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  parent_id uuid REFERENCES product_categories(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_category_slug ON product_categories(slug);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  category_id uuid REFERENCES product_categories(id) NOT NULL,
  price decimal(10,2) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_product_category ON products(category_id);

-- Product Images
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  alt_text text,
  is_primary boolean DEFAULT false,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);

-- Product Variants
CREATE TABLE IF NOT EXISTS product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  sku text UNIQUE NOT NULL,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_variant_sku ON product_variants(sku);
CREATE INDEX IF NOT EXISTS idx_variant_product ON product_variants(product_id);

-- Product Inventory
CREATE TABLE IF NOT EXISTS product_inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id uuid REFERENCES product_variants(id) ON DELETE CASCADE NOT NULL,
  quantity int NOT NULL DEFAULT 0,
  reserved_quantity int NOT NULL DEFAULT 0,
  last_updated timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inventory_variant ON product_inventory(variant_id);

-- Enable RLS
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_inventory ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read access to product categories"
  ON product_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to products"
  ON products
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Allow public read access to product images"
  ON product_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to product variants"
  ON product_variants
  FOR SELECT
  TO public
  USING (true);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_variant_updated_at
  BEFORE UPDATE ON product_variants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();