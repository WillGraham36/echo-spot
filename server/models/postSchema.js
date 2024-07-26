import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    location: {
        type: { 
            type: String, 
            enum: ['Point'], 
            required: true 
        },
        coordinates: { 
            type: [Number],
            required: true 
        }
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
    usersWhoUpvoted: {
        type: [String],
    },
    usersWhoDownvoted: {
        type: [String],
    },
    comments: {
        type: [String] // Array of comment IDs
    }
});

PostSchema.index({ location: "2dsphere" });

export default mongoose.model('PostModel', PostSchema, 'posts');