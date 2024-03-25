import type { APIRoute } from "astro";

import { z } from "zod";

interface ExternalUrls {
  spotify: string;
}

interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: { height: number; url: string; width: number }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface ExternalIds {
  isrc: string;
}

interface Item {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface Context {
  external_urls: ExternalUrls;
  href: string;
  type: string;
  uri: string;
}

interface Actions {
  disallows: {
    pausing: boolean;
  };
}

interface SpotifyData {
  timestamp: number;
  context: Context;
  progress_ms: number;
  item: Item;
  currently_playing_type: string;
  actions: Actions;
  is_playing: boolean;
}

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
    return new Response(JSON.stringify({
      isPlaying: false,
      title: "Not Listening",
      artist: "Spotify",
      album: "",
      albumImageUrl: "https://spotify.com",
      songUrl: "https://open.spotify.com/user/nz3i2a30ep85rv5ymcpglhndj",
    }), {
      headers: {
        "content-type": "application/json",
      },
    });
  } else {
    const song = JSON.parse(responseBody) as SpotifyData;

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists
      .map((_artist: { name: string }) => _artist.name)
      .join(", ");
    const album = song.item.album.name;
    const albumImageUrl =
      song.item.album.images[0]?.url ?? "https://spotify.com";
    const songUrl = song.item.external_urls.spotify;

    return new Response(JSON.stringify({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      song,
    }), {
      headers: {
        "content-type": "application/json",
      },
    });
  }
};