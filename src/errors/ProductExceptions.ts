import { GeneralException } from "./GeneralExceptions"

export class ProductNotFoundException extends GeneralException {
    constructor(
        message: string = "El producto solicitado no existe o fue eliminado."
    ) {
        super(message)
        this.name = "ProductNotFoundException"
    }
}

export class ProductCreationException extends GeneralException {
    constructor(
        message: string = "Error al crear el producto. Verifique los datos e intente nuevamente."
    ) {
        super(message)
        this.name = "ProductCreationException"
    }
}

export class ProductUpdateException extends GeneralException {
    constructor(
        message: string = "Error al actualizar el producto. Verifique los datos e intente nuevamente."
    ) {
        super(message)
        this.name = "ProductUpdateException"
    }
}

export class ProductDeletionException extends GeneralException {
    constructor(
        message: string = "Error al eliminar el producto. Intente nuevamente."
    ) {
        super(message)
        this.name = "ProductDeletionException"
    }
}

export class ProductStockException extends GeneralException {
    constructor(
        message: string = "Stock insuficiente para realizar la operación."
    ) {
        super(message)
        this.name = "ProductStockException"
    }
}
