CREATE TABLE IF NOT EXISTS orders (
  id bigserial PRIMARY KEY,
  reference text NOT NULL UNIQUE,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  customer_legal_id text,
  city text NOT NULL,
  address text NOT NULL,
  notes text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal_cop integer NOT NULL,
  shipping_cop integer NOT NULL DEFAULT 0,
  shipping_note text,
  total_cop integer NOT NULL,
  status text NOT NULL DEFAULT 'created',
  payment_method text,
  wompi_transaction_id text,
  wompi_status_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status, created_at DESC);
