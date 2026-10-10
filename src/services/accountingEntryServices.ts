import {
    AccountingEntryCreationException,
    AccountingEntryDeletionException,
    AccountingEntryNotFoundException,
    AccountingEntryUpdateException,
    EntryTypeNotFoundException,
    UserNotFoundException,
} from "../errors"
import AccountingEntry from "../models/AccountingEntry"
import EntryType from "../models/EntryType"
import User from "../models/User"

interface CreateAccountingEntryInput {
    name: string
    value: number
    description?: string
    entryTypeId: number
    userId: number
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
    const userExists = await User.findByPk(data.userId)
    if (!userExists) {
        throw new UserNotFoundException()
    }

    const typeExists = await EntryType.findByPk(data.entryTypeId)
    if (!typeExists) {
        throw new EntryTypeNotFoundException()
    }

    try {
        const entry = await AccountingEntry.create(data)
        return await entry.reload({
            include: [
                { model: EntryType, attributes: ["id", "name"] },
                { model: User, attributes: ["id", "name", "email"] },
            ],
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
        include: [{ model: EntryType, attributes: ["id", "name"] }],
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
