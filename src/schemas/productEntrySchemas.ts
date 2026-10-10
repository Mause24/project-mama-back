import Joi from "joi"

export const createProductEntrySchema = Joi.object({
    productId: Joi.number().integer().positive().required().messages({
        "number.base": "El ID del producto debe ser un número",
        "any.required": "El producto es obligatorio",
    }),
    accountingEntryId: Joi.number().integer().positive().required().messages({
        "number.base": "El ID de la entrada contable debe ser un número",
        "any.required": "La entrada contable es obligatoria",
    }),
    quantity: Joi.number().integer().positive().required().messages({
        "number.positive": "La cantidad debe ser mayor a 0",
        "any.required": "La cantidad es obligatoria",
    }),
    unitPrice: Joi.number().positive().required().messages({
        "number.positive": "El precio unitario debe ser mayor a 0",
        "any.required": "El precio unitario es obligatorio",
    }),
})

export const updateProductEntrySchema = Joi.object({
    quantity: Joi.number().integer().positive().optional(),
    unitPrice: Joi.number().positive().optional(),
})

export const productEntryIdSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
})

export const accountingEntryParamSchema = Joi.object({
    accountingEntryId: Joi.number().integer().positive().required(),
})
