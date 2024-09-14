import express from "express"
import cors from "cors"

import { AddressInfo } from "net"
import cookieParser from "cookie-parser"
import logger from "morgan"

import { PORT } from "./config"
import { Connection } from "./database/connections"
import { authRoutes, userRoutes } from "./routes"

const api = express()

api.use(logger("dev"))
api.use(cors())

api.use(cookieParser())
api.use(express.urlencoded({ extended: false, limit: "15mb" }))
api.use(express.json({ limit: "15mb" }))

// Routes
api.use(authRoutes)
api.use(userRoutes)

// Server
const server = api.listen(PORT, "127.0.0.1", () => {
  const { port, address } = server.address() as AddressInfo

  console.log("\n| API BLOG | Listening on:", "http://" + address + ":" + port + " |")
  Connection()
})
