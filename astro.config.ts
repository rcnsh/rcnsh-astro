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
  output: "hybrid",
  adapter: vercel({
    isr: {
      exclude: [
        "/api/nowPlaying",
        "/api/auth/callback/github",
        "/api/auth/signout",
        "/api/auth/csrf",
        "/guestbook",
        "/api/**",
        "/api/auth/**",
        "/api/*",
        "/api/auth/*",
        "/api/auth/callback/*",
        "/api/auth/callback/**",
      ],
      expiration: 10,
    },
    webAnalytics: {
      enabled: true,
    },
  }),
});
