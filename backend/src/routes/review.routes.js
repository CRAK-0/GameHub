import { Router } from "express";
import { createReview, getReviews } from "../controllers/review.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/:rawgId", getReviews);
router.post("/", authMiddleware, createReview);

export default router;
