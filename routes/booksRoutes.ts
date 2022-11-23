import express from "express";

const router = express.Router();

import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} from "../controllers/booksController";

router.get("/", getAllBooks)
router.get("/:id", getBookById)

router.post("/", createBook)

router.put("/:id", updateBook)

router.delete("/:id", deleteBook)

module.exports = router
