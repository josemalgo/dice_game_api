import { httpStatusCodes } from "../../enums/enums"
import { BaseError } from "./baseError.js"

class Api422Error extends BaseError {
    constructor(
        name, 
        statusCode = httpStatusCodes.UNPROCESSABLE_ENTITY, 
        description = "Unprocessable entity",
        isOperational = true
    ) {
        super(name, statusCode, description, isOperational)
    }
}

export default Api422Error