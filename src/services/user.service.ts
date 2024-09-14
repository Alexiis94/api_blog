import { ProjectionType, Types } from "mongoose"
import { User } from "src/interfaces/user.interface"
import { userModel } from "src/models/user.model"

class UserService {
  async getUsers() {
    return await userModel.find()
  }
  async getUserByEmail(email: string, projection?: ProjectionType<User> | null) {
    return await userModel.findOne({ email }, projection)
  }
  async getUserById(userId: Types.ObjectId) {
    return await userModel.findOne({ _id: userId })
  }

  async createUser(userData: any) {
    return await userModel.create(userData)
  }

  async updateUser(userId: string, userData: any) {
    return await userModel.findByIdAndUpdate(userId, userData, { new: true })
  }

  async deleteUser(userId: string) {
    return await userModel.findByIdAndDelete(userId)
  }
}
export const userService = new UserService()
