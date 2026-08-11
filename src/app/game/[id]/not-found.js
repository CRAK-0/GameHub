import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center text-white">
      <p className="text-sm font-medium uppercase tracking-wider text-purple-400">
        404
      </p>

      <h1 className="mt-3 text-4xl font-bold">Game not found</h1>

      <p className="mt-3 max-w-md text-zinc-400">
        We couldn't find the game you're looking for.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold transition hover:bg-purple-500"
      >
        Back to Games
      </Link>
    </main>
  );
}
