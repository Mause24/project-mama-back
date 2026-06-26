import { GeneralException } from "./GeneralExceptions"

export class SubscriptionNotFoundException extends GeneralException {
    constructor(message = "La suscripción no ha sido encontrada") {
        super(message)
        this.name = "SubscriptionNotFoundException"
    }
}

export class CannotCreateSubscriptionException extends GeneralException {
    constructor(message = "No se pudo crear la suscripción") {
        super(message)
        this.name = "CannotCreateSubscriptionException"
    }
}

export class SubscriptionUserNotFoundException extends GeneralException {
    constructor(
        message = "El usuario proporcionado para la suscripción no existe"
    ) {
        super(message)
        this.name = "SubscriptionUserNotFoundException"
    }
}

export class SubscriptionMembershipNotFoundException extends GeneralException {
    constructor(
        message = "La membresía proporcionada para la suscripción no existe"
    ) {
        super(message)
        this.name = "SubscriptionMembershipNotFoundException"
    }
}

export class ActiveSubscriptionExistsException extends GeneralException {
    constructor(
        message = "El usuario ya tiene una suscripción ACTIVA vigente"
    ) {
        super(message)
        this.name = "ActiveSubscriptionExistsException"
    }
}
