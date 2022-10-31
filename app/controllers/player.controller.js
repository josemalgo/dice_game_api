import { Player } from "../models/Player.js";
import * as playerService from "../services/player.service.js"
import { validationResult } from "express-validator";
import mongoose from "mongoose";

export const getPlayers = async ( req, res ) => {

    try {
        const allPlayers = await playerService.getAllPlayers();
        res.status( 200 ).json( allPlayers );
    } catch ( error ) {
        return res.status( 500 ).json( { message: error.message } );
    }
}

export const getPlayer = async ( req, res ) => {

}

export const createPlayer = async ( req, res ) => {

    if ( req.body.name !== "" ) {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            return res.status( 422 ).json( { errors: errors.array() } );
        }
    }

    const { name, password } = req.body;

    try {
        const player = await playerService.addPlayer( name, password );
        res.status( 201 ).json( player );
    } catch ( error ) {
        return res.status( 500 ).json( { message: error.message } );
    }
}

export const updatePlayer = async ( req, res ) => {

    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( { error: errors.array() });
    }

    const {
        body,
        params: { id }
    } = req;

    if ( !mongoose.Types.ObjectId.isValid( id ) ) {
        return res.status( 400 ).json( { error: "Invalid ObjectID" } );
    }

    try {
        const player = await playerService.updatePlayer( id, body );
        res.status(201).json( player );
    } catch ( error ) {
        return res.status( 500 ).json( { message: error.message } );
    }
}

export const deletePlayer = async ( req, res ) => {
    const { id } = req.params;

    if ( !mongoose.Types.ObjectId.isValid( id ) ) {
        return res.status( 400 ).json( { error: "Invalid ObjectID" } );
    }

    try {
        await Player.deleteOne( { _id: id } );
        res.status( 200 );
    } catch ( error ) {
        return res.status( 500 ).json( { message: error.message } );
    }
}