export default function Loading() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Controls */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="h-12 w-full max-w-md animate-pulse rounded-lg bg-zinc-900" />

          <div className="h-12 w-40 animate-pulse rounded-lg bg-zinc-900" />

          <div className="h-12 w-40 animate-pulse rounded-lg bg-zinc-900" />
        </div>

        {/* Game cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-xl bg-zinc-900">
              {/* Image placeholder */}
              <div className="h-80 animate-pulse bg-zinc-800" />

              {/* Text placeholders */}
              <div className="space-y-3 p-4">
                <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-800" />

                <div className="h-4 w-1/4 animate-pulse rounded bg-zinc-800" />

                <div className="flex gap-2">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-zinc-800" />
                  <div className="h-6 w-20 animate-pulse rounded-full bg-zinc-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
