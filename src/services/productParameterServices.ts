import {
    ParameterNotFoundException,
    ParameterOptionNotFoundException,
    ProductNotFoundException,
    ProductParameterCreationException,
    ProductParameterDeletionException,
    ProductParameterNotFoundException,
    ProductParameterUpdateException,
} from "../errors"
import Parameter from "../models/Parameter"
import ParameterOption from "../models/ParameterOption"
import Product from "../models/Product"
import ProductParameter from "../models/ProductParameter"

interface CreateProductParameterInput {
    productId: number
    parameterId: number
    parameterOptionId?: number
    customValue?: string
}

interface UpdateProductParameterInput {
    parameterOptionId?: number
    customValue?: string
}

export const createProductParameter = async (
    data: CreateProductParameterInput,
): Promise<ProductParameter> => {
    const productExists = await Product.findByPk(data.productId)
    if (!productExists) {
        throw new ProductNotFoundException()
    }

    const parameterExists = await Parameter.findByPk(data.parameterId)
    if (!parameterExists) {
        throw new ParameterNotFoundException()
    }

    if (data.parameterOptionId) {
        const optionExists = await ParameterOption.findByPk(
            data.parameterOptionId,
        )
        if (!optionExists) {
            throw new ParameterOptionNotFoundException()
        }
    }

    try {
        const item = await ProductParameter.create(data)
        return await item.reload({
            include: [
                { model: Product, attributes: ["id", "name"] },
                { model: Parameter, attributes: ["id", "name"] },
                { model: ParameterOption, attributes: ["id", "name", "value"] },
            ],
        })
    } catch (err) {
        throw new ProductParameterCreationException(
            err instanceof Error
                ? err.message
                : "Error al asociar el parámetro con el producto",
        )
    }
}

export const getProductParametersByProductId = async (
    productId: number,
): Promise<ProductParameter[]> => {
    const productExists = await Product.findByPk(productId)
    if (!productExists) {
        throw new ProductNotFoundException()
    }

    return await ProductParameter.findAll({
        where: { productId },
        include: [
            { model: Parameter, attributes: ["id", "name"] },
            { model: ParameterOption, attributes: ["id", "name", "value"] },
        ],
    })
}

export const getProductParameterById = async (
    id: number,
): Promise<ProductParameter> => {
    const item = await ProductParameter.findByPk(id, {
        include: [
            { model: Product, attributes: ["id", "name"] },
            { model: Parameter, attributes: ["id", "name"] },
            { model: ParameterOption, attributes: ["id", "name", "value"] },
        ],
    })
    if (!item) {
        throw new ProductParameterNotFoundException()
    }
    return item
}

export const updateProductParameter = async (
    id: number,
    data: UpdateProductParameterInput,
): Promise<ProductParameter> => {
    const item = await getProductParameterById(id)

    if (data.parameterOptionId) {
        const optionExists = await ParameterOption.findByPk(
            data.parameterOptionId,
        )
        if (!optionExists) {
            throw new ParameterOptionNotFoundException()
        }
    }

    try {
        await item.update(data)
        return await item.reload({
            include: [
                { model: Product, attributes: ["id", "name"] },
                { model: Parameter, attributes: ["id", "name"] },
                { model: ParameterOption, attributes: ["id", "name", "value"] },
            ],
        })
    } catch (err) {
        throw new ProductParameterUpdateException(
            err instanceof Error
                ? err.message
                : "Error al actualizar el parámetro del producto",
        )
    }
}

export const removeProductParameter = async (id: number): Promise<void> => {
    const item = await getProductParameterById(id)

    try {
        await item.destroy()
    } catch (err) {
        throw new ProductParameterDeletionException(
            err instanceof Error
                ? err.message
                : "Error al desasociar el parámetro del producto",
        )
    }
}
