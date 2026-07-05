#!/usr/bin/env bash
# Backup diario de la base de datos de chamoy.com.co con rotación de 14 días.
set -euo pipefail

ENV_FILE="/var/www/chamoy/.env.local"
BACKUP_DIR="/var/backups/chamoy"

DATABASE_URL=$(grep '^DATABASE_URL=' "$ENV_FILE" | cut -d= -f2- | tr -d '"')
if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL no encontrada en $ENV_FILE" >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"

STAMP=$(date +%F)
pg_dump "$DATABASE_URL" | gzip > "$BACKUP_DIR/chamoy-$STAMP.sql.gz"

find "$BACKUP_DIR" -name 'chamoy-*.sql.gz' -mtime +14 -delete
