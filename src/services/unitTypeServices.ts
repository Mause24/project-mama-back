import {
    UnitTypeCreationException,
    UnitTypeDeletionException,
    UnitTypeNotFoundException,
    UnitTypeUpdateException,
} from "../errors"
import UnitType from "../models/UnitType"

interface CreateUnitTypeInput {
    name: string
    value: string
}

interface UpdateUnitTypeInput {
    name?: string
    value?: string
}

export const getAllUnitTypes = async (): Promise<UnitType[]> => {
    return await UnitType.findAll()
}

export const getUnitTypeById = async (id: number): Promise<UnitType> => {
    const unitType = await UnitType.findByPk(id)
    if (!unitType) {
        throw new UnitTypeNotFoundException()
    }
    return unitType
}

export const createUnitType = async (
    data: CreateUnitTypeInput,
): Promise<UnitType> => {
    try {
        return await UnitType.create(data)
    } catch (err) {
        throw new UnitTypeCreationException(
            err instanceof Error
                ? err.message
                : "Error al registrar el tipo de unidad",
        )
    }
}

export const updateUnitType = async (
    id: number,
    data: UpdateUnitTypeInput,
): Promise<UnitType> => {
    const unitType = await getUnitTypeById(id)

    try {
        await unitType.update(data)
        return unitType
    } catch (err) {
        throw new UnitTypeUpdateException(
            err instanceof Error
                ? err.message
                : "Error al actualizar el tipo de unidad",
        )
    }
}

export const removeUnitType = async (id: number): Promise<void> => {
    const unitType = await getUnitTypeById(id)

    try {
        await unitType.destroy()
    } catch (err) {
        throw new UnitTypeDeletionException(
            err instanceof Error
                ? err.message
                : "Error al eliminar el tipo de unidad",
        )
    }
}
