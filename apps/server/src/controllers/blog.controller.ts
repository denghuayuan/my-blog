import type { Request, Response } from 'express';

import {
  getBlogProfileByUsername,
  getPublishedArticleByUsernameAndSlug,
  listPublishedArticlesByUsername
} from '../services/article.service.js';

export async function getBlogProfileHandler(request: Request, response: Response) {
  const { username } = request.params;

  if (!username) {
    response.status(400).json({
      code: 400,
      message: 'username is required',
      data: null
    });
    return;
  }

  const profile = await getBlogProfileByUsername(username);

  if (!profile) {
    response.status(404).json({
      code: 404,
      message: 'blog not found',
      data: null
    });
    return;
  }

  response.json({
    code: 0,
    message: 'ok',
    data: profile
  });
}

export async function listBlogArticlesHandler(request: Request, response: Response) {
  const { username } = request.params;

  if (!username) {
    response.status(400).json({
      code: 400,
      message: 'username is required',
      data: null
    });
    return;
  }

  const result = await listPublishedArticlesByUsername(username);

  if (!result) {
    response.status(404).json({
      code: 404,
      message: 'blog not found',
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

export async function getBlogArticleDetailHandler(request: Request, response: Response) {
  const { username, slug } = request.params;

  if (!username || !slug) {
    response.status(400).json({
      code: 400,
      message: 'username and slug are required',
      data: null
    });
    return;
  }

  const result = await getPublishedArticleByUsernameAndSlug(username, slug);

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