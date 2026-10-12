import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../connection"

class AccountingEntry extends Model<
    InferAttributes<AccountingEntry>,
    InferCreationAttributes<AccountingEntry>
> {
    declare id: CreationOptional<number>
    declare name: string
    declare value: number
    declare description: string | null
    declare entryTypeId: ForeignKey<number>
    declare userId: ForeignKey<number>
}

AccountingEntry.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        value: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        paranoid: true,
        tableName: "accounting_entries",
    },
)

export default AccountingEntry
