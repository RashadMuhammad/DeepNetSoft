import express, { type Express } from "express"
import cors from "cors"
import dotenv from "dotenv"
import menuRoutes from "./routes/menuRoutes"
import menuItemRoutes from "./routes/menuItemRoutes"
import connectDB from "./config/connectDB"
import path from "path"

dotenv.config()

const app: Express = express()
const PORT: number = Number.parseInt(process.env.PORT || "5000", 10)
const CLIENT_URL = process.env.CLIENT_URL

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

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
