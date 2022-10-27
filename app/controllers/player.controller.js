import { Player } from "../models/Player.js";
import * as playerService from "../services/player.service.js"
import { validationResult } from "express-validator";
import { duplicatePlayerName } from "../validators/player.validators.js";
import mongoose from "mongoose";

export const getPlayers = async (req, res) => {

    try {
        const allPlayers = await playerService.getAllPlayers();
        res.status(200).json(allPlayers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getPlayer = async (req, res) => {

}

export const createPlayer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { name, password } = req.body;
    const existName = duplicatePlayerName(name);
    if(existName) {
        return res.status(422).json({ error: "Name duplicate!" });
    }

    try {

        const newPlayer = await Player.create({
            name,
            password
        });
        
        const player = await playerService.addPlayer(newPlayer);
        res.status(201).json(player);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updatePlayer = async (req, res) => {

    //runValidators mongoose
    
    // const { id } = req.params;

    // try {
    //     const player = Player.findByPk(id);
    //     player.set(req.body);
    //     await player.save();

    //     res.json(player);
    // } catch (error) {
    //     return res.status(500).json({message: error.message});
    // }
}

export const deletePlayer = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ObjectID"});
    }

    try {
        await Player.deleteOne({_id: id});
        res.status(200);
        
    } catch (error) {
        
    }
}