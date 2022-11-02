import { Router } from "express";
import * as gameController from "../controllers/game.controller.js";
import { validateRolls } from "../validators/game.validator.js";
const router = Router()

router.get("/games/:id", gameController.getGames);
router.post("/games/:id", validateRolls, gameController.addGame);
router.delete("/games/:id", gameController.deleteGames);

export default router;