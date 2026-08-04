import { mockGames } from "./mockGames";

const BASE_URL = "https://api.rawg.io/api";

const API_KEY = process.env.RAWG_API_KEY;

async function request(endpoint) {
  if (!API_KEY) {
    throw new Error("RAWG_API_KEY is missing");
  }

  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append("key", API_KEY);

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

// export async function getGames(page = 1) {
//   return request(`games?page=${page}`);
// }

export async function getGames(page = 1) {
  return mockGames;
}
