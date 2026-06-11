import Joi from "joi";

export const createMembershipSchema = Joi.object({
  name: Joi.string()
    .max(100)
    .required()
    .messages({
      "any.required": "El nombre es requerido",
      "string.max": "El nombre no puede exceder 100 caracteres",
    }),
  price: Joi.number()
    .precision(2)
    .required()
    .messages({
      "any.required": "El precio es requerido",
      "number.base": "El precio debe ser un número",
    }),
});

export const updateMembershipSchema = Joi.object({
  name: Joi.string()
    .max(100)
    .messages({
      "string.max": "El nombre no puede exceder 100 caracteres",
    }),
  price: Joi.number()
    .precision(2)
    .messages({
      "number.base": "El precio debe ser un número",
    }),
});

export const membershipIdSchema = Joi.object({
  id: Joi.number().integer().required(),
});