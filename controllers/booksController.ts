import {BookModel} from '../models/booksModel';
import {Request, Response} from 'express';
import {AuthorsModel} from "../models/authorsModel";

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await BookModel.find();
        res.status(200).json(books);
    } catch (e) {
        res.status(500).json({ message: 'Error getting Books' });
    }
}

export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await BookModel.findById(req.params.id);
        res.status(200).json(book);
    } catch (e) {
        res.status(500).json({ message: 'Error getting Book' });
    }
}

export const createBook = async (req: Request, res: Response) => {
    try {
        const book = await BookModel.create(req.body);

        //add book to author books array
        const author = await AuthorsModel.findById(req.body.authorId);
        if(author){
            author.books.push(book._id);
            await author.save();
        }

        res.status(200).json(book);
    } catch (e) {
        res.status(500).json({ message: 'Error creating Book' });
    }
}

export const updateBook = async (req: Request, res: Response) => {
    try {
        const book = await BookModel.findByIdAndUpdate(
            {_id: req.params},
            req.body,
            {new: true,}
        )

        if (!book) {
            res.status(400).json({message: 'Book not found'})
        }

        res.status(200).json(book);
    } catch (e) {
        res.status(500).json({ message: 'Error updating Book' });
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const book = await BookModel.findById(req.params.id)

        if (!book) {
            res.status(400).json({message: 'Book not found'})
        }

        //remove from author books array
        if(book){
            const author = await AuthorsModel.findById(book.authorId)
            if(author){
                author.books = author.books.filter((bookId) => bookId !== book._id)
                await author.save()
            }
            await book.remove()
        }

        res.status(200).json({message: `Deleted ${req.params.id}`})

    } catch (e) {
        res.status(500).json({message: 'Error deleting Book'});
    }
}
