export default function ReviewList({ reviews }) {
  console.log("REVIEW ID:", reviews[0]?.id);
  console.log("FULL REVIEW:", reviews[0]);

  if (reviews.length === 0) {
    return (
      <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-7 sm:p-8">
        <h2 className="text-xl font-semibold">Reviews</h2>

        <p className="mt-5 text-sm text-zinc-500">
          No reviews yet. Be the first to review this game.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-7 sm:p-8">
      <h2 className="text-xl font-semibold">Reviews</h2>

      <div className="mt-6 space-y-5">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="border-b border-zinc-800 pb-5 last:border-0 last:pb-0"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-medium text-zinc-200">{review.username}</p>

              <p className="text-sm text-zinc-400">⭐ {review.rating}/5</p>
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {review.comment}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
