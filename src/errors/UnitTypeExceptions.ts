export class UnitTypeNotFoundException extends Error {
    constructor(
        message: string = "El tipo de unidad no existe o no fue encontrado",
    ) {
        super(message)
        this.name = "UnitTypeNotFoundException"
    }
}

export class UnitTypeCreationException extends Error {
    constructor(message: string = "Error al crear el tipo de unidad") {
        super(message)
        this.name = "UnitTypeCreationException"
    }
}

export class UnitTypeUpdateException extends Error {
    constructor(message: string = "Error al actualizar el tipo de unidad") {
        super(message)
        this.name = "UnitTypeUpdateException"
    }
}

export class UnitTypeDeletionException extends Error {
    constructor(message: string = "Error al eliminar el tipo de unidad") {
        super(message)
        this.name = "UnitTypeDeletionException"
    }
}
