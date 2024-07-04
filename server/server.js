import express from 'express';
import connectToDB from './database.js';
import cors from 'cors';

import postsRouter from './routes/posts.js';

const app = express();
const PORT = process.env.PORT || 8080;
connectToDB();
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

app.use('/posts', postsRouter)