import Joi from "joi"
import { PARAMETER_TYPE } from "../interfaces"

export const createParameterSchema = Joi.object({
    name: Joi.string().max(100).trim().required().messages({
        "string.empty": "El nombre del parámetro es obligatorio",
        "string.max": "El nombre no puede exceder los 100 caracteres",
    }),
    value: Joi.string().max(255).trim().required().messages({
        "string.empty": "El valor del parámetro es obligatorio",
        "string.max": "El valor no puede exceder los 255 caracteres",
    }),
    typeId: Joi.number().integer().positive().required().messages({
        "number.base": "El id del tipo de parámetro debe ser un número válido",
        "any.required": "El id del tipo de parámetro es obligatorio",
    }),
    productId: Joi.number().integer().positive().required().messages({
        "number.base": "El id del producto debe ser un número válido",
        "any.required": "El id del producto es obligatorio",
    }),
    options: Joi.when("typeId", {
        is: PARAMETER_TYPE.OPTIONS, // Evalúa si typeId === 5
        then: Joi.array()
            .items(
                Joi.object({
                    label: Joi.string().max(100).trim().required().messages({
                        "string.empty": "El label de la opción es obligatorio",
                    }),
                    value: Joi.string().max(255).trim().required().messages({
                        "string.empty": "El valor de la opción es obligatorio",
                    }),
                }),
            )
            .min(2)
            .required()
            .messages({
                "any.required":
                    "Las opciones son obligatorias para el tipo de parámetro OPTIONS",
                "array.min": "Debe incluir al menos dos opciones",
                "array.base": "Las opciones deben ser un arreglo de objetos",
            }),
        otherwise: Joi.forbidden().messages({
            "any.unknown":
                "El campo options no está permitido para este tipo de parámetro",
            "any.forbidden":
                "El campo options no está permitido para este tipo de parámetro",
        }),
    }),
})

export const updateParameterSchema = Joi.object({
    name: Joi.string().max(100).trim().optional(),
    value: Joi.string().max(255).trim().optional(),
    options: Joi.array()
        .items(
            Joi.object({
                label: Joi.string().max(100).trim().optional(),
                value: Joi.string().max(255).trim().optional(),
            }),
        )
        .optional(),
}).min(1)

export const parameterIdSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
})

export const inventoryIdParamSchema = Joi.object({
    inventoryId: Joi.number().integer().positive().required(),
})
