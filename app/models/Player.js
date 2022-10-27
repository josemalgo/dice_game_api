import mongoose from "mongoose";
const { Schema } = mongoose;

const playerSchema = new Schema({
    name: {
        type: String,
        default: "ANÒNIM"
    },
    password: {
        type: String
    },
    succesRate : {
        type: Number,
        default: 0.00
    },
    games: [{ type: Schema.Types.ObjectId, ref: "Game"}]
}, {
    timestamps: true
});

export const Player = mongoose.model('Player', playerSchema);