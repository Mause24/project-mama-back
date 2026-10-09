import {
    DuplicateEntryTypeException,
    EntryTypeCreationException,
    EntryTypeDeletionException,
    EntryTypeNotFoundException,
    EntryTypeUpdateException,
} from "../errors"
import EntryType from "../models/EntryType"

interface CreateEntryTypeInput {
    name: string
}

interface UpdateEntryTypeInput {
    name?: string
}

export const createEntryType = async (
    data: CreateEntryTypeInput,
): Promise<EntryType> => {
    const existing = await EntryType.findOne({ where: { name: data.name } })
    if (existing) {
        throw new DuplicateEntryTypeException()
    }

    try {
        return await EntryType.create(data)
    } catch (err) {
        throw new EntryTypeCreationException(
            err instanceof Error
                ? err.message
                : "Error al crear el tipo de entrada",
        )
    }
}

export const getAllEntryTypes = async (): Promise<EntryType[]> => {
    return await EntryType.findAll()
}

export const getEntryTypeById = async (id: number): Promise<EntryType> => {
    const entryType = await EntryType.findByPk(id)
    if (!entryType) {
        throw new EntryTypeNotFoundException()
    }
    return entryType
}

export const updateEntryType = async (
    id: number,
    data: UpdateEntryTypeInput,
): Promise<EntryType> => {
    const entryType = await getEntryTypeById(id)

    if (data.name && data.name !== entryType.name) {
        const existing = await EntryType.findOne({ where: { name: data.name } })
        if (existing) {
            throw new DuplicateEntryTypeException()
        }
    }

    try {
        await entryType.update(data)
        return entryType
    } catch (err) {
        throw new EntryTypeUpdateException(
            err instanceof Error
                ? err.message
                : "Error al actualizar el tipo de entrada",
        )
    }
}

export const removeEntryType = async (id: number): Promise<void> => {
    const entryType = await getEntryTypeById(id)

    try {
        await entryType.destroy()
    } catch (err) {
        throw new EntryTypeDeletionException(
            err instanceof Error
                ? err.message
                : "Error al eliminar el tipo de entrada",
        )
    }
}
