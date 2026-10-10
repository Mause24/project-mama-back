import {
    CreationOptional,
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
    declare id: CreationOptional<number>
    declare productId: ForeignKey<number>
    declare parameterId: ForeignKey<number>
    declare parameterOptionId: ForeignKey<number> | null
    declare customValue: string | null
}

ProductParameter.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        customValue: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "products_parameters",
        timestamps: false,
    },
)

export default ProductParameter
