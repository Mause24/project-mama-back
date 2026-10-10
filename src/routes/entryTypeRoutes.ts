import { Router } from "express"
import {
    createEntryType,
    getAllEntryTypes,
    getEntryTypeById,
    removeEntryType,
    updateEntryType,
} from "../controllers"
import { PROFILES } from "../interfaces"
import { authentication, validatorBody, validatorParams } from "../middlewares"
import {
    createEntryTypeSchema,
    entryTypeIdSchema,
    updateEntryTypeSchema,
} from "../schemas"

export const entryTypeRoutes = Router()

entryTypeRoutes.get("/", authentication(), getAllEntryTypes)

entryTypeRoutes.get(
    "/:id",
    authentication(),
    validatorParams(entryTypeIdSchema),
    getEntryTypeById,
)

entryTypeRoutes.post(
    "/",
    authentication([PROFILES.ADMIN]),
    validatorBody(createEntryTypeSchema),
    createEntryType,
)

entryTypeRoutes.patch(
    "/:id",
    authentication([PROFILES.ADMIN]),
    validatorParams(entryTypeIdSchema),
    validatorBody(updateEntryTypeSchema),
    updateEntryType,
)

entryTypeRoutes.delete(
    "/:id",
    authentication([PROFILES.ADMIN]),
    validatorParams(entryTypeIdSchema),
    removeEntryType,
)
