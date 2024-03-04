import { defineConfig, squooshImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://rcn.sh",
  prefetch: true,
  integrations: [tailwind(), react(), sitemap()],
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
