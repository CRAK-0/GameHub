import {
  addFavorite,
  removeFavorite,
  getFavoritesByUser,
} from "../models/favorite.model.js";

import pool from "../config/db.js";

export const createFavorite = async (req, res) => {
  const { rawgId } = req.params;

  try {
    const gameResult = await pool.query(
      `
        SELECT id
        FROM games
        WHERE rawg_id = $1
      `,
      [rawgId],
    );

    if (gameResult.rows.length === 0) {
      return res.status(404).json({
        message: "Game not found",
      });
    }

    const gameId = gameResult.rows[0].id;

    const favorite = await addFavorite(req.user, gameId);

    return res.status(201).json({
      message: "Game added to favorites",
      favorite,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Game is already in favorites",
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteFavorite = async (req, res) => {
  const { rawgId } = req.params;

  try {
    const gameResult = await pool.query(
      `
        SELECT id
        FROM games
        WHERE rawg_id = $1
      `,
      [rawgId],
    );

    if (gameResult.rows.length === 0) {
      return res.status(404).json({
        message: "Game not found",
      });
    }

    const gameId = gameResult.rows[0].id;

    const favorite = await removeFavorite(req.user, gameId);

    if (!favorite) {
      return res.status(404).json({
        message: "Game is not in your favorites",
      });
    }

    return res.status(200).json({
      message: "Game removed from favorites",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getUserFavorites = async (req, res) => {
  try {
    const favorites = await getFavoritesByUser(req.user);

    return res.status(200).json({
      favorites,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
