import dotenv from "dotenv"
dotenv.config()

export const isProd = process.env.NODE_ENV === "production" ? true : false
export const isTest = process.env.NODE_ENV === "development-test" ? true : false

const PORT: number = parseInt(process.env.PORT) || 3001
const DB_BLOG_URL: string = isTest ? process.env.DB_BLOG_TEST_URL : process.env.DB_BLOG_URL
const JWT_SECRET: string = process.env.JWT_SECRET
const SECRET_KEY: string = process.env.SECRET_KEY

export { PORT, DB_BLOG_URL, JWT_SECRET, SECRET_KEY }
