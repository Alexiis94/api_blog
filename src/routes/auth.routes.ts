import express from "express"

import { authController } from "src/controllers/auth.controller"

const router = express.Router()
const prefix = "/api/auth"

router.post(`${prefix}/signup`, authController.signUp)
router.post(`${prefix}/login`, authController.login)

export default router
