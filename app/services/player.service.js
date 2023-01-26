import { Player } from "../models/Player.js";
import bcrypt from "bcrypt";
import { getPlayerById, isValidPlayerName } from "../helpers/helpers.js";

export const getAllPlayers = async () => {
    const allPlayers = await Player.find({}, { name: 1, successRate: 1, games: 1 });
    return allPlayers;
}

export const addPlayer = async (name, password) => {
    await isValidPlayerName(name)
    
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
    await isValidPlayerName(changes.name)

    updatedPlayer.set(changes);
    await updatedPlayer.save();
    return updatedPlayer;
}

export const deletePlayer = async (id) => {
    await Player.deleteOne({_id: id})
}

export const updateSuccessRate = async (id, newValue) => {
    const player = await getPlayerById(id);
    player.set("successRate", newValue);
    await player.save();
};