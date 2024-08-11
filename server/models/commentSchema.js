import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    // first children only
    childIds: {
        type: [String],
        default: []
    },
    userNumber: {
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
    commentContent: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
    },
})

export default mongoose.model('CommentModel', CommentSchema, 'comments');