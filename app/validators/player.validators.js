import { check } from "express-validator";
import { Player } from "../models/Player.js";

export const createPlayer = [
    check("name")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .isString()
        .isAlphanumeric()
];

export const updatePlayer = [
    check("_Id")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .isMongoId()
];

export const duplicatePlayerName = async (name) => {

    const existName = await Player.findOne({ name: name })
    if (existName) {
        return true;
    }

    return false;
}
