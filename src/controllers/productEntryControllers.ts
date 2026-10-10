import { Request, Response } from "express"
import {
    AccountingEntryNotFoundException,
    ProductEntryCreationException,
    ProductEntryDeletionException,
    ProductEntryNotFoundException,
    ProductEntryUpdateException,
    ProductNotFoundException,
} from "../errors"
import {
    createProductEntry as createProductEntryService,
    getProductEntriesByAccountingEntryId as getProductEntriesByAccountingEntryIdService,
    getProductEntryById as getProductEntryByIdService,
    removeProductEntry as removeProductEntryService,
    updateProductEntry as updateProductEntryService,
} from "../services"
import { RESPONSES } from "../utils"

export const createProductEntry = async (req: Request, res: Response) => {
    try {
        const newProductEntry = await createProductEntryService(req.body)
        res.status(RESPONSES.CREATED.status).json({
            message: RESPONSES.CREATED.message,
            data: newProductEntry,
        })
    } catch (error) {
        if (
            error instanceof ProductNotFoundException ||
            error instanceof AccountingEntryNotFoundException
        ) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof ProductEntryCreationException) {
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

export const getProductEntriesByAccountingEntryId = async (
    req: Request,
    res: Response,
) => {
    try {
        const accountingEntryId = Number(req.params.accountingEntryId)
        const items =
            await getProductEntriesByAccountingEntryIdService(accountingEntryId)
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: items,
        })
    } catch (error) {
        if (error instanceof AccountingEntryNotFoundException) {
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

export const getProductEntryById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const item = await getProductEntryByIdService(id)
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: item,
        })
    } catch (error) {
        if (error instanceof ProductEntryNotFoundException) {
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

export const updateProductEntry = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const updated = await updateProductEntryService(id, req.body)
        res.status(RESPONSES.UPDATED.status).json({
            message: RESPONSES.UPDATED.message,
            data: updated,
        })
    } catch (error) {
        if (error instanceof ProductEntryNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof ProductEntryUpdateException) {
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

export const removeProductEntry = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        await removeProductEntryService(id)
        res.status(RESPONSES.DELETED.status).json({
            message: RESPONSES.DELETED.message,
        })
    } catch (error) {
        if (error instanceof ProductEntryNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof ProductEntryDeletionException) {
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
