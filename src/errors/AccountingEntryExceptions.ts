export class AccountingEntryNotFoundException extends Error {
    constructor(
        message: string = "La entrada contable no existe o no fue encontrada",
    ) {
        super(message)
        this.name = "AccountingEntryNotFoundException"
    }
}

export class AccountingEntryCreationException extends Error {
    constructor(message: string = "Error al crear la entrada contable") {
        super(message)
        this.name = "AccountingEntryCreationException"
    }
}

export class AccountingEntryUpdateException extends Error {
    constructor(message: string = "Error al actualizar la entrada contable") {
        super(message)
        this.name = "AccountingEntryUpdateException"
    }
}

export class AccountingEntryDeletionException extends Error {
    constructor(message: string = "Error al eliminar la entrada contable") {
        super(message)
        this.name = "AccountingEntryDeletionException"
    }
}
