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
---
Texto em Markdown. Sem promessa de cura ou prazo. Indique "procure um otorrino ou o seu médico".
```

O slug é o nome do arquivo. Para manter os links antigos do Wix, use o mesmo slug do post antigo: `/post/<slug>` redireciona para `/<slug>/`.

## Identidade
Cores `#617572`, `#aed4d2`, `#f3ceca` e `#d2b9a7`. Títulos em Ananda e textos em Avenir; sem as fontes, o navegador usa as do sistema.
