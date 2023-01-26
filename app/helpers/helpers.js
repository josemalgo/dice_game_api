import { Player } from "../models/Player.js";
import Api404Error from "../middlewares/errors/api404Error.js";
import mongoose from "mongoose";
import Api400Error from "../middlewares/errors/api400Error.js";
import { validationResult } from "express-validator";

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
}

export const validateRequest = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new Api400Error(errors.array())
    }
}

export const isValidPlayerName = async(name) => {
    if(name === 'ANÒNIM') return
    
    const existName = await duplicatePlayerName(name);
    if (existName) {
        throw new Api400Error(`Name: ${name} is already in use.`)
    }
}

export const duplicatePlayerName = async (name) => {
    const existName = await Player.findOne({ name: name })
    if (existName) {
        return true;
    }
    return false;
}

export const wrapAsync = fn => (req, res, next) => fn(req, res, next).catch(next);
