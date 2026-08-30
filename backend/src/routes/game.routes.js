import { Router } from "express";
import { getGame } from "../controllers/game.controller.js";

const router = Router();

router.get("/:rawgId", getGame);

export default router;
