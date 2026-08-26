import { Router } from "express"
import {
    createProduct,
    getAllProducts,
    getProductById,
    removeProduct,
    updateProduct,
} from "../controllers"; // Utiliza tu barril de controladores igual que en membership
import { authentication, validatorBody, validatorParams } from "../middlewares"
import {
    createProductSchema,
    productIdSchema,
    updateProductSchema,
} from "../schemas"

/**
 * Todas las rutas de "products" están protegidas y validadas de forma preventiva:
 * • authentication() valida el JWT del usuario en sesión.
 * • validatorBody / validatorParams verifican la integridad semántica con Joi antes de tocar el controlador.
 */
export const productRoutes = Router()

// LIST ALL – GET /products (Cualquier usuario autenticado)
productRoutes.get("/", authentication(), getAllProducts)

// CREATE – POST /products (Cualquier usuario autenticado)
productRoutes.post(
    "/",
    authentication(),
    validatorBody(createProductSchema),
    createProduct
)

// READ (by id) – GET /products/:id (Cualquier usuario autenticado)
productRoutes.get(
    "/:id",
    authentication(),
    validatorParams(productIdSchema),
    getProductById
)

// UPDATE – PATCH /products/:id (Cualquier usuario autenticado)
productRoutes.patch(
    "/:id",
    authentication(),
    validatorParams(productIdSchema),
    validatorBody(updateProductSchema),
    updateProduct
)

// DELETE – DELETE /products/:id (Cualquier usuario autenticado o restringido a ADMIN según regla de negocio)
productRoutes.delete(
    "/:id",
    authentication(), // Si deseas que solo el ADMIN borre, cambia por: authentication([PROFILES.ADMIN])
    validatorParams(productIdSchema),
    removeProduct
)
