import { defineConfig, squooshImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import db from "@astrojs/db";
import auth from "auth-astro";
import partytown from "@astrojs/partytown";
import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "never",
  site: "https://rcn.sh",
  prefetch: {
    defaultStrategy: "hover",
  },
  integrations: [
    tailwind(),
    react(),
    sitemap(),
    db(),
    auth(),
    partytown(),
    sentry({
      dsn: "https://4d0bdc75590baa9fe6234509c873ae6d@o396276.ingest.us.sentry.io/4507024116613125",
      sourceMapsUploadOptions: {
        project: "rcnsh",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
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
