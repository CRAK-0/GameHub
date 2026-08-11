import Image from "next/image";
import Link from "next/link";

export default function FreeGameCard({ game }) {
  return (
    <Link href={`/game/${game.id}`}>
      <article className="block overflow-hidden rounded-xl bg-zinc-900 transition-transform hover:-translate-y-1">
        <Image
          src={game.background_image}
          alt={game.name}
          width={300}
          height={400}
          unoptimized
          className="h-64 w-full object-cover"
        />

        <div className="space-y-3 p-4">
          <h2 className="text-lg font-semibold text-white">{game.name}</h2>

          <p className="text-sm text-zinc-400">{game.platform}</p>

          <div className="flex flex-wrap gap-2">
            {game.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
