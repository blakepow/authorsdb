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
        const { firstName, lastName, email, password, displayName } = req.body;

        const userExists = await UserModel.findOne({
            email
        });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            displayName
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).json({
                message: "Invalid user data"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error
        });
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


export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findByIdAndUpdate(
            {_id: req.params},
            req.body,
            {new: true,}
        )

        if (!user) {
            res.status(400).json({message: 'User not found'})
        }

        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ message: 'Error updating User' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.id)

        if (!user) {
            res.status(400).json({message: 'User not found'})
        }

        res.status(200).json({message: `Deleted ${req.params.id}`})

    } catch (e) {
        res.status(500).json({message: 'Error deleting User'});
    }
}


