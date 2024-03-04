export async function getSteam() {
  const steamGames = await fetch(
    `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${
      import.meta.env.STEAM_API_KEY
    }&steamid=${import.meta.env.STEAM_USER_ID}&format=json`,
  ).then((response) => response.json());

  return steamGames;
}
