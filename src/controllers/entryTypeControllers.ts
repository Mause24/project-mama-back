import { Request, Response } from "express"
import {
    DuplicateEntryTypeException,
    EntryTypeCreationException,
    EntryTypeDeletionException,
    EntryTypeNotFoundException,
    EntryTypeUpdateException,
} from "../errors"
import {
    createEntryType as createEntryTypeService,
    getAllEntryTypes as getAllEntryTypesService,
    getEntryTypeById as getEntryTypeByIdService,
    removeEntryType as removeEntryTypeService,
    updateEntryType as updateEntryTypeService,
} from "../services"
import { RESPONSES } from "../utils"

export const createEntryType = async (req: Request, res: Response) => {
    try {
        const newEntryType = await createEntryTypeService(req.body)
        res.status(RESPONSES.CREATED.status).json({
            message: RESPONSES.CREATED.message,
            data: newEntryType,
        })
    } catch (error) {
        if (
            error instanceof DuplicateEntryTypeException ||
            error instanceof EntryTypeCreationException
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

export const getAllEntryTypes = async (_req: Request, res: Response) => {
    try {
        const entryTypes = await getAllEntryTypesService()
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: entryTypes,
        })
    } catch (error) {
        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

export const getEntryTypeById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const entryType = await getEntryTypeByIdService(id)
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: entryType,
        })
    } catch (error) {
        if (error instanceof EntryTypeNotFoundException) {
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

export const updateEntryType = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const updated = await updateEntryTypeService(id, req.body)
        res.status(RESPONSES.UPDATED.status).json({
            message: RESPONSES.UPDATED.message,
            data: updated,
        })
    } catch (error) {
        switch (true) {
            case error instanceof EntryTypeNotFoundException:
                res.status(RESPONSES.NOT_FOUND.status).json({
                    message: error.message,
                })
                break
            case error instanceof DuplicateEntryTypeException:
            case error instanceof EntryTypeUpdateException:
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

export const removeEntryType = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        await removeEntryTypeService(id)
        res.status(RESPONSES.DELETED.status).json({
            message: RESPONSES.DELETED.message,
        })
    } catch (error) {
        if (error instanceof EntryTypeNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof EntryTypeDeletionException) {
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
