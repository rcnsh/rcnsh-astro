import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://rcn.sh",
  redirects: {"/github": "https://github.com/RCNOverwatcher"},
  integrations: [tailwind(), react(), sitemap()],
  output: "server",
  adapter: vercel()
});