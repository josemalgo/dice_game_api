import { Player } from "../models/Player.js";
import * as playerService from "../services/player.service.js"
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import { httpStatusCodes } from "../enums/httpStatusCodes.js";
import Api400Error from "../middlewares/errors/api400Error.js";

export const getPlayers = (req, res, next) => {
    playerService.getAllPlayers().then(allPlayers => {
        res.status(httpStatusCodes.OK).json(allPlayers);
    }).catch(error => next(error))
}

export const createPlayer = (req, res, next) => {
    if (req.body.name !== "") {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new Api400Error(errors.array()))
        }
    }

    const { name, password } = req.body;

    playerService.addPlayer(name, password).then(player => {
        res.status(httpStatusCodes.CREATED).json(player);
    }).catch(error => next(error))
}

export const updatePlayer = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new Api400Error(errors.array()))
    }

    const {
        body,
        params: { id }
    } = req;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new Api400Error("Invalid ObjectID"))
    }

    playerService.updatePlayer(id, body).then(updatedPlayer => {
        res.status(httpStatusCodes.CREATED).json(updatedPlayer)
    }).catch(error => next(error))
}

export const deletePlayer = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new Api400Error("Invalid ObjectID"))
    }

    Player.deleteOne({ _id: id }).then(() => {
        res.status(httpStatusCodes.OK).end();
    }).catch(error => next(error))
}