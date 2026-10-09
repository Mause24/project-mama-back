import Joi from "joi"

export const createBenefictSchema = Joi.object({
    name: Joi.string().max(100).required().messages({
        "any.required": "El nombre es requerido",
        "string.max": "El nombre no puede exceder 100 caracteres",
    }),
    description: Joi.string().allow("", null).optional().messages({
        "string.base": "La descripción debe ser un texto",
    }),
    membershipId: Joi.number().integer().required().messages({
        "number.base": "El ID de la membresía debe ser un número",
        "any.required": "El ID de la membresía es requerido",
    }),
})

export const updateBenefictSchema = Joi.object({
    name: Joi.string().max(100).messages({
        "string.max": "El nombre no puede exceder 100 caracteres",
    }),
    description: Joi.string().allow("", null).optional().messages({
        "string.base": "La descripción debe ser un texto",
    }),
    membershipId: Joi.number().integer().messages({
        "number.base": "El ID de la membresía debe ser un número",
        "any.required": "El ID de la membresía es requerido",
    }),
})

export const benefictIdSchema = Joi.object({
    id: Joi.number().integer().required(),
})
