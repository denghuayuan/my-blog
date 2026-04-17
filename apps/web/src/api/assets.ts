import { request } from './client'

export interface AssetSummary {
  id: string
  originalName: string
  filename: string
  isInUse: boolean
  mimeType: string
  size: number
  storageProvider: 'local'
  storageKey: string
  usageCount: number
  url: string
  createdAt: string
  updatedAt: string
}

export interface AssetFilters {
  kind?: 'all' | 'image' | 'file'
  query?: string
}

export function fetchAssets(token: string, filters: AssetFilters = {}) {
  const searchParams = new URLSearchParams()

  if (filters.kind && filters.kind !== 'all') {
    searchParams.set('kind', filters.kind)
  }

  if (filters.query?.trim()) {
    searchParams.set('q', filters.query.trim())
  }

  const suffix = searchParams.toString() ? `?${searchParams.toString()}` : ''

  return request<AssetSummary[]>(`/assets${suffix}`, {
    token,
  })
}

export function deleteAsset(id: string, token: string) {
  return request<boolean>(`/assets/${id}`, {
    method: 'DELETE',
    token,
  })
}

export async function uploadAsset(file: File, token: string) {
  const body = new FormData()
  body.append('file', file)

  return request<AssetSummary>('/assets/upload', {
    method: 'POST',
    body,
    token,
  })
}