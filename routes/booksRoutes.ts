import express from "express";

const router = express.Router();

import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} from "../controllers/booksController";
import {protect} from "../middleware/authMiddleware";

router.get("/", protect, getAllBooks)
router.get("/:id", protect, getBookById)

router.post("/", protect, createBook)

router.put("/:id", protect, updateBook)

router.delete("/:id", protect, deleteBook)

module.exports = router
