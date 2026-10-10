import { Router } from "express"
import {
    createAccountingEntry,
    getAccountingEntriesByUserId,
    getAccountingEntryById,
    removeAccountingEntry,
    updateAccountingEntry,
} from "../controllers"
import { authentication, validatorBody, validatorParams } from "../middlewares"
import {
    accountingEntryIdSchema,
    accountingEntryUserIdSchema,
    createAccountingEntrySchema,
    updateAccountingEntrySchema,
} from "../schemas"

export const accountingEntryRoutes = Router()

accountingEntryRoutes.get(
    "/user/:userId",
    authentication(),
    validatorParams(accountingEntryUserIdSchema),
    getAccountingEntriesByUserId,
)

accountingEntryRoutes.get(
    "/:id",
    authentication(),
    validatorParams(accountingEntryIdSchema),
    getAccountingEntryById,
)

accountingEntryRoutes.post(
    "/",
    authentication(),
    validatorBody(createAccountingEntrySchema),
    createAccountingEntry,
)

accountingEntryRoutes.patch(
    "/:id",
    authentication(),
    validatorParams(accountingEntryIdSchema),
    validatorBody(updateAccountingEntrySchema),
    updateAccountingEntry,
)

accountingEntryRoutes.delete(
    "/:id",
    authentication(),
    validatorParams(accountingEntryIdSchema),
    removeAccountingEntry,
)
