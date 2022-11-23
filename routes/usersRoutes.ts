import { Router, Request, Response } from "express";
import {createUser, deleteUser, getAllUsers, getUserById, loginUser, updateUser} from "../controllers/usersController";
import {protect} from "../middleware/authMiddleware";

const router = Router();

router.get('/', protect, getAllUsers)
router.get('/:id', protect, getUserById)

router.post("/register", createUser);
router.post("/login", loginUser);

router.put('/:id', protect, updateUser)

router.delete('/:id', protect, deleteUser)

module.exports = router;
