import * as rankingController from "../controllers/ranking.controller.js";
import { Router } from "express";
import { wrapAsync } from "../helpers/helpers.js";
const router = Router();

router.get("/ranking", wrapAsync(rankingController.getRanking));
router.get("/ranking/looser", wrapAsync(rankingController.getLooser));
router.get("/ranking/winner", wrapAsync(rankingController.getWinner));

export default router;