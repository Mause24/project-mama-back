import { Request, Response } from "express"
import {
    BenefictNotFoundException,
    CannotCreateBenefictException,
    CannotDeleteBenefictException,
    CannotUpdateBenefictException,
} from "../errors"
import {
    createBenefict as createBenefictService,
    deleteBenefict as deleteBenefictService,
    getAllBenefict as getAllBenefictService,
    getBenefictById as getBenefictByIdService,
    updateBenefict as updateBenefictService,
} from "../services"
import { RESPONSES } from "../utils"

/* -------------------------------------------------------------------------- */
/* GET ALL - GET /benefict (cualquier usuario autenticado)                  */
/* -------------------------------------------------------------------------- */
export const getAllBenefict = async (_req: Request, res: Response) => {
    try {
        const beneficts = await getAllBenefictService()
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: beneficts,
        })
    } catch (error) {
        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

/* -------------------------------------------------------------------------- */
/* CREATE - POST /benefict (solo ADMIN)                                     */
/* -------------------------------------------------------------------------- */
export const createBenefict = async (
    req: Request<any, any, { name: string; description?: string }>,
    res: Response
) => {
    try {
        const { name, description } = req.body
        const benefict = await createBenefictService(name, description)

        res.status(RESPONSES.CREATED.status).json({
            message: RESPONSES.CREATED.message,
            data: benefict,
        })
    } catch (error) {
        if (error instanceof CannotCreateBenefictException) {
            res.status(RESPONSES.BAD_REQUEST.status).json({
                message: error.message,
            })
            return
        }

        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

/* -------------------------------------------------------------------------- */
/* READ by ID - GET /benefict/:id  (cualquier usuario autenticado)          */
/* -------------------------------------------------------------------------- */
export const getBenefictById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const id = Number(req.params.id)
        const benefict = await getBenefictByIdService(id)

        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: benefict,
        })
    } catch (error) {
        if (error instanceof BenefictNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

/* -------------------------------------------------------------------------- */
/* UPDATE - PATCH /benefict/:id (solo ADMIN)                                */
/* -------------------------------------------------------------------------- */
export const updateBenefict = async (
    req: Request<
        { id: string },
        any,
        Partial<{ name: string; description: string }>
    >,
    res: Response
) => {
    try {
        const id = Number(req.params.id)
        const updated = await updateBenefictService(id, req.body)

        res.status(RESPONSES.UPDATED.status).json({
            message: RESPONSES.UPDATED.message,
            data: updated,
        })
    } catch (error) {
        switch (true) {
            case error instanceof BenefictNotFoundException:
                res.status(RESPONSES.NOT_FOUND.status).json({
                    message: error.message,
                })
                break
            case error instanceof CannotUpdateBenefictException:
                res.status(RESPONSES.CANNOT_UPDATE.status).json({
                    message: error.message,
                })
                break
            case error instanceof CannotCreateBenefictException: // Por si falla la validación de update reutilizada
                res.status(RESPONSES.BAD_REQUEST.status).json({
                    message: error.message,
                })
                break
            default:
                res.status(RESPONSES.SERVER_ERROR.status).json({
                    message: RESPONSES.SERVER_ERROR.message,
                })
                break
        }
        console.error(error)
    }
}

/* -------------------------------------------------------------------------- */
/* DELETE - DELETE /benefict/:id (solo ADMIN)                               */
/* -------------------------------------------------------------------------- */
export const removeBenefict = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const id = Number(req.params.id)
        await deleteBenefictService(id)

        res.status(RESPONSES.DELETED.status).json({
            message: RESPONSES.DELETED.message,
        })
    } catch (error) {
        if (error instanceof BenefictNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof CannotDeleteBenefictException) {
            res.status(RESPONSES.CANNOT_DELETE.status).json({
                message: error.message,
            })
            return
        }

        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}
