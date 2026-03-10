import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: '/21-Dias/',
  plugins: [react(), tailwindcss()],

  // onde está o app
  root: "client",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },

  // necessário para GitHub Pages
  base: "./",

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },

  server: {
    port: 3000,
    host: true,
  },
});