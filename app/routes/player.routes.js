import { Router } from "express";
import * as playerController from "../controllers/player.controller.js";
import { wrapAsync } from "../helpers/helpers.js";
import * as  playerValidator from "../validators/player.validators.js"
const router = Router();

router.get("/players", wrapAsync(playerController.getPlayers));
router.post("/players", playerValidator.validatePlayer, wrapAsync(playerController.createPlayer));
router.put("/players/:id", playerValidator.validatePlayer, wrapAsync(playerController.updatePlayer));
router.delete("/players/:id", wrapAsync(playerController.deletePlayer));

export default router;