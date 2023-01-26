import { Router } from "express"
import * as loginController from "../controllers/login.controller.js"
import { wrapAsync } from "../helpers/helpers.js"

const router = Router()

router.post("/login", wrapAsync(loginController.validateUser()))

export default router;

