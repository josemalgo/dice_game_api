import { Player } from "../models/Player.js";
import { duplicatePlayerName } from "../validators/player.validators.js";

export const getAllPlayers = async () => {
    const allPlayers = await Player.find( {}, { name: 1, succesRate: 1 } );
    return allPlayers;
}

export const addPlayer = async ( name, password ) => {

    const existName = await duplicatePlayerName( name );
    if ( existName ) {
        const error = new Error( "Name duplicate" );
        error.code = 422;
        throw error;
        //res.status(422).json({ error: "Name duplicate!" });
    }

    if ( name === "" ) {
        name = "ANÒNIM";
    }

    try {
        const newPlayer = await Player.create( {
            name,
            password
        } );

        await newPlayer.save();
        return newPlayer;

    } catch ( error ) {
        throw error;
    }

}

export const updatePlayer = async ( id, changes ) => {
    const updatedPlayer = await Player.findById( id );
    if ( !updatedPlayer ) {
        const error = new Error( "The id does not exist." );
        error.code = 402;
        throw error;
    }

    const existName = await duplicatePlayerName( changes.name );
    if ( existName ) {
        const error = new Error( "Name duplicate" );
        error.code = 422;
        throw error;
    }

    try {
        updatedPlayer.set( changes );
        await updatedPlayer.save();
        return updatedPlayer;
    } catch ( error ) {
        throw error;
    }

}