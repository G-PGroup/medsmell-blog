import { existsSync } from 'node:fs';
import capas from '../data/capas.json';

// Capa do post: o campo `image` do próprio post tem prioridade; senão vale src/data/capas.json,
// que o n8n atualiza quando uma capa é aprovada no WhatsApp. Arquivo ausente = sem capa (não quebra a build).
type Capa = { src: string; alt: string };
const tabela = capas as Record<string, { arquivo: string; alt: string }>;

export function capaDo(id: string, d: { image?: string; imageAlt?: string }): Capa | null {
  if (d.image) return { src: d.image, alt: d.imageAlt ?? '' };
  const c = tabela[id.normalize('NFC')];
  if (!c || !/^[a-z0-9-]+\.(webp|jpg|png)$/.test(c.arquivo)) return null;
  if (!existsSync(`public/img/posts/${c.arquivo}`)) return null;
  return { src: `/img/posts/${c.arquivo}`, alt: c.alt };
}
