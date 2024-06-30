import mongoose from "mongoose";
import { title } from "process";

const PostSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
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
        required: true
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

export default mongoose.model('Post', PostSchema);