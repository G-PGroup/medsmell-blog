// Blog da MedSmell — site estático (Astro). Publicação por PR aprovada pelo Carlos.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.medsmell.com.br',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
