import {
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../connection"

class ProductParameter extends Model<
    InferAttributes<ProductParameter>,
    InferCreationAttributes<ProductParameter>
> {
    declare productId: ForeignKey<number>
    declare parameterId: ForeignKey<number>
    declare value: string | null
}

ProductParameter.init(
    {
        value: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "products_parameters",
        paranoid: true,
    },
)

export default ProductParameter
