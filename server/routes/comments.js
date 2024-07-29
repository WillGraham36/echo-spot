import express from 'express';
const router = express.Router();
import CommentModel from '../models/commentSchema.js';
import PostModel from '../models/postSchema.js';

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
 * @route GET /comments/byId/:id
 * @description Gets all the comments for a specific post given a post id
 */
router.get('/byId/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await CommentModel.find({
            parentPostId: postId
        })
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
        parentPostId: req.body.parentPostId,
        childIds: req.body.childIds,
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
    
    try {
        const post = await PostModel.findById(req.body.parentPostId);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
        post.numComments += 1;
        await post.save();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;