import express from 'express';
const router = express.Router();

import UserModel from '../models/userShema.js';

/**
 * @summary CRUD operations for users
 * @description This file contains the CRUD operations for users
 * @route GET /users
 * @route GET /users/byId/:id
 * 
 * @route PUT /users/byId/:id/posts
 * @route PUT /users/byId/:id/comments
 * @route PUT /users/byId/:id/votes
 * 
 * @route DELETE /users/byId/:id/posts
 * @route DELETE /users/byId/:id/comments
 * @route DELETE /users/byId/:id/votes
 */

// ################################### GET METHODS ################################### //

/**
 * @route GET /users
 */
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find().limit(30);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route GET /users/byId/:id
 */
router.get('/byId/:id', getUser, (req, res) => {
    res.json(res.user);
});


// ################################### PUT METHODS ################################### //

/**
 * @route PUT /users/byId/:id/posts
 * @description Associates a post with a user, block a user, or saves a post
 */
router.put('/byId/:id/posts', getUser, async (req, res) => {

    if(req.body.posts) {
        res.user.posts.push(req.body.posts);
    }
    if(req.body.savedPosts) {
        res.user.savedPosts.push(req.body.savedPosts);
    }
    if(req.body.blockedUsers) {
        res.user.blockedUsers.push(req.body.blockedUsers);
    }


    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @route PUT /users/byId/:id/comments
 * @description Associates a comment with a user
 */
router.put('/byId/:id/comments', getUser, async (req, res) => {

    if (req.body.comments) {
        res.user.comments.push(req.body.comments);
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @route PUT /users/byId/:id/votes
 * @description Votes on a post or comment
 */
router.put('/byId/:id/votes', getUser, async (req, res) => {

    if (req.body.votedPosts) {
        const { Id, vote } = req.body.votedPosts;
        if(vote !== "UPVOTE" && vote !== "DOWNVOTE") {
            return res.status(400).json({ message: 'Invalid vote type' });
        }
        if(res.user.votedPosts.some(vote => vote.Id == Id)) {
            // Id is already in the array, so update the vote status
            res.user.votedPosts = res.user.votedPosts.map(vote => {
                if(vote.Id == Id) {
                    vote.vote = req.body.votedPosts.vote;
                }
                return vote;
            });
        } else {
            // Id is not in the array, so add it
            res.user.votedPosts.push(req.body.votedPosts);
        }
    }
    if (req.body.votedComments) {
        const { Id, vote } = req.body.votedComments;
        if(vote !== "UPVOTE" && vote !== "DOWNVOTE") {
            return res.status(400).json({ message: 'Invalid vote type' });
        }
        if (res.user.votedComments.some(vote => vote.Id == Id)) {
            // Id is already in the array, so update the vote status
            res.user.votedComments = res.user.votedComments.map(vote => {
                if(vote.Id == Id) {
                    vote.vote = req.body.votedComments.vote;
                }
                return vote;
            });
        } else {
            // Id is not in the array, so add it
            res.user.votedComments.push(req.body.votedComments);
        }
    }


    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ################################### DELETE METHODS ################################### //

/**
 * @route DELETE /users/byId/:id/posts
 * @description Deletes a post from a user, unblocks a user, or unsaves a post
 */
router.delete('/byId/:id/posts', getUser, async (req, res) => {

    if (req.body.posts) {
        res.user.posts.pull(req.body.posts);
    }
    if (req.body.savedPosts) {
        res.user.posts.pull(req.body.savedPosts);
    }
    if (req.body.blockedUsers) {
        res.user.posts.pull(req.body.blockedUsers);
    }


    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @route DELETE /users/byId/:id/comments
 * @description Deletes a comment from a user
 */
router.delete('/byId/:id/comments', getUser, async (req, res) => {
    console.log(req.body.comments);
    if (req.body.comments) {
        res.user.comments.pull(req.body.comments);
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @route DELETE /users/byId/:id/votes
 * @description Deletes a vote on a post or comment
 */
router.delete('/byId/:id/votes', getUser, async (req, res) => {
    if(req.body.votedPosts) {
        const { Id } = req.body.votedPosts;
        console.log(Id);
        res.user.votedPosts = res.user.votedPosts.filter(vote => vote.Id != Id);
    }
    if(req.body.votedComments) {
        const { Id } = req.body.votedComments;
        res.user.votedComments = res.user.votedComments.filter(vote => vote.Id != Id);
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// ################################### MIDDLEWARE ################################### //

/**
 * Middleware to get user by their CLERK ID
 */
async function getUser(req, res, next) {

    let user;
    try {
        user = await UserModel.findOne({ clerkId: req.params.id });
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    res.user = user;
    next();
}


export default router;