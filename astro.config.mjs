import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://hvacductcalculator.com',
  trailingSlash: 'always',
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en', 'hi', 'es', 'ru', 'fr', 'de', 'it', 'pt',
      'bn', 'ja', 'ko', 'ms', 'pl', 'id', 'ar', 'bg', 'tr', 'sv',
    ],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
