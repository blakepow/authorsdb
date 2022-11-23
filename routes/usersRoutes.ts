import mongoose from "mongoose";
import { Router, Request, Response } from "express";
import UserModel from "../models/usersModel";
import {createUser, loginUser} from "../controllers/usersController";
import {protect} from "../middleware/authMiddleware";

const router = Router();



router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
