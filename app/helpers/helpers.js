import { Player } from "../models/Player.js";
import Api422Error from "../middlewares/errors/api400Error.js";
import { updatePlayer } from "../controllers/player.controller.js";

export const getPlayerById = async(id) => {
    const player = await Player.findById(id);
    if (!player) {
        throw new Api422Error("The id does not exist.");
    }
    return player;
}

