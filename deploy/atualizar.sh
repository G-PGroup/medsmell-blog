#!/bin/sh
# Roda na VPS (cron do usuário op-claude a cada 10 min): publica o que estiver na main do GitHub.
# Só reconstrói quando a main muda. Sem limpeza global de Docker.
set -eu
DIR=$(cd "$(dirname "$0")/.." && pwd)
DOCKER="docker"; [ "$(id -u)" = "0" ] || DOCKER="sudo -n docker"
cd "$DIR"
git fetch --quiet origin main
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ] || [ "${1:-}" = "--forcar" ]; then
  git reset --quiet --hard origin/main
  $DOCKER compose -f deploy/compose.yml up -d --build
  $DOCKER image prune -f --filter "label=com.docker.compose.project=medsmell-blog" >/dev/null 2>&1 || true
  echo "$(date -Is) publicado $(git rev-parse --short HEAD)"
fi
