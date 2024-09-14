import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

import { User } from "src/interfaces/user.interface"
import { userService } from "src/services/user.service"

import { JWT_SECRET } from "src/config"

export interface RequestTokenized extends Request {
  user: User
}

export const authMiddleware = (req: RequestTokenized, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(" ")[1]

    jwt.verify(token, JWT_SECRET, async (err, data: any) => {
      if (err) return res.status(401).json({ status: 401, success: false, msg: "Token is not valid!" })

      const userData: User = await userService.getUserByEmail(data.user, "-password")
      if (!userData) return res.status(401).json({ status: 401, success: false, msg: "User Unauthorized" })

      req.user = userData
      next()
    })
  } else {
    res.status(401).json({ status: 401, success: false, msg: "You are not authenticated!" })
  }
}
