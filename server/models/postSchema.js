import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    location: {
        type: [Number],
        index: '2d',   //can also be 2dsphere, change later if needed
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    category: {
        type: String,
        required: true
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

export default mongoose.model('PostModel', PostSchema, 'posts');