export const RESPONSES = {
    OK: {
        status: 200,
        message: "Solicitud exitosa",
    },
    CREATED: {
        status: 201,
        message: "Recurso creado exitosamente",
    },
    UPDATED: {
        status: 200,
        message: "Recurso actualizado exitosamente",
    },
    DELETED: {
        status: 200,
        message: "Recurso eliminado exitosamente",
    },
    BAD_REQUEST: {
        status: 400,
        message: "La solicitud no pudo ser procesada",
    },
    UNAUTHORIZED: {
        status: 401,
        message: "No autorizado",
    },
    FORBIDDEN: {
        status: 403,
        message: "Acceso denegado",
    },
    NOT_FOUND: {
        status: 404,
        message: "Recurso no encontrado",
    },
    SERVER_ERROR: {
        status: 500,
        message: "Error interno del servidor",
    },
    USER_NOT_FOUND: {
        status: 404,
        message: "Usuario no encontrado",
    },
    INCORRECT_PASSWORD: {
        status: 400,
        message: "Contraseña incorrecta",
    },
    EMAIL_ALREADY_EXIST: {
        status: 400,
        message: "El correo electrónico ya está registrado",
    },
    MISSING_ATTRIBUTE: {
        status: 400,
        message: "Falta un atributo requerido",
    },
    CANNOT_UPDATE: {
        status: 400,
        message: "No se pudo actualizar el recurso",
    },
    PHONE_ALREADY_EXIST: {
        status: 400,
        message: "El número de teléfono ya está registrado",
    },
}
