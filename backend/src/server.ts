import express, { type Express } from "express"
import cors from "cors"
import dotenv from "dotenv"
import menuRoutes from "./routes/menuRoutes"
import menuItemRoutes from "./routes/menuItemRoutes"
import connectDB from "./config/connectDB"

dotenv.config()

const app: Express = express()
const PORT: number = Number.parseInt(process.env.PORT || "5000", 10)
const CLIENT_URL = process.env.CLIENT_URL

// Middleware
app.use(express.json())
app.use(cors({
    origin: CLIENT_URL, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true 
}))

connectDB()

// Routes
app.use("/api/menus", menuRoutes)
app.use("/api/menu-items", menuItemRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
