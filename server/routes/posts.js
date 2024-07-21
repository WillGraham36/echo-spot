import express from 'express';
const router = express.Router();

import PostModel from '../models/postSchema.js';

// ################################### GET METHODS ################################### //

/**
 * @route GET /posts
 * @desc Get all posts
 */
router.get('/', async (req, res) => {
    try {
        const posts = await PostModel.find().limit(30);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route GET /posts/byId/:id
 * @desc Get 1 post by its id
 */
router.get('/byId/:id', getPost, (req, res) => {
    res.json(res.post);
});

/**
 * @route GET /posts/feed
 * @param {Number} lat
 * @param {Number} long
 * @param {Number} maxDistance (in meters)
 * @param {Number} limit
 * @param {Number} offset
 */
router.get('/feed', async (req, res) => {
    const { lat, long, maxDistance, limit, offset } = req.query;
    if (isValidCoordinates(lat, long) || !maxDistance || !limit || offset < 0) {
        return res.status(400).json({ message: 'Missing parameters' });
    }

    try {
        const posts = await PostModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [long, lat]
                    },
                    $maxDistance: maxDistance
                }
            }
        })
            .limit(limit)
            .skip(offset);

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

// ################################### DELETE METHODS ################################### //

/**
 * @route DELETE /posts/:id
 * @desc Delete a post by its id
 */
router.delete('/byId/:id', getPost, async (req, res) => {
    try {
        await res.post.deleteOne();
        res.json({ message: 'Deleted subscriber successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ################################### PATCH METHODS ################################### //

/**
 * @route PATCH /posts/byId/:id
 * @desc Update a post by its id, only upvotes and comments can be updated
 * @param addOrRemoveUpvote = "ADD" or "REMOVE" to specify if the user is adding or removing a vote
 */
router.patch('/byId/:id', getPost, async (req, res) => {
    const { addOrRemoveUpvote } = req.query;
    if(addOrRemoveUpvote !== "ADD" && addOrRemoveUpvote !== "REMOVE") {
        return res.status(400).json({ message: 'Invalid query parameter' });
    }

    if(req.body.upvotes != null) {
        res.post.upvotes = req.body.upvotes;
    }
    if(req.body.comments != null) {
        res.post.comments = req.body.comments;
    }
    if(req.body.usersWhoUpvoted != null) {
        if(addOrRemoveUpvote === "ADD") {
            res.post.usersWhoUpvoted.push(req.body.usersWhoUpvoted);
            res.post.usersWhoDownvoted = res.post.usersWhoDownvoted.filter(userId => userId !== req.body.usersWhoUpvoted);
        } else if(addOrRemoveUpvote === "REMOVE") {
            res.post.usersWhoUpvoted = res.post.usersWhoUpvoted.filter(userId => userId !== req.body.usersWhoUpvoted);
        }
    }
    if(req.body.usersWhoDownvoted != null) {
        if(addOrRemoveUpvote === "ADD") {
            res.post.usersWhoDownvoted.push(req.body.usersWhoDownvoted);
            res.post.usersWhoUpvoted = res.post.usersWhoUpvoted.filter(userId => userId !== req.body.usersWhoDownvoted);
        } else if(addOrRemoveUpvote === "REMOVE") {
            res.post.usersWhoDownvoted = res.post.usersWhoDownvoted.filter(userId => userId !== req.body.usersWhoDownvoted);
        }
    }

    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ################################### POST METHODS ################################### //

/**
 * @route POST /posts
 * @desc Create a new post
 */
router.post('/', async (req, res) => {
    const post = new PostModel({
        userId:   req.body.userId,
        location: {
            type: "Point",
            coordinates: [req.body.location.long, req.body.location.lat]
        },
        date:     req.body.date,
        category: req.body.category,
        title:    req.body.title,
        upvotes:  req.body.upvotes,
        usersWhoUpvoted: req.body.usersWhoUpvoted,
        usersWhoDownvoted: req.body.usersWhoDownvoted,
        comments: req.body.comments
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// ################################### MIDDLEWARE ################################### //

/**
 * Middleware to get post by id
 */
async function getPost(req, res, next) {

    let post;
    try {
        post = await PostModel.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    res.post = post;
    next();
}


// ################################### HELPER FUNCTIONS ################################### //

/**
 * Helper functions to check for validaty of parameters
 */
function isValidCoordinates(lat, long) {
    return !lat || !long || lat > 90 || lat < -90 || long > 180 || long < -180;
}



export default router;