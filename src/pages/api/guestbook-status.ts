import type { APIRoute } from "astro";
 
export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.set("status", "Too many requests, try again later", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
 
  return redirect("/");
};