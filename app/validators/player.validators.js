import { check } from "express-validator";
import { Player } from "../models/Player.js";

export const playerName = [
    check("name")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .isString()
        //.isAlphanumeric()
        .matches("^[a-zA-Z\u00C0-\u00FF]*$")
];

export const duplicatePlayerName = async (name) => {
    const existName = await Player.findOne({ name: name })
    if (existName) {
        return true;
    }
    return false;
}
