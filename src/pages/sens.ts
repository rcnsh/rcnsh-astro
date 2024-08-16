import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  return new Response("1600dpi 0.125 ingame", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
