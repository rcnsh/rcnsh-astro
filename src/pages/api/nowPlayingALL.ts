// spotify fetching code from nexxel.dev

import type { APIRoute } from "astro";
import type { SpotifyData } from "types";
import { z } from "zod";

async function getAccessToken(): Promise<{ access_token: string }> {
  const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`,
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const { access_token } = z
    .object({
      access_token: z.string(),
    })
    .parse(await response.json());

  return { access_token };
}

export const GET: APIRoute = async () => {
  const { access_token } = await getAccessToken();
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    },
  );

  const responseBody = await response.text();

  if (!responseBody.trim()) {
    return new Response(
      JSON.stringify({
        isPlaying: false,
      }),
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
  } else {
    const song = JSON.parse(responseBody) as SpotifyData;

    return new Response(
      JSON.stringify({
        song,
      }),
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }
};
