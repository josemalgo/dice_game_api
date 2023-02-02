import * as playerService from "../services/player.service.js"
import { httpStatusCodes } from "../enums/httpStatusCodes.js"
import { isValidMongooseId, validateRequest } from "../helpers/helpers.js"

export const getPlayers = async (_req, res, next) => {
    const allPlayers = await playerService.getAllPlayers()
    res.status(httpStatusCodes.OK).json(allPlayers)
}

export const createPlayer = async (req, res, next) => {
    validateRequest(req)
    const { name, password } = req.body;

    const player = await playerService.addPlayer(name, password)
    res.status(httpStatusCodes.CREATED).json(player)
}

export const updatePlayer = async (req, res, next) => {
    validateRequest(req)
    const {
        body,
        params: { id }
    } = req;

    isValidMongooseId(id)

    const updatedPlayer = await playerService.updatePlayer(id, body)
    res.status(httpStatusCodes.CREATED).json(updatedPlayer)
}

export const deletePlayer = async (req, res, next) => {
    const { id } = req.params;
    isValidMongooseId(id)

    await playerService.deletePlayer(id)
    res.status(httpStatusCodes.OK).end()
}