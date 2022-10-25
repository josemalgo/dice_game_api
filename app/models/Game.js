import mongoose from "mongoose";
const { Schema } = mongoose;

const gameSchema = new Schema({
    _id: Schema.Types.ObjectId,
    player: {
        type: Schema.Types.ObjectId, ref: "Player",
        required: true
    },
    roll: {
       type: [Number]
    },
    win: {
        type: Boolean
    }
});

export const Game = mongoose.model("Game", gameSchema);