import { Router } from "express"
import {
    createProductParameter,
    getProductParameterById,
    getProductParametersByProductId,
    removeProductParameter,
    updateProductParameter,
} from "../controllers"
import { authentication, validatorBody, validatorParams } from "../middlewares"
import {
    createProductParameterSchema,
    productParameterIdSchema,
    productParamSchema,
    updateProductParameterSchema,
} from "../schemas"

export const productParameterRoutes = Router()

productParameterRoutes.get(
    "/product/:productId",
    authentication(),
    validatorParams(productParamSchema),
    getProductParametersByProductId,
)

productParameterRoutes.get(
    "/:id",
    authentication(),
    validatorParams(productParameterIdSchema),
    getProductParameterById,
)

productParameterRoutes.post(
    "/",
    authentication(),
    validatorBody(createProductParameterSchema),
    createProductParameter,
)

productParameterRoutes.patch(
    "/:id",
    authentication(),
    validatorParams(productParameterIdSchema),
    validatorBody(updateProductParameterSchema),
    updateProductParameter,
)

productParameterRoutes.delete(
    "/:id",
    authentication(),
    validatorParams(productParameterIdSchema),
    removeProductParameter,
)
