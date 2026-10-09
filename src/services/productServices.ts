import {
    ProductCreationException,
    ProductDeletionException,
    ProductNotFoundException,
    ProductStockException,
    ProductUpdateException,
    UserNotFoundException,
} from "../errors"
import Parameter from "../models/Parameter"
import ParameterOption from "../models/ParameterOption"
import ParameterType from "../models/ParameterType"
import Product from "../models/Product"
import User from "../models/User"

interface CreateProductInput {
    name: string
    description?: string
    sellPrice: number
    buyPrice: number
    unit: string
    stock: number
    userId: number
}

interface UpdateProductInput {
    name?: string
    description?: string
    sellPrice?: number
    buyPrice?: number
    unit?: string
    stock?: number
}

/**
 * Crea un nuevo producto validando preventivamente al usuario y consistencia de stock.
 */
export const createProduct = async (
    data: CreateProductInput,
): Promise<Product> => {
    // Validación preventiva (Short-Circuit)
    const userExists = await User.findByPk(data.userId)
    if (!userExists) {
        throw new UserNotFoundException()
    }

    if (data.stock < 0) {
        throw new ProductStockException(
            "No se puede registrar un producto con inventario inicial negativo.",
        )
    }

    // El try/catch solo envuelve la persistencia pura en la base de datos
    try {
        const createdProduct = await Product.create(data)
        return await createdProduct.reload({
            include: [
                {
                    model: Parameter,
                    attributes: ["id", "name", "value"],
                    include: [
                        {
                            model: ParameterType,
                            attributes: ["name"],
                        },
                        {
                            model: ParameterOption,
                            attributes: ["id", "label", "value"],
                        },
                    ],
                },
            ],
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
        ],
    })
}

/**
 * Busca un producto específico por su ID. Lanza excepción si no existe.
 */
export const getProductById = async (id: number): Promise<Product> => {
    const product = await Product.findByPk(id, {
        include: [{ model: User, attributes: ["id", "name", "email"] }],
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
        return product
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
