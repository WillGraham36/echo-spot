import User from '../models/User.js';
import { connectToDatabase } from '../mongodb/mongoose.js';

export const createOrUpdateUser = async (id) => {
    try {
        await connectToDatabase();
        const user = await User.findOneAndUpdate(
            { clerkId: id },
            {},
            { upsert: true, new: true }
        );
        console.log(user);
        await user.save();
        return user;
    } catch (error) {
        console.log(error);
    };
};

export const deleteUser = async (id) => {
    try {
        await connectToDatabase();
        await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
        console.log(error);
    };
};