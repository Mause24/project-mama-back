import { Request, Response, NextFunction } from "express"
import Joi from "joi"
import { RESPONSES } from "../utils"

export const validatorBody = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Verificar si el body está vacío
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(RESPONSES.BAD_REQUEST.status).json({
                message: "El body no puede estar vacío"
            })
        }

        const { error } = schema.validate(req.body)

        if (error) {
            return res.status(RESPONSES.BAD_REQUEST.status).json({
                message: error.message,
            })
        }
        next()
    }
}

export const validatorParams = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Verificar si los params están vacíos
        if (!req.params || Object.keys(req.params).length === 0) {
            return res.status(RESPONSES.BAD_REQUEST.status).json({
                message: "Los params no pueden estar vacíos"
            })
        }

        const { error } = schema.validate(req.params)
        if (error) {
            return res.status(RESPONSES.BAD_REQUEST.status).json({
                message: error.message,
            })
        }
        next()
    }
}