import { getGames } from "@/services/rawg.js";
import GameCard from "@/components/GameCard.jsx";

export default async function Home() {
  const games = await getGames();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {games.results.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
