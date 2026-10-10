import { Router } from "express"
import {
    createProductEntry,
    getProductEntriesByAccountingEntryId,
    getProductEntryById,
    removeProductEntry,
    updateProductEntry,
} from "../controllers"
import { authentication, validatorBody, validatorParams } from "../middlewares"
import {
    accountingEntryParamSchema,
    createProductEntrySchema,
    productEntryIdSchema,
    updateProductEntrySchema,
} from "../schemas"

export const productEntryRoutes = Router()

productEntryRoutes.get(
    "/accounting-entry/:accountingEntryId",
    authentication(),
    validatorParams(accountingEntryParamSchema),
    getProductEntriesByAccountingEntryId,
)

productEntryRoutes.get(
    "/:id",
    authentication(),
    validatorParams(productEntryIdSchema),
    getProductEntryById,
)

productEntryRoutes.post(
    "/",
    authentication(),
    validatorBody(createProductEntrySchema),
    createProductEntry,
)

productEntryRoutes.patch(
    "/:id",
    authentication(),
    validatorParams(productEntryIdSchema),
    validatorBody(updateProductEntrySchema),
    updateProductEntry,
)

productEntryRoutes.delete(
    "/:id",
    authentication(),
    validatorParams(productEntryIdSchema),
    removeProductEntry,
)
