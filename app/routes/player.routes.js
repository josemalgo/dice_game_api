import { Router } from "express";
import * as playerController from "../controllers/player.controller.js";
import { wrapAsync } from "../helpers/helpers.js";
import { authenticateToken } from "../middlewares/authenticate/authenticateToken.js";
import {validatePlayer} from "../validators/player.validators.js"
const router = Router();

router.get("/players", authenticateToken, wrapAsync(playerController.getPlayers));
router.post("/players", validatePlayer, wrapAsync(playerController.createPlayer));
router.put("/players/:id", validatePlayer, wrapAsync(playerController.updatePlayer));
router.delete("/players/:id", wrapAsync(playerController.deletePlayer));

export default router;