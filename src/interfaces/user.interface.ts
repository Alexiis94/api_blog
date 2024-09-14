import { Types } from "mongoose"

export interface User {
  _id: Types.ObjectId
  photo?: string
  name: string
  email: string
  gender?: string
  apiTokens?: IUserApiToken[]
  password: string
  lastLogin: string
  isActive: boolean
  isBlocked: boolean
  createdAt: Date
  updatedAt: Date
}
export interface IUserApiToken {
  _id: Types.ObjectId
  label: string
  token: string
  createdAt: string
  lastUse: string | null
}
