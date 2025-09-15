import express from "express"
import cors from "cors"
import "dotenv/config"
import authRoutes from "./routes/authRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import { connectDB } from "./lib/db.js"
import job from "./lib/cron.js"

const app = express()
const PORT = process.env.PORT

job.start() // Start the cron job
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())
app.use("/api/auth", authRoutes)
app.use('/api/books', bookRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
    connectDB()
})
