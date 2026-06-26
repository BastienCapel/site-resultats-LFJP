import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Use relative paths for assets so it can be deployed on any subpath (e.g. GitHub Pages)
  server: {
    port: 3000,
  }
});
