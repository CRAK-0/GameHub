import { getGame } from "@/services/games";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function GameDetails({ params }) {
  const { id } = await params;

  const game = await getGame(id);

  if (!game) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Back link */}
        <a
          href="/"
          className="mb-8 inline-flex items-center text-sm text-zinc-400 transition hover:text-white"
        >
          ← Back to games
        </a>

        {/* Hero */}
        <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* Image */}
            <div className="relative min-h-105 lg:min-h-150">
              <Image
                src={game.thumbnail}
                alt={game.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <span className="mb-5 w-fit rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-purple-400">
                {game.genre}
              </span>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {game.title}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
                {game.short_description}
              </p>

              {/* Game information */}
              <div className="mt-8 grid grid-cols-2 gap-y-6 border-y border-zinc-800 py-7">
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Platform
                  </p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">
                    {game.platform}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Release
                  </p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">
                    {game.release_date}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Developer
                  </p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">
                    {game.developer}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Publisher
                  </p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">
                    {game.publisher}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={game.game_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold transition hover:bg-purple-500"
                >
                  Play Game
                </a>

                <button className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white">
                  ♡ Favorite
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
