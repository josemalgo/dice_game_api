import { Player } from "../models/Player.js";
import Api404Error from "../middlewares/errors/api404Error.js";
import mongoose from "mongoose";
import Api400Error from "../middlewares/errors/api400Error.js";

export const getPlayerById = async(id) => {
    const player = await Player.findById(id);
    if (!player) {
        throw new Api404Error(`Player with id: ${id} not found.`)
    }
    return player;
}

export const isValidMongooseId = (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        throw new Api400Error("Invalid ObjectID")
    }
    return
}

export const validateRequest = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new Api400Error(errors.array())
    }
    return 
}

export const isValidPlayerName = async(name) => {
    const existName = await duplicatePlayerName(name);
    if (existName) {
        throw new Api400Error(`Name: ${name} is already in use.`)
    }
    return
}

