import { Player } from "../models/Player.js";
import bcrypt from "bcrypt";
import { duplicatePlayerName } from "../validators/player.validators.js";
import { getPlayerById, isValidPlayerName } from "../helpers/helpers.js";
import Api400Error from "../middlewares/errors/api400Error.js";

export const getAllPlayers = async () => {
    const allPlayers = await Player.find({}, { name: 1, successRate: 1, games: 1 });
    return allPlayers;
}

export const addPlayer = async (name, password) => {
    await isValidPlayerName(name)

    if (name === "") {
        name = "ANÒNIM";
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newPlayer = await Player.create({
        name,
        password: passwordHash
    });

    await newPlayer.save();
    return newPlayer;
}

export const updatePlayer = async (id, changes) => {
    const updatedPlayer = await getPlayerById(id);
    const existName = await duplicatePlayerName(changes.name);
    if (existName) throw new Api400Error(`Name: ${changes.name} is already in use.`)

    updatedPlayer.set(changes);
    await updatedPlayer.save();
    return updatedPlayer;
}

export const updateSuccessRate = async (id, newValue) => {
    const player = await getPlayerById(id);
    player.set("successRate", newValue);
    await player.save();
};