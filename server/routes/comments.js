import express from 'express';
const router = express.Router();
import CommentModel from '../models/commentSchema.js';

// ################################### GET METHODS ################################### //

/**
 * @route GET /comments/
 * @description Gets all comments
 */
router.get('/', async (req, res) => {
    try {
        const comments = await CommentModel.find().limit(30);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route GET /comments/forPost
 * @description Gets all comments for a specific post
 * @param {String[]} commentIds array of comment ids
 */
router.get('/forPost', async (req, res) => {
    try {
        const commentIds = req.body.commentIds;
        console.log(commentIds);
        const comments = await CommentModel.find({
            '_id': { $in: commentIds } 
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ################################### POST METHODS ################################### //

/**
 * @route POST /comments/
 * @description Adds a new comment
 */
router.post('/', async (req, res) => {
    const comment = new CommentModel({
        parentId: req.body.parentId,
        level: req.body.level,
        userNumber: req.body.userNumber,
        userId: req.body.userId,
        commentContent: req.body.commentContent,
        upvotes: req.body.upvotes,
        usersWhoUpvoted: req.body.usersWhoUpvoted,
        usersWhoDownvoted: req.body.usersWhoDownvoted
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
});


export default router;