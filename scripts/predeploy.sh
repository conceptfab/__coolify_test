#!/bin/sh
# Skrypt pre-deploy dla Coolify.
# Uruchamiany w istniejącym kontenerze przed wdrożeniem (Pre-deployment command).
# W Coolify: ustaw pole "Pre-deployment" na: sh /app/scripts/predeploy.sh

set -e

echo "[predeploy] Rozpoczęcie pre-deploy..."

# Opcjonalne sprawdzenia (nie blokują, tylko informują)
if [ -n "${PORT:-}" ]; then
  echo "[predeploy] PORT=$PORT"
else
  echo "[predeploy] PORT nie ustawiony (użyty będzie domyślny)"
fi

if [ -n "${NODE_ENV:-}" ]; then
  echo "[predeploy] NODE_ENV=$NODE_ENV"
fi

# Coolify: sprawdzenie wybranych zmiennych (obecność)
[ -n "${COOLIFY_FQDN:-}" ] && echo "[predeploy] COOLIFY_FQDN jest ustawiona"
[ -n "${COOLIFY_URL:-}" ] && echo "[predeploy] COOLIFY_URL jest ustawiona"
[ -n "${COOLIFY_BRANCH:-}" ] && echo "[predeploy] COOLIFY_BRANCH jest ustawiona"
[ -n "${COOLIFY_CONTAINER_NAME:-}" ] && echo "[predeploy] COOLIFY_CONTAINER_NAME jest ustawiona"

echo "[predeploy] Zakończono pre-deploy (OK)"
exit 0
