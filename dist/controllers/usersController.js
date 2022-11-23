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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = exports.loginUser = void 0;
var usersModel_1 = require("../models/usersModel");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
//& Generate JWT
var generateToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, usersModel_1.UserModel.findOne({ email: email })];
            case 1:
                user = _c.sent();
                _b = user;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    return [2 /*return*/, res.json({
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            token: generateToken(user._id)
                        })];
                }
                else {
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid email or password' })];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, password, displayName, userExists, salt, hashedPassword, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, displayName = _a.displayName;
                return [4 /*yield*/, usersModel_1.UserModel.findOne({
                        email: email
                    })];
            case 1:
                userExists = _b.sent();
                if (userExists) {
                    return [2 /*return*/, res.status(400).json({
                            message: "User already exists"
                        })];
                }
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, usersModel_1.UserModel.create({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: hashedPassword,
                        displayName: displayName
                    })];
            case 4:
                user = _b.sent();
                if (user) {
                    return [2 /*return*/, res.status(201).json({
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            token: generateToken(user._id)
                        })];
                }
                else {
                    return [2 /*return*/, res.status(400).json({
                            message: "Invalid user data"
                        })];
                }
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(400).json({
                        message: error_1
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, usersModel_1.UserModel.find().select('-password')];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.status(200).json(users)];
            case 2:
                e_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error getting Users' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, usersModel_1.UserModel.findById(req.params.id).select('-password')];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 2:
                e_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error getting User' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, usersModel_1.UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: 'User not found' })];
                }
                return [2 /*return*/, res.status(200).json(user)];
            case 2:
                e_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error updating User' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, usersModel_1.UserModel.findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: 'User not found' })];
                }
                return [2 /*return*/, res.status(200).json({ message: "Deleted ".concat(req.params.id) })];
            case 2:
                e_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error deleting User' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
