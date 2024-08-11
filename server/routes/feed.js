import express from 'express';
const router = express.Router();

import PostModel from '../models/postSchema.js';
// import UserModel from '../models/userShema.js';

// ################################### GETTING FEED  ################################### //
/**
 * @route GET /feed
 * @param {Number} lat
 * @param {Number} long
 * @param {Number} maxDistance (in meters)
 * @param {Number} limit
 * @param {Number} offset
 */
router.get('/', async (req, res) => {
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

// ################################### HELPER FUNCTIONS ################################### //

/**
 * Helper functions to check for validaty of parameters
 */
function isValidCoordinates(lat, long) {
    return !lat || !long || lat > 90 || lat < -90 || long > 180 || long < -180;
};


export default router;