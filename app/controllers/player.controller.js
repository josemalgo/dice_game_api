import { Player } from "../models/Player.js";
import * as playerService from "../services/player.service.js"
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import { httpStatusCodes } from "../enums/httpStatusCodes.js";
import Api400Error from "../middlewares/errors/api400Error.js";

export const getPlayers = async ( req, res, next ) => {

    try {
        const allPlayers = await playerService.getAllPlayers();
        res.status( httpStatusCodes.OK ).json( allPlayers );
    } catch ( error ) {
        next(error)
    }
}

export const createPlayer = async ( req, res, next ) => {

    if ( req.body.name !== "" ) {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            return res.status( httpStatusCodes.UNPROCESSABLE_ENTITY ).json( { errors: errors.array() } );
        }
    }

    const { name, password } = req.body;

    try {
        const player = await playerService.addPlayer( name, password );
        res.status( 201 ).json( player );
    } catch ( error ) {
        return res.status( httpStatusCodes.INTERNAL_SERVER ).json( { message: error.message } );
    }
}

export const updatePlayer = async ( req, res, next ) => {

    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status( httpStatusCodes.BAD_REQUEST ).json( { error: errors.array() });
    }

    const {
        body,
        params: { id }
    } = req;

    if ( !mongoose.Types.ObjectId.isValid( id ) ) {
        throw new Api400Error("Invalid ObjectID")
    }

    try {
        const player = await playerService.updatePlayer( id, body );
        res.status(201).json( player );
    } catch ( error ) {
        return res.status( httpStatusCodes.INTERNAL_SERVER ).json( { message: error.message } );
    }
}

export const deletePlayer = async ( req, res, next ) => {
    const { id } = req.params;
    try {
        if ( !mongoose.Types.ObjectId.isValid( id ) ) {
            throw new Api400Error("Invalid ObjectID")
        }
        await Player.deleteOne( { _id: id } );
        res.status( 200 );
    } catch ( error ) {
        next(error)
    }
}