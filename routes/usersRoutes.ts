import { Router, Request, Response } from "express";
import {createUser, getAllUsers, loginUser} from "../controllers/usersController";
import {protect} from "../middleware/authMiddleware";

const router = Router();

router.get('/', protect, getAllUsers)

router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
