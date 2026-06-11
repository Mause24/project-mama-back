import {
    CannotCreateMembershipException,
    CannotUpdateMembershipException,
    CannotDeleteMembershipException,
    MembershipNotFoundException,
} from "../errors"
import Membership from "../models/Membership"

/* -------------------------------------------------------------------------- */
/*  CRUD – exportado como funciones modulares (igual que userServices)        */
/* -------------------------------------------------------------------------- */
/**
 * Crea una nueva membresía.
 */
export const createMembership = async (
    name: string,
    price: number
): Promise<Membership> => {
    // Validaciones de entrada
    validateName(name)
    validatePrice(price)

    // Persistencia – Sequelize acepta número para DECIMAL
    return await Membership.create({ name, price: price.toPrecision(10) })
}

/**
 * Busca una membresía por su id.
 */
export const getMembershipById = async (id: number): Promise<Membership> => {
    const membership = await Membership.findByPk(id)
    if (!membership) {
        throw new MembershipNotFoundException()
    }
    return membership
}

/**
 * Actualiza campos de una membresía existente.
 */
export const updateMembership = async (
    id: number,
    fields: Partial<{ name?: string; price?: number }>
): Promise<Membership> => {
    const membership = await getMembershipById(id)
    const { name, price } = fields

    if (name !== undefined) {
        validateName(name)
        membership.name = name
    }
    if (price !== undefined) {
        validatePrice(price)
        membership.price = price.toPrecision(10)
    }

    try {
        await membership.save()
    } catch (err) {
        throw new CannotUpdateMembershipException(
            err instanceof Error ? err.message : "Error al actualizar la membresía"
        )
    }
    return membership
}

export const getAllMembership = async (): Promise<Membership[]> => {
    return await Membership.findAll()
}

/**
 * Elimina lógicamente una membresía.
 */
export const deleteMembership = async (id: number): Promise<void> => {
    const membership = await getMembershipById(id)
    try {
        await membership.destroy()
    } catch (err) {
        throw new CannotDeleteMembershipException(
            err instanceof Error ? err.message : "Error al eliminar la membresía"
        )
    }
}

/* -------------------------------------------------------------------------- */
/*  Helpers de validación (re‑uso interno)                                   */
/* -------------------------------------------------------------------------- */
function validateName(name: string): void {
    if (!name) {
        throw new CannotCreateMembershipException("El nombre es requerido")
    }
    if (name.length > 100) {
        throw new CannotCreateMembershipException(
            "El nombre debe tener máximo 100 caracteres"
        )
    }
}

/**
 * Valida que el precio sea un número no negativo.
 */
function validatePrice(price: number): void {
    if (typeof price !== "number") {
        throw new CannotCreateMembershipException(
            "El precio debe ser un número válido"
        )
    }
    if (price < 0) {
        throw new CannotCreateMembershipException(
            "El precio no puede ser negativo"
        )
    }
}
