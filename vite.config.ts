import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Pasta onde está o app
  root: "client",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },

  // Importante para GitHub Pages
  base: "./",

  build: {
    // build final vai para a raiz do repo
    outDir: "dist",
    emptyOutDir: true,
  },

  server: {
    port: 3000,
    host: true,
  },
});
