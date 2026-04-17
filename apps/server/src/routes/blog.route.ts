import { Router } from 'express';

import {
  getBlogArticleDetailHandler,
  getBlogProfileHandler,
  listBlogArticlesHandler
} from '../controllers/blog.controller.js';

const blogRouter = Router();

blogRouter.get('/:username', getBlogProfileHandler);
blogRouter.get('/:username/articles', listBlogArticlesHandler);
blogRouter.get('/:username/articles/:slug', getBlogArticleDetailHandler);

export default blogRouter;