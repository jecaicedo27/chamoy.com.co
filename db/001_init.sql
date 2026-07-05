CREATE TABLE IF NOT EXISTS products (
  id bigserial PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  format text NOT NULL,
  short_description text NOT NULL,
  description text NOT NULL,
  best_for text[] NOT NULL DEFAULT '{}',
  highlights jsonb NOT NULL DEFAULT '[]'::jsonb,
  price_cop integer,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS recipes (
  id bigserial PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  intent text NOT NULL,
  description text NOT NULL,
  prep_minutes integer NOT NULL,
  servings text NOT NULL,
  ingredients jsonb NOT NULL DEFAULT '[]'::jsonb,
  steps jsonb NOT NULL DEFAULT '[]'::jsonb,
  product_slug text REFERENCES products(slug),
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faqs (
  id bigserial PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  page text NOT NULL DEFAULT 'general',
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leads (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  city text,
  business_type text,
  need text NOT NULL,
  source_path text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_sources (
  id bigserial PRIMARY KEY,
  source text NOT NULL,
  query text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_active_order ON products(active, sort_order);
CREATE INDEX IF NOT EXISTS idx_recipes_active_order ON recipes(active, sort_order);
CREATE INDEX IF NOT EXISTS idx_faqs_page_order ON faqs(page, active, sort_order);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

DELETE FROM faqs a
USING faqs b
WHERE a.id > b.id
  AND lower(a.question) = lower(b.question)
  AND a.page = b.page;

CREATE UNIQUE INDEX IF NOT EXISTS idx_faqs_question_page_unique ON faqs(lower(question), page);
