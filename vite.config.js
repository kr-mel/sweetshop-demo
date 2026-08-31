import { defineConfig } from 'vite'

export default defineConfig({
  // Relative base so the build works on GitHub Pages (project subpath),
  // a custom domain, or any static host without further config.
  base: './',
  server: {
    allowedHosts: true
  }
})
