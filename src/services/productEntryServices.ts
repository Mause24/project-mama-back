import {
    AccountingEntryNotFoundException,
    ProductEntryCreationException,
    ProductEntryDeletionException,
    ProductEntryNotFoundException,
    ProductEntryUpdateException,
    ProductNotFoundException,
} from "../errors"
import AccountingEntry from "../models/AccountingEntry"
import Product from "../models/Product"
import ProductEntry from "../models/ProductEntry"

interface CreateProductEntryInput {
    productId: number
    accountingEntryId: number
    quantity: number
    unitPrice: number
}

interface UpdateProductEntryInput {
    quantity?: number
    unitPrice?: number
}

export const createProductEntry = async (
    data: CreateProductEntryInput,
): Promise<ProductEntry> => {
    const productExists = await Product.findByPk(data.productId)
    if (!productExists) {
        throw new ProductNotFoundException()
    }

    const entryExists = await AccountingEntry.findByPk(data.accountingEntryId)
    if (!entryExists) {
        throw new AccountingEntryNotFoundException()
    }

    try {
        const item = await ProductEntry.create(data)
        return await item.reload({
            include: [
                { model: Product, attributes: ["id", "name", "price"] },
                { model: AccountingEntry, attributes: ["id", "name", "value"] },
            ],
        })
    } catch (err) {
        throw new ProductEntryCreationException(
            err instanceof Error
                ? err.message
                : "Error al registrar la entrada del producto",
        )
    }
}

export const getProductEntriesByAccountingEntryId = async (
    accountingEntryId: number,
): Promise<ProductEntry[]> => {
    const entryExists = await AccountingEntry.findByPk(accountingEntryId)
    if (!entryExists) {
        throw new AccountingEntryNotFoundException()
    }

    return await ProductEntry.findAll({
        where: { accountingEntryId },
        include: [{ model: Product, attributes: ["id", "name", "price"] }],
    })
}

export const getProductEntryById = async (
    id: number,
): Promise<ProductEntry> => {
    const productEntry = await ProductEntry.findByPk(id, {
        include: [
            { model: Product, attributes: ["id", "name", "price"] },
            { model: AccountingEntry, attributes: ["id", "name", "value"] },
        ],
    })
    if (!productEntry) {
        throw new ProductEntryNotFoundException()
    }
    return productEntry
}

export const updateProductEntry = async (
    id: number,
    data: UpdateProductEntryInput,
): Promise<ProductEntry> => {
    const productEntry = await getProductEntryById(id)

    try {
        await productEntry.update(data)
        return await productEntry.reload({
            include: [
                { model: Product, attributes: ["id", "name", "price"] },
                { model: AccountingEntry, attributes: ["id", "name", "value"] },
            ],
        })
    } catch (err) {
        throw new ProductEntryUpdateException(
            err instanceof Error
                ? err.message
                : "Error al actualizar la relación de producto y entrada",
        )
    }
}

export const removeProductEntry = async (id: number): Promise<void> => {
    const productEntry = await getProductEntryById(id)

    try {
        await productEntry.destroy()
    } catch (err) {
        throw new ProductEntryDeletionException(
            err instanceof Error
                ? err.message
                : "Error al eliminar el ítem de la entrada",
        )
    }
}
