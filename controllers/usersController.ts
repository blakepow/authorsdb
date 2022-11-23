import {UserModel} from "../models/usersModel";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { Request, Response } from "express";

//& Generate JWT
const generateToken = (id: {}) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '1d'
    })
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, displayName, password } = req.body;

        const userExists = await UserModel.findOne({
            email
        });

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        const user = req.body;

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)

        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            displayName,
            password: hashedPassword,
        })

        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                token: generateToken(newUser._id)
            })
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: e });
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find().select('-password');
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ message: 'Error getting Users' });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.id).select('-password');
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ message: 'Error getting User' });
    }
}
