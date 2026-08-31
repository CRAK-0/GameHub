const BASE_URL = "http://localhost:3000/api/v1/favorites";

export const addFavorite = async (rawgId) => {
  const response = await fetch(`${BASE_URL}/${rawgId}`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add favorite");
  }

  return data;
};

export const removeFavorite = async (rawgId) => {
  const response = await fetch(`${BASE_URL}/${rawgId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to remove favorite");
  }

  return data;
};

export const getFavorites = async () => {
  const response = await fetch(BASE_URL, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get favorites");
  }

  return data;
};
