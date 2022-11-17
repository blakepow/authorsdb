import express from "express";

const router = express.Router();

import {createAuthor, getAllAuthors, getAuthorById} from "../controllers/authorsController";

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);

router.post("/", createAuthor);

module.exports = router;
