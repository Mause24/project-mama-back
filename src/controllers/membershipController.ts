import { Request, Response } from "express"
import {
    CannotCreateMembershipException,
    CannotDeleteMembershipException,
    CannotUpdateMembershipException,
    MembershipNotFoundException,
} from "../errors"
import {
    createMembership as createMembershipService,
    deleteMembership as deleteMembershipService,
    getAllMembership as getAllMembershipService,
    getMembershipById as getMembershipByIdService,
    updateMembership as updateMembershipService,
} from "../services"
import { RESPONSES } from "../utils"

/* -------------------------------------------------------------------------- */
/*   GET ALL - GET /membership (cualquier usuario autenticado)                 */
/* -------------------------------------------------------------------------- */
export const getAllMembership = async (_req: Request, res: Response) => {
    try {
        const memberships = await getAllMembershipService()
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: memberships,
        })
    } catch (error) {
        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

/* -------------------------------------------------------------------------- */
/*   CREATE - POST /membership (solo ADMIN)                                   */
/* -------------------------------------------------------------------------- */
export const createMembership = async (
    req: Request<any, any, { name: string; price: number }>,
    res: Response
) => {
    try {
        const { name, price } = req.body
        const membership = await createMembershipService(name, price)

        res.status(RESPONSES.CREATED.status).json({
            message: RESPONSES.CREATED.message,
            data: membership,
        })
    } catch (error) {
        if (error instanceof CannotCreateMembershipException) {
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
/*   READ by ID - GET /membership/:id  (cualquier usuario autenticado)        */
/* -------------------------------------------------------------------------- */
export const getMembershipById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const id = Number(req.params.id)
        const membership = await getMembershipByIdService(id)

        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: membership,
        })
    } catch (error) {
        if (error instanceof MembershipNotFoundException) {
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
/*   UPDATE - PATCH /membership/:id (solo ADMIN)                               */
/* -------------------------------------------------------------------------- */
export const updateMembership = async (
    req: Request<{ id: string }, any, Partial<{ name: string; price: number }>>,
    res: Response
) => {
    try {
        const id = Number(req.params.id)
        const updated = await updateMembershipService(id, req.body)

        res.status(RESPONSES.UPDATED.status).json({
            message: RESPONSES.UPDATED.message,
            data: updated,
        })
    } catch (error) {
        switch (true) {
            case error instanceof MembershipNotFoundException:
                res.status(RESPONSES.NOT_FOUND.status).json({
                    message: error.message,
                })
                break
            case error instanceof CannotUpdateMembershipException:
                res.status(RESPONSES.CANNOT_UPDATE.status).json({
                    message: error.message,
                })
                break
            case error instanceof CannotCreateMembershipException:
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
/*   DELETE - DELETE /membership/:id (solo ADMIN)                              */
/* -------------------------------------------------------------------------- */
export const removeMembership = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const id = Number(req.params.id)
        await deleteMembershipService(id)

        res.status(RESPONSES.DELETED.status).json({
            message: RESPONSES.DELETED.message,
        })
    } catch (error) {
        if (error instanceof MembershipNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof CannotDeleteMembershipException) {
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

