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
        let newUserWhoCommented = {
            userId: req.body.userId,
            userNumber: post.highestUserNumber
        };
        post.usersWhoCommented.push(newUserWhoCommented);
        const userIdExists = post.usersWhoCommented.find(user => user.userId === req.body.userId);
        // if (!userIdExists) {
        //     newUserWhoCommented.userNumber = 
        // } else {

        // }
        await post.save();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ################################### PATCH METHODS ################################### //

/**
 * @route PATCH /comments/byId/:id
 * @desc Update a comment by its id, only upvotes can be updated
 * @param addOrRemoveUpvote = "ADD" or "REMOVE" to specify if the user is adding or removing a vote
 */
router.patch('/byId/:id', getComment, async (req, res) => {
    const { addOrRemoveUpvote } = req.query;
    if (addOrRemoveUpvote !== "ADD" && addOrRemoveUpvote !== "REMOVE") {
        return res.status(400).json({ message: 'Invalid query parameter' });
    }

    if (req.body.upvotes != null) {
        res.comment.upvotes = req.body.upvotes;
    }
    if (req.body.usersWhoUpvoted != null) {
        if (addOrRemoveUpvote === "ADD") {
            res.comment.usersWhoUpvoted.push(req.body.usersWhoUpvoted);
            res.comment.usersWhoDownvoted = res.comment.usersWhoDownvoted.filter(userId => userId !== req.body.usersWhoUpvoted);
        } else if (addOrRemoveUpvote === "REMOVE") {
            res.comment.usersWhoUpvoted = res.comment.usersWhoUpvoted.filter(userId => userId !== req.body.usersWhoUpvoted);
        }
    }
    if (req.body.usersWhoDownvoted != null) {
        if (addOrRemoveUpvote === "ADD") {
            res.comment.usersWhoDownvoted.push(req.body.usersWhoDownvoted);
            res.comment.usersWhoUpvoted = res.comment.usersWhoUpvoted.filter(userId => userId !== req.body.usersWhoDownvoted);
        } else if (addOrRemoveUpvote === "REMOVE") {
            res.comment.usersWhoDownvoted = res.comment.usersWhoDownvoted.filter(userId => userId !== req.body.usersWhoDownvoted);
        }
    }

    try {
        const updatedComment = await res.comment.save();
        res.json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// ################################### MIDDLEWARE ################################### //

/**
 * Middleware to get comment by id
 */
async function getComment(req, res, next) {

    let comment;
    try {
        comment = await CommentModel.findById(req.params.id);
        if (comment == null) {
            return res.status(404).json({ message: 'Cannot find comment' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    res.comment = comment;
    next();
}

export default router;