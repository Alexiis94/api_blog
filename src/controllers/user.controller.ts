import { Request, Response } from "express"
import { RequestTokenized } from "src/middlewares/auth.middleware"
import { userService } from "src/services/user.service"

interface User {
  getUser(req: Request, res: Response): Promise<Response>
}

class UserController implements User {
  getUser = async (req: RequestTokenized, res: Response) => {
    try {
      const user = await userService.getUserById(req.user._id)
      if (!user) return res.status(400).json({ status: 400, success: false, msg: "User not found" })

      return res.status(200).json({ status: 200, success: true, msg: "User data", payload: req.user })
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }
}
export const userController = new UserController()
