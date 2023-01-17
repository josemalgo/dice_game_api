import mongoose from "mongoose";
import { validationResult } from "express-validator";
import * as gameService from "../services/game.service.js";
import Api400Error from "../middlewares/errors/api400Error.js";
import { httpStatusCodes } from "../enums/httpStatusCodes.js";
import { isValidMongooseId, validateRequest } from "../helpers/helpers.js"

export const getGames = async ( req, res, next ) => {
    const {id} = req.params
    isValidMongooseId(id)

    const games = gameService.getGamesByPlayerId(id)
    res.status(httpStatusCodes.OK).json(games)
}

export const addGame = async ( req, res, next ) => {
    validateRequest(req)
    const {
        body: { roll },
        params: { id }
    } = req;

    isValidMongooseId(id)

    const game = await gameService.addGame(id, roll)
    res.status(httpStatusCodes.OK).json(game)
}

export const deleteGames = async ( req, res, next ) => {
    const { id } = req.params;
    isValidMongooseId(id)

    const gamesDeleted = await gameService.deleteGames(id)
    //await play.save()
    res.status(httpStatusCodes.OK).end()
}