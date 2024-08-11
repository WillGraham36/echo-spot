import express from 'express';
const router = express.Router();

import CommentModel from '../models/commentSchema.js';
import PostModel from '../models/postSchema.js';
import UserModel from '../models/userShema.js';

// ################################### GET COMMENTS FOR POST ################################### //
/**
 * @route GET /comments/forPost/:postId
 */
router.get('/forPost/:postId', getPost, async (req, res) => {
    const post = res.post;
    const commentArray = post.comments;
    const comments = await CommentModel.find({ _id: { $in: commentArray } });
    res.json(comments);
});

// ################################### VOTING ON COMMENT  ################################### //
/**
 * @route PATCH /comments/vote/:commentId/:userId
 * @desc Vote on a comment
 */
router.patch('/vote/:commentId/:userId', getComment, getUser, async (req, res) => {
    const { commentId } = req.params;
    const { voteType } = req.body;

    if (voteType !== 'UPVOTE' && voteType !== 'DOWNVOTE') {
        return res.status(400).json({ message: 'Invalid vote type' });
    };


    const existingVote = res.user.votedComments.find(vote => vote.Id == commentId);
    if (existingVote) {
        if (existingVote.vote === voteType) {
            // Remove vote if it's the same type and update upvotes
            res.user.votedComments = res.user.votedComments.filter(vote => vote.Id != commentId);
            res.comment.upvotes = voteType === 'UPVOTE' ? res.comment.upvotes - 1 : res.comment.upvotes + 1;
        } else {
            // Change vote type if it's different
            res.user.votedComments = res.user.votedComments.map(vote => {
                if (vote.Id == commentId) {
                    vote.vote = voteType;
                }
                return vote;
            });
            res.comment.upvotes = voteType === 'UPVOTE' ? res.comment.upvotes + 2 : res.comment.upvotes - 2;
        }
    } else {
        // Add vote if it doesn't exist
        res.user.votedComments.push({
            Id: commentId,
            vote: voteType
        });
        res.comment.upvotes = voteType === 'UPVOTE' ? res.comment.upvotes + 1 : res.comment.upvotes - 1;
    };

    try {
        const updatedUser = await res.user.save();
        const updatedComment = await res.comment.save();
        res.json({
            user: updatedUser,
            comment: updatedComment
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});


// ################################### CREATING NEW COMMENT ################################### //
/**
 * @route POST /comments/createNewComment/:postId/:userId
 * @desc Create a new comment
 */
router.post('/createNewComment/:postId/:userId', getPost, getUser, async (req, res) => {
    const comment = new CommentModel({
        childIds: req.body.childIds,
        userNumber: req.body.userNumber,
        userId: req.params.userId,
        date: req.body.date,
        commentContent: req.body.commentContent,
        upvotes: req.body.upvotes
    });

    try {
        const newComment = await comment.save();
        res.user.comments.push(newComment._id);
        const updatedUser = await res.user.save();
        res.status(201).json({
            comment: newComment,
            user: updatedUser
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ################################### DELETE COMMENT ################################### //
/**
 * @route DELETE /comments/deleteComment/:postId/:userId
 * @desc If the comment has children, does not delete the comment, but sets the content to "Deleted"
 *      If the comment has no children, deletes the comment
 */
router.delete('/deleteComment/:commentId/:userId', getComment, getUser, async (req, res) => {
    try {
        const hasChildren = res.comment.childIds.length > 0;
        if(hasChildren) {
            // Set content to "Deleted"
            res.comment.commentContent = "Deleted";
            res.comment.userId = "Deleted";
            res.comment.upvotes = 0;
            const updatedUser = await res.user.posts.pull(req.params.postId); // Remove comment from user's comments anyway
            res.json({
                user: updatedUser,
                message: 'Deleted comment successfully'
            })
        } else {
            // Delete comment
            const updatedUser = await res.user.comments.pull(req.params.commentId);
            await res.comment.deleteOne();
            res.json({
                user: updatedUser,
                message: 'Deleted comment successfully'
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// ################################### MIDDLEWARE ################################### //
/**
 * Middleware to get comment by id
 */
async function getComment(req, res, next) {

    let comment;
    try {
        comment = await CommentModel.findById(req.params.commentId);
        if (comment == null) {
            return res.status(404).json({ message: 'Cannot find comment' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    res.comment = comment;
    next();
}
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