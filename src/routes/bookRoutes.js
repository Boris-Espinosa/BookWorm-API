import express from "express"
import Book from "../models/Book.js"
import cloudinary from "../lib/cloudinary.js"
import protectRoute from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/", protectRoute, async (req, res) => {
    try {
        const { title, description, coverImage, rating } = req.body
        if (!title || !description || !coverImage || !rating) {
            return res.status(400).json({ message: "All fields are required" })
        }

        //upload image to cloudinary
        const uploadeResponse = await cloudinary.uploader.upload(coverImage)
        const imageUrl = uploadeResponse.secure_url

        //save to the database
        const newBook = new Book({
            title,
            description,
            coverImage: imageUrl,
            rating,
            user: req.user._id
        })
        await newBook.save()

        return res.status(201).json({ message: "Book created successfully", book: newBook })
    } catch (error) {
        console.log("Error creating book:", error)
        return res.status(500).json({ message: "Server error" })
    }

})

//pagination => infinite loading
router.get("/", async (req, res) => {
    try {
        const page = req.query.page || 1
        const limit = req.query.limit || 5
        const skip = (page - 1) * limit
        
        const books = await Book.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "username profileImage")

        const totalBooks = await Book.countDocuments()
        
        res.send({
            books,
            currentPage: page,
            totalBooks: totalBooks,
            totalPages: Math.ceil(totalBooks / limit)
        })
    } catch (error) {
        console.log("Error fetching books:", error)
        return res.status(500).json({ message: "Server error" })
        
    }
})

router.delete("/:id", protectRoute, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }
        //Check if the user is the owner of the book
        if (book.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        //delete image from cloudinary
        if (book.coverImage && book.coverImage.includes("cloudinary")) {
            try {
                const urlParts = book.coverImage.split("/")
                const publicIdWithExtension = urlParts[urlParts.length - 1]
                const publicId = publicIdWithExtension.split(".")[0]
                
                console.log("Eliminando imagen de Cloudinary:", publicId)
                await cloudinary.uploader.destroy(publicId)
                console.log("Imagen eliminada exitosamente de Cloudinary")
            } catch (error) {
                console.log("Error deleting image from Cloudinary:", error)
            }
        }

        //delete book from database
        await book.deleteOne()

        res.status(200).json({ message: "Book deleted successfully" })
    } catch (error) {
        console.log("Error deleting book:", error)
        return res.status(500).json({ message: "Server error" })
    }
})

router.get("/user", protectRoute, async (req, res) => {
    try {
        const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.json( books )
    } catch (error) {
        console.log("Error fetching user's books:", error)
        return res.status(500).json({ message: "Server error" })
    }
})

export default router