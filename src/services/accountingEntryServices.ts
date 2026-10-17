import { sequelize } from "../connection"
import {
    AccountingEntryCreationException,
    AccountingEntryDeletionException,
    AccountingEntryNotFoundException,
    AccountingEntryUpdateException,
    EntryTypeNotFoundException,
    ProductNotFoundException,
    UserNotFoundException,
} from "../errors"
import { ENTRY_TYPE } from "../interfaces"
import AccountingEntry from "../models/AccountingEntry"
import EntryType from "../models/EntryType"
import Product from "../models/Product"
import ProductEntry from "../models/ProductEntry"
import User from "../models/User"

interface CreateAccountingEntryInput {
    name: string
    value?: number
    description?: string
    entryTypeId: number
    userId: number
    products?: Products[]
}

interface Products {
    productId: number
    quantity: number
}

interface UpdateAccountingEntryInput {
    name?: string
    value?: number
    description?: string
    entryTypeId?: number
}

export const createAccountingEntry = async (
    data: CreateAccountingEntryInput,
): Promise<AccountingEntry> => {
    const { products, ...rest } = data
    const productsToCreate: {
        productId: number
        quantity: number
        totalValue: number
    }[] = []

    const userExists = await User.findByPk(rest.userId)
    if (!userExists) {
        throw new UserNotFoundException()
    }

    const typeExists = await EntryType.findByPk(rest.entryTypeId)

    if (!typeExists) {
        throw new EntryTypeNotFoundException()
    }

    if (products && products.length > 0) {
        for (const product of products) {
            const productExist = await Product.findByPk(product.productId)
            if (!productExist) {
                throw new ProductNotFoundException(
                    `El producto con el id ${product.productId} no existe o no se encuentra`,
                )
            }
            productsToCreate.push({
                ...product,
                totalValue:
                    rest.entryTypeId === ENTRY_TYPE.IN ||
                    rest.entryTypeId === ENTRY_TYPE.COMPLEX_IN
                        ? productExist.sellPrice * product.quantity
                        : productExist.buyPrice * product.quantity,
            })
        }
    }

    try {
        return await sequelize.transaction(async transaction => {
            const AccountingEntryExist = await AccountingEntry.create(
                {
                    ...rest,
                    value:
                        rest.value ??
                        productsToCreate.reduce(
                            (prv, crr) => prv + crr.totalValue,
                            0,
                        ),
                },
                { transaction },
            )
            if (!AccountingEntryExist) {
                throw new AccountingEntryCreationException()
            }

            if (productsToCreate && productsToCreate.length > 0) {
                await ProductEntry.bulkCreate(
                    productsToCreate.map(product => ({
                        ...product,
                        entryId: AccountingEntryExist.id,
                    })),
                    { transaction },
                )
            }

            return await AccountingEntryExist.reload({
                transaction,
                include: [
                    { model: EntryType, attributes: ["id", "name"] },
                    { model: User, attributes: ["id", "name", "email"] },
                    {
                        model: ProductEntry,
                        attributes: ["quantity", "totalValue"],
                        include: [
                            {
                                model: Product,
                                attributes: [
                                    "name",
                                    "description",
                                    "buyPrice",
                                    "sellPrice",
                                ],
                            },
                        ],
                    },
                ],
            })
        })
    } catch (err) {
        throw new AccountingEntryCreationException(
            err instanceof Error
                ? err.message
                : "Error al crear la entrada contable",
        )
    }
}

export const getAccountingEntriesByUserId = async (
    userId: number,
): Promise<AccountingEntry[]> => {
    const userExists = await User.findByPk(userId)
    if (!userExists) {
        throw new UserNotFoundException()
    }

    return await AccountingEntry.findAll({
        where: { userId },
        include: [
            { model: EntryType, attributes: ["id", "name"] },
            { model: User, attributes: ["id", "name", "email"] },
            {
                model: ProductEntry,
                attributes: ["quantity", "totalValue"],
                include: [
                    {
                        model: Product,
                        attributes: [
                            "name",
                            "description",
                            "buyPrice",
                            "sellPrice",
                        ],
                    },
                ],
            },
        ],
        order: [["createdAt", "DESC"]],
    })
}

export const getAccountingEntryById = async (
    id: number,
): Promise<AccountingEntry> => {
    const entry = await AccountingEntry.findByPk(id, {
        include: [
            { model: EntryType, attributes: ["id", "name"] },
            { model: User, attributes: ["id", "name", "email"] },
            {
                model: ProductEntry,
                attributes: ["quantity", "totalValue"],
                include: [
                    {
                        model: Product,
                        attributes: [
                            "name",
                            "description",
                            "buyPrice",
                            "sellPrice",
                        ],
                    },
                ],
            },
        ],
    })
    if (!entry) {
        throw new AccountingEntryNotFoundException()
    }
    return entry
}

export const updateAccountingEntry = async (
    id: number,
    data: UpdateAccountingEntryInput,
): Promise<AccountingEntry> => {
    const entry = await getAccountingEntryById(id)

    if (data.entryTypeId) {
        const typeExists = await EntryType.findByPk(data.entryTypeId)
        if (!typeExists) {
            throw new EntryTypeNotFoundException()
        }
    }

    try {
        await entry.update(data)
        return await entry.reload({
            include: [
                { model: EntryType, attributes: ["id", "name"] },
                { model: User, attributes: ["id", "name", "email"] },
                {
                    model: ProductEntry,
                    attributes: ["quantity", "totalValue"],
                    include: [
                        {
                            model: Product,
                            attributes: [
                                "name",
                                "description",
                                "buyPrice",
                                "sellPrice",
                            ],
                        },
                    ],
                },
            ],
        })
    } catch (err) {
        throw new AccountingEntryUpdateException(
            err instanceof Error
                ? err.message
                : "Error al actualizar la entrada contable",
        )
    }
}

export const removeAccountingEntry = async (id: number): Promise<void> => {
    const entry = await getAccountingEntryById(id)

    try {
        await entry.destroy()
    } catch (err) {
        throw new AccountingEntryDeletionException(
            err instanceof Error
                ? err.message
                : "Error al eliminar la entrada contable",
        )
    }
}
