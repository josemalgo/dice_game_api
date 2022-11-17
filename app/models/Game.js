import mongoose from "mongoose";
const { Schema } = mongoose;

const gameSchema = new Schema({
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

gameSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

export const Game = mongoose.model("Game", gameSchema);