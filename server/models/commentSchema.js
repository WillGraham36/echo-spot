import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    parentId: {
        type: String,
        default: undefined
    },
    level: {
        type: Number,
        default: 0
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    userNumber: {
        type: Number,
    },
    commentContent: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
    },
})

export default CommentSchema;