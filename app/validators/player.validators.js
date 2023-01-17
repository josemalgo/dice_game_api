import { check } from "express-validator";

export const playerName = [
    check("name")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .isString()
        //.isAlphanumeric()
        .matches("^[a-zA-Z\u00C0-\u00FF]*$"),
    check("password")
        .trim()
        .not()
        .isEmpty()
        .isString()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
];