import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../connection"

class EntryType extends Model<
    InferAttributes<EntryType>,
    InferCreationAttributes<EntryType>
> {
    declare id: CreationOptional<number>
    declare name: string
}

EntryType.init(
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
    },
    {
        sequelize,
        tableName: "entries_types",
        timestamps: false,
    },
)

export default EntryType
