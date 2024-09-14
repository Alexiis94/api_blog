import { Request, Response } from "express"
import { userService } from "src/services/user.service"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { JWT_SECRET } from "src/config"

interface Authentication {
  signUp(req: Request, res: Response): Promise<Response>
  login(req: Request, res: Response): Promise<Response>
}

class AuthController implements Authentication {
  signUp = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body

      // Validation
      if (!name || typeof name !== "string" || !email || typeof email !== "string" || !password || typeof password !== "string") {
        return res.status(400).json({ msg: "Internal server error" })
      }

      const alreadyExist = await userService.getUserByEmail(email)
      if (alreadyExist) return res.status(400).json({ status: 500, success: false, msg: "Internal server error" })

      const user = {
        name,
        email: email.toLowerCase().trim(),
        password: bcrypt.hashSync(password, 10),
      }

      const newUser = await userService.createUser(user)
      if (!newUser) return res.status(400).json({ msg: "User wasn't created" })

      return res.status(200).json({
        status: 200,
        success: true,
        msg: "User created successfully",
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      if (!email || typeof email !== "string" || !password || typeof password !== "string") {
        return res.status(400).json({ status: 500, success: false, msg: "Invalid Credential" })
      }

      const user = await userService.getUserByEmail(email)

      if (!user) return res.status(400).json({ status: 500, success: false, msg: "Invalid Credential" })

      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) return res.status(400).json({ status: 500, success: false, msg: "Invalid Credential" })

      const token = jwt.sign({ user: user.email, exp: Math.floor(Date.now() / 1000) + 3600 * 24 }, JWT_SECRET)
      res.setHeader("Authorization", "Bearer" + token)

      return res.status(200).json({
        status: 200,
        success: true,
        msg: "User logged successfully",
        payload: { token },
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }
}
export const authController = new AuthController()
