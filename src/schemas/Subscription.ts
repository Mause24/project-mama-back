import Joi from "joi"

export const createSubscriptionSchema = Joi.object({
    userId: Joi.number().integer().required().messages({
        "number.base": "El ID de usuario debe ser un número",
        "any.required": "El ID de usuario es requerido",
    }),
    membershipId: Joi.number().integer().required().messages({
        "number.base": "El ID de la membresía debe ser un número",
        "any.required": "El ID de la membresía es requerido",
    }),
    endDate: Joi.date().iso().greater("now").required().messages({
        "date.base": "La fecha de finalización debe ser una fecha válida",
        "date.greater":
            "La fecha de finalización debe ser posterior a la fecha actual",
        "any.required": "La fecha de finalización es requerida",
    }),
    status: Joi.string().valid("ACTIVE", "INACTIVE", "EXPIRED").messages({
        "any.only": "El estado debe ser ACTIVE, INACTIVE o EXPIRED",
    }),
})

export const updateSubscriptionSchema = Joi.object({
    membershipId: Joi.number().integer().messages({
        "number.base": "El ID de la membresía debe ser un número",
    }),
    endDate: Joi.date().iso().greater("now").messages({
        "date.base": "La fecha de finalización debe ser una fecha válida",
        "date.greater":
            "La fecha de finalización debe ser posterior a la fecha actual",
    }),
    status: Joi.string().valid("ACTIVE", "INACTIVE", "EXPIRED").messages({
        "any.only": "El estado debe ser ACTIVE, INACTIVE o EXPIRED",
    }),
})
    .min(1)
    .messages({
        "object.min": "El cuerpo de la petición no puede estar vacío",
    })

export const subscriptionIdSchema = Joi.object({
    id: Joi.number().integer().required(),
})
