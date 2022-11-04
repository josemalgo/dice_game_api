import * as rankingService from "../services/ranking.service.js"

export const getRanking = async(_req, res) => {
    try {
        const ranking = await rankingService.getRanking();
        res.status(200).json(ranking);
    } catch (error) {
        return res.status(500).json({ errors: error.message })
    }
}

export const getLooser = async(req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({ errors: error.message })
    }
}

export const getWinner = async(req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({ errors: error.message })
    }
}