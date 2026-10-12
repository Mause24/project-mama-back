import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../connection"

class UnitType extends Model<
    InferAttributes<UnitType>,
    InferCreationAttributes<UnitType>
> {
    declare id: CreationOptional<number>
    declare name: string
    declare value: string
}

UnitType.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        value: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: "units_types",
        timestamps: false,
    },
)

export default UnitType
