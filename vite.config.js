import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const baseurl = "http://localhost:5000";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: baseurl,
      },
    },
  },
  plugins: [react()],
});
