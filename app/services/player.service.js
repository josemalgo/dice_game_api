import { Player } from "../models/Player.js";
import bcrypt from "bcrypt";
import { duplicatePlayerName } from "../validators/player.validators.js";
import { getPlayerById } from "../helpers/helpers.js";
import Api404Error from "../middlewares/errors/api404Error.js";
import Api400Error from "../middlewares/errors/api400Error.js";

export const getAllPlayers = async () => {
    try {
        const allPlayers = await Player.find({}, { name: 1, successRate: 1, games: 1 });
        return allPlayers;    
    } catch (error) {
        throw error;
    }
    
}

export const addPlayer = async (name, password) => {

    const existName = await duplicatePlayerName(name);
    if (existName) {
        throw new Api400Error(`Name: ${name} is duplicate.`)
        const error = new Error("Name duplicate");
        error.code = 422;
        throw error;
        //res.status(422).json({ error: "Name duplicate!" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    if (name === "") {
        name = "ANÒNIM";
    }

    try {
        const newPlayer = await Player.create({
            name,
            password: passwordHash
        });

        await newPlayer.save();
        return newPlayer;

    } catch (error) {
        throw error;
    }

}

export const updatePlayer = async (id, changes) => {
    const updatedPlayer = await getPlayerById(id);
    if (player === null) {
        throw new Api404Error(`Player with id: ${id} not found.`)
    }

    const existName = await duplicatePlayerName(changes.name);
    if (existName) {
        const error = new Error("Name duplicate");
        error.code = 422;
        throw error;
    }

    try {
        updatedPlayer.set(changes);
        await updatedPlayer.save();
        return updatedPlayer;
    } catch (error) {
        throw error;
    }

};

export const updateSuccessRate = async(id, newValue) => {
    const player = await getPlayerById(id);
    if (player === null) {
        throw new Api404Error(`Player with id: ${id} not found.`)
    }
    
    try {
        player.set("successRate", newValue);
        await player.save();
    } catch (error) {
        throw error;
    }
};