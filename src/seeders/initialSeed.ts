// src/seeders/initialSeed.ts
import { ENTRY_TYPE, PARAMETER_TYPE, PROFILES, UNIT_TYPE } from "../interfaces"
import EntryType from "../models/EntryType"
import ParameterType from "../models/ParameterType"
import Profile from "../models/Profile"
import UnitType from "../models/UnitType"

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
        console.log("PARAMETERS TYPES LOADED SUCCESSFULLY.")

        // 3. Sembrar Tipos de entradas
        for (const [name, id] of Object.entries(ENTRY_TYPE)) {
            if (typeof id === "number") {
                await EntryType.findOrCreate({
                    where: { id, name },
                })
            }
        }
        console.log("ENTRIES TYPES LOADED SUCCESSFULLY.")

        // 4. Sembrar Tipos de UNIDADES
        for (const [value, name] of Object.entries(UNIT_TYPE)) {
            if (typeof name === "string") {
                await UnitType.findOrCreate({
                    where: { value, name },
                })
            }
        }
        console.log("UNITS TYPES LOADED SUCCESSFULLY.")
    } catch (error) {
        console.error("ERROR SEEDING INITIAL DATA:", error)
    }
}
