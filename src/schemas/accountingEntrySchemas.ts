import Joi from "joi"

export const createAccountingEntrySchema = Joi.object({
    name: Joi.string().max(100).trim().required().messages({
        "string.empty": "El nombre de la entrada contable es obligatorio",
        "string.max": "El nombre no puede exceder los 100 caracteres",
    }),
    value: Joi.number().positive().required().messages({
        "number.base": "El valor debe ser un número válido",
        "number.positive": "El valor debe ser mayor a 0",
        "any.required": "El valor es obligatorio",
    }),
    description: Joi.string().max(255).allow("").optional(),
    entryTypeId: Joi.number().integer().positive().required().messages({
        "number.base": "El ID del tipo de entrada debe ser un número",
        "any.required": "El tipo de entrada es obligatorio",
    }),
    userId: Joi.number().integer().positive().required().messages({
        "number.base": "El ID del usuario debe ser un número",
        "any.required": "El usuario es obligatorio",
    }),
})

export const updateAccountingEntrySchema = Joi.object({
    name: Joi.string().max(100).trim().optional(),
    value: Joi.number().positive().optional(),
    description: Joi.string().max(255).allow("").optional(),
    entryTypeId: Joi.number().integer().positive().optional(),
})

export const accountingEntryIdSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
})

export const accountingEntryUserIdSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
})
