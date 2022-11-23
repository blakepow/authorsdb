import express from "express";

const router = express.Router();

import {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
} from "../controllers/reviewsController";

import { protect } from "../middleware/authMiddleware";

//* GET
router.get("/", getAllReviews);
router.get("/:id", getReviewById);

//* POST
router.post("/", createReview);

//* PUT
router.put("/:id", updateReview);

//* DELETE
router.delete("/:id", deleteReview);

module.exports = router

