import { check } from "express-validator";

export const validatePlayer = [
    check("name")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .isString()
        .matches("^[a-zA-Z\u00C0-\u00FF]*$"),
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("pass not empty")
        .isString()
        //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
];