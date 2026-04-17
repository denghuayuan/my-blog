import { request } from './client'

export interface BlogProfile {
  username: string
  displayName: string
  bio?: string
  avatar?: string
}

export interface ArticleSummary {
  bodyType: 'plain' | 'markdown'
  coverAssetId?: string
  coverUrl?: string
  id: string
  title: string
  slug: string
  summary?: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export interface ArticleDetail extends ArticleSummary {
  content: string
}

export interface AdminArticleSummary extends ArticleSummary {
  author: BlogProfile | null
}

export interface AdminArticleDetailResult {
  author: BlogProfile | null
  article: ArticleDetail
}

export interface BlogArticlesResult {
  author: BlogProfile
  articles: ArticleSummary[]
}

export interface BlogArticleDetailResult {
  author: BlogProfile
  article: ArticleDetail
}

export interface CreateArticlePayload {
  title: string
  slug: string
  summary?: string
  bodyType: 'plain' | 'markdown'
  content: string
  coverAssetId?: string
  status: 'draft' | 'published'
}

export function fetchArticles() {
  return request<ArticleSummary[]>('/articles')
}

export function fetchArticleDetail(slug: string) {
  return request<ArticleDetail>(`/articles/${slug}`)
}

export function fetchBlogProfile(username: string) {
  return request<BlogProfile>(`/blogs/${username}`)
}

export function fetchBlogArticles(username: string) {
  return request<BlogArticlesResult>(`/blogs/${username}/articles`)
}

export function fetchBlogArticleDetail(username: string, slug: string) {
  return request<BlogArticleDetailResult>(`/blogs/${username}/articles/${slug}`)
}

export function createArticle(payload: CreateArticlePayload, token: string) {
  return request<ArticleDetail>('/articles', {
    method: 'POST',
    body: JSON.stringify(payload),
    token,
  })
}

export function fetchAdminArticles(token: string) {
  return request<AdminArticleSummary[]>('/articles/manage', {
    token,
  })
}

export function fetchAdminArticleDetail(id: string, token: string) {
  return request<AdminArticleDetailResult>(`/articles/manage/${id}`, {
    token,
  })
}

export function updateArticle(id: string, payload: CreateArticlePayload, token: string) {
  return request<ArticleDetail>(`/articles/manage/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    token,
  })
}