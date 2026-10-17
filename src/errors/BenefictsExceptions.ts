import { GeneralException } from "./GeneralExceptions"

export class BenefictNotFoundException extends GeneralException {
    constructor(message = "El beneficio no ha sido encontrado") {
        super(message)
        this.name = "BenefictNotFoundException"
    }
}

export class CannotCreateBenefictException extends GeneralException {
    constructor(message = "No se pudo crear el beneficio") {
        super(message)
        this.name = "CannotCreateBenefictException"
    }
}

export class CannotUpdateBenefictException extends GeneralException {
    constructor(message = "No se pudo actualizar el beneficio") {
        super(message)
        this.name = "CannotUpdateBenefictException"
    }
}

export class CannotDeleteBenefictException extends GeneralException {
    constructor(message = "No se pudo eliminar el beneficio") {
        super(message)
        this.name = "CannotDeleteBenefictException"
    }
}
