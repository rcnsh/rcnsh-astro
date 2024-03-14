// spotify fetching code from nexxel.dev
import type { APIRoute } from "astro";

import { z } from "zod";

export async function getAccessToken(): Promise<{ access_token: string }> {
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

export async function getTopTracksMedium() {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  ).then((res) => res.json());

  const { items } = z
    .object({
      items: z.array(
        z.object({
          artists: z.array(
            z.object({
              name: z.string(),
            }),
          ),
          album: z.object({
            name: z.string(),
            images: z.array(
              z.object({
                url: z.string(),
              }),
            ),
          }),
          external_urls: z.object({
            spotify: z.string(),
          }),
          name: z.string(),
        }),
      ),
    })
    .parse(response);

  return items.slice(0, 12).map((item) => ({
    artists: item.artists,
    songUrl: item.external_urls.spotify,
    title: item.name,
    album: item.album.name,
    image: item.album.images[0].url,
  }));
}

export async function getRecentTracks() {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  ).then((res) => res.json());

  const { items } = z
    .object({
      items: z.array(
        z.object({
          track: z.object({
            album: z.object({
              album_type: z.string(),
              artists: z.array(
                z.object({
                  external_urls: z.object({
                    spotify: z.string(),
                  }),
                  href: z.string(),
                  id: z.string(),
                  name: z.string(),
                  type: z.string(),
                  uri: z.string(),
                }),
              ),
              available_markets: z.array(z.string()),
              external_urls: z.object({
                spotify: z.string(),
              }),
              href: z.string(),
              id: z.string(),
              images: z.array(
                z.object({
                  height: z.number(),
                  url: z.string(),
                  width: z.number(),
                }),
              ),
              name: z.string(),
              release_date: z.string(),
              release_date_precision: z.string(),
              total_tracks: z.number(),
              type: z.string(),
              uri: z.string(),
            }),
            artists: z.array(
              z.object({
                external_urls: z.object({
                  spotify: z.string(),
                }),
                href: z.string(),
                id: z.string(),
                name: z.string(),
                type: z.string(),
                uri: z.string(),
              }),
            ),
            available_markets: z.array(z.string()),
            disc_number: z.number(),
            duration_ms: z.number(),
            explicit: z.boolean(),
            external_ids: z.object({
              isrc: z.string(),
            }),
            external_urls: z.object({
              spotify: z.string(),
            }),
            href: z.string(),
            id: z.string(),
            is_local: z.boolean(),
            name: z.string(),
            popularity: z.number(),
            preview_url: z.string().nullable(),
            track_number: z.number(),
            type: z.string(),
            uri: z.string(),
          }),
          played_at: z.string(),
          context: z.object({
            type: z.string(),
            external_urls: z.object({
              spotify: z.string(),
            }),
            href: z.string(),
            uri: z.string(),
          }),
        }),
      ),
    })
    .parse(response);

  return items.slice(0, 12).map((item) => ({
    artists: item.track.artists,
    songUrl: item.track.external_urls.spotify,
    title: item.track.name,
    album: item.track.album,
    image: item.track.album.images[0].url,
  }));
}

export async function getTopArtists() {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=medium_term",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  ).then((res) => res.json());

  const { items } = z
    .object({
      items: z.array(
        z.object({
          name: z.string(),
          images: z.array(
            z.object({
              url: z.string(),
            }),
          ),
          external_urls: z.object({
            spotify: z.string(),
          }),
          followers: z.object({
            total: z.number(),
          }),
        }),
      ),
    })
    .parse(response);

  return items.slice(0, 12).map((item) => ({
    name: item.name,
    url: item.external_urls.spotify,
    image: item.images[0].url,
  }));
}

export const GET: APIRoute = async () => {
  const tracksMedium = await getTopTracksMedium();
  const recentTracks = await getRecentTracks();
  const artists = await getTopArtists();
  return new Response(
    JSON.stringify({
      tracksMedium: tracksMedium,
      recentTracks: recentTracks,
      artists: artists,
    }),
    {
      headers: {
        "content-type": "application/json",
      },
    },
  );
};
