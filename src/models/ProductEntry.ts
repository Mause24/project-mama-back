import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../connection"

class ProductEntry extends Model<
    InferAttributes<ProductEntry>,
    InferCreationAttributes<ProductEntry>
> {
    declare id: CreationOptional<number>
    declare productId: ForeignKey<number>
    declare accountingEntryId: ForeignKey<number>
    declare quantity: number
    declare unitPrice: number
}

ProductEntry.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
        },
        unitPrice: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "products_entries",
        timestamps: false,
    },
)

export default ProductEntry
