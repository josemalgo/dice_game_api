import { Player } from "../models/Player.js";

export const getPlayerById = async() => {
    const player = await Player.findById(id);
    if (!player) {
        const error = new Error("The id does not exist.");
        error.code = 402;
        throw error;
    }
}

