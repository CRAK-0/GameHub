import pool from "../config/db.js";

export const getReviewsByRawgId = async (rawgId) => {
  const result = await pool.query(
    `
      SELECT
        users.username,
        reviews.rating,
        reviews.comment,
        reviews.created_at
      FROM reviews
      JOIN users
        ON reviews.user_id = users.id
      JOIN games
        ON reviews.game_id = games.id
      WHERE games.rawg_id = $1
      ORDER BY reviews.created_at DESC;
    `,
    [rawgId],
  );

  return result.rows;
};
