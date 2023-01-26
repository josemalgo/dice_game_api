import { duplicatePlayerName } from "../helpers/helpers"
import { Player } from "../models/Player"
import bcrypt from "bcrypt"
import Api401Error from "../middlewares/errors/api401Error"

export const loginPlayer = async (name, password) => {
    const player = Player.findOne({name})

    const correctPassword = player === null 
        ? false
        : await bcrypt.compare(password, player.passwordhash)
    
    if(!correctPassword) {
        throw new Api401Error("Invalid user or password")
    }

    const userForToken = {
        id: user._id,
        password: user.password
    }

    

}