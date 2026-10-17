import { GeneralException } from "./GeneralExceptions"

export class InventoryNotFoundException extends GeneralException {
    constructor(message = "El inventario no ha sido encontrado") {
        super(message)
        this.name = "InventoryNotFoundException"
    }
}
