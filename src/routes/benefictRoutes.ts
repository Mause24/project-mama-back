import { Router } from "express"
import {
    createBenefict,
    getAllBenefict,
    getBenefictById,
    removeBenefict,
    updateBenefict,
} from "../controllers"
import { PROFILES } from "../interfaces"
import { authentication, validatorBody, validatorParams } from "../middlewares"
import {
    benefictIdSchema,
    createBenefictSchema,
    updateBenefictSchema,
} from "../schemas"

export const benefictRoutes = Router()

// LIST ALL – GET /benefict (cualquier usuario autenticado)
benefictRoutes.get("/", authentication(), getAllBenefict)

// CREATE – POST /benefict (solo ADMIN)
benefictRoutes.post(
    "/",
    authentication([PROFILES.ADMIN]),
    validatorBody(createBenefictSchema),
    createBenefict
)

// READ (by id) – GET /benefict/:id (cualquier usuario autenticado)
benefictRoutes.get(
    "/:id",
    authentication(),
    validatorParams(benefictIdSchema),
    getBenefictById
)

// UPDATE – PATCH /benefict/:id (solo ADMIN)
benefictRoutes.patch(
    "/:id",
    authentication([PROFILES.ADMIN]),
    validatorParams(benefictIdSchema),
    validatorBody(updateBenefictSchema),
    updateBenefict
)

// DELETE – DELETE /benefict/:id (solo ADMIN)
benefictRoutes.delete(
    "/:id",
    authentication([PROFILES.ADMIN]),
    validatorParams(benefictIdSchema),
    removeBenefict
)
