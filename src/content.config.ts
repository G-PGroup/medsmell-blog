import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { existsSync } from 'node:fs';

// Cada post é um arquivo Markdown em src/content/posts/<slug>.md.
// Tema de saúde: todo post precisa de parecer do Revisor de Conformidade antes do merge.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Equipe MedSmell'),
    reviewer: z.string().optional(), // profissional de saúde que revisou
    sources: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Capa opcional: arquivo em public/img/posts/ (1200x630, WebP). Com capa, o texto alternativo é obrigatório.
    image: z
      .string()
      .regex(/^\/img\/posts\/[a-z0-9-]+\.(webp|jpg|png)$/, 'use /img/posts/<slug>.webp')
      .refine((p) => existsSync(`public${p}`), 'arquivo da capa não encontrado em public/img/posts/')
      .optional(),
    imageAlt: z.string().max(160).optional(),
  }).refine((d) => !d.image || !!d.imageAlt, { message: 'capa sem imageAlt (texto alternativo)', path: ['imageAlt'] }),
});

export const collections = { posts };
