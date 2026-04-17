import { request } from './client'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResult {
  accessToken: string
  user: {
    displayName: string
    email: string
    role: 'admin' | 'user'
    username: string
  }
}

export function login(payload: LoginPayload) {
  return request<LoginResult>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}