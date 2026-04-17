import type { Request, Response } from 'express';

import {
  createArticle,
  getPublishedArticleBySlug,
  listPublishedArticles
} from '../services/article.service.js';

export async function createArticleHandler(request: Request, response: Response) {
  const { title, slug, summary, content, status } = request.body as {
    title?: string;
    slug?: string;
    summary?: string;
    content?: string;
    status?: 'draft' | 'published';
  };

  if (!title || !slug || !content) {
    response.status(400).json({
      code: 400,
      message: 'title, slug and content are required',
      data: null
    });
    return;
  }

  if (!request.auth?.email) {
    response.status(401).json({
      code: 401,
      message: 'invalid token payload',
      data: null
    });
    return;
  }

  const article = await createArticle({
    title,
    slug,
    summary,
    content,
    status,
    authorEmail: request.auth.email
  });

  if (!article) {
    response.status(404).json({
      code: 404,
      message: 'admin user not found',
      data: null
    });
    return;
  }

  response.status(201).json({
    code: 0,
    message: 'article created',
    data: article
  });
}

export async function listPublishedArticlesHandler(_request: Request, response: Response) {
  const articles = await listPublishedArticles();

  response.json({
    code: 0,
    message: 'ok',
    data: articles
  });
}

export async function getPublishedArticleDetailHandler(request: Request, response: Response) {
  const { slug } = request.params;

  if (!slug) {
    response.status(400).json({
      code: 400,
      message: 'slug is required',
      data: null
    });
    return;
  }

  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    response.status(404).json({
      code: 404,
      message: 'article not found',
      data: null
    });
    return;
  }

  response.json({
    code: 0,
    message: 'ok',
    data: article
  });
}