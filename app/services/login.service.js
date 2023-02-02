import { Player } from "../models/Player.js"
import bcrypt from "bcrypt"
import Api401Error from "../middlewares/errors/api401Error.js"
import jwt from "jsonwebtoken"

export const loginPlayer = async (name, password) => {
    const player = await Player.findOne({name: name})
    const correctPassword = player === null 
        ? false
        : await bcrypt.compare(password, player.password)
    
    if(!(player && correctPassword)) {
        throw new Api401Error("Invalid user or password.")
    }

    const userForToken = {
        id: player._id,
        name: player.name
    }

    const token = jwt.sign(userForToken, process.env.SECRETKEY)
    return 'Bearer ' + token;
}