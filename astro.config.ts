import { defineConfig, squooshImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import db from "@astrojs/db";
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "never",
  site: "https://rcn.sh",
  prefetch: {
    defaultStrategy: "hover",
  },
  integrations: [tailwind(), react(), sitemap(), db(), auth()],
  image: {
    service: squooshImageService(),
  },
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
