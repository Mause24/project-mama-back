import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../connection"

class ProductUnit extends Model<
    InferAttributes<ProductUnit>,
    InferCreationAttributes<ProductUnit>
> {
    declare productId: ForeignKey<number>
    declare unitTypeId: ForeignKey<number>
    declare value: CreationOptional<string>
}

ProductUnit.init(
    {
        value: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "products_units",
        timestamps: false,
    },
)

export default ProductUnit
