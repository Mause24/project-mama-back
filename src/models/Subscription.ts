import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../connection"
import Membership from "./Membership"
import User from "./User"

class Subscription extends Model<
    InferAttributes<Subscription>,
    InferCreationAttributes<Subscription>
> {
    declare id: CreationOptional<number>
    declare userId: ForeignKey<number>
    declare membershipId: ForeignKey<number>
    declare startDate: CreationOptional<Date>
    declare endDate: Date
    declare status: CreationOptional<"ACTIVE" | "INACTIVE" | "EXPIRED">
}

Subscription.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        membershipId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Membership,
                key: "id",
            },
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("ACTIVE", "INACTIVE", "EXPIRED"),
            allowNull: false,
            defaultValue: "ACTIVE",
        },
    },
    {
        sequelize,
        tableName: "subscriptions",
        paranoid: true,
    },
)

export default Subscription
