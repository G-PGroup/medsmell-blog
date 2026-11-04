import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
  }),
});

export const collections = { posts };
