import pool from "../config/db.js";
import { getReviewsByRawgId } from "../models/review.model.js";

export const createReview = async (req, res) => {
  const { gameId, rating, comment } = req.body;
  const userId = req.user;

  if (!gameId || !rating) {
    return res.status(400).json({
      message: "Game ID and rating are required",
    });
  }

  try {
    // Find our PostgreSQL game ID using RAWG ID
    const gameResult = await pool.query(
      `
        SELECT id
        FROM games
        WHERE rawg_id = $1
      `,
      [gameId],
    );

    if (gameResult.rows.length === 0) {
      return res.status(404).json({
        message: "Game not found",
      });
    }

    const dbGameId = gameResult.rows[0].id;

    // Insert review
    const result = await pool.query(
      `
        INSERT INTO reviews (user_id, game_id, rating, comment)
        VALUES ($1, $2, $3, $4)
        RETURNING id, user_id, game_id, rating, comment, created_at
      `,
      [userId, dbGameId, rating, comment],
    );

    return res.status(201).json({
      message: "Review created successfully",
      review: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "You have already reviewed this game",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { rawgId } = req.params;

    const result = await pool.query(
      `
      SELECT
        reviews.id,
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

    res.status(200).json({
      reviews: result.rows,
    });
  } catch (error) {
    console.error("Get reviews error:", error);

    res.status(500).json({
      message: "Failed to get reviews",
    });
  }
};
