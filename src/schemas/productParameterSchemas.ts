import Joi from "joi"

export const createProductParameterSchema = Joi.object({
    productId: Joi.number().integer().positive().required().messages({
        "number.base": "El ID del producto debe ser un número",
        "any.required": "El producto es obligatorio",
    }),
    parameterId: Joi.number().integer().positive().required().messages({
        "number.base": "El ID del parámetro debe ser un número",
        "any.required": "El parámetro es obligatorio",
    }),
    parameterOptionId: Joi.number().integer().positive().optional(),
    customValue: Joi.string().max(255).allow("").optional(),
})

export const updateProductParameterSchema = Joi.object({
    parameterOptionId: Joi.number().integer().positive().optional(),
    customValue: Joi.string().max(255).allow("").optional(),
})

export const productParameterIdSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
})

export const productParamSchema = Joi.object({
    productId: Joi.number().integer().positive().required(),
})
