import { GeneralException } from "./GeneralExceptions"

export class ProductParameterNotFoundException extends GeneralException {
    constructor(
        message: string = "La asociación entre el producto y el parámetro no existe o no fue encontrada",
    ) {
        super(message)
        this.name = "ProductParameterNotFoundException"
    }
}

export class ProductParameterCreationException extends GeneralException {
    constructor(
        message: string = "Error al asociar el parámetro con el producto",
    ) {
        super(message)
        this.name = "ProductParameterCreationException"
    }
}

export class ProductParameterUpdateException extends GeneralException {
    constructor(
        message: string = "Error al actualizar la parametrización del producto",
    ) {
        super(message)
        this.name = "ProductParameterUpdateException"
    }
}

export class ProductParameterDeletionException extends GeneralException {
    constructor(
        message: string = "Error al desasociar el parámetro del producto",
    ) {
        super(message)
        this.name = "ProductParameterDeletionException"
    }
}

export class ParameterOptionNotFoundException extends GeneralException {
    constructor(
        message: string = "La opcion del parametro solicitado no existe o fue eliminada.",
    ) {
        super(message)
        this.name = "ParameterOptionNotFoundException"
    }
}
