"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usersController_1 = require("../controllers/usersController");
var router = (0, express_1.Router)();
router.post("/register", usersController_1.createUser);
router.post("/login", usersController_1.loginUser);
module.exports = router;
