import express from 'express';
const router = express.Router();

import PostSchema from '../models/postSchema.js';

/**
 * @route GET /posts
 * @desc Get all posts
 */
router.get('/', async (req, res) => {
    try {
        const posts = await PostSchema.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route GET /posts/:id
 * @desc Get post by id
 */



/**
 * @route POST /posts
 * @desc Create a new post
 */
router.post('/', async (req, res) => {
    const post = new PostSchema({
        userId:   req.body.userId,
        location: req.body.location,
        date:     req.body.date,
        category: req.body.category,
        title:    req.body.title,
        upvotes:  req.body.upvotes,
        comments: req.body.comments
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});





export default router;