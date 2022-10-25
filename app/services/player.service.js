import { Player } from "../models/Player.js";
import * as Validators from "../validators/validators.js";

export const addPlayer = async (req, res) => {
    const { name, password } = req.body;
    
    if(!Validators.validateUserName(name)) {
        name = "ANÒNIM";
    }
    
    try {
        const player = await Player.create({
            name,
            password
        });

        res.json(player);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}