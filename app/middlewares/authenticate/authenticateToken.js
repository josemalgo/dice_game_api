import jwt from "jsonwebtoken"
import Api401Error from "../errors/api401Error.js"

export const authenticateToken = (req, res, next) => {
    const token = getToken(req)
    const decodedToken = jwt.verify(token, process.env.SECRETKEY)    
    if(!token || !decodedToken.id) {
        next(new Api401Error("Token missing or invalid"))
    }
    req.playerId = decodedToken.id
    next() 
}

const getToken = req => {
    const authorization = req.get('authorization')
    if(authorization !== null && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7)
    }
    return null
}