"use client";

import { useState } from "react";
import { createReview } from "@/services/backend.js";

export default function ReviewForm({ gameId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      await createReview({
        gameId: Number(gameId),
        rating,
        comment,
      });

      setComment("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-7 sm:p-8">
      <h2 className="text-xl font-semibold">Write a Review</h2>

      <div className="mt-6">
        <label className="text-sm font-medium text-zinc-300">Rating</label>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-2 block rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white"
        >
          <option value={5}>5 - Excellent</option>
          <option value={4}>4 - Great</option>
          <option value={3}>3 - Good</option>
          <option value={2}>2 - Fair</option>
          <option value={1}>1 - Poor</option>
        </select>
      </div>

      <div className="mt-5">
        <label className="text-sm font-medium text-zinc-300">Comment</label>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What do you think about this game?"
          rows={4}
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-purple-500"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="mt-5 rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-500"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </section>
  );
}
