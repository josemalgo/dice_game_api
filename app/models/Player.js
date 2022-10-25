import mongoose from "mongoose";
const { Schema } = mongoose;

const playerSchema = new Schema({
    _id: Schema.Types.ObjectId,
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
    },
    succesRate : {
        type: Number,
        default: 0.00
    },
    games: [{ type: Schema.Types.ObjectId, ref: "Game"}]
});

export const Player = mongoose.model('Player', playerSchema);