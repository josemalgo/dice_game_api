import { Game } from "../models/Game.js";
import { Player } from "../models/Player.js";
import { updateSuccessRate } from "./player.service.js";


export const getGamesByPlayerId = async (id) => {
    try {
        const games = await Game.find({player: id}, {_id: 0, player: 0, __v: 0});
        return games;
    } catch (error) {
        throw error;
    }
    
}

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
        const successRate = await calculateSuccesRate(id);
        await updateSuccessRate(id, successRate);

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
        await calculateSuccesRate(id);
        return gamesDeleted;
    } catch (error) {
        throw error;
    } 
};


const calculateSuccesRate = async (id) => {
    let totalWin = 0;
    let totalGames = 0;
    let successRate = 0;

    const games = await Game.find({player: id});
    games.forEach(game => {
        if (game.win) totalWin++;
    });

    totalGames = games.length;

    if(totalGames !== 0) {
        successRate = totalWin / totalGames * 100
    }

    return successRate;
};