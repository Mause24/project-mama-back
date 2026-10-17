import {
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
    declare productId: ForeignKey<number>
    declare entryId: ForeignKey<number>
    declare quantity: number
    declare totalValue: number
}

ProductEntry.init(
    {
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
        },
        totalValue: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "products_entries",
        paranoid: true,
    },
)

export default ProductEntry
