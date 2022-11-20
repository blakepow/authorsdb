import express from "express";

const router = express.Router();

import {createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor} from "../controllers/authorsController";

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);

router.post("/", createAuthor);

router.put("/:id", updateAuthor);

router.delete("/:id", deleteAuthor)

module.exports = router;
