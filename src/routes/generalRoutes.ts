import { Router } from "express"
import { RESPONSES } from "../utils"
import { authRoutes } from "./authRoutes"
import { benefictRoutes } from "./benefictRoutes"
import { membershipRoutes } from "./membershipRoutes"
import { userRoutes } from "./userRoutes"
import { subscriptionRoutes } from "./subscriptionRoutes"

export const generalRoutes = Router()
// ROUTES
generalRoutes.use("/auth", authRoutes)
generalRoutes.use("/user", userRoutes)
generalRoutes.use("/membership", membershipRoutes)
generalRoutes.use("/benefict", benefictRoutes)
generalRoutes.use("/subscription", subscriptionRoutes)

//DEFAULT
generalRoutes.use("/", async (_, res) => {
    res.status(RESPONSES.OK.status).send("Succesfully connected to the server!")
})
