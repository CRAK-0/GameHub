"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center text-white">
      <p className="text-sm font-medium uppercase tracking-wider text-purple-400">
        Something went wrong
      </p>

      <h1 className="mt-3 text-4xl font-bold">Couldn't load this game</h1>

      <p className="mt-3 max-w-md text-zinc-400">
        We couldn't load the game right now. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold transition hover:bg-purple-500"
      >
        Try Again
      </button>
    </main>
  );
}
