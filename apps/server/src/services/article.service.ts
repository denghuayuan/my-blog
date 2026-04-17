import { ArticleModel, type ArticleBodyType, type ArticleStatus } from '../models/article.model.js';
import { AssetModel } from '../models/asset.model.js';
import { UserModel } from '../models/user.model.js';

function serializeAuthorProfile(user: {
  username: string;
  displayName: string;
  bio?: string;
  avatar?: string;
}) {
  return {
    username: user.username,
    displayName: user.displayName,
    bio: user.bio || '',
    avatar: user.avatar || ''
  };
}

function serializeArticle(article: {
  _id: unknown;
  title: string;
  slug: string;
  summary?: string;
  bodyType: ArticleBodyType;
  content: string;
  coverAssetId?: unknown;
  coverUrl?: string;
  status: ArticleStatus;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    coverAssetId: article.coverAssetId,
    coverUrl: article.coverUrl || '',
    bodyType: article.bodyType,
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
  bodyType?: ArticleBodyType;
  content: string;
  coverAssetId?: string;
  status?: ArticleStatus;
  authorEmail: string;
}

export interface UpdateArticleInput {
  title: string;
  slug: string;
  summary?: string;
  bodyType?: ArticleBodyType;
  content: string;
  coverAssetId?: string;
  status?: ArticleStatus;
}

function normalizeCoverAsset(
  coverAssetId:
    | string
    | null
    | undefined
): Promise<false | null | Awaited<ReturnType<typeof AssetModel.findById>> extends infer _T ? any : never> {
  if (coverAssetId === undefined) {
    return Promise.resolve(null);
  }

  if (coverAssetId === null || coverAssetId === '') {
    return Promise.resolve(null);
  }

  return AssetModel.findById(coverAssetId).lean().then((asset) => asset || false);
}

export async function createArticle(input: CreateArticleInput) {
  const author = await UserModel.findOne({ email: input.authorEmail, role: 'admin' });

  if (!author) {
    return null;
  }

  const coverAsset = await normalizeCoverAsset(input.coverAssetId);

  if (coverAsset === false) {
    return false;
  }

  const article = await ArticleModel.create({
    title: input.title.trim(),
    slug: input.slug.trim().toLowerCase(),
    summary: input.summary?.trim() || '',
    bodyType: input.bodyType || 'plain',
    content: input.content,
    coverAssetId: coverAsset?._id,
    status: input.status || 'draft',
    authorId: author._id
  });

  return serializeArticle({
    ...article.toObject(),
    coverUrl: coverAsset?.url || ''
  });
}

export async function listAdminArticles() {
  const articles = await ArticleModel.find()
    .populate('coverAssetId')
    .populate('authorId')
    .sort({ updatedAt: -1 })
    .lean();

  return articles.map((article) => ({
    author:
      article.authorId && typeof article.authorId === 'object' && 'username' in article.authorId
        ? serializeAuthorProfile(article.authorId)
        : null,
    coverAssetId:
      article.coverAssetId && typeof article.coverAssetId === 'object' ? article.coverAssetId._id : article.coverAssetId,
    coverUrl:
      article.coverAssetId && typeof article.coverAssetId === 'object' && 'url' in article.coverAssetId ? article.coverAssetId.url : '',
    bodyType: article.bodyType,
    id: article._id,
    title: article.title,
    slug: article.slug,
    summary: article.summary,
    status: article.status,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt
  }));
}

export async function getAdminArticleById(id: string) {
  const article = await ArticleModel.findById(id)
    .populate('coverAssetId')
    .populate('authorId')
    .lean();

  if (!article) {
    return null;
  }

  return {
    author:
      article.authorId && typeof article.authorId === 'object' && 'username' in article.authorId
        ? serializeAuthorProfile(article.authorId)
        : null,
    article: serializeArticle({
      ...article,
      coverAssetId:
        article.coverAssetId && typeof article.coverAssetId === 'object' ? article.coverAssetId._id : article.coverAssetId,
      coverUrl:
        article.coverAssetId && typeof article.coverAssetId === 'object' && 'url' in article.coverAssetId ? article.coverAssetId.url : ''
    })
  };
}

export async function updateArticleById(id: string, input: UpdateArticleInput) {
  const article = await ArticleModel.findById(id);

  if (!article) {
    return null;
  }

  const coverAsset = await normalizeCoverAsset(input.coverAssetId);

  if (coverAsset === false) {
    return false;
  }

  article.title = input.title.trim();
  article.slug = input.slug.trim().toLowerCase();
  article.summary = input.summary?.trim() || '';
  article.bodyType = input.bodyType || 'plain';
  article.content = input.content;
  article.status = input.status || 'draft';
  article.coverAssetId = coverAsset?._id;

  await article.save();

  return serializeArticle({
    ...article.toObject(),
    coverUrl: coverAsset?.url || ''
  });
}

export async function listPublishedArticles() {
  const articles = await ArticleModel.find({ status: 'published' })
    .populate('coverAssetId')
    .sort({ createdAt: -1 })
    .lean();

  return articles.map((article) => ({
    coverAssetId: article.coverAssetId && typeof article.coverAssetId === 'object' ? article.coverAssetId._id : article.coverAssetId,
    coverUrl: article.coverAssetId && typeof article.coverAssetId === 'object' && 'url' in article.coverAssetId ? article.coverAssetId.url : '',
    bodyType: article.bodyType,
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
  })
    .populate('coverAssetId')
    .lean();

  if (!article) {
    return null;
  }

  return serializeArticle({
    ...article,
    coverAssetId:
      article.coverAssetId && typeof article.coverAssetId === 'object' ? article.coverAssetId._id : article.coverAssetId,
    coverUrl:
      article.coverAssetId && typeof article.coverAssetId === 'object' && 'url' in article.coverAssetId ? article.coverAssetId.url : ''
  });
}

export async function getBlogProfileByUsername(username: string) {
  const author = await UserModel.findOne({
    username: username.trim().toLowerCase()
  }).lean();

  if (!author) {
    return null;
  }

  return serializeAuthorProfile(author);
}

export async function listPublishedArticlesByUsername(username: string) {
  const author = await UserModel.findOne({
    username: username.trim().toLowerCase()
  }).lean();

  if (!author) {
    return null;
  }

  const articles = await ArticleModel.find({
    authorId: author._id,
    status: 'published'
  })
    .populate('coverAssetId')
    .sort({ createdAt: -1 })
    .lean();

  return {
    author: serializeAuthorProfile(author),
    articles: articles.map((article) => ({
      coverAssetId: article.coverAssetId && typeof article.coverAssetId === 'object' ? article.coverAssetId._id : article.coverAssetId,
      coverUrl: article.coverAssetId && typeof article.coverAssetId === 'object' && 'url' in article.coverAssetId ? article.coverAssetId.url : '',
      bodyType: article.bodyType,
      id: article._id,
      title: article.title,
      slug: article.slug,
      summary: article.summary,
      status: article.status,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt
    }))
  };
}

export async function getPublishedArticleByUsernameAndSlug(username: string, slug: string) {
  const author = await UserModel.findOne({
    username: username.trim().toLowerCase()
  }).lean();

  if (!author) {
    return null;
  }

  const article = await ArticleModel.findOne({
    authorId: author._id,
    slug: slug.trim().toLowerCase(),
    status: 'published'
  })
    .populate('coverAssetId')
    .lean();

  if (!article) {
    return null;
  }

  return {
    author: serializeAuthorProfile(author),
    article: serializeArticle({
      ...article,
      coverAssetId:
        article.coverAssetId && typeof article.coverAssetId === 'object' ? article.coverAssetId._id : article.coverAssetId,
      coverUrl:
        article.coverAssetId && typeof article.coverAssetId === 'object' && 'url' in article.coverAssetId ? article.coverAssetId.url : ''
    })
  };
}