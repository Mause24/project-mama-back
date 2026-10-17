import Joi from "joi"
import { ENTRY_TYPE } from "../interfaces"

export const createAccountingEntrySchema = Joi.object({
    name: Joi.string().max(100).trim().required().messages({
        "string.empty": "El nombre de la entrada contable es obligatorio",
        "string.max": "El nombre no puede exceder los 100 caracteres",
    }),
    description: Joi.string().max(255).allow("").optional(),
    entryTypeId: Joi.number().integer().positive().required().messages({
        "number.base": "El ID del tipo de registro debe ser un número",
        "any.required": "El tipo de registro es obligatorio",
    }),
    value: Joi.when("entryTypeId", {
        is: Joi.valid(ENTRY_TYPE.COMPLEX_IN, ENTRY_TYPE.COMPLEX_OUT),
        then: Joi.forbidden().messages({
            "any.unknown":
                "El campo value no está permitido para este tipo de registro",
            "any.forbidden":
                "El campo value no está permitido para este tipo de registro",
        }),
        otherwise: Joi.number().positive().required().messages({
            "number.base": "El valor debe ser un número válido",
            "number.positive": "El valor debe ser mayor a 0",
            "any.required": "El valor es obligatorio",
        }),
    }),
    userId: Joi.number().integer().positive().required().messages({
        "number.base": "El ID del usuario debe ser un número",
        "any.required": "El usuario es obligatorio",
    }),
    products: Joi.when("entryTypeId", {
        is: Joi.valid(ENTRY_TYPE.COMPLEX_IN, ENTRY_TYPE.COMPLEX_OUT),
        then: Joi.array()
            .items(
                Joi.object({
                    productId: Joi.number()
                        .integer()
                        .positive()
                        .required()
                        .messages({
                            "number.base":
                                "El ID del producto debe ser un número",
                            "any.required": "El ID del producto es obligatorio",
                        }),
                    quantity: Joi.number()
                        .integer()
                        .positive()
                        .required()
                        .messages({
                            "number.positive": "La cantidad debe ser mayor a 0",
                            "any.required": "La cantidad es obligatoria",
                        }),
                }),
            )
            .min(1)
            .required()
            .messages({
                "any.required":
                    "Los productos son obligatorios para el tipo de registro complejo",
                "array.min": "Debe incluir al menos 1 producto",
                "array.base": "Los productos deben ser un arreglo de objetos",
            }),
        otherwise: Joi.forbidden().messages({
            "any.unknown":
                "El campo products no está permitido para este tipo de registro",
            "any.forbidden":
                "El campo products no está permitido para este tipo de registro",
        }),
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
