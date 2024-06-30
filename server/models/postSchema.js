import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    location: {
        type: String, // TODO: change to location object
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    category: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
    },
    comments: {
        type: [String],
    }
})

export default mongoose.model('Post', PostSchema, 'posts');