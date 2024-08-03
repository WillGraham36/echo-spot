import express from 'express';
const router = express.Router();

import UserModel from '../models/userShema.js';

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
 * @route PUT /users/byId/:id
 */
router.put('/byId/:id', getUser, async (req, res) => {

    if(req.body.posts) {
        res.user.posts.push(req.body.posts);
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