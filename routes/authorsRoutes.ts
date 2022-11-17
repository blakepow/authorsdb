import express from "express";

const router = express.Router();

import {createAuthor, getAllAuthors, getAuthorById} from "../controllers/authorsController";

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);

router.post("/", createAuthor);

router.put("/:id", (req, res) => {
    res.send("update author");
})

router.delete("/:id", (req, res) => {
    res.send("delete author");
})

module.exports = router;
