import { Player } from "../models/Player.js";
import { duplicatePlayerName } from "../validators/player.validators.js";

export const getAllPlayers = async () => {
    const allPlayers = await Player.find({});
    return allPlayers;
}

export const addPlayer = async (name, password) => {

    const existName = await duplicatePlayerName(name);
    if(existName) {
        const error = new Error("Name duplicate");
        error.code = 422;
        throw error; 
        //res.status(422).json({ error: "Name duplicate!" });
    }

    if(name === "") {
        name = "ANÒNIM";
    }

    try {
        const player = await Player.create({
            name,
            password
        });

        await player.save();
        return player;

    } catch (error) {
        throw error;
    }

}

export const updatePlayer = async (req, res) => {

}