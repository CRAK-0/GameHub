import pool from "../config/db.js";

export const saveGame = async (rawgGame) => {
  const genres = rawgGame.genres?.map((genre) => genre.name) || [];

  const platforms = rawgGame.platforms?.map((item) => item.platform.name) || [];

  const developers =
    rawgGame.developers?.map((developer) => developer.name) || [];

  const publishers =
    rawgGame.publishers?.map((publisher) => publisher.name) || [];

  const result = await pool.query(
    `
      INSERT INTO games (
        rawg_id,
        name,
        description,
        released,
        rating,
        metacritic,
        background_image,
        website,
        genres,
        platforms,
        developers,
        publishers
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (rawg_id)
      DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        released = EXCLUDED.released,
        rating = EXCLUDED.rating,
        metacritic = EXCLUDED.metacritic,
        background_image = EXCLUDED.background_image,
        website = EXCLUDED.website,
        genres = EXCLUDED.genres,
        platforms = EXCLUDED.platforms,
        developers = EXCLUDED.developers,
        publishers = EXCLUDED.publishers
      RETURNING *;
    `,
    [
      rawgGame.id,
      rawgGame.name,
      rawgGame.description_raw,
      rawgGame.released,
      rawgGame.rating,
      rawgGame.metacritic,
      rawgGame.background_image,
      rawgGame.website,
      genres,
      platforms,
      developers,
      publishers,
    ],
  );

  return result.rows[0];
};

export const getGameByRawgId = async (rawgId) => {
  const result = await pool.query(
    `
        SELECT *
        FROM games
        WHERE rawg_id = $1;
        `,
    [rawgId],
  );

  return result.rows[0];
};
