ALTER TABLE products
  ADD COLUMN IF NOT EXISTS presentations jsonb NOT NULL DEFAULT '[{"size":"500 ml","price_cop":35000},{"size":"1 litro","price_cop":55000}]'::jsonb,
  ADD COLUMN IF NOT EXISTS image text NOT NULL DEFAULT '/assets/img/hero-chamoy.webp',
  ADD COLUMN IF NOT EXISTS image_alt text NOT NULL DEFAULT 'Sirope y salsa de chamoy en Colombia',
  ADD COLUMN IF NOT EXISTS price_note text,
  ADD COLUMN IF NOT EXISTS comparison text,
  ADD COLUMN IF NOT EXISTS related_recipes text[] NOT NULL DEFAULT '{}';

UPDATE products
SET presentations = '[{"size":"500 ml","price_cop":35000},{"size":"1 litro","price_cop":55000}]'::jsonb
WHERE presentations IS NULL
   OR presentations = '[]'::jsonb;

ALTER TABLE products
  DROP COLUMN IF EXISTS price_cop;

ALTER TABLE recipes
  ADD COLUMN IF NOT EXISTS image text NOT NULL DEFAULT '/assets/img/hero-chamoy.webp',
  ADD COLUMN IF NOT EXISTS image_alt text NOT NULL DEFAULT 'Receta con chamoy',
  ADD COLUMN IF NOT EXISTS intro text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS tips jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS business_note text,
  ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'Receta',
  ADD COLUMN IF NOT EXISTS cuisine text NOT NULL DEFAULT 'Mexicana',
  ADD COLUMN IF NOT EXISTS keywords text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS date_published date NOT NULL DEFAULT DATE '2026-07-05',
  ADD COLUMN IF NOT EXISTS total_time_iso text,
  ADD COLUMN IF NOT EXISTS cook_time_iso text,
  ADD COLUMN IF NOT EXISTS related_slugs text[] NOT NULL DEFAULT '{}';

UPDATE recipes
SET intro = description
WHERE intro = '';

UPDATE recipes
SET total_time_iso = 'PT' || prep_minutes || 'M'
WHERE total_time_iso IS NULL;

CREATE INDEX IF NOT EXISTS idx_products_updated_at ON products(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_recipes_updated_at ON recipes(updated_at DESC);
