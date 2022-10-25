import { Player } from "../models/Player.js";
import * as PlayerService from "../services/player.service.js"

export const getPlayers = async(req, res) => {
    try {
        const players = Player.find({});
        res.json(players);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getPlayer = async (req, res) => {

}

export const createPlayer = async (req, res) => {
    return await PlayerService.addPlayer(req);
}

export const updatePlayer = async (req, res) => {
    const { id } = req.params;
    
    try {
        const player = Player.findByPk(id);
        player.set(req.body);
        await player.save();

        res.json(player);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const deletePlayer = async (req, res) => {
    
}