"use client";

import GameCard from "./GameCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

function GameBrowser({ games, genres, currentPage, totalGames }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const totalPages = Math.ceil(totalGames / 20);

  const search = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(search);
  const genre = searchParams.get("genre") || "";

  const sort = searchParams.get("sort") || "default";

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchInput) {
        params.set("search", searchInput);
      } else {
        params.delete("search");
      }

      params.delete("page");

      router.replace(`/?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const sortedGames = [...games];

  if (sort === "az") {
    sortedGames.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === "za") {
    sortedGames.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sort === "newest") {
    sortedGames.sort((a, b) => new Date(b.released) - new Date(a.released));
  }

  if (sort === "oldest") {
    sortedGames.sort((a, b) => new Date(a.released) - new Date(b.released));
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <input
        type="text"
        placeholder="Enter the Game Name"
        className="mb-8 h-12 w-full max-w-md rounded-lg border border-zinc-700 bg-zinc-900 px-4 text-base text-white outline-none placeholder:text-zinc-500 focus:border-purple-500"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <select
        value={genre}
        onChange={(e) => {
          const value = e.target.value;

          const params = new URLSearchParams(searchParams.toString());

          if (value) {
            params.set("genre", value);
          } else {
            params.delete("genre");
          }

          params.delete("page");

          router.push(`/?${params.toString()}`);
        }}
        className="h-12 ml-4 rounded-lg border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-purple-500"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.slug}>
            {genre.name}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => {
          const value = e.target.value;

          const params = new URLSearchParams(searchParams.toString());

          if (value === "default") {
            params.delete("sort");
          } else {
            params.set("sort", value);
          }

          router.push(`/?${params.toString()}`);
        }}
        className="h-12 ml-4 rounded-lg border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-purple-500"
      >
        <option value="default">Default</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      <div className="mt-12 flex items-center justify-center gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());

            params.set("page", currentPage - 1);

            router.push(`/?${params.toString()}`);
          }}
          className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          ←
        </button>

        <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-5 py-2.5 text-sm font-medium text-purple-400">
          {currentPage}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());

            params.set("page", currentPage + 1);

            router.push(`/?${params.toString()}`);
          }}
          className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          →
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-zinc-600">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}

export default GameBrowser;
