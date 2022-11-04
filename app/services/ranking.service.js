import { Player } from "../models/Player.js";

export const getRanking = async () => {
    try {
        const ranking = await Player.find({}).sort({"succesRate": -1})
        const average = await calculateAveregeSuccessRate();
        return {ranking, average};
    } catch (error) {
        throw error;
    }
};

export const getLooser = async() => {

};

export const getWinner = async() => {

};

const calculateAveregeSuccessRate = async () => {
    let totalPlayers = 0;
    let sumAllSuccesRate = 0;
    let result = 0;

    const players = await Player.find({});
    players.forEach(player => {
        sumAllSuccesRate+=player.successRate;
    })

    totalPlayers = players.length;

    if(totalPlayers !== 0) {
        result = sumAllSuccesRate / totalPlayers;
    }

    return result;
}