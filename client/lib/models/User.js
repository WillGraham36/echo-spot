import mongoose from "mongoose";
import { stringify } from "querystring";

const UserSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },

    posts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
        default: []
    },
    savedPosts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "savedPosts" }],
        default: []
    },
    savedPosts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "savedPosts" }],
        default: []
    },

    blockedUsers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "blockedUsers" }],
        default: []
    },

    comments: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
        default: []
    },
    votedComments: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "votedComments" }],
        default: []
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.models.User || mongoose.model("UserModel", UserSchema, "users");
// "User":     name of model
// UserSchema: schema for User collection
// "users":    name of collection in MongoDB
export default User;