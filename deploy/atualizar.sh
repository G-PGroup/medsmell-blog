#!/bin/sh
# Roda na VPS (cron a cada 10 min): publica o que estiver na main do GitHub.
# Só reconstrói quando a main muda. Sem limpeza global de Docker.
set -eu
DIR=/opt/medsmell-blog
cd "$DIR"
git fetch --quiet origin main
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ] || [ "${1:-}" = "--forcar" ]; then
  git reset --quiet --hard origin/main
  docker compose -f deploy/compose.yml up -d --build
  docker image prune -f --filter "label=com.docker.compose.project=medsmell-blog" >/dev/null 2>&1 || true
  echo "$(date -Is) publicado $(git rev-parse --short HEAD)"
fi
