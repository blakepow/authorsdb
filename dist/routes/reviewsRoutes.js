"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var reviewsController_1 = require("../controllers/reviewsController");
//* GET
router.get("/", reviewsController_1.getAllReviews);
router.get("/:id", reviewsController_1.getReviewById);
//* POST
router.post("/", reviewsController_1.createReview);
//* PUT
router.put("/:id", reviewsController_1.updateReview);
//* DELETE
router.delete("/:id", reviewsController_1.deleteReview);
module.exports = router;
