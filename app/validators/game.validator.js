import check from "express-validator";
import { Game } from "../models/Game.js";

export const validateRolls = [
    check("roll.*")
        .toInt()
        .not()
        .isEmpty()
];

