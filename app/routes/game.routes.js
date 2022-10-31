import { Router } from "express";
import * as gameController from "../controllers/game.controller";
const router = Router()

router.get("/games/:id", gameController.getGames);
router.post("/game/:id", gameController.addGame);
router.delete("/games/:id", gameController.deleteGames);

export default router;