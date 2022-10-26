import { check } from "express-validator";

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

