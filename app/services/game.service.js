import { Game } from "../models/Game.js";
import { Player } from "../models/Player.js";

export const addGame = async(id, roll) => {
    const player = await Player.findById(id)
    if(!player) {
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

        newGame.save(async () => {

            player.succesRate = calculateSuccesRate(player, win);
            player.games.push(newGame);

            await player.save();
        });

        return newGame;
    } catch (error) {
        throw error;
    }
};

const winGame = (roll) => {
    const result = roll[0] + roll[1];
    if(result === 7) {
        return true;
    }

    return false;
};

const calculateSuccesRate = (player, win) => {
    const totalWin = win ? 1 : 0;
    
    player.games.forEach(game => {
        if(game.win) totalWin++;
    });

    if(totalWin === 0) {
        return 0;
    }
    return player.games.length / totalWin;
};