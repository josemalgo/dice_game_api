import { httpStatusCodes } from "../../enums/httpStatusCodes.js"
import { BaseError } from "./baseError.js"

class Api401Error extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.UNAUTHORIZED,
        description = "Unauthorized",
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)

    }
}

export default Api401Error