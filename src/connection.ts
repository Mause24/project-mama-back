import { Sequelize } from "sequelize"
import config from "./config"

export const sequelize = new Sequelize({
    dialect: "mysql",
    database: config.DATABASE,
    host: config.HOST,
    password: config.PASSWORD,
    username: config.USER,
    port: config.DB_PORT,
    logging: false,
    dialectOptions: {
        connectTimeout: 60000, // 60 seconds
    },
})
