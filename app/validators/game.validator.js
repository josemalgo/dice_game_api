import { check } from "express-validator";

export const validateRolls = [
    check( "roll.*" )
        .toInt()
        .not()
        .isEmpty()
];

