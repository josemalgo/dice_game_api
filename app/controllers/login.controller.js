import { validateRequest } from "../helpers/helpers"

export const validateUser = (req, res, next) => {
    validateRequest(req)

}