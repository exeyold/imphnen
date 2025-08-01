// @ts-check
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),

  server: {
    port: 3000,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
