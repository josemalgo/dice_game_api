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

playerSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password
    }
})

export const Player = mongoose.model('Player', playerSchema);