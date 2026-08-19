export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="text-center">
        <p className="text-7xl font-black tracking-tight text-purple-500">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold">Game not found</h1>

        <p className="mt-3 max-w-md text-zinc-400">
          The game you're looking for doesn't exist or may have been removed.
        </p>

        <a
          href="/"
          className="mt-8 inline-block rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold transition hover:bg-purple-500"
        >
          Back to GameHub
        </a>
      </div>
    </main>
  );
}
