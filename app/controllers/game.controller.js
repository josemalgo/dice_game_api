import mongoose from "mongoose";
import { validationResult } from "express-validator";
import * as gameService from "../services/game.service.js";
import { Game } from "../models/Game.js";

export const getGames = async ( req, res ) => {
    
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status( 422 ).json( { error: "Invalid ObjectID" } );
    }

    try {
        const games = await gameService.getGamesByPlayerId(id)
        res.status(200).json(games);    
    } catch (error) {
        return res.status( 500 ).json( { message: error.message } );
    }
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
        await play.save()
        res.status( 200 ).json(gamesDeleted);
    } catch ( error ) {
        return res.status( 500 ).json( { message: error.message } );
    }
}