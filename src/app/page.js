import { getGames } from "@/services/games";
import GameBrowser from "@/components/GameBrowser";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const search = params.search || "";

  const games = await getGames();

  return (
    <main>
      <GameBrowser games={games} />
    </main>
  );
}
