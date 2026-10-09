import { sequelize } from "../connection"
import {
    DuplicateParameterException,
    InventoryNotFoundException,
    ParameterCreationException,
    ParameterDeletionException,
    ParameterNotFoundException,
    ParameterUpdateException,
    TypeNotFoundException,
} from "../errors"
import Inventory from "../models/Inventory"
import Parameter from "../models/Parameter"
import ParameterOption from "../models/ParameterOption"
import ParameterType from "../models/ParameterType"

interface CreateParameterInput {
    name: string
    typeId: number
    inventoryId: number
    configuration?: object
    options?: { label: string; value: string }[]
}

interface UpdateParameterInput {
    name?: string
    configuration?: object
    options?: { label: string; value: string }[]
}

/**
 * Crea un nuevo parámetro para un inventario validando existencia de inventario, tipo y nombre único.
 */
export const createParameter = async (
    data: CreateParameterInput,
): Promise<Parameter> => {
    // 1. Validación preventiva: Existencia del Inventario
    const inventoryExists = await Inventory.findByPk(data.inventoryId)
    if (!inventoryExists) {
        throw new InventoryNotFoundException()
    }

    // 2. Validación preventiva: Existencia del Tipo de Parámetro
    const typeExists = await ParameterType.findByPk(data.typeId)
    if (!typeExists) {
        throw new TypeNotFoundException()
    }

    // 3. Validación preventiva: Nombre duplicado dentro del mismo inventario
    const existingParam = await Parameter.findOne({
        where: { inventoryId: data.inventoryId, name: data.name },
    })
    if (existingParam) {
        throw new DuplicateParameterException()
    }

    const { options, ...rest } = data

    try {
        return await sequelize.transaction(async transaction => {
            const parameter = await Parameter.create(rest, { transaction })

            if (options && options.length > 0) {
                await ParameterOption.bulkCreate(
                    options.map(opt => ({
                        ...opt,
                        parameterId: parameter.id,
                    })),
                    { transaction },
                )
            }

            return await parameter.reload({
                include: [
                    { model: ParameterType, attributes: ["name"] },
                    {
                        model: ParameterOption,
                        attributes: ["label", "value"],
                    },
                ],
                transaction,
            })
        })
    } catch (err) {
        throw new ParameterCreationException(
            err instanceof Error ? err.message : "Error al crear el parámetro",
        )
    }
}

/**
 * Obtiene todos los parámetros asociados a un inventario específico.
 */
export const getParametersByInventoryId = async (
    inventoryId: number,
): Promise<Parameter[]> => {
    const inventoryExists = await Inventory.findByPk(inventoryId)
    if (!inventoryExists) {
        throw new InventoryNotFoundException()
    }

    return await Parameter.findAll({
        where: { inventoryId },
        include: [
            { model: ParameterType, attributes: ["name"] },
            {
                model: ParameterOption,
                attributes: ["label", "value"],
            },
        ],
    })
}

/**
 * Obtiene un parámetro por su ID único.
 */
export const getParameterById = async (id: number): Promise<Parameter> => {
    const parameter = await Parameter.findByPk(id)
    if (!parameter) {
        throw new ParameterNotFoundException()
    }
    return await parameter.reload({
        include: [
            { model: ParameterType, attributes: ["name"] },
            {
                model: ParameterOption,
                attributes: ["label", "value"],
            },
        ],
    })
}

/**
 * Modifica los datos de un parámetro existente.
 */
export const updateParameter = async (
    id: number,
    data: UpdateParameterInput,
): Promise<Parameter> => {
    const parameter = await getParameterById(id)

    // Validación de duplicado si se intenta renombrar el parámetro dentro del mismo inventario
    if (data.name && data.name !== parameter.name) {
        const existingParam = await Parameter.findOne({
            where: { inventoryId: parameter.inventoryId, name: data.name },
        })
        if (existingParam) {
            throw new DuplicateParameterException()
        }
    }

    try {
        return await sequelize.transaction(async transaction => {
            const { options, ...parameterData } = data

            await parameter.update(parameterData, { transaction })

            if (options !== undefined) {
                await ParameterOption.destroy({
                    where: { parameterId: parameter.id },
                    transaction,
                })

                if (options.length > 0) {
                    const optionsToCreate = options.map(option => ({
                        ...option,
                        parameterId: parameter.id,
                    }))

                    await ParameterOption.bulkCreate(optionsToCreate, {
                        transaction,
                    })
                }
            }

            return await parameter.reload({
                include: [
                    { model: ParameterType, attributes: ["name"] },
                    {
                        model: ParameterOption,
                        attributes: ["label", "value"],
                    },
                ],
                transaction,
            })
        })
    } catch (err) {
        throw new ParameterUpdateException(
            err instanceof Error
                ? err.message
                : "Error al actualizar el parámetro",
        )
    }
}

/**
 * Elimina un parámetro por su ID.
 */
export const removeParameter = async (id: number): Promise<void> => {
    const parameter = await getParameterById(id)

    try {
        await parameter.destroy()
    } catch (err) {
        throw new ParameterDeletionException(
            err instanceof Error
                ? err.message
                : "Error al eliminar el parámetro",
        )
    }
}
