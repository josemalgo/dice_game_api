import { Router } from "express";
import * as gameController from "../controllers/game.controller.js";
import { wrapAsync } from "../helpers/helpers.js";
import { validateRolls } from "../validators/game.validator.js";
const router = Router()

router.get("/games/:id", wrapAsync(gameController.getGames));
router.post("/games/:id", validateRolls, wrapAsync(gameController.addGame));
router.delete("/games/:id", wrapAsync(gameController.deleteGames));

export default router;