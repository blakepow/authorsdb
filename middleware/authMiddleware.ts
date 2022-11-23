import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import UserModel from "../models/usersModel";


export const protect = asyncHandler(async (req: any, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

            // Get user from the token
            req.user = await UserModel.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})
