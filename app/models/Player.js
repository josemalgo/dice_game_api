import mongoose from "mongoose";
const { Schema } = mongoose;

const playerSchema = new Schema({
    name: {
        type: String,
    },
    password: {
        type: String
    },
    successRate : {
        type: Number,
        default: 0.00
    }
}, {
    timestamps: true
});

export const Player = mongoose.model('Player', playerSchema);