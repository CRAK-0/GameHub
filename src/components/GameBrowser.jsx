"use client";

import FreeGameCard from "./FreeGameCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

function GameBrowser({ games }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(search);
  const genre = searchParams.get("genre") || "";

  const genres = [...new Set(games.flatMap((game) => game.genres))];

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

      router.replace(`/?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      genre === "" ||
      game.genres.some((item) => item.toLowerCase() === genre.toLowerCase());

    return matchesSearch && matchesGenre;
  });

  const sortedGames = [...filteredGames];

  if (sort === "az") {
    sortedGames.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === "za") {
    sortedGames.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sort === "newest") {
    sortedGames.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date),
    );
  }

  if (sort === "oldest") {
    sortedGames.sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date),
    );
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

          router.push(`/?${params.toString()}`);
        }}
        className="h-12 ml-4 rounded-lg border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-purple-500"
      >
        <option value="">All Genres</option>

        {genres.map((item) => (
          <option key={item} value={item}>
            {item}
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
          <FreeGameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default GameBrowser;
