import Joi from "joi"

export const createUnitTypeSchema = Joi.object({
    name: Joi.string().max(50).required().messages({
        "string.base": "El nombre debe ser un texto",
        "any.required": "El nombre es obligatorio",
    }),
    value: Joi.string().max(50).required().messages({
        "string.base": "El valor debe ser un texto",
        "any.required": "El valor es obligatorio",
    }),
})

export const updateUnitTypeSchema = Joi.object({
    name: Joi.string().max(50).optional(),
    value: Joi.string().max(50).optional(),
})

export const unitTypeIdSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
})
