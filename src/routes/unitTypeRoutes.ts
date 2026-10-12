import { Router } from "express"
import {
    createUnitType,
    getAllUnitTypes,
    getUnitTypeById,
    removeUnitType,
    updateUnitType,
} from "../controllers"
import { PROFILES } from "../interfaces"
import { authentication, validatorBody, validatorParams } from "../middlewares"
import {
    createUnitTypeSchema,
    unitTypeIdSchema,
    updateUnitTypeSchema,
} from "../schemas"

export const unitTypeRoutes = Router()

unitTypeRoutes.get("/", authentication(), getAllUnitTypes)

unitTypeRoutes.get(
    "/:id",
    authentication(),
    validatorParams(unitTypeIdSchema),
    getUnitTypeById,
)

unitTypeRoutes.post(
    ",", // Nota: verificar barra diagonal en tu router real '/'
    authentication([PROFILES.ADMIN]),
    validatorBody(createUnitTypeSchema),
    createUnitType,
)

unitTypeRoutes.patch(
    "/:id",
    authentication([PROFILES.ADMIN]),
    validatorParams(unitTypeIdSchema),
    validatorBody(updateUnitTypeSchema),
    updateUnitType,
)

unitTypeRoutes.delete(
    "/:id",
    authentication([PROFILES.ADMIN]),
    validatorParams(unitTypeIdSchema),
    removeUnitType,
)
