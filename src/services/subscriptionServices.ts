import Subscription from "../models/Subscription"
import User from "../models/User"
import Membership from "../models/Membership"
import {
    SubscriptionNotFoundException,
    CannotCreateSubscriptionException,
    SubscriptionUserNotFoundException,
    SubscriptionMembershipNotFoundException,
    ActiveSubscriptionExistsException,
} from "../errors"

export const createSubscription = async (data: {
    userId: number
    membershipId: number
    endDate: Date
    status?: "ACTIVE" | "INACTIVE" | "EXPIRED"
}) => {
    // 1. Validar que el usuario exista
    const userExists = await User.findByPk(data.userId)
    if (!userExists) {
        throw new SubscriptionUserNotFoundException()
    }

    // 2. Validar que la membresía exista
    const membershipExists = await Membership.findByPk(data.membershipId)
    if (!membershipExists) {
        throw new SubscriptionMembershipNotFoundException()
    }

    // 3. Regla de negocio: Validar si el usuario ya tiene una suscripción activa
    const activeSubscription = await Subscription.findOne({
        where: {
            userId: data.userId,
        },
    })
    if (activeSubscription) {
        throw new ActiveSubscriptionExistsException()
    }

    // 4. Intentar crear en la base de datos controlando errores del ORM
    try {
        return await Subscription.create(data)
    } catch (error) {
        throw new CannotCreateSubscriptionException(
            error instanceof Error
                ? error.message
                : "Error interno al registrar la suscripción en la base de datos"
        )
    }
}

export const getAllSubscriptions = async () => {
    // Retornamos las suscripciones incluyendo los datos básicos del usuario y membresía para que sea un GET útil
    return await Subscription.findAll({
        include: [
            {
                model: User,
                attributes: ["id", "name", "email"],
            },
            { model: Membership, attributes: ["id", "name"] },
        ],
    })
}

export const getSubscriptionById = async (id: number) => {
    const subscription = await Subscription.findByPk(id, {
        include: [
            { model: User, attributes: ["id", "name", "email"] },
            { model: Membership, attributes: ["id", "name"] },
        ],
    })

    if (!subscription) {
        throw new SubscriptionNotFoundException()
    }
    return subscription
}
