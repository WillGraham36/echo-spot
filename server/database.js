import 'dotenv/config.js'
import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI;

const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            autoIndex: true,
            dbName: "yikyak-clone",
        })
        console.log('Database connected');
    } catch (error) {
        console.error(error);
    }
}

export default connectToDB;