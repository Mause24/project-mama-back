import Joi from "joi"

export const createEntryTypeSchema = Joi.object({
    name: Joi.string().max(50).trim().required().messages({
        "string.empty": "El nombre del tipo de entrada es obligatorio",
        "string.max": "El nombre no puede exceder los 50 caracteres",
    }),
})

export const updateEntryTypeSchema = Joi.object({
    name: Joi.string().max(50).trim().required().messages({
        "string.empty": "El nombre del tipo de entrada es obligatorio",
        "string.max": "El nombre no puede exceder los 50 caracteres",
    }),
})

export const entryTypeIdSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
})
