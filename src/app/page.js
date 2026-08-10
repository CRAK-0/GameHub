import { getGames } from "@/services/games";
import GameBrowser from "@/components/GameBrowser";

export default async function Home() {
  const games = await getGames();

  return (
    <main>
      <GameBrowser games={games} />
    </main>
  );
}
