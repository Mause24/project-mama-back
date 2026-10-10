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
    declare createdAt: CreationOptional<Date>
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
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "accounting_entries",
        timestamps: false,
    },
)

export default AccountingEntry
