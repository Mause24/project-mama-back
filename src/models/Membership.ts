import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../database"

class Membership extends Model<
    InferAttributes<Membership>,
    InferCreationAttributes<Membership>
> {
    declare id: CreationOptional<number>
    declare name: string
    declare price: string
}

Membership.init(
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
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        paranoid: true,
    }
)

export default Membership
