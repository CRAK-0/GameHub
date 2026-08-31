"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { addFavorite, removeFavorite } from "@/services/favorite.js";

export default function GameCard({ game, isFavorite: initialFavorite }) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    try {
      setLoading(true);

      if (isFavorite) {
        await removeFavorite(game.id);
        setIsFavorite(false);
      } else {
        await addFavorite(game.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Favorite error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-xl bg-zinc-900">
      <button
        onClick={handleFavorite}
        disabled={loading}
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:scale-110 hover:bg-black/80 disabled:opacity-50"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          size={21}
          className={isFavorite ? "fill-red-500 text-red-500" : ""}
        />
      </button>

      <Link href={`/game/${game.id}`}>
        <Image
          src={game.background_image}
          alt={game.name}
          width={300}
          height={400}
          unoptimized
          className="h-80 w-full object-cover"
        />

        <div className="space-y-2 p-4">
          <h2 className="text-lg font-semibold text-white">{game.name}</h2>

          <p className="text-sm text-zinc-400">⭐ {game.rating}</p>

          <div className="flex flex-wrap gap-2">
            {game.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
