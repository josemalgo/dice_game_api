import { Player } from "../models/Player.js";

export const getRanking = async () => {
    try {
        const ranking = await Player.find({}).sort({ successRate: -1});
        const average = await Player.aggregate()
            .group(
            {
                _id: null,
                average: {$avg: "$successRate"}
            }
        );
        return {ranking, average};
    } catch (error) {
        throw error;
    }
};

export const getLooser = async() => {
    try {
        const looser = await Player.find({}).sort({ successRate: 1}).limit(1);

        return looser;
    } catch (error) {
        throw error;
    }
};

export const getWinner = async() => {
    try {
        const winner = await Player.find({}).sort({ successRate: -1}).limit(1);

        return winner;
    } catch (error) {
        throw error;
    }
};