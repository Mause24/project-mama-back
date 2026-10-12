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
    declare userId: ForeignKey<number>
    declare membershipId: ForeignKey<number>
    declare startDate: CreationOptional<Date>
    declare endDate: Date
    declare status: CreationOptional<"ACTIVE" | "INACTIVE" | "EXPIRED">
    declare hasToRenovate: boolean
}

Subscription.init(
    {
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
        hasToRenovate: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "subscriptions",
        paranoid: true,
    },
)

export default Subscription
