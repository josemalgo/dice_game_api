import { Player } from "../models/Player.js";

export const getAllPlayers = async () => {
    const allPlayers = await Player.find({});
    return allPlayers;
}

export const addPlayer = async (body) => {
    const { name, password } = body;

    const player = await Player.create({
        name,
        password
    });

    await player.save();

    return player;
}

export const updatePlayer = async (req, res) => {

}