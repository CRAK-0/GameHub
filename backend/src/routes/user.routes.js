import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  createUser,
  loginUser,
  getProfile,
  logoutUser,
  getCurrentUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, getCurrentUser);

export default router;
