# Blog MedSmell — blog.medsmell.com.br

Site estático em Astro. Cada post é um arquivo Markdown em `src/content/posts/<slug>.md`.

## Como publicar um post
Este repositório é público: só entra aqui texto já revisado.

1. O agente de SEO e Conteúdo escreve o rascunho **no card do Paperclip**, não aqui.
2. O **Revisor de Conformidade** dá o parecer no card (tema de saúde). Ajustes são feitos no card.
3. Com o parecer "Conforme", o agente pede aprovação no WhatsApp com o campo `posts` (ver "Publicação automática").
4. O **Carlos** ou a **Dra. Gabriela** tocam em **Aprovar** e o post entra no ar em até 10 minutos.

Nada é publicado sem a aprovação do Carlos ou da Dra. Gabriela. Para tirar um post do ar: `draft: true` ou reverter o commit.

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
image: "/img/posts/anosmia.webp"                         # opcional: capa
imageAlt: "Frascos de aromas usados no treinamento olfativo"  # obrigatório quando há capa
---
Texto em Markdown. Sem promessa de cura ou prazo. Indique "procure um otorrino ou o seu médico".
```

O slug é o nome do arquivo. Para manter os links antigos do Wix, use o mesmo slug do post antigo: `/post/<slug>` redireciona para `/<slug>/`.

## Imagem de capa
- Arquivo em `public/img/posts/<slug-sem-acento>.webp`, **1200 × 630 px**, WebP, até 200 KB.
- A ligação capa → post fica em `src/data/capas.json` (`{"<slug>": {"arquivo": "...", "alt": "..."}}`), separada do texto: atualizar um post não mexe na capa. O campo `image`/`imageAlt` no próprio post ainda funciona e tem prioridade.
- A capa aparece no topo do post, na lista da página inicial e na prévia ao compartilhar (WhatsApp, Facebook). Sem capa, a prévia usa o ícone da MedSmell.
- Tema de saúde: sem "antes e depois" nem imagem que sugira cura. A capa passa pela dupla checagem de artes e pelo Revisor.

## Publicação automática (aprovação no WhatsApp)
O agente pede aprovação com a ferramenta do WhatsApp. Quando o Carlos ou a Dra. Gabriela tocam em **Aprovar**, o n8n (fluxo "GPG Blog - publicar capas aprovadas") grava tudo num único commit na `main`; o site atualiza em até 10 minutos. **Ajustar** ou **Recusar** cancela o pedido. Para desfazer, reverta o commit.
- **Capas:** campo `blog` (post, anexo e texto alternativo de cada capa). O n8n confere WebP 1200 × 630 até 200 KB.
- **Textos:** campo `posts` (slug e documento do card no Paperclip). O n8n guarda o texto do jeito que estava no pedido, manda o link para leitura no grupo e confere o cabeçalho (título até 70, descrição até 160, data). O texto passa antes pelo Revisor no card.

## Identidade
Cores `#617572`, `#aed4d2`, `#f3ceca` e `#d2b9a7`. Títulos em Ananda e textos em Avenir; sem as fontes, o navegador usa as do sistema.
