import Joi from "joi"

// createProductSchema
export const createProductSchema = Joi.object({
    name: Joi.string().required().min(3).max(150).messages({
        required: "El nombre es requerido",
        min: "El nombre debe tener al menos 3 caracteres",
        max: "El nombre no puede exceder los 150 caracteres",
    }),
    description: Joi.string().allow("").messages({
        string: "La descripción debe ser un texto",
    }),
    sellPrice: Joi.number().required().positive().messages({
        required: "El precio de venta es requerido",
        number: "El precio debe ser un número",
        positive: "El precio debe ser mayor a 0",
    }),
    buyPrice: Joi.number().required().positive().messages({
        required: "El precio de compra es requerido",
        number: "El precio debe ser un número",
        positive: "El precio debe ser mayor a 0",
    }),
    unit: Joi.string().required().min(1).max(10).messages({
        required: "La unidad es requerida",
        min: "La unidad debe tener al menos 1 caracter",
        max: "La unidad no puede exceder los 10 caracteres",
    }),

    stock: Joi.number().integer().required().min(0).messages({
        required: "El stock es requerido",
        integer: "El stock debe ser un número entero",
        min: "El stock no puede ser negativo",
    }),
})

// updateProductSchema
export const updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(150).messages({
        min: "El nombre debe tener al menos 3 caracteres",
        max: "El nombre no puede exceder los 150 caracteres",
    }),
    description: Joi.string().allow("").messages({
        string: "La descripción debe ser un texto",
    }),
    sellPrice: Joi.number().positive().messages({
        number: "El precio debe ser un número",
    }),
    buyPrice: Joi.number().positive().messages({
        number: "El precio debe ser un número",
    }),
    unit: Joi.string().min(1).max(10).messages({
        min: "La unidad debe tener al menos 1 caracter",
        max: "La unidad no puede exceder los 10 caracteres",
    }),
    stock: Joi.number().integer().min(0).messages({
        integer: "El stock debe ser un número entero",
        min: "El stock no puede ser negativo",
    }),
}).min(1)

export const productIdSchema = Joi.object({
    id: Joi.number().integer().required().min(1).messages({
        required: "El ID del producto es requerido",
        integer: "El ID debe ser un número",
        min: "El ID debe ser mayor a 0",
    }),
})
