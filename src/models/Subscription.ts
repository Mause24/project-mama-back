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

Subscription.belongsTo(User, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: {
        name: "userId",
    },
})

Subscription.belongsTo(Membership, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: {
        name: "membershipId",
    },
})

export default Subscription
