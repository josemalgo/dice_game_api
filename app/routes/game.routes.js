import { Router } from "express";
import * as gameController from "../controllers/game.controller";
import { validateRolls } from "../validators/game.validator";
const router = Router()

router.get("/games/:id", gameController.getGames);
router.post("/game/:id", validateRolls, gameController.addGame);
router.delete("/games/:id", gameController.deleteGames);

export default router;