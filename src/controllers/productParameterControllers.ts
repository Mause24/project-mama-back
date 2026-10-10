import { Request, Response } from "express"
import {
    ParameterNotFoundException,
    ParameterOptionNotFoundException,
    ProductNotFoundException,
    ProductParameterCreationException,
    ProductParameterDeletionException,
    ProductParameterNotFoundException,
    ProductParameterUpdateException,
} from "../errors"
import {
    createProductParameter as createProductParameterService,
    getProductParameterById as getProductParameterByIdService,
    getProductParametersByProductId as getProductParametersByProductIdService,
    removeProductParameter as removeProductParameterService,
    updateProductParameter as updateProductParameterService,
} from "../services"
import { RESPONSES } from "../utils"

export const createProductParameter = async (req: Request, res: Response) => {
    try {
        const newItem = await createProductParameterService(req.body)
        res.status(RESPONSES.CREATED.status).json({
            message: RESPONSES.CREATED.message,
            data: newItem,
        })
    } catch (error) {
        if (
            error instanceof ProductNotFoundException ||
            error instanceof ParameterNotFoundException ||
            error instanceof ParameterOptionNotFoundException
        ) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof ProductParameterCreationException) {
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

export const getProductParametersByProductId = async (
    req: Request,
    res: Response,
) => {
    try {
        const productId = Number(req.params.productId)
        const items = await getProductParametersByProductIdService(productId)
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: items,
        })
    } catch (error) {
        if (error instanceof ProductNotFoundException) {
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

export const getProductParameterById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const item = await getProductParameterByIdService(id)
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: item,
        })
    } catch (error) {
        if (error instanceof ProductParameterNotFoundException) {
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

export const updateProductParameter = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const updated = await updateProductParameterService(id, req.body)
        res.status(RESPONSES.UPDATED.status).json({
            message: RESPONSES.UPDATED.message,
            data: updated,
        })
    } catch (error) {
        if (
            error instanceof ProductParameterNotFoundException ||
            error instanceof ParameterOptionNotFoundException
        ) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof ProductParameterUpdateException) {
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

export const removeProductParameter = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        await removeProductParameterService(id)
        res.status(RESPONSES.DELETED.status).json({
            message: RESPONSES.DELETED.message,
        })
    } catch (error) {
        if (error instanceof ProductParameterNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof ProductParameterDeletionException) {
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
