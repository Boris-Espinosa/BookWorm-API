import jwt from "jsonwebtoken"
import User from "../models/User.js"

const protectRoute = async (req, res, next) => {
    try {
        //get token from header
        const token = req.header("Authorization").replace("Bearer ", "")
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //find user by id
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            return res.status(401).json({ message: "Token is not valid" })
        }

        req.user = user
        next()
    } catch (error) {
        console.error("Error in auth middleware:", error)
        return res.status(500).json({ message: "Server error" })
    }
}

export default protectRoute