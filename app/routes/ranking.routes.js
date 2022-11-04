import * as rankingController from "../controllers/ranking.controller.js";
import { Router } from "express";
const router = Router();

router.get("/ranking", rankingController.getRanking);
router.get("/ranking/looser", rankingController.getLooser);
router.get("/ranking/winner", rankingController.getWinner);

export default router;