import 'dotenv/config.js'
import mongoose from 'mongoose';

const connectionString = process.env.DB_STRING || "";

const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            autoIndex: true,
            dbName: "PersonalPortfolio",
        })
        console.log('Database connected');
    } catch (error) {
        console.error(error);
    }
}

export default connectToDB;