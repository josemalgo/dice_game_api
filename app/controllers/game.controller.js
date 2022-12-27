import mongoose from "mongoose";
import { validationResult } from "express-validator";
import * as gameService from "../services/game.service.js";
import Api400Error from "../middlewares/errors/api400Error.js";
import { httpStatusCodes } from "../enums/httpStatusCodes.js";
import { isValidMongooseId } from "../helpers/helpers.js"

export const getGames = ( req, res ) => {
    const {id} = req.params;
    isValidMongooseId(id)
    gameService.getGamesByPlayerId(id).then(games => {
        res.status(httpStatusCodes.OK).json(games)
    }).catch(error => next(error))
}

export const addGame = ( req, res ) => {
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return next(new Api400Error(errors.array()))
    }

    const {
        body: { roll },
        params: { id }
    } = req;

    if ( !mongoose.Types.ObjectId.isValid( id ) ) {
        return next(new Api400Error("Invalid ObjectID"))
    }

    gameService.addGame(id, roll).then(game => {
        res.status(httpStatusCodes.OK).json(game)
    }).catch(error => next(error))
}

export const deleteGames = ( req, res ) => {
    const { id } = req.params;
    if ( !mongoose.Types.ObjectId.isValid( id ) ) {
        return next(new Api400Error("Invalid ObjectID"))
    }

    gameService.deleteGames(id).then(async () => {
        await play.save()
        res.status(httpStatusCodes.OK).end()
    }).catch(error => next(error))
}