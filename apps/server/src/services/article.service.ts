import { ArticleModel, type ArticleStatus } from '../models/article.model.js';
import { UserModel } from '../models/user.model.js';

function serializeArticle(article: {
  _id: unknown;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  status: ArticleStatus;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: article._id,
    title: article.title,
    slug: article.slug,
    summary: article.summary,
    content: article.content,
    status: article.status,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt
  };
}

export interface CreateArticleInput {
  title: string;
  slug: string;
  summary?: string;
  content: string;
  status?: ArticleStatus;
  authorEmail: string;
}

export async function createArticle(input: CreateArticleInput) {
  const author = await UserModel.findOne({ email: input.authorEmail, role: 'admin' });

  if (!author) {
    return null;
  }

  const article = await ArticleModel.create({
    title: input.title.trim(),
    slug: input.slug.trim().toLowerCase(),
    summary: input.summary?.trim() || '',
    content: input.content,
    status: input.status || 'draft',
    authorId: author._id
  });

  return serializeArticle(article);
}

export async function listPublishedArticles() {
  const articles = await ArticleModel.find({ status: 'published' })
    .sort({ createdAt: -1 })
    .lean();

  return articles.map((article) => ({
    id: article._id,
    title: article.title,
    slug: article.slug,
    summary: article.summary,
    status: article.status,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt
  }));
}

export async function getPublishedArticleBySlug(slug: string) {
  const article = await ArticleModel.findOne({
    slug: slug.trim().toLowerCase(),
    status: 'published'
  }).lean();

  if (!article) {
    return null;
  }

  return serializeArticle(article);
}