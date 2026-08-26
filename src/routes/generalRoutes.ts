import { Router } from "express"
import { RESPONSES } from "../utils"
import { authRoutes } from "./authRoutes"
import { benefictRoutes } from "./benefictRoutes"
import { membershipRoutes } from "./membershipRoutes"
import { productRoutes } from "./productRoutes"
import { subscriptionRoutes } from "./subscriptionRoutes"
import { userRoutes } from "./userRoutes"

export const generalRoutes = Router()
// ROUTES
generalRoutes.use("/auth", authRoutes)
generalRoutes.use("/user", userRoutes)
generalRoutes.use("/membership", membershipRoutes)
generalRoutes.use("/subscription", subscriptionRoutes)
generalRoutes.use("/benefict", benefictRoutes)
generalRoutes.use("/products", productRoutes)

//DEFAULT
generalRoutes.use("/", async (_, res) => {
    res.status(RESPONSES.OK.status).send("Succesfully connected to the server!")
})
