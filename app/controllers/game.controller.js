import mongoose from "mongoose";
import { validationResult } from "express-validator";
import * as gameService from "../services/game.service.js";

export const getGames = async (req, res) => {

}

export const addGame = async (req, res) => {
    
    const errors  = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(402).json( {errors: errors.array()});
    }

    const {
        body: { roll },
        params: { id }
    } = req;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(422).json({ error: "Invalid ObjectID" });
    }

    try {
        const game = await gameService.addGame(id, roll);
        res.status(201).json( game );
    } catch (error) {
        return res.status( 500 ).json( { message: error.message } );
    }

}

export const deleteGames = async (req, res) => {

}