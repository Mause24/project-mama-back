import { Request, Response } from "express"
import {
    DuplicateParameterException,
    InventoryNotFoundException,
    ParameterCreationException,
    ParameterDeletionException,
    ParameterNotFoundException,
    ParameterUpdateException,
    TypeNotFoundException,
} from "../errors"
import {
    createParameter as createParameterService,
    getParameterById as getParameterByIdService,
    getParametersByInventoryId as getParametersByInventoryIdService,
    removeParameter as removeParameterService,
    updateParameter as updateParameterService,
} from "../services"
import { RESPONSES } from "../utils"

export const createParameter = async (req: Request, res: Response) => {
    try {
        const newParameter = await createParameterService(req.body)
        res.status(RESPONSES.CREATED.status).json({
            message: RESPONSES.CREATED.message,
            data: newParameter,
        })
    } catch (error) {
        if (
            error instanceof InventoryNotFoundException ||
            error instanceof TypeNotFoundException
        ) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (
            error instanceof DuplicateParameterException ||
            error instanceof ParameterCreationException
        ) {
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

export const getParametersByInventoryId = async (
    req: Request,
    res: Response,
) => {
    try {
        const inventoryId = Number(req.params.inventoryId)
        const parameters = await getParametersByInventoryIdService(inventoryId)
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: parameters,
        })
    } catch (error) {
        if (error instanceof InventoryNotFoundException) {
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

export const getParameterById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const parameter = await getParameterByIdService(id)
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: parameter,
        })
    } catch (error) {
        if (error instanceof ParameterNotFoundException) {
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

export const updateParameter = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const updated = await updateParameterService(id, req.body)
        res.status(RESPONSES.UPDATED.status).json({
            message: RESPONSES.UPDATED.message,
            data: updated,
        })
    } catch (error) {
        switch (true) {
            case error instanceof ParameterNotFoundException:
                res.status(RESPONSES.NOT_FOUND.status).json({
                    message: error.message,
                })
                break
            case error instanceof DuplicateParameterException:
            case error instanceof ParameterUpdateException:
                res.status(RESPONSES.BAD_REQUEST.status).json({
                    message: error.message,
                })
                break
            default:
                res.status(RESPONSES.SERVER_ERROR.status).json({
                    message: RESPONSES.SERVER_ERROR.message,
                })
                break
        }
        console.error(error)
    }
}

export const removeParameter = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        await removeParameterService(id)
        res.status(RESPONSES.DELETED.status).json({
            message: RESPONSES.DELETED.message,
        })
    } catch (error) {
        if (error instanceof ParameterNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof ParameterDeletionException) {
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
