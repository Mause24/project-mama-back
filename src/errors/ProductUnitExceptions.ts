import { GeneralException } from "./GeneralExceptions"

export class CannotCreateProductUnitException extends GeneralException {
    constructor(message = "No se pudo crear la relacion entre Product y Unit") {
        super(message)
        this.name = "CannotCreateProductUnitException"
    }
}
