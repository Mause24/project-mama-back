// src/routes/membershipRoutes.ts
import { Router } from "express"
import {
    createMembership,
    getAllMembership,
    getMembershipById,
    removeMembership,
    updateMembership,
} from "../controllers/membershipController"
import { PROFILES } from "../interfaces"
import { authentication, validatorBody, validatorParams } from "../middlewares"
import {
    createMembershipSchema,
    membershipIdSchema,
    updateMembershipSchema,
} from "../schemas"

/**
 * Todas las rutas de "membership" están protegidas:
 *   • authentication() valida el JWT.
 *   • Sólo los usuarios con perfil ADMIN pueden crear, actualizar o eliminar.
 *   • Cualquier usuario autenticado puede listar todas las membresías.
 *   • validatorBody/validatorParams verifican la entrada con Joi.
 */
export const membershipRoutes = Router()

// LIST ALL – GET /membership (cualquier usuario autenticado)
membershipRoutes.get("/", authentication(), getAllMembership)

// CREATE – POST /membership (solo ADMIN)
membershipRoutes.post(
    "/",
    authentication([PROFILES.ADMIN]),
    validatorBody(createMembershipSchema),
    createMembership
)

// READ (by id) – GET /membership/:id (solo ADMIN)
membershipRoutes.get(
    "/:id",
    authentication(),
    validatorParams(membershipIdSchema),
    getMembershipById
)

// UPDATE – PATCH /membership/:id (solo ADMIN)
membershipRoutes.patch(
    "/:id",
    authentication([PROFILES.ADMIN]),
    validatorParams(membershipIdSchema),
    validatorBody(updateMembershipSchema),
    updateMembership
)

// DELETE – DELETE /membership/:id (solo ADMIN)
membershipRoutes.delete(
    "/:id",
    authentication([PROFILES.ADMIN]),
    validatorParams(membershipIdSchema),
    removeMembership
)

