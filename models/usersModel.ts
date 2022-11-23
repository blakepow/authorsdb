import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        default: "",
    },
    favoriteBooks: {
        type: [String],
    },
    favoriteAuthors: {
        type: [String],
    }
})

export const UserModel = mongoose.model("User", userSchema);
