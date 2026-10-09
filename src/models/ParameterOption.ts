import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../connection"

class ParameterOption extends Model<
    InferAttributes<ParameterOption>,
    InferCreationAttributes<ParameterOption>
> {
    declare id: CreationOptional<number>
    declare value: string
    declare parameterId: ForeignKey<number>
}

ParameterOption.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        value: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        sequelize,
        paranoid: true,
        tableName: "parameter_options",
        timestamps: false,
    },
)

export default ParameterOption
