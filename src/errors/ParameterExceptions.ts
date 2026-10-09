export class ParameterNotFoundException extends Error {
    constructor(
        message: string = "El parámetro no existe o no fue encontrado",
    ) {
        super(message)
        this.name = "ParameterNotFoundException"
    }
}

export class ParameterCreationException extends Error {
    constructor(message: string = "Error al registrar el parámetro") {
        super(message)
        this.name = "ParameterCreationException"
    }
}

export class InventoryNotFoundException extends Error {
    constructor(
        message: string = "El inventario no existe o no fue encontrado",
    ) {
        super(message)
        this.name = "InventoryNotFoundException"
    }
}

export class ParameterDeletionException extends Error {
    constructor(message: string = "Error al eliminar el parámetro") {
        super(message)
        this.name = "ParameterDeletionException"
    }
}

export class DuplicateParameterException extends Error {
    constructor(
        message: string = "Ya existe un parámetro con este nombre para el producto especificado",
    ) {
        super(message)
        this.name = "DuplicateParameterException"
    }
}

export class ParameterUpdateException extends Error {
    constructor(message: string = "Error al actualizar el parametro") {
        super(message)
        this.name = "ParameterUpdateException"
    }
}
