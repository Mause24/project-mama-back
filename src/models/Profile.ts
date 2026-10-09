import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"

import { sequelize } from "../connection"

class Profile extends Model<
    InferAttributes<Profile>,
    InferCreationAttributes<Profile>
> {
    declare id: CreationOptional<number>
    declare name: string
}

Profile.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        tableName: "profiles",
        paranoid: true,
    },
)

export default Profile
