"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var reviewSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    bookId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});
exports.ReviewModel = mongoose_1.default.model('Review', reviewSchema);
