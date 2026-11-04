#!/bin/sh
# Roda na VPS (cron do usuário op-claude a cada 10 min): publica o que estiver na main do GitHub.
# Compara a main com o último commit PUBLICADO COM SUCESSO (.deployed-sha). Se a build falhar,
# o arquivo não muda e a próxima rodada tenta de novo. Sem limpeza global de Docker.
set -eu

main() {
  DIR=$(cd "$(dirname "$0")/.." && pwd)
  DOCKER="docker"; [ "$(id -u)" = "0" ] || DOCKER="sudo -n docker"
  cd "$DIR"

  # Uma execução por vez (evita duas builds simultâneas).
  exec 9>"$DIR/.deploy.lock"
  if ! flock -n 9; then echo "$(date -Is) outra publicação em andamento; pulando"; return 0; fi

  git fetch --quiet origin main
  ALVO=$(git rev-parse origin/main)
  PUBLICADO=$(cat "$DIR/.deployed-sha" 2>/dev/null || echo "nenhum")
  if [ "$ALVO" = "$PUBLICADO" ] && [ "${1:-}" != "--forcar" ]; then return 0; fi

  git reset --quiet --hard "$ALVO"
  if $DOCKER compose -f deploy/compose.yml up -d --build; then
    echo "$ALVO" > "$DIR/.deployed-sha"
    $DOCKER image prune -f --filter "label=com.docker.compose.project=medsmell-blog" >/dev/null 2>&1 || true
    echo "$(date -Is) publicado $(git rev-parse --short "$ALVO")"
  else
    echo "$(date -Is) FALHA na build de $(git rev-parse --short "$ALVO"); o site anterior segue no ar e a próxima rodada tenta de novo"
    return 1
  fi
}

# Tudo numa função: o shell lê o arquivo inteiro antes de rodar, então o git reset pode
# trocar este script durante a execução sem efeito colateral.
main "$@"; exit $?
