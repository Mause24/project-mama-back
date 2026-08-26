import { Router } from "express"
import {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    removeSubscription,
    updateSubscription,
} from "../controllers"
import { PROFILES } from "../interfaces"
import { authentication, validatorBody, validatorParams } from "../middlewares"
import {
    createSubscriptionSchema,
    subscriptionIdSchema,
    updateSubscriptionSchema,
} from "../schemas"

/**
 * Todas las rutas de "subscription" están protegidas:
 * • authentication() valida el JWT.
 * • Sólo los usuarios con perfil ADMIN pueden crear, actualizar o eliminar.
 * • Cualquier usuario autenticado puede listar todas las suscripciones o ver una por ID.
 * • validatorBody/validatorParams verifican la entrada con Joi.
 */
export const subscriptionRoutes = Router()

// LIST ALL – GET /subscription (cualquier usuario autenticado)
subscriptionRoutes.get("/", authentication(), getAllSubscriptions)

// CREATE – POST /subscription (solo ADMIN)
subscriptionRoutes.post(
    "/",
    authentication([PROFILES.ADMIN]),
    validatorBody(createSubscriptionSchema),
    createSubscription
)

// READ (by id) – GET /subscription/:id (cualquier usuario autenticado)
subscriptionRoutes.get(
    "/:id",
    authentication(),
    validatorParams(subscriptionIdSchema),
    getSubscriptionById
)

// UPDATE – PATCH /subscription/:id (solo ADMIN)
subscriptionRoutes.patch(
    "/:id",
    authentication([PROFILES.ADMIN]),
    validatorParams(subscriptionIdSchema),
    validatorBody(updateSubscriptionSchema),
    updateSubscription
)

// DELETE – DELETE /subscription/:id (solo ADMIN)
subscriptionRoutes.delete(
    "/:id",
    authentication([PROFILES.ADMIN]),
    validatorParams(subscriptionIdSchema),
    removeSubscription
)
