// src/seeders/initialSeed.ts
import { PARAMETER_TYPE, PROFILES } from "../interfaces"
import ParameterType from "../models/ParameterType"
import Profile from "../models/Profile"

export const seedInitialData = async () => {
    try {
        // 1. Sembrar Perfiles
        for (const [name, id] of Object.entries(PROFILES)) {
            if (typeof id === "number") {
                await Profile.findOrCreate({
                    where: { id, name },
                })
            }
        }
        console.log("PROFILES LOADED SUCCESSFULLY.")

        // 2. Sembrar Tipos de Parámetros
        for (const [name, id] of Object.entries(PARAMETER_TYPE)) {
            if (typeof id === "number") {
                await ParameterType.findOrCreate({
                    where: { id, name },
                })
            }
        }
        console.log("PARAMETER TYPES LOADED SUCCESSFULLY.")
    } catch (error) {
        console.error("ERROR SEEDING INITIAL DATA:", error)
    }
}
