import express from "express"
import cors from "cors"
import "dotenv/config"
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./lib/db.js"
import job from "./lib/cron.js"

const app = express()
const PORT = process.env.PORT

job.start() // Start the cron job
app.use(express.json())
app.use(cors())
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
    connectDB()
})
