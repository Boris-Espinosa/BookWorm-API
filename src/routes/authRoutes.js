import express from "express"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
const router = express.Router()

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" })
}

router.post("/register", async(req, res) => {
    try {
        const { username, email, password } = req.body

        if(!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        //Check if email is valid
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email"})
        }

        if(password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" })
        }

        if(username.length < 3) {
            return res.status(400).json({ message: "Username must be at least 3 characters" })
        }

        //Check if email or username already exists
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: "Email is already in use" })
        }

        const existingUsername = await User.findOne({ username })
        if (existingUsername) {
            return res.status(400).json({ message: "Username is already taken" })
        }

        //Generate profile image URL using DiceBear Avatars
        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`

        const newUser = await User.create({ username, email, password, profileImage })

        await newUser.save()

        const token = generateToken(newUser._id)

        res.status(201).json({
            token,
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profileImage: newUser.profileImage
            }
        })

    } catch (error) {
        console.error("Error in registration route:", error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        //check if user exists
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        //check password
        const isMatch = await user.matchPassword(password)
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = generateToken(user._id)

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                createdAt: user.createdAt,
            }
        })

    } catch (error) {
        console.error("Error in login route:", error)
        res.status(500).json({ message: "Internal server error" })
    }
})

export default router