"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="text-center">
        <p className="text-sm font-medium text-purple-400">
          Something went wrong
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          GameHub couldn't load the games
        </h1>

        <p className="mt-4 max-w-md text-zinc-400">
          We couldn't fetch the games right now. Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="mt-8 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold transition hover:bg-purple-500"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
