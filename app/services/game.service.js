import { getPlayerById } from "../helpers/helpers.js";
import Api404Error from "../middlewares/errors/api404Error.js";
import { Game } from "../models/Game.js";
import { updateSuccessRate } from "./player.service.js";

export const getGamesByPlayerId = async (id) => {
    const games = await Game.find({ player: id }, { _id: 0, player: 0, __v: 0 });
    return games;
}

export const addGame = async (id, roll) => {
    const player = await getPlayerById(id)
    const win = winGame(roll);
    const newGame = await Game.create({
        player: player._id,
        roll,
        win
    });

    await newGame.save();
    const successRate = await calculateSuccesRate(id);
    await updateSuccessRate(id, successRate);

    return newGame;
};

const winGame = (roll) => {
    const result = roll[0] + roll[1];
    if (result === 7) {
        return true;
    }

    return false;
};


export const deleteGames = async (id) => {
    const gamesDeleted = await Game.deleteMany({ player: id });
    await calculateSuccesRate(id);
    return gamesDeleted;
};


const calculateSuccesRate = async (id) => {
    let totalWin = 0;
    let totalGames = 0;
    let successRate = 0;

    const games = await Game.find({ player: id });
    if (!games) {
        throw new Api404Error(`Not found games for player with id: ${id}`)
    }
    games.forEach(game => {
        if (game.win) totalWin++;
    });

    totalGames = games.length;

    if (totalGames !== 0) {
        successRate = totalWin / totalGames * 100
    }

    return successRate;
};