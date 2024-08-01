import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },

    posts: [{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: []
    }],
    savedPosts: [{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: []
    }],
    votedPosts: [{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: []
    }],

    blockedUsers: [{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: []
    }],

    comments: [{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        default: []
    }],
    votedComments: [{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        default: []
    }],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema, "users");
// "User":     name of model
// UserSchema: schema for User collection
// "users":    name of collection in MongoDB
export default User;