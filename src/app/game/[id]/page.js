import { getGame, getReviews } from "@/services/backend.js";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReviewList from "@/components/ReviewList.jsx";
import ReviewForm from "@/components/ReviewForm.jsx";

export default async function GameDetails({ params }) {
  const { id } = await params;

  const game = await getGame(id);

  if (!game) {
    notFound();
  }

  const reviews = await getReviews(id);

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
          <div className="relative min-h-105 lg:min-h-150">
            <Image
              src={game.background_image}
              alt={game.name}
              fill
              loading="eager"
              unoptimized
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Hero content */}
            <div className="absolute bottom-0 left-0 p-7 sm:p-10 lg:p-12">
              <span className="mb-4 inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-purple-400">
                {game.genres.join(" • ")}
              </span>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {game.name}
              </h1>

              <p className="mt-3 text-sm font-medium text-zinc-300">
                ⭐ {game.rating}
              </p>
            </div>
          </div>
        </section>

        {/* Game information */}
        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-7 sm:p-8">
          <h2 className="text-xl font-semibold">Game Information</h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Platforms
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-200">
                {game.platforms.join(" • ")}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Release
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-200">
                {game.released}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Developer
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-200">
                {game.developers.join(", ")}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Publisher
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-200">
                {game.publishers.join(", ")}
              </p>
            </div>
          </div>
        </section>

        {/* About the game */}
        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-7 sm:p-8">
          <h2 className="text-xl font-semibold">About the Game</h2>

          <p className="mt-5 max-w-4xl whitespace-pre-line text-base leading-8 text-zinc-400">
            {game.description}
          </p>
        </section>

        <ReviewList reviews={reviews} />

        <ReviewForm gameId={id} />

        {/* Actions */}
        <section className="mt-8 flex flex-wrap gap-3">
          <a
            href={game.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-500"
          >
            Visit Official Website
          </a>

          <button className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white">
            ♡ Favorite
          </button>
        </section>
      </div>
    </main>
  );
}
