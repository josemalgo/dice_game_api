import { Router } from "express";
import * as gameController from "../controllers/game.controller.js";
import { wrapAsync } from "../helpers/helpers.js";
import { authenticateToken } from "../middlewares/authenticate/authenticateToken.js";
import { validateRolls } from "../validators/game.validator.js";
const router = Router()

router.get("/games/:id", authenticateToken, wrapAsync(gameController.getGames));
router.post("/games/:id", validateRolls, authenticateToken, wrapAsync(gameController.addGame));
router.delete("/games/:id", authenticateToken, wrapAsync(gameController.deleteGames));

export default router;