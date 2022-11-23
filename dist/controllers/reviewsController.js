"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewById = exports.getAllReviews = void 0;
var reviewsModel_1 = require("../models/reviewsModel");
var usersModel_1 = require("../models/usersModel");
var booksModel_1 = require("../models/booksModel");
var getAllReviews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reviews, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, reviewsModel_1.ReviewModel.find().populate('userId', 'name').populate('bookId', 'title')];
            case 1:
                reviews = _a.sent();
                res.status(200).json(reviews);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(404).json({ message: error_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllReviews = getAllReviews;
var getReviewById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, review, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, reviewsModel_1.ReviewModel.findById(id).populate('userId', 'name').populate('bookId', 'title')];
            case 2:
                review = _a.sent();
                res.status(200).json(review);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(404).json({ message: error_2 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getReviewById = getReviewById;
var createReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var review, newReview, user, book, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                review = req.body;
                newReview = new reviewsModel_1.ReviewModel(review);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                return [4 /*yield*/, newReview.save()];
            case 2:
                _a.sent();
                return [4 /*yield*/, usersModel_1.UserModel.findById(req.body.userId)];
            case 3:
                user = _a.sent();
                if (!user) return [3 /*break*/, 5];
                user.reviews.push(newReview._id);
                return [4 /*yield*/, user.save()];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [4 /*yield*/, booksModel_1.BookModel.findById(req.body.bookId)];
            case 6:
                book = _a.sent();
                if (!book) return [3 /*break*/, 8];
                book.reviews.push(newReview._id);
                return [4 /*yield*/, book.save()];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                res.status(201).json(newReview);
                return [3 /*break*/, 10];
            case 9:
                error_3 = _a.sent();
                res.status(409).json({ message: error_3 });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.createReview = createReview;
var updateReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, review, updatedReview, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                review = req.body;
                return [4 /*yield*/, reviewsModel_1.ReviewModel.findByIdAndUpdate(id, review, { new: true })];
            case 1:
                updatedReview = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(409).json({ message: error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateReview = updateReview;
var deleteReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, reviewsModel_1.ReviewModel.findByIdAndDelete(id)];
            case 2:
                _a.sent();
                res.status(200).json({ message: 'Review deleted' });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(404).json({ message: error_5 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteReview = deleteReview;
