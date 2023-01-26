import { Router } from "express"
import * as loginController from "../controllers/login.controller.js"
import * as  playerValidator from "../validators/player.validators.js"
import { wrapAsync } from "../helpers/helpers.js"

const router = Router()

router.post("/login", playerValidator.validatePlayer, wrapAsync(loginController.validateUser()))

export default router;

