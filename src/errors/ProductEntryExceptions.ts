export class ProductEntryNotFoundException extends Error {
    constructor(
        message: string = "La relación de entrada de producto no existe o no fue encontrada",
    ) {
        super(message)
        this.name = "ProductEntryNotFoundException"
    }
}

export class ProductEntryCreationException extends Error {
    constructor(
        message: string = "Error al asociar el producto con la entrada contable",
    ) {
        super(message)
        this.name = "ProductEntryCreationException"
    }
}

export class ProductEntryUpdateException extends Error {
    constructor(
        message: string = "Error al actualizar la entrada de producto",
    ) {
        super(message)
        this.name = "ProductEntryUpdateException"
    }
}

export class ProductEntryDeletionException extends Error {
    constructor(
        message: string = "Error al desasociar el producto de la entrada",
    ) {
        super(message)
        this.name = "ProductEntryDeletionException"
    }
}
