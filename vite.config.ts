/// <reference types="vitest" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * 링크 미리보기(카카오톡 등)는 og:image 에 절대 주소가 필요하다.
 * SITE_URL 이 있으면 그 값을, 없으면 Vercel 이 빌드 때 넣어주는
 * VERCEL_PROJECT_PRODUCTION_URL(예: cooking-recipe.vercel.app)을 쓴다.
 */
function siteUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return '';
}

function siteUrlPlugin(): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl()),
  };
}

export default defineConfig({
  plugins: [react(), siteUrlPlugin()],
  base: './',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
