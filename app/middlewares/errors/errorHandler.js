import { BaseError } from "./baseError"

const logError = (err, req, res, next) => {
    console.error(err)
    next(err)
}

const errorResponder = (err, req, res, next) => {
    res.status(err.statusCode).json({ message: err.message})
}

const isOperationalError = (error) => {
    if(error instanceof BaseError) {
        return error.isOperational
    }

    return false
}

const invalidPathHandler = (req, res, next) => {
    res.redirect('/')
}

export {
    logError,
    errorResponder,
    isOperationalError,
    invalidPathHandler
}