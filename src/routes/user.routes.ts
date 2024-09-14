import express from "express"

import { userController } from "src/controllers/user.controller"
import { authMiddleware } from "src/middlewares/auth.middleware"

const router = express.Router()
const prefix = "/api/user"

router.use(prefix, authMiddleware)

router.get(`${prefix}/`, userController.getUser)

export default router
