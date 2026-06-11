import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../database"

class Benefict extends Model<
    InferAttributes<Benefict>,
    InferCreationAttributes<Benefict>
> {
    declare id: CreationOptional<number>
    declare name: string
    declare description: CreationOptional<string>
}

Benefict.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true, // Lo dejamos null para mayor flexibilidad
        },
    },
    {
        sequelize,
        paranoid: true, // Mantenemos el soft delete como en Membership
        tableName: "beneficts", // Forzamos el nombre plural exacto
    }
)

export default Benefict
