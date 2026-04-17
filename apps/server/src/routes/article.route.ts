import { Router } from 'express';

import {
	createArticleHandler,
	getPublishedArticleDetailHandler,
	listPublishedArticlesHandler
} from '../controllers/article.controller.js';
import { requireAdmin, requireAuth } from '../middlewares/auth.middleware.js';

const articleRouter = Router();

articleRouter.get('/', listPublishedArticlesHandler);
articleRouter.get('/:slug', getPublishedArticleDetailHandler);
articleRouter.post('/', requireAuth, requireAdmin, createArticleHandler);

export default articleRouter;