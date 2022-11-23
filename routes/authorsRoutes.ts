import express from "express";

const router = express.Router();

import {protect} from "../middleware/authMiddleware";

import {createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor} from "../controllers/authorsController";

router.get("/", protect, getAllAuthors);
router.get("/:id", getAuthorById);

router.post("/", protect, createAuthor);

router.put("/:id", protect, updateAuthor);

router.delete("/:id", protect, deleteAuthor)

module.exports = router;
