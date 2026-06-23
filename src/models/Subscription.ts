import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize"
import { sequelize } from "../database"
import User from "./User"
import Membership from "./Membership"

class Subscription extends Model<
    InferAttributes<Subscription>,
    InferCreationAttributes<Subscription>
> {
    declare id: CreationOptional<number>
    declare userId: number
    declare membershipId: number
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
                model: "Users",
                key: "id",
            },
        },
        membershipId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Memberships",
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
        paranoid: true,
    }
)

// Definición de relaciones
User.belongsToMany(Membership, {
    through: Subscription,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: {
        name: "userId",
    },
})

Membership.belongsToMany(User, {
    through: Subscription,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: {
        name: "membershipId",
    },
})

export default Subscription
