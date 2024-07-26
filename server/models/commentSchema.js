import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    parentId: {
        type: String,
        default: 0
    },
    level: {
        type: Number,
        default: 0
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
    usersWhoUpvoted: {
        type: [String],
    },
    usersWhoDownvoted: {
        type: [String],
    },
})

export default mongoose.model('CommentModel', CommentSchema, 'comments');