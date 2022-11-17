import { httpStatusCodes } from "../enums/enums.js";
import { BaseError } from "./BaseError.js";

export class Api404Error extends BaseError {
    constructor(
        name, 
        statusCode = httpStatusCodes.NOT_FOUND,
        description = "Not found.",
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}