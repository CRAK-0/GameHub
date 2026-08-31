import pool from "../config/db.js";

export const addFavorite = async (userId, gameId) => {
  const result = await pool.query(
    `
      INSERT INTO favorites (user_id, game_id)
      VALUES ($1, $2)
      RETURNING user_id, game_id
    `,
    [userId, gameId],
  );

  return result.rows[0];
};

export const removeFavorite = async (userId, gameId) => {
  const result = await pool.query(
    `
      DELETE FROM favorites
      WHERE user_id = $1
      AND game_id = $2
      RETURNING user_id, game_id
    `,
    [userId, gameId],
  );

  return result.rows[0];
};

export const getFavoritesByUser = async (userId) => {
  const result = await pool.query(
    `
      SELECT
        favorites.game_id,
        games.rawg_id,
        games.name,
        games.rating,
        games.background_image
      FROM favorites
      JOIN games
      ON favorites.game_id = games.id
      WHERE favorites.user_id = $1
    `,
    [userId],
  );

  return result.rows;
};
