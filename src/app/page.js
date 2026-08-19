import { getGames, getGenres } from "@/services/rawg.js";
import GameBrowser from "@/components/GameBrowser";

export default async function Home({ searchParams }) {
  const params = await searchParams;

  const search = params.search || "";
  const genre = params.genre || "";
  const page = Number(params.page) || 1;

  const data = await getGames(page, search, genre);
  const genres = await getGenres();

  return (
    <main>
      <GameBrowser
        games={data.results}
        genres={genres}
        currentPage={page}
        totalGames={data.count}
      />
    </main>
  );
}
