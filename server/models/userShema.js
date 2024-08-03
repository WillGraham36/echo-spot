import mongoose from "mongoose";

const VotedSchema = new mongoose.Schema({
    Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    vote: {
        type: String,
        enum: ["UPVOTE", "DOWNVOTE"],
        required: true
    }
});

const UserSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },

    posts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts"}],
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
        type: [VotedSchema],
        default: []
    },
    votedPosts: {
        type: [VotedSchema],
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