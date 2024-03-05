import { defineConfig, squooshImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

import pageInsight from "astro-page-insight";

// https://astro.build/config
export default defineConfig({
  site: "https://rcn.sh",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  experimental: {
    clientPrerender: true,
  },
  integrations: [tailwind(), react(), sitemap(), pageInsight()],
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
