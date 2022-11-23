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
router.get("/", protect, getAllReviews);
router.get("/:id", protect, getReviewById);

//* POST
router.post("/", protect, createReview);

//* PUT
router.put("/:id", protect, updateReview);

//* DELETE
router.delete("/:id", protect, deleteReview);

module.exports = router

