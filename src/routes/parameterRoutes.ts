import { Router } from "express"
import {
    createParameter,
    getParameterById,
    getParametersByInventoryId,
    removeParameter,
    updateParameter,
} from "../controllers"
import { authentication, validatorBody, validatorParams } from "../middlewares"
import {
    createParameterSchema,
    inventoryIdParamSchema,
    parameterIdSchema,
    updateParameterSchema,
} from "../schemas"

export const parameterRoutes = Router()

// GET /parameters/product/:productId — Obtiene todos los parámetros de un producto
parameterRoutes.get(
    "/inventory/:inventoryId",
    authentication(),
    validatorParams(inventoryIdParamSchema),
    getParametersByInventoryId,
)

// GET /parameters/:id — Obtiene un parámetro por ID
parameterRoutes.get(
    "/:id",
    authentication(),
    validatorParams(parameterIdSchema),
    getParameterById,
)

// POST /parameters — Crea un nuevo parámetro
parameterRoutes.post(
    "/",
    authentication(),
    validatorBody(createParameterSchema),
    createParameter,
)

// PATCH /parameters/:id — Actualiza un parámetro
parameterRoutes.patch(
    "/:id",
    authentication(),
    validatorParams(parameterIdSchema),
    validatorBody(updateParameterSchema),
    updateParameter,
)

// DELETE /parameters/:id — Elimina un parámetro
parameterRoutes.delete(
    "/:id",
    authentication(),
    validatorParams(parameterIdSchema),
    removeParameter,
)
