import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../connection"

class Parameter extends Model<
    InferAttributes<Parameter>,
    InferCreationAttributes<Parameter>
> {
    declare id: CreationOptional<number>
    declare name: string
    declare configuration: CreationOptional<object | null>
    declare typeId: ForeignKey<number>
    declare inventoryId: ForeignKey<number>
}

Parameter.init(
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
        configuration: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        tableName: "parameters",
        paranoid: true,
    },
)

export default Parameter
