import * as rankingService from "../services/ranking.service.js"

export const getRanking = async (_req, res, next) => {
    const ranking = await rankingService.getRanking();
    res.status(200).json(ranking);
}

export const getLooser = async (_req, res, next) => {
    const looser = await rankingService.getLooser();
    res.status(200).json(looser);
}

export const getWinner = async (_req, res, next) => {
    const winner = await rankingService.getWinner();
    res.status(200).json(winner);
}