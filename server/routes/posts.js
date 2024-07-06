import express from 'express';
const router = express.Router();

import PostModel from '../models/postSchema.js';


/**
 * @route GET /posts
 * @desc Get all posts
 */
router.get('/', async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route GET /posts/:id
 * @desc Get 1 post by its id
 */
router.get('/:id', getPost, (req, res) => {
    res.json(res.post);
});



/**
 * @route POST /posts
 * @desc Create a new post
 */
router.post('/', async (req, res) => {
    const post = new PostModel({
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



export default router;