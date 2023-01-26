import { httpStatusCodes } from "../../enums/httpStatusCodes.js"
import { BaseError } from "./baseError.js"

const logError = (err, req, res, next) => {
    console.error(err)
    next(err)
}

const errorResponder = (err, req, res, next) => {
    if(err instanceof BaseError) {
        res.status(err.statusCode).json({ message: err.message, name: err.name})
    } else {
        next(err)
    }
}

const isOperationalError = (err) => {
    if(err instanceof BaseError) {
        return err.isOperational
    }

    return false
}

function failSafeHandler(err, req, res, next) {
    res.status(httpStatusCodes.INTERNAL_SERVER).send({message: err.message})
  }

const invalidPathHandler = (req, res, next) => {
    res.redirect('/')
}

export {
    logError,
    errorResponder,
    isOperationalError,
    invalidPathHandler,
    failSafeHandler
}