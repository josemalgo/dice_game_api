import { Player } from "../models/Player.js";
import * as playerService from "../services/player.service.js"
import { validationResult } from "express-validator";

export const getPlayers = async(req, res) => {
    
    try {
        const allPlayers = await playerService.getAllPlayers();   
        res.status(200).json(allPlayers);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getPlayer = async (req, res) => {

}

export const createPlayer = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }

    const { body } = req;

    try {
        const player =  playerService.addPlayer(body);
        res.status(201).json(player);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const updatePlayer = async (req, res) => {
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
    
}