import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'generateSW',
      manifestFilename: 'manifest.json',
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html}', '*.png'], // <-- Ajustado para buscar o PNG na raiz do build
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true
      },
      manifest: {
        short_name: "Catavento",
        name: "Catavento",
        icons: [
          { src: "/icon-192.png", type: "image/png", sizes: "192x192", purpose: "any" },
          { src: "/icon-512.png", type: "image/png", sizes: "512x512", purpose: "any" }
        ],
        start_url: "/",
        background_color: "#0d1b2a",
        theme_color: "#0d1b2a",
        display: "standalone",
        orientation: "portrait"
      }
    })
  ]
});
