# Blog MedSmell — blog.medsmell.com.br

Site estático em Astro. Cada post é um arquivo Markdown em `src/content/posts/<slug>.md`.

## Como publicar um post
Este repositório é público: só entra aqui texto já revisado.

1. O agente de SEO e Conteúdo escreve o rascunho **no card do Paperclip**, não aqui.
2. O **Revisor de Conformidade** dá o parecer no card (tema de saúde). Ajustes são feitos no card.
3. Com o parecer "Conforme", o agente abre a PR com a **versão final** (modelo abaixo) e cita o card. O check `build` precisa passar.
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
image: "/img/posts/anosmia.webp"                         # opcional: capa
imageAlt: "Frascos de aromas usados no treinamento olfativo"  # obrigatório quando há capa
---
Texto em Markdown. Sem promessa de cura ou prazo. Indique "procure um otorrino ou o seu médico".
```

O slug é o nome do arquivo. Para manter os links antigos do Wix, use o mesmo slug do post antigo: `/post/<slug>` redireciona para `/<slug>/`.

## Imagem de capa (opcional)
- Arquivo em `public/img/posts/<slug>.webp`, **1200 × 630 px**, WebP, até 200 KB. Nome sem acento e sem espaço.
- `imageAlt` descreve a imagem em uma frase (acessibilidade e Google).
- A capa aparece no topo do post, na lista da página inicial e na prévia ao compartilhar (WhatsApp, Facebook).
- Tema de saúde: sem "antes e depois" nem imagem que sugira cura. A capa passa pela dupla checagem de artes e pelo Revisor junto com o texto.
- Sem capa, o post usa o ícone da MedSmell na prévia.
- **Publicação automática:** o agente pede aprovação no WhatsApp com o campo `blog` (post, anexo e texto alternativo de cada capa). Quando o Carlos ou a Dra. Gabriela tocam em **Aprovar**, o n8n (fluxo "GPG Blog - publicar capas aprovadas") confere cada imagem (WebP 1200 × 630, até 200 KB) e grava imagens e capas num único commit na `main`. A publicação no ar acontece em até 10 minutos. **Ajustar** ou **Recusar** cancela o pedido. Para tirar uma capa, reverta o commit.

## Identidade
Cores `#617572`, `#aed4d2`, `#f3ceca` e `#d2b9a7`. Títulos em Ananda e textos em Avenir; sem as fontes, o navegador usa as do sistema.
