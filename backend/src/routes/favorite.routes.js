import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  createFavorite,
  deleteFavorite,
  getUserFavorites,
} from "../controllers/favorite.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getUserFavorites);

router.post("/:rawgId", authMiddleware, createFavorite);

router.delete("/:rawgId", authMiddleware, deleteFavorite);

export default router;
