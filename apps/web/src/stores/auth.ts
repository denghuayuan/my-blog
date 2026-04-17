import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { login, type LoginPayload } from '@/api/auth'

const storageKey = 'my-blog-admin-token'
const usernameStorageKey = 'my-blog-admin-username'
const displayNameStorageKey = 'my-blog-admin-display-name'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(storageKey) || '')
  const username = ref(localStorage.getItem(usernameStorageKey) || '')
  const displayName = ref(localStorage.getItem(displayNameStorageKey) || '')

  const isLoggedIn = computed(() => Boolean(token.value))
  const authorBlogPath = computed(() => (username.value ? `/u/${username.value}` : '/'))

  async function signIn(payload: LoginPayload) {
    const result = await login(payload)
    token.value = result.accessToken
    username.value = result.user.username
    displayName.value = result.user.displayName
    localStorage.setItem(storageKey, result.accessToken)
    localStorage.setItem(usernameStorageKey, result.user.username)
    localStorage.setItem(displayNameStorageKey, result.user.displayName)
    return result
  }

  function signOut() {
    token.value = ''
    username.value = ''
    displayName.value = ''
    localStorage.removeItem(storageKey)
    localStorage.removeItem(usernameStorageKey)
    localStorage.removeItem(displayNameStorageKey)
  }

  return {
    authorBlogPath,
    displayName,
    isLoggedIn,
    signIn,
    signOut,
    token,
    username,
  }
})