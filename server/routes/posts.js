import express from 'express';
const router = express.Router();

import PostModel from '../models/postSchema.js';
import UserModel from '../models/userShema.js';


// ################################### GET POST BY ID ################################### //
/**
 * @route GET /posts/getOnePost/:postId
 * @desc Get post by its id
 */
router.get('/getOnePost/:postId', getPost, (req, res) => {
    res.json(res.post);
});

// ################################### VOTING ON POSTS  ################################### //
/**
 * @route PATCH /posts/vote/:postId/:userId
 * @desc Vote on a post
 */
router.patch('/vote/:postId/:userId', getPost, getUser, async (req, res) => {
    const { postId } = req.params;
    const { voteType } = req.body;

    if (voteType !== 'UPVOTE' && voteType !== 'DOWNVOTE') {
        return res.status(400).json({ message: 'Invalid vote type' });
    };


    const existingVote = res.user.votedPosts.find(vote => vote.Id == postId);
    if (existingVote) {
        if (existingVote.vote === voteType) {
            // Remove vote if it's the same type and update upvotes
            res.user.votedPosts = res.user.votedPosts.filter(vote => vote.Id != postId);
            res.post.upvotes = voteType === 'UPVOTE' ? res.post.upvotes - 1 : res.post.upvotes + 1;
        } else {
            // Change vote type if it's different
            res.user.votedPosts = res.user.votedPosts.map(vote => {
                if (vote.Id == postId) {
                    vote.vote = voteType;
                }
                return vote;
            });
            res.post.upvotes = voteType === 'UPVOTE' ? res.post.upvotes + 2 : res.post.upvotes - 2;
        }
    } else {
        // Add vote if it doesn't exist
        res.user.votedPosts.push({
            Id: postId,
            vote: voteType
        });
        res.post.upvotes = voteType === 'UPVOTE' ? res.post.upvotes + 1 : res.post.upvotes - 1;
    };

    try {
        const updatedUser = await res.user.save();
        const updatedPost = await res.post.save();
        res.json({
            user: updatedUser,
            post: updatedPost
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

// ################################### CREATING NEW POST ################################### //
/**
 * @route POST /posts/createNewPost/:userId
 * @desc Create a new post
 */
router.post('/createNewPost/:userId', getUser, async (req, res) => {
    const post = new PostModel({
        userId: req.params.userId,
        location: {
            type: "Point",
            coordinates: [req.body.location.long, req.body.location.lat]
        },
        date: req.body.date,
        category: req.body.category,
        title: req.body.title,
        upvotes: req.body.upvotes,
        comments: req.body.comments
    });

    try {
        const newPost = await post.save();
        res.user.posts.push(newPost._id);
        const updatedUser = await res.user.save();
        res.status(201).json({
            post: newPost,
            user: updatedUser
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// ################################### DELETE POST ################################### //
/**
 * @route DELETE /posts/:postId/:userId
 * @desc Delete a post by its id
 */
router.delete('/deletePost/:postId/:userId', getPost, getUser, async (req, res) => {
    try {
        res.post.comments = [];
        const updatedUser = await res.user.posts.pull(req.params.postId);
        await res.post.deleteOne();
        res.json({
            user: updatedUser,
            message: 'Post has been deleted'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ################################### MIDDLEWARE ################################### //


/**
 * Middleware to get post by id
 */
async function getPost(req, res, next) {

    let post;
    try {
        post = await PostModel.findById(req.params.postId);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    res.post = post;
    next();
};
/**
 * Middleware to get user by their CLERK ID
 */
async function getUser(req, res, next) {

    let user;
    try {
        user = await UserModel.findOne({ clerkId: req.params.userId });
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    res.user = user;
    next();
};


export default router;