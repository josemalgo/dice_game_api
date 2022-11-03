import { Game } from "../models/Game.js";
import { Player } from "../models/Player.js";
import { 
    calculateSuccesRate,
    addGameToPlayer } from "./player.service.js";

export const addGame = async (id, roll) => {
    const player = await Player.findById(id)
    if (!player) {
        const error = new Error();
        error.code = 422;
        throw error;
    }

    const win = winGame(roll);

    try {
        const newGame = await Game.create({
            player: player._id,
            roll,
            win
        });

        await newGame.save();
        await addGameToPlayer(player, newGame);
        await calculateSuccesRate(id);

        return newGame;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const winGame = (roll) => {
    const result = roll[0] + roll[1];
    if (result === 7) {
        return true;
    }

    return false;
};


export const deleteGames = async (id) => {
    
    try {
        const gamesDeleted = await Game.deleteMany({player: id}); 
        return gamesDeleted;
    } catch (error) {
        throw error;
    } 

};