import express from 'express';
import connectToDB from './database.js';
import cors from 'cors';

import postsRouter from './routes/posts.js';
import commentsRouter from './routes/comments.js';
import feedRouter from './routes/feed.js';
import usersRouter from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 8080;
connectToDB();
const corsOptions = {
    origin: 'https://echo-spot.vercel.app',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/feed', feedRouter);
app.use('/users', usersRouter);