import UserModel from "../models/usersModel";

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
            name: user.name,
            email: user.email,
            isAdmin: user.admin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

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
            ...user,
            password: hashedPassword
        })

        if(newUser){
            res.status(201).json({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                token: generateToken(newUser._id)
            });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error creating User' });
    }
}
