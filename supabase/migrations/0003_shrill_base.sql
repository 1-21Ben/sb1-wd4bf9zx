/*
  # Shopping Cart Schema

  1. New Tables
    - carts: Shopping cart sessions
    - cart_items: Items in cart

  2. Security
    - RLS policies for customer access
    - Protected write operations
*/

-- Carts
CREATE TABLE IF NOT EXISTS carts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  session_id text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT user_or_session CHECK (
    (user_id IS NOT NULL AND session_id IS NULL) OR
    (user_id IS NULL AND session_id IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS idx_cart_user ON carts(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_session ON carts(session_id);

-- Cart Items
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id uuid REFERENCES carts(id) ON DELETE CASCADE NOT NULL,
  variant_id uuid REFERENCES product_variants(id) NOT NULL,
  quantity int NOT NULL CHECK (quantity > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(cart_id, variant_id)
);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_variant ON cart_items(variant_id);

-- Enable RLS
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their own cart"
  ON carts
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Anonymous users can manage their session cart"
  ON carts
  FOR ALL
  TO public
  USING (session_id IS NOT NULL)
  WITH CHECK (session_id IS NOT NULL);

CREATE POLICY "Users can manage their cart items"
  ON cart_items
  FOR ALL
  TO public
  USING (
    cart_id IN (
      SELECT id FROM carts WHERE 
        user_id = auth.uid() OR
        session_id IS NOT NULL
    )
  )
  WITH CHECK (
    cart_id IN (
      SELECT id FROM carts WHERE 
        user_id = auth.uid() OR
        session_id IS NOT NULL
    )
  );

-- Triggers
CREATE TRIGGER update_cart_updated_at
  BEFORE UPDATE ON carts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_cart_item_updated_at
  BEFORE UPDATE ON cart_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();