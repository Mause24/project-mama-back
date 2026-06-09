import express, { Application, NextFunction, Request, Response } from "express"
import morgan from "morgan"
import path from "node:path"
import config from "./config"
import { onConnect } from "./database"
import { generalRoutes } from "./routes"

const app: Application = express()

// CONFIGURACIÓN DE CORS
// Es mejor definir el protocolo y el puerto para evitar bloqueos del navegador
/* const corsOptions = {
    origin: ["*"], // Añade los puertos de tu frontend
} */

// SEGURIDAD BÁSICA
app.disable("x-powered-by")

// MIDDLEWARES
// app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

// ARCHIVOS ESTÁTICOS
app.use("/api/static", express.static(path.join(__dirname, "data")))

// RUTAS
app.use("/api", generalRoutes)

// MIDDLEWARE DE MANEJO DE ERRORES GLOBAL (Nuevo)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack)
    res.status(500).json({
        success: false,
        message: "Ocurrió un error interno en el servidor",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    })
})

// CONEXIÓN A BASE DE DATOS E INICIO DEL SERVIDOR
const startServer = async () => {
    try {
        await onConnect()
        app.listen(config.PORT, () => {
            console.log(`🚀 App listening on port ${config.PORT}`)
        })
    } catch (error) {
        console.error("❌ Error starting the server:", error)
        process.exit(1)
    }
}

startServer()
