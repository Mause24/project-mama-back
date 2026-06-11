import {
    BenefictNotFoundException,
    CannotCreateBenefictException,
    CannotDeleteBenefictException,
    CannotUpdateBenefictException,
} from "../errors"
import Benefict from "../models/Benefict"

/* -------------------------------------------------------------------------- */
/* CRUD – exportado como funciones modulares                                 */
/* -------------------------------------------------------------------------- */

/**
 * Crea un nuevo beneficio.
 */
export const createBenefict = async (
    name: string,
    description?: string
): Promise<Benefict> => {
    // Validaciones de entrada
    validateName(name)

    // Persistencia
    return await Benefict.create({ name, description })
}

/**
 * Busca un beneficio por su id.
 */
export const getBenefictById = async (id: number): Promise<Benefict> => {
    const benefict = await Benefict.findByPk(id)
    if (!benefict) {
        throw new BenefictNotFoundException()
    }
    return benefict
}

/**
 * Actualiza campos de un beneficio existente.
 */
export const updateBenefict = async (
    id: number,
    fields: Partial<{ name?: string; description?: string }>
): Promise<Benefict> => {
    const benefict = await getBenefictById(id)
    const { name, description } = fields

    if (name !== undefined) {
        validateName(name)
        benefict.name = name
    }

    // Si la descripción viene en el payload (incluso si es un string vacío o null), la actualizamos
    if (description !== undefined) {
        benefict.description = description
    }

    try {
        await benefict.save()
    } catch (err) {
        throw new CannotUpdateBenefictException(
            err instanceof Error
                ? err.message
                : "Error al actualizar el beneficio"
        )
    }
    return benefict
}

/**
 * Obtiene todos los beneficios.
 */
export const getAllBenefict = async (): Promise<Benefict[]> => {
    return await Benefict.findAll()
}

/**
 * Elimina lógicamente un beneficio.
 */
export const deleteBenefict = async (id: number): Promise<void> => {
    const benefict = await getBenefictById(id)
    try {
        await benefict.destroy()
    } catch (err) {
        throw new CannotDeleteBenefictException(
            err instanceof Error
                ? err.message
                : "Error al eliminar el beneficio"
        )
    }
}

/* -------------------------------------------------------------------------- */
/* Helpers de validación (re‑uso interno)                                   */
/* -------------------------------------------------------------------------- */

function validateName(name: string): void {
    if (!name) {
        throw new CannotCreateBenefictException("El nombre es requerido")
    }
    if (name.length > 100) {
        throw new CannotCreateBenefictException(
            "El nombre debe tener máximo 100 caracteres"
        )
    }
}
