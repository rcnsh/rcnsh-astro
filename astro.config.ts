import { defineConfig, squooshImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "never",
  site: "https://rcn.sh",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  experimental: {
    clientPrerender: true,
  },
  integrations: [tailwind(), react(), sitemap(), db()],
  image: {
    service: squooshImageService(),
  },
  output: "server",
  adapter: vercel({
    isr: {
      expiration: 60,
    },
    webAnalytics: {
      enabled: true,
    },
  }),
});
