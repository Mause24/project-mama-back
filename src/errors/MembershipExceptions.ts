import { GeneralException } from "./GeneralExceptions"

export class MembershipNotFoundException extends GeneralException {
    constructor(message = "La membresía no ha sido encontrada") {
        super(message)
        this.name = "MembershipNotFoundException"
    }
}

export class CannotCreateMembershipException extends GeneralException {
    constructor(message = "No se pudo crear la membresía") {
        super(message)
        this.name = "CannotCreateMembershipException"
    }
}

export class CannotUpdateMembershipException extends GeneralException {
    constructor(message = "No se pudo actualizar la membresía") {
        super(message)
        this.name = "CannotUpdateMembershipException"
    }
}

export class CannotDeleteMembershipException extends GeneralException {
    constructor(message = "No se pudo eliminar la membresía") {
        super(message)
        this.name = "CannotDeleteMembershipException"
    }
}

