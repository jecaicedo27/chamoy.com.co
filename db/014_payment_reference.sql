-- Referencia de pago Wompi (con sufijo -R por intento). Necesaria para
-- reconciliar por API: el webhook del comercio apunta a perlasexplosivas
-- (mismas llaves), así que chamoy confirma pagos consultando /transactions.

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS wompi_payment_reference text;

CREATE INDEX IF NOT EXISTS idx_orders_pending_wompi
  ON orders(status, created_at DESC)
  WHERE payment_method = 'wompi';
