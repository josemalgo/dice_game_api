import { Player } from "../models/Player.js";

export const getRanking = async () => {
    const ranking = await Player.find({}).sort({ successRate: -1 });
    const average = await Player.aggregate()
        .group(
            {
                _id: null,
                average: { $avg: "$successRate" }
            }
        );
    return { ranking, average };
};

export const getLooser = async () => {
    const looser = await Player.find({}).sort({ successRate: 1 }).limit(1);
    return looser;
};

export const getWinner = async () => {
    const winner = await Player.find({}).sort({ successRate: -1 }).limit(1);
    return winner;
};