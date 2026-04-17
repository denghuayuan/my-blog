import express from 'express';

import authRouter from './routes/auth.route.js';
import articleRouter from './routes/article.route.js';
import healthRouter from './routes/health.route.js';

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/articles', articleRouter);
app.use('/api', healthRouter);

export default app;