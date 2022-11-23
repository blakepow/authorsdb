import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    books: {
        type: [mongoose.Schema.Types.ObjectId],
    },
})

export const AuthorsModel = mongoose.model("Author", authorSchema);
