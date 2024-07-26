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

export default router;