import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
  plugins: [react()],
});

