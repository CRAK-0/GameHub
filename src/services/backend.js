const BASE_URL = "http://localhost:3000/api/v1";

export async function getGame(id) {
  const response = await fetch(`${BASE_URL}/games/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch game: ${response.status}`);
  }

  const data = await response.json();

  return data.game;
}

export async function getReviews(id) {
  const response = await fetch(`${BASE_URL}/reviews/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.status}`);
  }

  const data = await response.json();

  return data.reviews;
}

export async function createReview(reviewData) {
  const response = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(reviewData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create review");
  }

  return data;
}
