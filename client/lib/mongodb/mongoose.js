import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
    if(isConnected){
        console.log("Database already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGOOSE_STRING, {
            dbName: "yikyak-clone",
            autoIndex: true,
        });

        isConnected = true;
    } catch (error) {
        console.log(error);
    };
};