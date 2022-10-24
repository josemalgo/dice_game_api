import mongoose from "mongoose";
const { Schema } = mongoose;

const playerSchema = new Schema({
    name: {
        type: String,
        unique: true,
        default: "ANÒNIM"
    },
    password: {
        type: String
    },
    registerDate: {
        type: Date, 
        default: Date.now
    }
});

export const Player = mongoose.model('')