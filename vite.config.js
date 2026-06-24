import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg}'],
        skipWaiting: true,
        clientsClaim: true
      },
      manifest: {
        short_name: "Catavento",
        name: "Catavento",
        icons: [
          { 
            src: "icon-192.png", 
            type: "image/png", 
            sizes: "192x192", 
            purpose: "any maskable" 
          },
          { 
            src: "icon-512.png", 
            type: "image/png", 
            sizes: "512x512", 
            purpose: "any maskable" 
          }
        ],
        start_url: "/",
        background_color: "#000000",
        theme_color: "#000000",
        display: "standalone",
        orientation: "portrait"
      }
    })
  ]
});
