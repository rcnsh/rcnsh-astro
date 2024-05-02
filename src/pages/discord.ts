import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  return new Response(
    "rcn",
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
};
