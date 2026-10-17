import { sequelize } from "../connection"
import {
    CannotCreateProductUnitException,
    InventoryNotFoundException,
    ProductCreationException,
    ProductDeletionException,
    ProductNotFoundException,
    ProductStockException,
    ProductUpdateException,
    UnitTypeNotFoundException,
} from "../errors"
import Inventory from "../models/Inventory"
import Parameter from "../models/Parameter"
import ParameterOption from "../models/ParameterOption"
import ParameterType from "../models/ParameterType"
import Product from "../models/Product"
import ProductUnit from "../models/ProductUnit"
import UnitType from "../models/UnitType"
import User from "../models/User"

interface CreateProductInput {
    name: string
    description?: string
    sellPrice: number
    buyPrice: number
    stock: number
    inventoryId: number
    unitTypeId: number
    unitValue?: string
}

interface UpdateProductInput {
    name?: string
    description?: string
    sellPrice?: number
    buyPrice?: number
    stock?: number
    inventoryId?: number
    unitTypeId?: number
    unitValue?: string
}

/**
 * Crea un nuevo producto validando preventivamente al usuario y consistencia de stock.
 */
export const createProduct = async (
    data: CreateProductInput,
): Promise<Product> => {
    const { unitTypeId, unitValue, ...rest } = data
    // Validación preventiva (Short-Circuit)
    const inventoryExists = await User.findByPk(rest.inventoryId)
    if (!inventoryExists) {
        throw new InventoryNotFoundException()
    }

    if (rest.stock < 0) {
        throw new ProductStockException(
            "No se puede registrar un producto con inventario inicial negativo.",
        )
    }

    const unitTypeExist = await UnitType.findByPk(unitTypeId)
    if (!unitTypeExist) {
        throw new UnitTypeNotFoundException()
    }
    // El try/catch solo envuelve la persistencia pura en la base de datos
    try {
        return await sequelize.transaction(async transaction => {
            const createdProduct = await Product.create(rest, { transaction })

            if (!createdProduct) {
                throw new ProductCreationException()
            }

            const productUnitExists = await ProductUnit.create(
                {
                    productId: createdProduct.id,
                    unitTypeId: unitTypeId,
                    value: unitValue,
                },
                { transaction },
            )

            if (!productUnitExists) {
                throw new CannotCreateProductUnitException()
            }

            return await createdProduct.reload({
                transaction,
                include: [
                    { model: Inventory, attributes: ["id", "name"] },
                    {
                        model: Parameter,
                        attributes: ["id", "name", "configuration"],
                        include: [
                            {
                                model: ParameterType,
                                attributes: ["id", "name"],
                            },
                            {
                                model: ParameterOption,
                                attributes: ["id", "value"],
                            },
                        ],
                    },
                    {
                        model: ProductUnit,
                        attributes: ["value"],
                        include: [
                            {
                                model: UnitType,
                                attributes: ["id", "name", "value"],
                            },
                        ],
                    },
                ],
            })
        })
    } catch (err) {
        throw new ProductCreationException(
            err instanceof Error ? err.message : "Error al crear el producto",
        )
    }
}

/**
 * Obtiene la lista completa de productos del sistema.
 */
export const getAllProducts = async (): Promise<Product[]> => {
    return await Product.findAll({
        include: [
            { model: User, attributes: ["id", "name", "email"] },
            {
                model: Parameter,
                attributes: ["id", "name", "value"],
                include: [
                    {
                        model: ParameterType,
                        attributes: ["id", "name"],
                    },
                    {
                        model: ParameterOption,
                        attributes: ["id", "label", "value"],
                    },
                ],
            },
            {
                model: ProductUnit,
                attributes: ["value"],
                include: [
                    { model: UnitType, attributes: ["id", "name", "value"] },
                ],
            },
        ],
    })
}

/**
 * Busca un producto específico por su ID. Lanza excepción si no existe.
 */
export const getProductById = async (id: number): Promise<Product> => {
    const product = await Product.findByPk(id, {
        include: [
            { model: User, attributes: ["id", "name", "email"] },
            {
                model: Parameter,
                attributes: ["id", "name", "value"],
                include: [
                    {
                        model: ParameterType,
                        attributes: ["id", "name"],
                    },
                    {
                        model: ParameterOption,
                        attributes: ["id", "label", "value"],
                    },
                ],
            },
            {
                model: ProductUnit,
                attributes: ["value"],
                include: [
                    { model: UnitType, attributes: ["id", "name", "value"] },
                ],
            },
        ],
    })
    if (!product) {
        throw new ProductNotFoundException()
    }
    return product
}

/**
 * Modifica los atributos de un producto existente de forma parcial.
 */
export const updateProduct = async (
    id: number,
    data: UpdateProductInput,
): Promise<Product> => {
    // Si no existe, getProductById lanza automáticamente ProductNotFoundException hacia el controller
    const product = await getProductById(id)

    if (data.stock !== undefined && data.stock < 0) {
        throw new ProductStockException(
            "El inventario restante no puede ser un número negativo.",
        )
    }

    // El try/catch solo envuelve la mutación directa del registro
    try {
        await product.update(data)
        return product.reload({
            include: [
                { model: User, attributes: ["id", "name", "email"] },
                {
                    model: Parameter,
                    attributes: ["id", "name", "value"],
                    include: [
                        {
                            model: ParameterType,
                            attributes: ["id", "name"],
                        },
                        {
                            model: ParameterOption,
                            attributes: ["id", "label", "value"],
                        },
                    ],
                },
                {
                    model: ProductUnit,
                    attributes: ["value"],
                    include: [
                        {
                            model: UnitType,
                            attributes: ["id", "name", "value"],
                        },
                    ],
                },
            ],
        })
    } catch (err) {
        throw new ProductUpdateException(
            err instanceof Error
                ? err.message
                : "Error al actualizar el producto",
        )
    }
}

/**
 * Realiza el borrado lógico (Soft Delete) de un producto.
 */
export const removeProduct = async (id: number): Promise<void> => {
    // Si no existe, getProductById se encarga de romper el circuito de forma limpia
    const product = await getProductById(id)

    try {
        await product.destroy()
    } catch (err) {
        throw new ProductDeletionException(
            err instanceof Error
                ? err.message
                : "Error al eliminar el producto",
        )
    }
}
