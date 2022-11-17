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
        type: [String],
    },
})

export default mongoose.models.Author || mongoose.model('Author', authorSchema);
