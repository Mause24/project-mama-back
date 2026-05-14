import { GeneralException } from "./GeneralExceptions"

export class UserNotFoundException extends GeneralException {
    constructor(message = "El usuario no ha sido encontrado") {
        super(message)
        this.name = "UserNotFoundException"
    }
}

export class IncorrectPasswordException extends GeneralException {
    constructor(message = "La contraseña es incorrecta") {
        super(message)
        this.name = "IncorrectPasswordException"
    }
}

export class UserEmailAlreadyExistException extends GeneralException {
    constructor(message = "El correo electrónico ya está en uso") {
        super(message)
        this.name = "UserEmailAlreadyExistException"
    }
}

export class CannotEditException extends GeneralException {
    constructor(message = "No se pudo editar el recurso") {
        super(message)
        this.name = "CannotEditException"
    }
}

export class MissingAttributeException extends GeneralException {
    constructor(message = "Falta un atributo requerido") {
        super(message)
        this.name = "MissingAttributeException"
    }
}

export class PhoneAlreadyExistException extends GeneralException {
    constructor(message = "El número de teléfono ya está registrado") {
        super(message)
        this.name = "PhoneAlreadyExistException"
    }
}
