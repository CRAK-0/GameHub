"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowLeft } from "lucide-react";
import { getFavorites, removeFavorite } from "@/services/favorite.js";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await getFavorites();

        console.log("FAVORITES DATA:", data);

        setFavorites(data.favorites || []);
      } catch (error) {
        console.error("Favorites error:", error);
        setError("Failed to load your favorites.");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleRemove = async (rawgId) => {
    try {
      await removeFavorite(rawgId);

      setFavorites((current) =>
        current.filter(
          (favorite) => String(favorite.rawg_id) !== String(rawgId),
        ),
      );
    } catch (error) {
      console.error("Remove favorite error:", error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-zinc-400">Loading favorites...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-red-400">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <Heart className="fill-red-500 text-red-500" size={26} />

              <h1 className="text-3xl font-bold">My Favorites</h1>
            </div>

            <p className="text-zinc-400">
              Games you've saved to your collection.
            </p>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Games
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 text-center">
            <Heart size={48} className="mb-4 text-zinc-700" />

            <h2 className="text-xl font-semibold">No favorite games yet</h2>

            <p className="mt-2 max-w-md text-sm text-zinc-500">
              Start exploring games and click the heart icon to add them to your
              favorites.
            </p>

            <Link
              href="/"
              className="mt-6 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-purple-500"
            >
              Explore Games
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-5 text-sm text-zinc-500">
              {favorites.length}{" "}
              {favorites.length === 1 ? "favorite" : "favorites"}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {favorites.map((favorite) => (
                <div
                  key={favorite.rawg_id}
                  className="group relative overflow-hidden rounded-xl bg-zinc-900"
                >
                  <Link href={`/game/${favorite.rawg_id}`}>
                    <Image
                      src={favorite.background_image}
                      alt={favorite.name}
                      width={300}
                      height={400}
                      unoptimized
                      className="h-80 w-full object-cover"
                    />

                    <h2 className="font-semibold text-white">
                      {favorite.name}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-400">
                      ⭐ {favorite.rating}
                    </p>
                  </Link>

                  <button
                    onClick={() => handleRemove(favorite.rawg_id)}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:scale-110 hover:bg-black/80"
                    aria-label="Remove from favorites"
                  >
                    <Heart size={20} className="fill-red-500 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
