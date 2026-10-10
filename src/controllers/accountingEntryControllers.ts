import { Request, Response } from "express"
import {
    AccountingEntryCreationException,
    AccountingEntryDeletionException,
    AccountingEntryNotFoundException,
    AccountingEntryUpdateException,
    EntryTypeNotFoundException,
    UserNotFoundException,
} from "../errors"
import {
    createAccountingEntry as createAccountingEntryService,
    getAccountingEntriesByUserId as getAccountingEntriesByUserIdService,
    getAccountingEntryById as getAccountingEntryByIdService,
    removeAccountingEntry as removeAccountingEntryService,
    updateAccountingEntry as updateAccountingEntryService,
} from "../services"
import { RESPONSES } from "../utils"

export const createAccountingEntry = async (req: Request, res: Response) => {
    try {
        const newEntry = await createAccountingEntryService(req.body)
        res.status(RESPONSES.CREATED.status).json({
            message: RESPONSES.CREATED.message,
            data: newEntry,
        })
    } catch (error) {
        if (
            error instanceof UserNotFoundException ||
            error instanceof EntryTypeNotFoundException
        ) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof AccountingEntryCreationException) {
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

export const getAccountingEntriesByUserId = async (
    req: Request,
    res: Response,
) => {
    try {
        const userId = Number(req.params.userId)
        const entries = await getAccountingEntriesByUserIdService(userId)
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: entries,
        })
    } catch (error) {
        if (error instanceof UserNotFoundException) {
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

export const getAccountingEntryById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const entry = await getAccountingEntryByIdService(id)
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: entry,
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

export const updateAccountingEntry = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const updated = await updateAccountingEntryService(id, req.body)
        res.status(RESPONSES.UPDATED.status).json({
            message: RESPONSES.UPDATED.message,
            data: updated,
        })
    } catch (error) {
        switch (true) {
            case error instanceof AccountingEntryNotFoundException:
            case error instanceof EntryTypeNotFoundException:
                res.status(RESPONSES.NOT_FOUND.status).json({
                    message: error.message,
                })
                break
            case error instanceof AccountingEntryUpdateException:
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

export const removeAccountingEntry = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        await removeAccountingEntryService(id)
        res.status(RESPONSES.DELETED.status).json({
            message: RESPONSES.DELETED.message,
        })
    } catch (error) {
        if (error instanceof AccountingEntryNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof AccountingEntryDeletionException) {
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
