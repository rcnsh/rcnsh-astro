import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const steam_data_recent = await fetch(
    `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${
      import.meta.env.STEAM_API_KEY
    }&steamid=${import.meta.env.STEAM_USER_ID}&format=json`,
  ).then((response) => response.json());

  const steam_data_all = await fetch(
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${
      import.meta.env.STEAM_API_KEY
    }&steamid=${import.meta.env.STEAM_USER_ID}&format=json`,
  ).then((response) => response.json());

  return new Response(
    JSON.stringify({ recent: steam_data_recent, all: steam_data_all }),
    {
      headers: {
        "content-type": "application/json",
      },
    },
  );
};
