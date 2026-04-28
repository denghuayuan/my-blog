import type { Request, Response } from 'express';

import {
  createArticle,
  getAdminArticleById,
  getPublishedArticleBySlug,
  listAdminArticles,
  listPublishedArticles,
  updateArticleById
} from '../services/article.service.js';

export async function createArticleHandler(request: Request, response: Response) {
  const { title, slug, summary, bodyType, content, coverAssetId, status } = request.body as {
    title?: string;
    slug?: string;
    summary?: string;
    bodyType?: 'plain' | 'markdown';
    content?: string;
    coverAssetId?: string;
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
    bodyType,
    content,
    coverAssetId,
    status,
    authorEmail: request.auth.email
  });

  if (article === false) {
    response.status(400).json({
      code: 400,
      message: 'cover asset not found',
      data: null
    });
    return;
  }

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
  const slugParam = request.params.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

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

export async function listAdminArticlesHandler(_request: Request, response: Response) {
  const articles = await listAdminArticles();

  response.json({
    code: 0,
    message: 'ok',
    data: articles
  });
}

export async function getAdminArticleDetailHandler(request: Request, response: Response) {
  const idParam = request.params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  if (!id) {
    response.status(400).json({
      code: 400,
      message: 'id is required',
      data: null
    });
    return;
  }

  const result = await getAdminArticleById(id);

  if (!result) {
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
    data: result
  });
}

export async function updateArticleHandler(request: Request, response: Response) {
  const idParam = request.params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const { title, slug, summary, bodyType, content, coverAssetId, status } = request.body as {
    title?: string;
    slug?: string;
    summary?: string;
    bodyType?: 'plain' | 'markdown';
    content?: string;
    coverAssetId?: string;
    status?: 'draft' | 'published';
  };

  if (!id) {
    response.status(400).json({
      code: 400,
      message: 'id is required',
      data: null
    });
    return;
  }

  if (!title || !slug || !content) {
    response.status(400).json({
      code: 400,
      message: 'title, slug and content are required',
      data: null
    });
    return;
  }

  const article = await updateArticleById(id, {
    title,
    slug,
    summary,
    bodyType,
    content,
    coverAssetId,
    status
  });

  if (article === false) {
    response.status(400).json({
      code: 400,
      message: 'cover asset not found',
      data: null
    });
    return;
  }

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
    message: 'article updated',
    data: article
  });
}