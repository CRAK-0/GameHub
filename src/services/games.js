const BASE_URL = "https://www.freetogame.com/api";

async function request(endpoint) {
  const url = new URL(`${BASE_URL}/${endpoint}`);

  const response = await fetch(url);

  console.log(url.toString());

  if (!response.ok) {
    console.log(response.status);
    console.log(response.statusText);

    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export async function getGames() {
  const games = await request("games");

  return games.map((game) => {
    return {
      id: game.id,
      name: game.title,
      background_image: game.thumbnail,
      genres: [game.genre],
      platform: game.platform,
      release_date: game.release_date,
    };
  });
}
