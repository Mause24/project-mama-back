export class EntryTypeNotFoundException extends Error {
    constructor(
        message: string = "El tipo de entrada contable no existe o no fue encontrado",
    ) {
        super(message)
        this.name = "EntryTypeNotFoundException"
    }
}

export class EntryTypeCreationException extends Error {
    constructor(
        message: string = "Error al crear el tipo de entrada contable",
    ) {
        super(message)
        this.name = "EntryTypeCreationException"
    }
}

export class EntryTypeUpdateException extends Error {
    constructor(
        message: string = "Error al actualizar el tipo de entrada contable",
    ) {
        super(message)
        this.name = "EntryTypeUpdateException"
    }
}

export class EntryTypeDeletionException extends Error {
    constructor(
        message: string = "Error al eliminar el tipo de entrada contable",
    ) {
        super(message)
        this.name = "EntryTypeDeletionException"
    }
}

export class DuplicateEntryTypeException extends Error {
    constructor(
        message: string = "Ya existe un tipo de entrada contable con este nombre",
    ) {
        super(message)
        this.name = "DuplicateEntryTypeException"
    }
}
