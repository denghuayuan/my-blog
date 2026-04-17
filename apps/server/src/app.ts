import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import blogRouter from './routes/blog.route.js';
import { env } from './config/env.js';
import assetRouter from './routes/asset.route.js';
import authRouter from './routes/auth.route.js';
import articleRouter from './routes/article.route.js';
import healthRouter from './routes/health.route.js';

const app = express();
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const uploadDirectory = path.resolve(currentDir, '../../../', env.uploadDir);

app.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', env.clientUrl);
	response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	response.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');

	if (request.method === 'OPTIONS') {
		response.sendStatus(204);
		return;
	}

	next();
});

app.use(express.json());
app.use('/uploads', express.static(uploadDirectory));

app.use('/api/auth', authRouter);
app.use('/api/articles', articleRouter);
app.use('/api/assets', assetRouter);
app.use('/api/blogs', blogRouter);
app.use('/api', healthRouter);

export default app;