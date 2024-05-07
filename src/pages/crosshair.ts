import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  return new Response(
    "0;s;1;P;c;7;u;DFFF00FF;o;1;d;1;z;3;f;0;0t;1;0l;2;0v;4;0o;0;0a;0;0f;0;1b;0;S;t;DFFF00FF;s;0.9;o;1",
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
};