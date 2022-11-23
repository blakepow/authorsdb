import {AuthorsModel} from "../models/authorsModel";
import { Request, Response } from "express";

export const getAllAuthors = async (req: Request, res: Response) => {
    try {
        const authors = await AuthorsModel.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(404).json({ message: 'error getting authors' });
    }
}

export const getAuthorById = async (req: Request, res: Response) => {
    try {
        const author = await AuthorsModel.findById(req.params.id);
        res.status(200).json(author);
    } catch (error) {
        res.status(404).json({ message: 'error getting author' });
    }
}

export const createAuthor = async (req: Request, res: Response) => {
    const author = req.body;

    const newAuthor = new AuthorsModel(author);

    try {
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(409).json({ message: 'error creating author' });
    }
}

export const updateAuthor = async (req: Request, res: Response) => {
    try {
        const contact = await AuthorsModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if (!contact) {
            res.status(404).json({ message: 'error updating author' });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(409).json({ message: 'error updating author' });
    }
}

export const deleteAuthor = async (req: Request, res: Response) => {
    try {
        const author = await AuthorsModel.findByIdAndDelete(req.params.id);

        if (!author) {
            res.status(404).json({ message: 'error deleting author' });
        }

        res.status(200).json({ message: 'author deleted' });
    } catch (error) {
        res.status(409).json({ message: 'error deleting author' });
    }
}

