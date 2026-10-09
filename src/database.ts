// src/database.ts
import { sequelize } from "./connection"
import { initModels } from "./models"
import { seedInitialData } from "./seeders/initialSeed"

export const onConnect = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connection has been established successfully.")

        // 1. Inicializa y registra todas las asociaciones
        initModels()

        // 2. Sincronización automática de Sequelize desactivando llaves foráneas durante el DDL
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;")
        await sequelize.sync({ force: true }) // Sequelize crea TODAS las tablas registradas automáticamente
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;")

        console.log("All models were synchronized successfully.")

        // 3. Poblar datos iniciales
        await seedInitialData()
    } catch (error) {
        console.error("ERROR SYNCHRONIZING THE DATABASE:", error)
    }
}
