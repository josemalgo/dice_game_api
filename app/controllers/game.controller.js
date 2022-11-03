import mongoose from "mongoose";
import { validationResult } from "express-validator";
import * as gameService from "../services/game.service.js";
import { Player } from "../models/Player.js";

export const getGames = async ( req, res ) => {

}

export const addGame = async ( req, res ) => {

    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        res.status( 402 ).json( { errors: errors.array() } );
    }

    const {
        body: { roll },
        params: { id }
    } = req;

    if ( !mongoose.Types.ObjectId.isValid( id ) ) {
        return res.status( 422 ).json( { error: "Invalid ObjectID" } );
    }

    try {
        const game = await gameService.addGame( id, roll );
        res.status( 201 ).json( game );
    } catch ( error ) {
        return res.status( 500 ).json( { message: error.message } );
    }

}

export const deleteGames = async ( req, res ) => {
    const { id } = req.params;

    if ( !mongoose.Types.ObjectId.isValid( id ) ) {
        return res.status( 422 ).json( { error: "Invalid ObjectID" } );
    }

    try {
        const gamesDeleted = await gameService.deleteGames( id );
        const player = await Player.findById(id).populate("games");
        player.games;
        console.log(player.games);
        res.status( 200 ).json(gamesDeleted);
    } catch ( error ) {
        return res.status( 500 ).json( { message: error.message } );
    }
}