import {ReviewModel} from '../models/reviewsModel';

import {Request, Response} from 'express';
import {UserModel} from "../models/usersModel";
import {BookModel} from "../models/booksModel";

export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await ReviewModel.find().populate('userId', 'name').populate('bookId', 'title');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(404).json({message: error});
    }
}

export const getReviewById = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const review = await ReviewModel.findById(id).populate('userId', 'name').populate('bookId', 'title');
        res.status(200).json(review);
    } catch (error) {
        res.status(404).json({message: error});
    }
}

export const createReview = async (req: Request, res: Response) => {
    const review = req.body;

    const newReview = new ReviewModel(review);
    try {
        await newReview.save();

        //add review to user reviews array
        const user = await UserModel.findById(req.body.userId);
        if(user){
            user.reviews.push(newReview._id);
            await user.save();
        }

        //add review to book reviews array
        const book = await BookModel.findById(req.body.bookId);
        if(book){
            book.reviews.push(newReview._id);
            await book.save();
        }

        res.status(201).json(newReview);
    } catch (error) {
        res.status(409).json({message: error});
    }
}

export const updateReview = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const review = req.body;
        const updatedReview = await ReviewModel.findByIdAndUpdate(
            id,
            review,
            {new: true}
        )
    }
    catch (error) {
        res.status(409).json({message: error});
    }
}

export const deleteReview = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        await ReviewModel.findByIdAndDelete(id);
        res.status(200).json({message: 'Review deleted'});
    } catch (error) {
        res.status(404).json({message: error});
    }
}
