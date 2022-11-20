"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var authorsController_1 = require("../controllers/authorsController");
router.get("/", authorsController_1.getAllAuthors);
router.get("/:id", authorsController_1.getAuthorById);
router.post("/", authorsController_1.createAuthor);
router.put("/:id", authorsController_1.updateAuthor);
router.delete("/:id", authorsController_1.deleteAuthor);
module.exports = router;
