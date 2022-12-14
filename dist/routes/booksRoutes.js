"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var booksController_1 = require("../controllers/booksController");
var authMiddleware_1 = require("../middleware/authMiddleware");
router.get("/", authMiddleware_1.protect, booksController_1.getAllBooks);
router.get("/:id", authMiddleware_1.protect, booksController_1.getBookById);
router.post("/", authMiddleware_1.protect, booksController_1.createBook);
router.put("/:id", authMiddleware_1.protect, booksController_1.updateBook);
router.delete("/:id", authMiddleware_1.protect, booksController_1.deleteBook);
module.exports = router;
