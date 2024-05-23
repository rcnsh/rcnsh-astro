import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import db from "@astrojs/db";
import auth from "auth-astro";
import million from "million/compiler";
import MillionLint from "@million/lint";
import partytown from "@astrojs/partytown";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "never",
  site: "https://rcn.sh",
  prefetch: {
    defaultStrategy: "hover",
  },
  integrations: [tailwind(), react(), sitemap(), db(), auth(), partytown()],
  output: "server",
  image: {
    service: passthroughImageService(),
  },
  adapter: cloudflare({
    imageService: "cloudflare",
    wasmModuleImports: true,
  }),
  vite: {
    plugins: [
      million.vite({
        mode: "react",
        server: true,
      }),
      MillionLint.vite(),
    ],
  },
});
