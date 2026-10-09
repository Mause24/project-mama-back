import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../connection"

class ParameterType extends Model<
    InferAttributes<ParameterType>,
    InferCreationAttributes<ParameterType>
> {
    declare id: CreationOptional<number>
    declare name: string
}

ParameterType.init(
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
    },
    {
        sequelize,
        paranoid: true,
        tableName: "parameter_types",
        timestamps: false,
    },
)

export default ParameterType
