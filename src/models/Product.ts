import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../database"
import User from "./User"

class Product extends Model<
    InferAttributes<Product>,
    InferCreationAttributes<Product>
> {
    declare id: CreationOptional<number>
    declare name: string
    declare description: CreationOptional<string>
    declare sellPrice: number
    declare buyPrice: number
    declare unit: string
    declare stock: number
    declare userId: ForeignKey<User["id"]>
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        sellPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        buyPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        unit: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        paranoid: true,
        tableName: "products",
    }
)

Product.belongsTo(User, {
    foreignKey: {
        name: "userId",
        allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

export default Product
