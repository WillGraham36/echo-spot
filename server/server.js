import express from 'express';
import connectToDB from './database.js';

// import subscribersRouter from './routes/subscribers.js';
import postsRouter from './routes/posts.js';

const app = express();
const PORT = process.env.PORT || 8080;
connectToDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

app.use('/posts', postsRouter)