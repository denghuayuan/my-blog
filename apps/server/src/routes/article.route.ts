import { Router } from 'express';

import {
	createArticleHandler,
	getAdminArticleDetailHandler,
	getPublishedArticleDetailHandler,
	listAdminArticlesHandler,
	listPublishedArticlesHandler,
	updateArticleHandler
} from '../controllers/article.controller.js';
import { requireAdmin, requireAuth } from '../middlewares/auth.middleware.js';

const articleRouter = Router();

articleRouter.get('/manage', requireAuth, requireAdmin, listAdminArticlesHandler);
articleRouter.get('/manage/:id', requireAuth, requireAdmin, getAdminArticleDetailHandler);
articleRouter.patch('/manage/:id', requireAuth, requireAdmin, updateArticleHandler);
articleRouter.get('/', listPublishedArticlesHandler);
articleRouter.get('/:slug', getPublishedArticleDetailHandler);
articleRouter.post('/', requireAuth, requireAdmin, createArticleHandler);

export default articleRouter;