import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';

// Static export: no Worker runtime, authentication, or database bindings.
export default defineConfig({
  base: `${process.env.GITHUB_PAGES_BASE_PATH || ''}/`,
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [vinext()],
});
