import * as rankingService from "../services/ranking.service.js"

export const getRanking = async(_req, res) => {
    try {
        const ranking = await rankingService.getRanking();
        res.status(200).json(ranking);
    } catch (error) {
        return res.status(500).json({ errors: error.message })
    }
}

export const getLooser = async(_req, res) => {
    try {
        const looser = await rankingService.getLooser();
        res.status(200).json(looser);
    } catch (error) {
        return res.status(500).json({ errors: error.message })
    }
}

export const getWinner = async(_req, res) => {
    try {
        const winner = await rankingService.getWinner();
        res.status(200).json(winner);
    } catch (error) {
        return res.status(500).json({ errors: error.message })
    }
}