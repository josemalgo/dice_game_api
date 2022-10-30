import { Router } from "express";
import * as playerController from "../controllers/player.controller.js";
import * as  playerValidator from "../validators/player.validators.js"
const router = Router();

router.get("/players", playerController.getPlayers);
router.get("/players/:id", playerController.getPlayer);
router.post("/players", playerValidator.playerName, playerController.createPlayer);
router.put("/players/:id", playerValidator.playerName, playerController.updatePlayer);
router.delete("/players/:id", playerController.deletePlayer);

export default router;