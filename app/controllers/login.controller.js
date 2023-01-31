import { validateRequest } from "../helpers/helpers"
import * as loginService from "../services/login.service.js"

export const validateUser = async (req, res, next) => {
    validateRequest(req)
    const { name, password } = req.body
    const token = await loginService.loginPlayer(name, password)
    res.status(200).json(token)
}