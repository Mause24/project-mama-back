import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../connection"

class Inventory extends Model<
    InferAttributes<Inventory>,
    InferCreationAttributes<Inventory>
> {
    declare id: CreationOptional<number>
    declare name: string
    declare description: string
    declare userId: ForeignKey<number>
}

Inventory.init(
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
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "inventories",
        paranoid: true,
    },
)

export default Inventory
