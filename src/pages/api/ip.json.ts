import type { APIContext } from "astro";

export function GET({ clientAddress }: APIContext) {
  return new Response(JSON.stringify({ clientAddress }), {
    headers: {
      "content-type": "application/json",
    },
  });
}