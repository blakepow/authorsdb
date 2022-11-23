"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorsModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var authorSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    books: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
    },
});
exports.AuthorsModel = mongoose_1.default.model("Author", authorSchema);
