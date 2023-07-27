import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const viteEnv = {};
Object.keys(process.env).forEach((key) => {
  if (key.startsWith('VITE_')) {
    viteEnv[`import.meta.env.${key}`] = process.env[key];
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
  },
  server: {
    proxy: {
      "/search": "http://localhost:5000/",
      "/tts": "http://localhost:5000/",
      "/activateAPI": "http://localhost:5000/",
    },
  },
  alias: {
    '@': require('path').resolve(__dirname, 'src'),
  },
  define: viteEnv,
  plugins: [react()],
});





