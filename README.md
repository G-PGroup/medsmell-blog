# Blog MedSmell — blog.medsmell.com.br

Site estático em Astro. Cada post é um arquivo Markdown em `src/content/posts/<slug>.md`.

## Como publicar um post
1. O agente de SEO e Conteúdo cria uma branch e o arquivo do post (modelo abaixo).
2. Abre uma PR. O check `build` precisa passar.
3. O **Revisor de Conformidade** dá o parecer na PR (tema de saúde).
4. O **Carlos** aprova e faz o merge. Em até 10 minutos o post está no ar.

Nada é publicado sem o merge do Carlos. Para tirar um post do ar: `draft: true` ou reverter a PR.

## Modelo de post
```markdown
---
title: "Anosmia: o que é a perda total do olfato"      # até 70 caracteres
description: "Resumo para o Google, até 160 caracteres."
pubDate: 2026-11-10
author: "Equipe MedSmell"
reviewer: "Dra. Gabriela"                                # quem revisou o conteúdo de saúde
sources:
  - "Hummel T et al. Laryngoscope. 2009;119(3):496-499."
tags: [anosmia, olfato]
---
Texto em Markdown. Sem promessa de cura ou prazo. Indique "procure um otorrino ou o seu médico".
```

O slug é o nome do arquivo. Para manter os links antigos do Wix, use o mesmo slug do post antigo: `/post/<slug>` redireciona para `/<slug>/`.

## Identidade
Cores `#617572`, `#aed4d2`, `#f3ceca` e `#d2b9a7`. Títulos em Ananda e textos em Avenir; sem as fontes, o navegador usa as do sistema.

## Infra (VPS)
- `deploy/compose.yml`: projeto Compose `medsmell-blog`, nginx atrás do Traefik existente (rede `portainer_default`, entrypoint `websecure`, certificado `leresolver`).
- `deploy/atualizar.sh`: cron na VPS a cada 10 min; puxa a `main` e reconstrói só quando ela muda.
- DNS: `blog` (CNAME) → `srv754471.hstgr.cloud`, no registro.br.

Desenvolvimento local: `npm ci && npx astro dev`.
