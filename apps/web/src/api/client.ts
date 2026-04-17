const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

interface RequestOptions extends RequestInit {
  token?: string
}

export async function request<T>(path: string, options: RequestOptions = {}) {
  const headers = new Headers(options.headers)
  const isFormDataBody = options.body instanceof FormData

  if (!headers.has('Content-Type') && options.body && !isFormDataBody) {
    headers.set('Content-Type', 'application/json')
  }

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`)
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers,
  })

  const json = (await response.json()) as ApiResponse<T>

  if (!response.ok || json.code !== 0) {
    throw new Error(json.message || 'request failed')
  }

  return json.data
}