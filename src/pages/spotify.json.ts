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

async function GetSpotifyData() {
  try {
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

    let songData;

    if (!responseBody.trim()) {
      songData = {
        isPlaying: false,
        title: "Not Listening",
        artist: "Spotify",
        album: "",
        albumImageUrl: "https://spotify.com",
        songUrl: "https://open.spotify.com/user/nz3i2a30ep85rv5ymcpglhndj",
      };
    } else {
      const song = JSON.parse(responseBody) as SpotifyData;

      const isPlaying = song.is_playing;
      const title = song.item.name;
      const artist = song.item.artists
        .map((_artist: { name: any }) => _artist.name)
        .join(", ");
      const album = song.item.album.name;
      const albumImageUrl =
        song.item.album.images[0]?.url ?? "https://spotify.com";
      const songUrl = song.item.external_urls.spotify;

      songData = {
        album,
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
      };
    }
    return songData;
  } catch (error) {
    console.error(error);
    return {
      isPlaying: false,
      title: "Not Listening",
      artist: "Spotify",
      album: "",
      albumImageUrl: "https://spotify.com",
      songUrl: "https://open.spotify.com/user/nz3i2a30ep85rv5ymcpglhndj",
    };
  }
}

export async function GET() {
  const result = await GetSpotifyData();
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
