import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../connection"
import UnitType from "./UnitType"

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
        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true, // <--- El ID del producto ES la llave primaria de esta tabla
            references: {
                model: "Products",
                key: "id",
            },
            onDelete: "CASCADE", // Opcional: si borras el producto, se borra su unidad asociada
            onUpdate: "CASCADE",
        },
        unitTypeId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: UnitType,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
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
