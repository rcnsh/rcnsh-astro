type Game = {
  appid: number;
  name: string;
  game_image_url: string;
  playtime_2weeks: number;
  playtime_forever: number;
};

type Response = {
  response: {
    total_count: number;
    games: Game[];
  };
};

async function getRecentSteam() {
  const steamGames = await fetch(
    `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${
      import.meta.env.STEAM_API_KEY
    }&steamid=${import.meta.env.STEAM_USER_ID}&format=json`,
  ).then((response) => response.json());

  return steamGames;
}

async function getAllSteam() {
  const steamGames = await fetch(
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${
      import.meta.env.STEAM_API_KEY
    }&steamid=${import.meta.env.STEAM_USER_ID}&format=json`,
  ).then((response) => response.json());

  return steamGames;
}

const steamRecentGamesResponse = (await getRecentSteam()) as Response;
const steamAllGamesResponse = (await getAllSteam()) as Response;

export async function steamRecentGamesPromise() {
  return (await Promise.all(
    steamRecentGamesResponse.response.games.map((game) => {
      return {
        name: game.name,
        appid: game.appid,
        playtime_2weeks: game.playtime_2weeks,
        playtime_forever: game.playtime_forever,
        game_image_url: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/library_600x900_2x.jpg`,
      };
    }),
  )) as Game[];
}

export async function steamAllGamesPromise() {
  return (await Promise.all(
    steamAllGamesResponse.response.games
      .map((game) => {
        return {
          name: game.name,
          appid: game.appid,
          playtime_2weeks: game.playtime_2weeks,
          playtime_forever: game.playtime_forever,
          game_image_url: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/library_600x900_2x.jpg`,
        };
      })
      .filter((game) => game.playtime_forever > 0)
      .slice(0, 15),
  )) as Game[];
}
