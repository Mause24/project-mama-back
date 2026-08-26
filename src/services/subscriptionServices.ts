import {
    ActiveSubscriptionExistsException,
    CannotCreateSubscriptionException,
    CannotDeleteSubscriptionException,
    CannotUpdateSubscriptionException,
    SubscriptionMembershipNotFoundException,
    SubscriptionNotFoundException,
    SubscriptionQueryException,
    SubscriptionUserNotFoundException,
} from "../errors"
import Membership from "../models/Membership"
import Subscription from "../models/Subscription"
import User from "../models/User"

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
    try {
        const activeSubscription = await Subscription.findOne({
            where: {
                userId: data.userId,
                status: "ACTIVE",
            },
        })
        if (activeSubscription) {
            throw new ActiveSubscriptionExistsException()
        }
    } catch (error) {
        throw new SubscriptionQueryException(
            error instanceof Error
                ? error.message
                : "Error al consultar la suscripción"
        )
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
            { model: User, as: "user", attributes: ["id", "name", "email"] },
            { model: Membership, as: "membership", attributes: ["id", "name"] },
        ],
    })
}

export const getSubscriptionById = async (id: number) => {
    const subscription = await Subscription.findByPk(id, {
        include: [
            { model: User, as: "user", attributes: ["id", "name", "email"] },
            { model: Membership, as: "membership", attributes: ["id", "name"] },
        ],
    })

    if (!subscription) {
        throw new SubscriptionNotFoundException()
    }
    return subscription
}

export const updateSubscription = async (
    id: number,
    data: {
        membershipId?: number
        endDate?: Date
        status?: "ACTIVE" | "INACTIVE" | "EXPIRED"
    }
) => {
    const subscription = await Subscription.findByPk(id)
    if (!subscription) {
        throw new SubscriptionNotFoundException()
    }

    // Si se intenta cambiar la membresía, validamos que la nueva exista
    if (data.membershipId) {
        const membershipExists = await Membership.findByPk(data.membershipId)
        if (!membershipExists) {
            throw new SubscriptionMembershipNotFoundException()
        }
    }

    try {
        return await subscription.update(data)
    } catch (error) {
        throw new CannotUpdateSubscriptionException(
            error instanceof Error
                ? error.message
                : "Error interno al actualizar los datos en la base de datos"
        )
    }
}

export const deleteSubscription = async (id: number) => {
    const subscription = await Subscription.findByPk(id)
    if (!subscription) {
        throw new SubscriptionNotFoundException()
    }

    try {
        await subscription.destroy() // Soft delete nativo gracias a paranoid: true
        return true
    } catch (error) {
        throw new CannotDeleteSubscriptionException(
            error instanceof Error
                ? error.message
                : "Error interno al intentar remover la suscripción"
        )
    }
}
