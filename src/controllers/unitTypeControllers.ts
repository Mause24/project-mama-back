import { Request, Response } from "express"
import {
    UnitTypeCreationException,
    UnitTypeDeletionException,
    UnitTypeNotFoundException,
    UnitTypeUpdateException,
} from "../errors"
import {
    createUnitType as createUnitTypeService,
    getAllUnitTypes as getAllUnitTypesService,
    getUnitTypeById as getUnitTypeByIdService,
    removeUnitType as removeUnitTypeService,
    updateUnitType as updateUnitTypeService,
} from "../services"
import { RESPONSES } from "../utils"

export const getAllUnitTypes = async (_req: Request, res: Response) => {
    try {
        const items = await getAllUnitTypesService()
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: items,
        })
    } catch (error) {
        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

export const getUnitTypeById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const item = await getUnitTypeByIdService(id)
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: item,
        })
    } catch (error) {
        if (error instanceof UnitTypeNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

export const createUnitType = async (req: Request, res: Response) => {
    try {
        const newItem = await createUnitTypeService(req.body)
        res.status(RESPONSES.CREATED.status).json({
            message: RESPONSES.CREATED.message,
            data: newItem,
        })
    } catch (error) {
        if (error instanceof UnitTypeCreationException) {
            res.status(RESPONSES.BAD_REQUEST.status).json({
                message: error.message,
            })
            return
        }

        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

export const updateUnitType = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const updated = await updateUnitTypeService(id, req.body)
        res.status(RESPONSES.UPDATED.status).json({
            message: RESPONSES.UPDATED.message,
            data: updated,
        })
    } catch (error) {
        if (error instanceof UnitTypeNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof UnitTypeUpdateException) {
            res.status(RESPONSES.BAD_REQUEST.status).json({
                message: error.message,
            })
            return
        }

        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

export const removeUnitType = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        await removeUnitTypeService(id)
        res.status(RESPONSES.DELETED.status).json({
            message: RESPONSES.DELETED.message,
        })
    } catch (error) {
        if (error instanceof UnitTypeNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof UnitTypeDeletionException) {
            res.status(RESPONSES.BAD_REQUEST.status).json({
                message: error.message,
            })
            return
        }

        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}
